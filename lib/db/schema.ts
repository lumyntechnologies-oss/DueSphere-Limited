// Database schema types for the application

// Existing types (unchanged)
export interface News {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  author: string
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
}

export interface Event {
  id: string
  title: string
  description: string
  date: Date
  location: string
  image: string
  createdAt: Date
  updatedAt: Date
}

export interface GalleryItem {
  id: string
  title: string
  description: string
  image: string
  category: string
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

// Due Diligence types
export interface DueDiligenceRequest {
  id: string
  userId: string
  title: string
  description: string
  diligenceType: 'organization' | 'new-hire'
  status: string
  priority: string
  organizationName?: string
  kraPin?: string
  businessPermit?: string
  directorCount?: number
  budget?: number
  phase: number
  riskRating?: string
  diligenceReport?: DueDiligenceReport
  findings: DueDiligenceFinding[]
  documentUploads: DueDiligenceDocument[]
}

export interface DueDiligenceReport {
  id: string
  executiveSummary?: string
  legalCompliance?: string
  governance?: string
  sanctionsScreening?: string
  reputationalRisk?: string
  recommendations: string[]
  riskRating?: string
}

export interface DueDiligenceFinding {
  id: string
  title: string
  description: string
  riskLevel: string
  category: string
  evidence?: string
  recommendation?: string
  status: string
}

export interface DueDiligenceDocument {
  id: string
  filename: string
  documentType: string
  fileUrl: string
  verified: boolean
  notes?: string
}
