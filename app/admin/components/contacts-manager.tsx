"use client"

import { useState, useEffect } from "react"
import styles from "./manager.module.css"

interface Contact {
  id: string
  companyName: string
  contactName: string
  email: string
  phone: string | null
  auditType: string
  description: string
  createdAt: string
  read: boolean
}

const auditTypeLabels: Record<string, string> = {
  security: "Security Audit",
  compliance: "Compliance Audit",
  performance: "Performance Audit",
  "code-quality": "Code Quality Audit",
  other: "Other / Not Sure",
}

export default function ContactsManager() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch("/api/contact")
      const data = await response.json()
      if (Array.isArray(data)) {
        setContacts(data)
      }
    } catch (error) {
      console.error("Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.manager}>
      <div className={styles.header}>
        <h1 className={styles.title}>Audit Requests ({contacts.length})</h1>
        <p className={styles.subtitle}>All audit requests submitted via the contact form</p>
      </div>

      <div className={styles.list}>
        {contacts.length === 0 ? (
          <p className={styles.empty}>No audit requests yet.</p>
        ) : (
          contacts.map((contact) => (
            <div
              key={contact.id}
              className={styles.card}
              onClick={() => setSelectedContact(contact)}
            >
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>
                  {auditTypeLabels[contact.auditType] || contact.auditType}
                </h3>
                <p className={styles.cardExcerpt}>
                  {contact.description.substring(0, 100)}...
                </p>
                <div className={styles.cardMeta}>
                  <span className={styles.cardAuthor}>{contact.companyName}</span>
                  <span>{contact.email}</span>
                  <span className={styles.cardDate}>
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedContact && (
        <div className={styles.modal} onClick={() => setSelectedContact(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setSelectedContact(null)}>
              ✕
            </button>
            <h2 className={styles.modalTitle}>
              {auditTypeLabels[selectedContact!.auditType] || selectedContact!.auditType}
            </h2>
            <div className={styles.modalMeta}>
              <p><strong>Company:</strong> {selectedContact!.companyName}</p>
              <p><strong>Contact:</strong> {selectedContact!.contactName}</p>
              <p><strong>Email:</strong> {selectedContact!.email}</p>
              {selectedContact!.phone && <p><strong>Phone:</strong> {selectedContact!.phone}</p>}
              <p><strong>Date:</strong> {new Date(selectedContact!.createdAt).toLocaleString()}</p>
            </div>
            <div className={styles.modalBody}>
              <p>{selectedContact!.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}