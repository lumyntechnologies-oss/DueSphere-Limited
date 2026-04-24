"use client"

import { useState, useEffect } from "react"
import styles from "./manager.module.css"

interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  deliverables: string[]
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function ServiceManager() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch("/api/services")
      const data = await response.json()
      if (Array.isArray(data)) {
        setServices(data.sort((a, b) => a.order - b.order))
      }
    } catch (error) {
      console.error("Error fetching services:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddService = () => {
    setSelectedService({
      id: "",
      title: "",
      description: "",
      icon: "",
      features: [""],
      deliverables: [""],
      isActive: true,
      order: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    setEditMode(true)
  }

  const handleEditService = (service: Service) => {
    setSelectedService({ ...service })
    setEditMode(true)
  }

  const handleDeleteService = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return
    
    try {
      const response = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      })
      
      if (response.ok) {
        setServices(services.filter(service => service.id !== id))
        if (selectedService?.id === id) {
          setSelectedService(null)
          setEditMode(false)
        }
      } else {
        alert("Failed to delete service")
      }
    } catch (error) {
      console.error("Delete service error:", error)
      alert("Failed to delete service")
    }
  }

  const handleSaveService = async () => {
    if (!selectedService) return

    try {
      const response = await fetch("/api/services", {
        method: selectedService.id ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedService),
      })

      if (response.ok) {
        const data = await response.json()
        if (selectedService.id) {
          // Update existing service
          setServices(services.map(service => 
            service.id === selectedService!.id ? data : service
          ))
        } else {
          // Add new service
          setServices([...services, data])
        }
        setSelectedService(null)
        setEditMode(false)
      } else {
        alert("Failed to save service")
      }
    } catch (error) {
      console.error("Save service error:", error)
      alert("Failed to save service")
    }
  }

  const handleCancel = () => {
    setSelectedService(null)
    setEditMode(false)
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.title}>Service Management</h1>
        <p className={styles.subtitle}>Manage your audit service offerings</p>
        <button 
          className={styles.addBtn}
          onClick={handleAddService}
        >
          Add New Service
        </button>
      </div>

      <div className={styles.list}>
        {services.length === 0 ? (
          <p className={styles.empty}>No services yet. Add your first service above.</p>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              className={styles.card}
              onClick={() => !editMode && handleEditService(service)}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{service.icon} {service.title}</h3>
                  <span 
                    className={`${styles.cardCategory} ${service.isActive ? '' : styles.inactive}`}
                  >
                    {service.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className={styles.cardExcerpt}>
                  {service.description.substring(0, 100)}{service.description.length > 100 ? '...' : ''}
                </p>
                <div className={styles.cardMeta}>
                  <span>Features: {service.features.length}</span>
                  <span>Deliverables: {service.deliverables.length}</span>
                  <span className={styles.cardDate}>
                    {new Date(service.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedService && (
        <div className={styles.modal} onClick={() => handleCancel()}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.modalClose} 
              onClick={handleCancel}
            >
              ✕
            </button>
            <h2 className={styles.modalTitle}>
              {editMode ? "Edit Service" : "Service Details"}
            </h2>
            
            {editMode ? (
              <>
                <form className={styles.form} onSubmit={(e) => {
                  e.preventDefault()
                  handleSaveService()
                }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Service Title</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={selectedService?.title || ""}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {...prev, title: e.target.value} : null)
                      }
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Service Description</label>
                    <textarea
                      className={styles.textarea}
                      value={selectedService?.description || ""}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {...prev, description: e.target.value} : null)
                      }
                      required
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Icon (Emoji or Icon Name)</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={selectedService?.icon || ""}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {...prev, icon: e.target.value} : null)
                      }
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Order/Priority</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={selectedService?.order || 0}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {...prev, order: parseInt(e.target.value) || 0} : null)
                      }
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Status</label>
                    <select
                      className={styles.select}
                      value={selectedService?.isActive ? "true" : "false"}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {...prev, isActive: e.target.value === "true"} : null)
                      }
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Features (one per line)</label>
                    <textarea
                      className={styles.textarea}
                      value={selectedService?.features.join("\n") || ""}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {
                          ...prev, 
                          features: e.target.value.split("\n").map(f => f.trim()).filter(f => f.length > 0)
                        } : null)
                      }
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Deliverables (one per line)</label>
                    <textarea
                      className={styles.textarea}
                      value={selectedService?.deliverables.join("\n") || ""}
                      onChange={(e) => 
                        setSelectedService(prev => prev ? {
                          ...prev, 
                          deliverables: e.target.value.split("\n").map(d => d.trim()).filter(d => d.length > 0)
                        } : null)
                      }
                    />
                  </div>
                  
                  <div className={styles.formActions}>
                    <button 
                      type="submit"
                      className={styles.saveBtn}
                    >
                      {editMode ? "Update Service" : "Add Service"}
                    </button>
                    <button 
                      type="button"
                      className={styles.cancelBtn}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className={styles.serviceDetail}>
                  <h3>{selectedService.icon} {selectedService.title}</h3>
                  <p>{selectedService.description}</p>
                  
                  <div className={styles.modalMeta}>
                    <p><strong>Status:</strong> {selectedService.isActive ? 'Active' : 'Inactive'}</p>
                    <p><strong>Order:</strong> {selectedService.order}</p>
                    <p><strong>Created:</strong> {new Date(selectedService.createdAt).toLocaleString()}</p>
                    <p><strong>Updated:</strong> {new Date(selectedService.updatedAt).toLocaleString()}</p>
                  </div>
                  
                  {selectedService.features.length > 0 && (
                    <>
                      <h4>Features:</h4>
                      <ul className={styles.featureList}>
                        {selectedService.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </>
                  )}
                  
                  {selectedService.deliverables.length > 0 && (
                    <>
                      <h4>Deliverables:</h4>
                      <ul className={styles.featureList}>
                        {selectedService.deliverables.map((deliverable, index) => (
                          <li key={index}>{deliverable}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                
                <div className={styles.formActions}>
                  <button 
                    className={styles.editBtn}
                    onClick={() => setEditMode(true)}
                  >
                    Edit Service
                  </button>
                  <button 
                    className={styles.deleteBtn}
                    onClick={() => handleDeleteService(selectedService!.id)}
                  >
                    Delete Service
                  </button>
                  <button 
                    className={styles.cancelBtn}
                    onClick={handleCancel}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}