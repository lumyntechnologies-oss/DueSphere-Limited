"use client"

import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import Link from "next/link"
import styles from "./dashboard.module.css"

interface AuditRequest {
  id: string
  title: string
  serviceType: string
  status: string
  priority: string
  requestedDate: string
}

interface DueDiligenceRequest {
  id: string
  title: string
  diligenceType: string
  status: string
  priority: string
  requestedDate: string
  organizationName?: string
}

interface Stats {
  totalAudits: number
  totalDues: number
  pendingRequests: number
  completedRequests: number
}

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const [audits, setAudits] = useState<AuditRequest[]>([])
  const [dues, setDues] = useState<DueDiligenceRequest[]>([])
  const [stats, setStats] = useState<Stats>({
    totalAudits: 0,
    totalDues: 0,
    pendingRequests: 0,
    completedRequests: 0,
  })
  const [activeTab, setActiveTab] = useState<'audits' | 'dues'>('audits')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isLoaded || !user) return

    async function fetchData() {
      try {
        await fetch("/api/auth/sync", { method: "POST" })

        const [auditsRes, duesRes] = await Promise.all([
          fetch("/api/audits"),
          fetch("/api/dues")
        ])

        let allAudits: AuditRequest[] = []
        let allDues: DueDiligenceRequest[] = []

        if (auditsRes.ok) {
          allAudits = await auditsRes.json()
          setAudits(allAudits)
        }

        if (duesRes.ok) {
          allDues = await duesRes.json()
          setDues(allDues)
        }

        // Combined stats
        const pending = [...allAudits, ...allDues].filter((r: any) => r.status === "pending").length
        const completed = [...allAudits, ...allDues].filter((r: any) => r.status === "completed").length

        setStats({
          totalAudits: allAudits.length,
          totalDues: allDues.length,
          pendingRequests: pending,
          completedRequests: completed,
        })
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isLoaded, user])

  const currentRequests = activeTab === 'audits' ? audits : dues as any[]

  if (!isLoaded || !user) {
    return <div className={styles.loading}>Loading...</div>
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome, {user.firstName}!</h1>
          <p className={styles.subtitle}>Manage audits and due diligence requests</p>
        </div>
        <div className={styles.headerButtons}>
          <Link href="/dashboard/new-audit" className={styles.newAuditButton}>
            + Audit
          </Link>
          <Link href="/dashboard/new-due-diligence" className={styles.newAuditButton}>
            + Due Diligence
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.totalAudits}</div>
          <div className={styles.statLabel}>Audits</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.totalDues}</div>
          <div className={styles.statLabel}>Due Diligence</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.pendingRequests}</div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{loading ? "..." : stats.completedRequests}</div>
          <div className={styles.statLabel}>Completed</div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'audits' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('audits')}
        >
          Audits ({audits.length})
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'dues' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('dues')}
        >
          Due Diligence ({dues.length})
        </button>
      </div>

      {/* Requests List */}
      <div className={styles.auditsSection}>
        <h2 className={styles.sectionTitle}>
          {activeTab === 'audits' ? 'Audit Requests' : 'Due Diligence Requests'}
        </h2>
        {loading ? (
          <div className={styles.emptyState}>Loading requests...</div>
        ) : currentRequests.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No {activeTab} requests yet.</p>
            <Link 
              href={`/dashboard/new-${activeTab === 'audits' ? 'audit' : 'due-diligence'}`}
              className={styles.emptyStateButton}
            >
              Create {activeTab === 'audits' ? 'Audit' : 'Due Diligence'} Request
            </Link>
          </div>
        ) : (
          <div className={styles.auditsTable}>
            <div className={styles.tableHeader}>
              <div className={styles.titleColumn}>Title</div>
              <div className={styles.typeColumn}>Type</div>
              <div className={styles.statusColumn}>Status</div>
              <div className={styles.priorityColumn}>Priority</div>
              <div className={styles.actionColumn}>Action</div>
            </div>
            {currentRequests.map((request) => (
              <div key={request.id} className={styles.tableRow}>
                <div className={styles.titleColumn}>
                  <Link 
                    href={`/dashboard/${activeTab}/${request.id}`} 
                    className={styles.auditLink}
                  >
                    {request.title}
                  </Link>
                </div>
                <div className={styles.typeColumn}>
                <span className={styles.badge}>
                    {(request as any).serviceType || (request as any).diligenceType}
                  </span>
                </div>
                <div className={styles.statusColumn}>
                  <span className={`${styles.statusBadge} ${styles[`status-${request.status}`]}`}>
                    {request.status}
                  </span>
                </div>
                <div className={styles.priorityColumn}>
                  <span className={`${styles.priorityBadge} ${styles[`priority-${request.priority}`]}`}>
                    {request.priority}
                  </span>
                </div>
                <div className={styles.actionColumn}>
                  <Link href={`/dashboard/${activeTab}/${request.id}`} className={styles.viewButton}>
                    View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
