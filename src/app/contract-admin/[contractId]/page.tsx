'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { 
  FileText, 
  Calendar, 
  DollarSign, 
  Users, 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Upload, 
  Download, 
  Search, 
  Settings, 
  Eye,
  Edit,
  Plus,
  ArrowLeft,
  Sparkles,
  Brain,
  Target,
  Shield,
  Award,
  FileCheck,
  AlertCircle,
  CheckSquare,
  Square,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  ClipboardList,
  MessageSquare,
  Bell,
  Star,
  Zap,
  Lock,
  Unlock,
  Key,
  Database,
  Network,
  Server,
  Cloud,
  X,
  Filter,
  Grid3X3,
  List,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  Wrench,
  HardHat,
  Truck,
  Factory,
  Cog,
  Gauge,
  TrendingDown,
  AlertOctagon,
  CheckCheck,
  FileX,
  Timer,
  CalendarDays,
  UserCheck,
  UserX,
  Award as AwardIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Minus,
  Plus as PlusIcon,
  ExternalLink,
  Copy,
  Share2,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Star as StarIcon,
  Flag,
  Tag,
  Hash,
  Hash as HashIcon,
  Hash as HashIcon2,
  Hash as HashIcon3,
  Hash as HashIcon4,
  Hash as HashIcon5,
  Hash as HashIcon6,
  Hash as HashIcon7,
  UserPlus,
  ArrowRight,
  Lightbulb,
  ChevronLeft,
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10,
  Trash2,
  Send
} from 'lucide-react'
import { motion } from 'framer-motion'

interface DeliverableTask {
  id: string
  title: string
  description: string
  status: 'unassigned' | 'assigned' | 'in-progress' | 'completed' | 'overdue'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignedTo?: string
  dueDate: string
  estimatedHours: number
  actualHours?: number
  dependencies: string[]
  attachments: string[]
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
  }[]
  qualityChecklist: {
    id: string
    item: string
    completed: boolean
  }[]
  timeTracking: {
    startTime?: string
    endTime?: string
    totalTime: number
  }
}

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  type: 'deliverable' | 'invoice' | 'payment' | 'compliance' | 'inspection' | 'meeting'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  contractId: string
  relatedItems: {
    deliverables?: string[]
    invoices?: string[]
    subcontractors?: string[]
  }
  attachments: string[]
  notes: string
  spiritValidation: {
    isProcessing: boolean
    issues: string[]
    recommendations: string[]
    automatedActions: string[]
  }
}

interface CLIN {
  id: string
  number: string
  title: string
  description: string
  type: 'FFP' | 'T&M' | 'CPFF' | 'IDIQ' | 'Cost-Plus' | 'Fixed-Price-Level-of-Effort'
  quantity: number
  unit: string
  unitPrice: number
  totalAmount: number
  period: string
  deliverables: string[]
  keyPersonnel: string[]
  status: 'active' | 'completed' | 'suspended' | 'terminated' | 'under-review' | 'pending-approval' | 'modification-required' | 'funding-issue' | 'performance-issue' | 'quality-hold'
  priority: 'critical' | 'high' | 'medium' | 'low'
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  performance: {
    onSchedule: boolean
    onBudget: boolean
    qualityScore: number
    issues: string[]
    milestones: {
      id: string
      title: string
      dueDate: string
      status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'at-risk'
      completion: number
    }[]
  }
  funding: {
    obligated: number
    expended: number
    remaining: number
    burnRate: number
    forecast: number
    issues: string[]
  }
  compliance: {
    regulatory: string[]
    certifications: string[]
    audits: {
      date: string
      type: string
      result: 'pass' | 'fail' | 'conditional'
      findings: string[]
    }[]
    status: 'compliant' | 'non-compliant' | 'under-review' | 'waiver-requested'
  }
  billingMatrix: {
    monthly: number
    quarterly: number
    milestone: number
    deliverable: number
    percentage: number
    retainage: number
  }
  modifications: {
    id: string
    type: 'scope' | 'schedule' | 'funding' | 'personnel' | 'technical'
    description: string
    status: 'pending' | 'approved' | 'rejected' | 'under-review'
    impact: 'low' | 'medium' | 'high' | 'critical'
    date: string
  }[]
  subcontractors: {
    id: string
    name: string
    role: string
    percentage: number
    status: 'active' | 'completed' | 'terminated' | 'under-review'
  }[]
  qualityControl: {
    inspections: {
      date: string
      type: string
      result: 'pass' | 'fail' | 'conditional'
      findings: string[]
    }[]
    correctiveActions: {
      id: string
      description: string
      status: 'open' | 'in-progress' | 'closed'
      dueDate: string
    }[]
  }
  spiritAnalysis: {
    riskScore: number
    performanceTrend: 'improving' | 'stable' | 'declining'
    recommendations: string[]
    automatedActions: string[]
    alerts: string[]
  }
}

interface InvoiceTemplate {
  id: string
  name: string
  agency: string
  solicitationType: string
  requirements: {
    requiredFields: string[]
    optionalFields: string[]
    attachments: string[]
    certifications: string[]
    validations: string[]
  }
  format: {
    headerFields: string[]
    lineItemFields: string[]
    footerFields: string[]
    customFields: Record<string, any>
  }
  spiritValidation: {
    rules: string[]
    checks: string[]
    autoValidation: boolean
  }
}

interface PaymentRecipient {
  id: string
  name: string
  type: 'subcontractor' | 'individual' | 'consultant' | 'vendor'
  taxId: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  contact: {
    name: string
    email: string
    phone: string
  }
  paymentInfo: {
    method: 'check' | 'ach' | 'wire' | 'credit-card'
    accountNumber?: string
    routingNumber?: string
    bankName?: string
  }
  taxClassification: 'w2' | '1099' | 'corporate' | 'foreign'
  certifications: {
    sam: boolean
    cage: boolean
    duns: boolean
    taxClearance: boolean
    other: string[]
  }
  status: 'active' | 'suspended' | 'terminated'
}

interface Invoice {
  id: string
  invoiceNumber: string
  contractId: string
  clinId: string
  recipientId: string
  recipientType: 'subcontractor' | 'individual' | 'consultant' | 'vendor'
  templateId: string
  description: string
  quantity: number
  unitPrice: number
  totalAmount: number
  submittedDate: string
  dueDate: string
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'paid'
  aging: number
  attachments: string[]
  evidence: string[]
  customFields: Record<string, any>
  spiritValidation: {
    contractCompliance: boolean
    deliverableValidation: boolean
    pricingValidation: boolean
    documentationComplete: boolean
    agencyCompliance: boolean
    taxCompliance: boolean
    issues: string[]
    recommendations: string[]
    validationScore: number
  }
  notes: string
  reviewer: string
  reviewDate?: string
  paymentDate?: string
  paymentMethod: 'check' | 'ach' | 'wire' | 'credit-card'
  taxWithholding: number
  netPayment: number
}

interface Deliverable {
  id: string
  title: string
  description: string
  type: 'milestone' | 'deliverable' | 'report' | 'inspection'
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  dueDate: string
  progress: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  qualityScore: number
  stakeholders: string[]
  dependencies: string[]
  attachments: string[]
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
  }[]
  metrics: {
    onTime: boolean
    onBudget: boolean
    qualityMet: boolean
    customerSatisfaction: number
  }
  automation: {
    autoReminders: boolean
    autoEscalation: boolean
    autoReporting: boolean
  }
  tasks: DeliverableTask[]
  completionGuidance: {
    nextSteps: string[]
    recommendations: string[]
    followUpActions: string[]
    successMetrics: string[]
  }
}

interface Contract {
  id: string
  number: string
  title: string
  agency: string
  value: number
  startDate: string
  endDate: string
  status: 'active' | 'pending' | 'completed' | 'terminated'
  type: 'fixed-price' | 'cost-plus' | 'time-materials'
  contractingOfficer: string
  cor: string
  budget: {
    total: number
    spent: number
    remaining: number
    burnRate: number
  }
  performance: {
    quality: number
    schedule: number
    cost: number
    overall: number
  }
}

interface Subcontractor {
  id: string
  contractId: string
  name: string
  type: string
  specialties: string[]
  pastPerformance: number
  priceCompetitiveness: number
  availability: 'high' | 'medium' | 'low'
  certifications: string[]
  location: string
  contact: {
    name: string
    email: string
    phone: string
  }
  matchScore: number
  status: 'active' | 'completed' | 'terminated' | 'suspended' | 'pending'
  avatar: string
  logo: string
  bidStatus: 'submitted' | 'approved' | 'pending' | 'rejected'
  assignedWork: {
    scopeItems: string[]
    estimatedValue: number
    timeline: string
    requirements: string[]
  }
  teamMembers: {
    name: string
    role: string
    avatar: string
    status: 'approved' | 'pending' | 'needs-review'
  }[]
  pricing: {
    proposedAmount: number
    laborRates: Record<string, number>
    materials: number
    overhead: number
    profit: number
  }
  compliance: {
    insurance: boolean
    bonding: boolean
    certifications: string[]
    clearances: string[]
  }
  performance: {
    quality: number
    schedule: number
    cost: number
    overall: number
  }
  periodOfPerformance: {
    start: string
    end: string
  }
  value: number
  tasks: string[]
  deliverables: {
    id: string
    title: string
    dueDate: string
    status: 'pending' | 'in-progress' | 'completed' | 'overdue'
    assignedTo: string
  }[]
  invoices: {
    id: string
    invoiceNumber: string
    amount: number
    submittedDate: string
    status: 'submitted' | 'approved' | 'paid' | 'rejected' | 'pending'
    paidDate?: string
  }[]
  qualityControl: {
    inspections: {
      id: string
      date: string
      type: string
      result: 'pass' | 'fail' | 'conditional'
      findings: string[]
      correctiveActions: string[]
    }[]
    nonConformances: {
      id: string
      date: string
      description: string
      severity: 'minor' | 'major' | 'critical'
      status: 'open' | 'in-progress' | 'closed'
      correctiveAction: string
    }[]
  }
  safety: {
    incidents: {
      id: string
      date: string
      type: string
      severity: 'minor' | 'major' | 'critical'
      description: string
      status: 'investigating' | 'resolved' | 'closed'
    }[]
    training: {
      id: string
      type: string
      date: string
      participants: number
      status: 'scheduled' | 'completed' | 'overdue'
    }[]
  }
  communications: {
    id: string
    date: string
    type: 'email' | 'phone' | 'meeting' | 'site-visit'
    subject: string
    participants: string[]
    summary: string
    followUpRequired: boolean
    followUpDate?: string
  }[]
  riskAssessment: {
    riskLevel: 'low' | 'medium' | 'high' | 'critical'
    riskFactors: string[]
    mitigationStrategies: string[]
    lastAssessment: string
  }
  automation: {
    autoReminders: boolean
    autoEscalation: boolean
    autoReporting: boolean
    integrationPoints: string[]
  }
}

export default function ContractWorkspacePage() {
  const params = useParams()
  const router = useRouter()
  const contractId = params.contractId as string
  const [activeTab, setActiveTab] = useState('dashboard')
  
  // Task Management State
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedDeliverable, setSelectedDeliverable] = useState<Deliverable | null>(null)

  // Invoicing & Calendar State
  const [showCalendarModal, setShowCalendarModal] = useState(false)
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<any>(null)
  const [activeInvoicingTab, setActiveInvoicingTab] = useState('overview')
  const [showInvoiceBuilder, setShowInvoiceBuilder] = useState(false)
  const [selectedCLIN, setSelectedCLIN] = useState<any>(null)
  const [selectedRecipient, setSelectedRecipient] = useState<PaymentRecipient | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<InvoiceTemplate | null>(null)
  const [invoiceAmount, setInvoiceAmount] = useState(0)
  const [taxWithholding, setTaxWithholding] = useState(0)
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    description: '',
    quantity: 1,
    unitPrice: 0,
    lineItems: [] as any[],
    periodOfPerformance: '',
    certifications: [] as string[],
    attachments: [] as string[],
    notes: '',
    customFields: {} as Record<string, any>
  })
  const [currentStep, setCurrentStep] = useState<'recipient' | 'template' | 'details' | 'review' | 'build'>('recipient')
  const [showTemplatePreview, setShowTemplatePreview] = useState(false)

  // Subcontractor Management State
  const [subcontractorFilter, setSubcontractorFilter] = useState('all')
  const [subcontractorSearch, setSubcontractorSearch] = useState('')
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<string | null>(null)
  const [showSubcontractorModal, setShowSubcontractorModal] = useState(false)
  const [showSubcontractorDetailsModal, setShowSubcontractorDetailsModal] = useState(false)
  const [subcontractorSortBy, setSubcontractorSortBy] = useState('name')
  const [subcontractorView, setSubcontractorView] = useState<'grid' | 'list'>('grid')

  // Mock Data
  const [contract] = useState<Contract>({
    id: 'c-001',
    number: 'W912P8-25-C-0001',
    title: 'HVAC Maintenance Services',
    agency: 'US Army Corps of Engineers',
    value: 2500000,
    startDate: '2025-01-15',
    endDate: '2026-01-14',
    status: 'active',
    type: 'fixed-price',
    contractingOfficer: 'John Smith',
    cor: 'Sarah Johnson',
    budget: {
      total: 2500000,
      spent: 875000,
      remaining: 1625000,
      burnRate: 35
    },
    performance: {
      quality: 95,
      schedule: 88,
      cost: 92,
      overall: 92
    }
  })

  const [clins] = useState<CLIN[]>([
    {
      id: 'clin-001',
      number: '0001',
      title: 'Program Management & Governance',
      description: 'Provide program management office (PMO) oversight, coordination of deliverables, schedule adherence, risk management, and compliance.',
      type: 'T&M',
      quantity: 12,
      unit: 'months',
      unitPrice: 13333,
      totalAmount: 160000,
      period: 'October 2025 - September 2026',
      deliverables: ['PM Plan', 'Risk Register', 'Monthly Progress Reports', 'Stakeholder Comms'],
      keyPersonnel: ['Program Manager (PMP)', 'Senior Scheduler', 'Quality Assurance Analyst'],
      status: 'active',
      priority: 'high',
      riskLevel: 'low',
      performance: {
        onSchedule: true,
        onBudget: true,
        qualityScore: 95,
        issues: [],
        milestones: [
          {
            id: 'milestone-001-1',
            title: 'PMO Setup Complete',
            dueDate: '2025-10-31',
            status: 'completed',
            completion: 100
          },
          {
            id: 'milestone-001-2',
            title: 'Risk Management Framework',
            dueDate: '2025-11-30',
            status: 'in-progress',
            completion: 75
          }
        ]
      },
      funding: {
        obligated: 160000,
        expended: 40000,
        remaining: 120000,
        burnRate: 13333,
        forecast: 160000,
        issues: []
      },
      compliance: {
        regulatory: ['FAR 52.232-7', 'FAR 52.232-8'],
        certifications: ['ISO 9001', 'CMMI Level 3'],
        audits: [
          {
            date: '2025-10-15',
            type: 'Quality Assurance',
            result: 'pass',
            findings: []
          }
        ],
        status: 'compliant'
      },
      billingMatrix: {
        monthly: 13333,
        quarterly: 40000,
        milestone: 0,
        deliverable: 0,
        percentage: 25,
        retainage: 0
      },
      modifications: [],
      subcontractors: [
        {
          id: 'sub-001',
          name: 'Reliable Mechanical Services',
          role: 'Risk Management Support',
          percentage: 15,
          status: 'active'
        }
      ],
      qualityControl: {
        inspections: [
          {
            date: '2025-10-20',
            type: 'Process Review',
            result: 'pass',
            findings: []
          }
        ],
        correctiveActions: []
      },
      spiritAnalysis: {
        riskScore: 15,
        performanceTrend: 'stable',
        recommendations: ['Continue current performance', 'Monitor risk register updates'],
        automatedActions: ['Monthly report generation scheduled'],
        alerts: []
      }
    },
    {
      id: 'clin-002',
      number: '0002',
      title: 'Cloud Architecture & Migration Services',
      description: 'Design and implement cloud architecture, migration planning, and execution services.',
      type: 'FFP',
      quantity: 1,
      unit: 'lump sum',
      unitPrice: 350000,
      totalAmount: 350000,
      period: 'October 2025 - March 2026',
      deliverables: ['Cloud Architecture Design', 'Migration Plan', 'Implementation Report'],
      keyPersonnel: ['Cloud Architect', 'DevOps Engineer', 'Security Specialist'],
      status: 'completed',
      priority: 'critical',
      riskLevel: 'medium',
      performance: {
        onSchedule: true,
        onBudget: true,
        qualityScore: 98,
        issues: [],
        milestones: [
          {
            id: 'milestone-002-1',
            title: 'Architecture Design Complete',
            dueDate: '2025-12-31',
            status: 'completed',
            completion: 100
          },
          {
            id: 'milestone-002-2',
            title: 'Technical Specifications',
            dueDate: '2025-02-28',
            status: 'completed',
            completion: 100
          }
        ]
      },
      funding: {
        obligated: 350000,
        expended: 350000,
        remaining: 0,
        burnRate: 0,
        forecast: 350000,
        issues: []
      },
      compliance: {
        regulatory: ['FAR 52.232-1', 'FAR 52.232-2'],
        certifications: ['AWS Certified', 'Azure Certified'],
        audits: [
          {
            date: '2025-12-20',
            type: 'Technical Review',
            result: 'pass',
            findings: []
          }
        ],
        status: 'compliant'
      },
      billingMatrix: {
        monthly: 0,
        quarterly: 0,
        milestone: 175000,
        deliverable: 175000,
        percentage: 100,
        retainage: 0
      },
      modifications: [],
      subcontractors: [
        {
          id: 'sub-002',
          name: 'Tech Solutions Consulting',
          role: 'Cloud Architecture Support',
          percentage: 30,
          status: 'completed'
        }
      ],
      qualityControl: {
        inspections: [
          {
            date: '2025-12-15',
            type: 'Design Review',
            result: 'pass',
            findings: []
          }
        ],
        correctiveActions: []
      },
      spiritAnalysis: {
        riskScore: 5,
        performanceTrend: 'improving',
        recommendations: ['Excellent performance', 'Consider for future similar projects'],
        automatedActions: ['Final payment processing'],
        alerts: []
      }
    },
    {
      id: 'clin-003',
      number: '0003',
      title: 'Cybersecurity & Compliance Integration',
      description: 'Implement cybersecurity measures and ensure compliance with federal regulations.',
      type: 'FFP',
      quantity: 1,
      unit: 'lump sum',
      unitPrice: 143333,
      totalAmount: 143333,
      period: 'October 2025 - December 2025',
      deliverables: ['Security Assessment', 'Compliance Report', 'Implementation Plan'],
      keyPersonnel: ['Cybersecurity Specialist', 'Compliance Officer', 'Risk Analyst'],
      status: 'under-review',
      priority: 'critical',
      riskLevel: 'high',
      performance: {
        onSchedule: false,
        onBudget: true,
        qualityScore: 85,
        issues: ['Delayed security testing due to system access issues'],
        milestones: [
          {
            id: 'milestone-003-1',
            title: 'Initial Assessment Complete',
            dueDate: '2025-11-30',
            status: 'completed',
            completion: 100
          },
          {
            id: 'milestone-003-2',
            title: 'Penetration Testing',
            dueDate: '2025-12-15',
            status: 'overdue',
            completion: 60
          }
        ]
      },
      funding: {
        obligated: 143333,
        expended: 86000,
        remaining: 57333,
        burnRate: 28667,
        forecast: 143333,
        issues: ['Potential cost overrun due to delays']
      },
      compliance: {
        regulatory: ['FISMA', 'NIST 800-53', 'FAR 52.239-1'],
        certifications: ['CISSP', 'CEH'],
        audits: [
          {
            date: '2025-11-25',
            type: 'Security Assessment',
            result: 'conditional',
            findings: ['Additional testing required for cloud components']
          }
        ],
        status: 'under-review'
      },
      billingMatrix: {
        monthly: 0,
        quarterly: 0,
        milestone: 71667,
        deliverable: 71667,
        percentage: 60,
        retainage: 10
      },
      modifications: [
        {
          id: 'mod-003-1',
          type: 'schedule',
          description: 'Extension requested due to system access delays',
          status: 'pending',
          impact: 'medium',
          date: '2025-12-01'
        }
      ],
      subcontractors: [
        {
          id: 'sub-003',
          name: 'Dr. Sarah Johnson',
          role: 'Security Assessment Lead',
          percentage: 40,
          status: 'active'
        }
      ],
      qualityControl: {
        inspections: [
          {
            date: '2025-11-20',
            type: 'Security Review',
            result: 'conditional',
            findings: ['Additional cloud security testing needed']
          }
        ],
        correctiveActions: [
          {
            id: 'ca-003-1',
            description: 'Complete cloud security testing',
            status: 'in-progress',
            dueDate: '2025-12-20'
          }
        ]
      },
      spiritAnalysis: {
        riskScore: 65,
        performanceTrend: 'declining',
        recommendations: ['Expedite system access approval', 'Consider schedule extension'],
        automatedActions: ['Risk alert sent to PM', 'Stakeholder notification scheduled'],
        alerts: ['Schedule delay detected', 'Quality issues identified']
      }
    },
    {
      id: 'clin-004',
      number: '0004',
      title: 'Data Migration Services',
      description: 'Migration of legacy transportation data to new cloud-based system with data validation and testing.',
      type: 'T&M',
      quantity: 6,
      unit: 'months',
      unitPrice: 25000,
      totalAmount: 150000,
      period: 'January 2026 - June 2026',
      deliverables: ['Data migration plan', 'Legacy data extraction', 'Data validation reports'],
      keyPersonnel: ['Data Architect', 'ETL Developer', 'QA Tester'],
      status: 'pending-approval',
      priority: 'high',
      riskLevel: 'high',
      performance: {
        onSchedule: true,
        onBudget: true,
        qualityScore: 0,
        issues: ['Awaiting final approval to begin'],
        milestones: [
          {
            id: 'milestone-004-1',
            title: 'Project Kickoff',
            dueDate: '2026-01-15',
            status: 'pending',
            completion: 0
          }
        ]
      },
      funding: {
        obligated: 150000,
        expended: 0,
        remaining: 150000,
        burnRate: 0,
        forecast: 150000,
        issues: []
      },
      compliance: {
        regulatory: ['FAR 52.239-1', 'Data Privacy Act'],
        certifications: ['Data Management Professional'],
        audits: [],
        status: 'under-review'
      },
      billingMatrix: {
        monthly: 25000,
        quarterly: 75000,
        milestone: 0,
        deliverable: 0,
        percentage: 0,
        retainage: 0
      },
      modifications: [],
      subcontractors: [
        {
          id: 'sub-004',
          name: 'DataFlow Solutions',
          role: 'Data Migration Specialist',
          percentage: 50,
          status: 'pending-approval'
        }
      ],
      qualityControl: {
        inspections: [],
        correctiveActions: []
      },
      spiritAnalysis: {
        riskScore: 45,
        performanceTrend: 'stable',
        recommendations: ['Proceed with approval', 'Ensure data backup procedures'],
        automatedActions: ['Approval workflow initiated'],
        alerts: ['Pending approval alert']
      }
    },
    {
      id: 'clin-005',
      number: '0005',
      title: 'System Integration Testing',
      description: 'Comprehensive integration testing of all system components including third-party integrations.',
      type: 'FFP',
      quantity: 1,
      unit: 'lump sum',
      unitPrice: 200000,
      totalAmount: 200000,
      period: 'March 2026 - May 2026',
      deliverables: ['Integration test plan', 'Test execution reports', 'Defect resolution log'],
      keyPersonnel: ['Test Lead', 'Integration Specialist', 'QA Engineer'],
      status: 'modification-required',
      priority: 'critical',
      riskLevel: 'critical',
      performance: {
        onSchedule: false,
        onBudget: false,
        qualityScore: 70,
        issues: ['Scope creep identified', 'Additional testing environments needed'],
        milestones: [
          {
            id: 'milestone-005-1',
            title: 'Test Environment Setup',
            dueDate: '2026-03-15',
            status: 'at-risk',
            completion: 30
          }
        ]
      },
      funding: {
        obligated: 200000,
        expended: 60000,
        remaining: 140000,
        burnRate: 30000,
        forecast: 250000,
        issues: ['Potential 25% cost overrun']
      },
      compliance: {
        regulatory: ['FAR 52.246-1', 'FAR 52.246-2'],
        certifications: ['ISTQB Certified'],
        audits: [
          {
            date: '2026-03-10',
            type: 'Process Audit',
            result: 'fail',
            findings: ['Test procedures not documented', 'Quality gates not established']
          }
        ],
        status: 'non-compliant'
      },
      billingMatrix: {
        monthly: 0,
        quarterly: 0,
        milestone: 100000,
        deliverable: 100000,
        percentage: 30,
        retainage: 15
      },
      modifications: [
        {
          id: 'mod-005-1',
          type: 'scope',
          description: 'Additional testing environments and procedures required',
          status: 'under-review',
          impact: 'high',
          date: '2026-03-05'
        },
        {
          id: 'mod-005-2',
          type: 'funding',
          description: 'Request for additional funding due to scope expansion',
          status: 'pending',
          impact: 'critical',
          date: '2026-03-08'
        }
      ],
      subcontractors: [
        {
          id: 'sub-005',
          name: 'Quality Assurance Pro',
          role: 'Testing Services',
          percentage: 60,
          status: 'under-review'
        }
      ],
      qualityControl: {
        inspections: [
          {
            date: '2026-03-05',
            type: 'Process Review',
            result: 'fail',
            findings: ['Inadequate test documentation', 'Missing quality procedures']
          }
        ],
        correctiveActions: [
          {
            id: 'ca-005-1',
            description: 'Develop comprehensive test procedures',
            status: 'open',
            dueDate: '2026-03-20'
          },
          {
            id: 'ca-005-2',
            description: 'Establish quality gates and checkpoints',
            status: 'open',
            dueDate: '2026-03-25'
          }
        ]
      },
      spiritAnalysis: {
        riskScore: 85,
        performanceTrend: 'declining',
        recommendations: ['Immediate process improvement required', 'Consider contract modification'],
        automatedActions: ['Risk escalation initiated', 'Stakeholder notification sent'],
        alerts: ['Critical performance issues', 'Compliance violations detected']
      }
    },
    {
      id: 'clin-006',
      number: '0006',
      title: 'User Training and Documentation',
      description: 'Development of user training materials and comprehensive system documentation.',
      type: 'FFP',
      quantity: 1,
      unit: 'lump sum',
      unitPrice: 75000,
      totalAmount: 75000,
      period: 'April 2026 - June 2026',
      deliverables: ['Training materials', 'User manuals', 'Video tutorials'],
      keyPersonnel: ['Training Specialist', 'Technical Writer', 'Instructional Designer'],
      status: 'funding-issue',
      priority: 'medium',
      riskLevel: 'medium',
      performance: {
        onSchedule: true,
        onBudget: false,
        qualityScore: 0,
        issues: ['Funding approval delayed'],
        milestones: [
          {
            id: 'milestone-006-1',
            title: 'Training Plan Development',
            dueDate: '2026-04-15',
            status: 'pending',
            completion: 0
          }
        ]
      },
      funding: {
        obligated: 75000,
        expended: 0,
        remaining: 75000,
        burnRate: 0,
        forecast: 75000,
        issues: ['Funding release pending approval']
      },
      compliance: {
        regulatory: ['FAR 52.232-1'],
        certifications: ['Training Development Certified'],
        audits: [],
        status: 'under-review'
      },
      billingMatrix: {
        monthly: 0,
        quarterly: 0,
        milestone: 37500,
        deliverable: 37500,
        percentage: 0,
        retainage: 0
      },
      modifications: [],
      subcontractors: [
        {
          id: 'sub-006',
          name: 'Training Excellence Inc',
          role: 'Training Development',
          percentage: 80,
          status: 'pending-approval'
        }
      ],
      qualityControl: {
        inspections: [],
        correctiveActions: []
      },
      spiritAnalysis: {
        riskScore: 35,
        performanceTrend: 'stable',
        recommendations: ['Expedite funding approval', 'Prepare contingency plan'],
        automatedActions: ['Funding request reminder sent'],
        alerts: ['Funding delay alert']
      }
    }
  ])

  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv-001',
      invoiceNumber: 'INV-00001',
      contractId: 'c-001',
      clinId: 'clin-001',
      recipientId: 'recipient-001',
      recipientType: 'subcontractor',
      templateId: 'template-dots',
      description: 'Program Management Services - October 2025',
      quantity: 1,
      unitPrice: 13333,
      totalAmount: 13333,
      submittedDate: '2025-10-01',
      dueDate: '2025-10-31',
      status: 'submitted',
      aging: 5,
      attachments: ['invoice.pdf', 'timesheet.xlsx'],
      evidence: ['pm-report.pdf', 'risk-register.pdf'],
      customFields: {
        'dots-specific': 'DoTS agency requirements',
        'compliance-checks': 'Federal compliance validation'
      },
      spiritValidation: {
        contractCompliance: true,
        deliverableValidation: true,
        pricingValidation: true,
        documentationComplete: false,
        agencyCompliance: true,
        taxCompliance: true,
        issues: ['PM report is missing for final period'],
        recommendations: ['Submit PM report before payment approval'],
        validationScore: 85
      },
      notes: 'Monthly program management services including PMO oversight and coordination.',
      reviewer: 'Sarah Johnson',
      paymentMethod: 'ach',
      taxWithholding: 0,
      netPayment: 13333
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-00002',
      contractId: 'c-001',
      clinId: 'clin-002',
      recipientId: 'recipient-003',
      recipientType: 'consultant',
      templateId: 'template-army',
      description: 'Cloud Architecture Design Phase',
      quantity: 1,
      unitPrice: 350000,
      totalAmount: 350000,
      submittedDate: '2025-09-15',
      dueDate: '2025-10-15',
      status: 'approved',
      aging: 0,
      attachments: ['invoice.pdf', 'design-docs.pdf'],
      evidence: ['architecture-design.pdf', 'technical-specs.pdf'],
      customFields: {
        'army-specific': 'USACE requirements',
        'milestone-tracking': 'Milestone completion tracking'
      },
      spiritValidation: {
        contractCompliance: true,
        deliverableValidation: true,
        pricingValidation: true,
        documentationComplete: true,
        agencyCompliance: true,
        taxCompliance: true,
        issues: [],
        recommendations: ['Proceed with payment approval'],
        validationScore: 95
      },
      notes: 'Cloud architecture design deliverables completed and approved.',
      reviewer: 'Mike Davis',
      reviewDate: '2025-10-10',
      paymentMethod: 'wire',
      taxWithholding: 0,
      netPayment: 350000
    },
    {
      id: 'inv-003',
      invoiceNumber: 'INV-00003',
      contractId: 'c-001',
      clinId: 'clin-003',
      recipientId: 'recipient-002',
      recipientType: 'individual',
      templateId: 'template-individual',
      description: 'Cybersecurity Assessment',
      quantity: 1,
      unitPrice: 143333,
      totalAmount: 143333,
      submittedDate: '2025-10-05',
      dueDate: '2025-11-05',
      status: 'under-review',
      aging: 2,
      attachments: ['invoice.pdf', 'assessment-report.pdf'],
      evidence: ['security-assessment.pdf', 'compliance-checklist.pdf'],
      customFields: {
        'individual-specific': 'Individual consultant requirements',
        'tax-tracking': 'Tax withholding and compliance'
      },
      spiritValidation: {
        contractCompliance: true,
        deliverableValidation: false,
        pricingValidation: true,
        documentationComplete: true,
        agencyCompliance: true,
        taxCompliance: true,
        issues: ['Security assessment incomplete'],
        recommendations: ['Complete security assessment before approval'],
        validationScore: 75
      },
      notes: 'Cybersecurity assessment in progress, partial deliverables submitted.',
      reviewer: 'John Smith',
      paymentMethod: 'check',
      taxWithholding: 14333,
      netPayment: 129000
    }
  ])

  const [invoiceTemplates] = useState<InvoiceTemplate[]>([
    {
      id: 'template-dots',
      name: 'DoTS Standard Invoice Template',
      agency: 'DoTS',
      solicitationType: 'FFP + T&M',
      requirements: {
        requiredFields: ['invoiceNumber', 'contractNumber', 'clinNumber', 'periodOfPerformance', 'deliverables', 'certifications'],
        optionalFields: ['subcontractorInfo', 'travelExpenses', 'materials'],
        attachments: ['timesheet', 'deliverableEvidence', 'certificationForms'],
        certifications: ['samCertification', 'cageCode', 'taxClearance'],
        validations: ['pricingValidation', 'deliverableValidation', 'complianceCheck']
      },
      format: {
        headerFields: ['contractNumber', 'invoiceNumber', 'periodOfPerformance', 'subcontractorInfo'],
        lineItemFields: ['clinNumber', 'description', 'quantity', 'unitPrice', 'total'],
        footerFields: ['certifications', 'authorizedSignature', 'date'],
        customFields: {
          'dots-specific': 'DoTS agency requirements',
          'compliance-checks': 'Federal compliance validation'
        }
      },
      spiritValidation: {
        rules: ['FAR compliance', 'DoTS specific requirements', 'tax withholding rules'],
        checks: ['pricing accuracy', 'deliverable completion', 'certification validity'],
        autoValidation: true
      }
    },
    {
      id: 'template-army',
      name: 'US Army Corps Invoice Template',
      agency: 'US Army Corps of Engineers',
      solicitationType: 'Fixed Price',
      requirements: {
        requiredFields: ['invoiceNumber', 'contractNumber', 'clinNumber', 'milestoneCompletion', 'qualityAssurance'],
        optionalFields: ['subcontractorPerformance', 'safetyCompliance'],
        attachments: ['milestoneEvidence', 'qualityReports', 'safetyCertifications'],
        certifications: ['cageCode', 'samCertification', 'safetyCertification'],
        validations: ['milestoneValidation', 'qualityValidation', 'safetyValidation']
      },
      format: {
        headerFields: ['contractNumber', 'invoiceNumber', 'milestone', 'qualityAssurance'],
        lineItemFields: ['clinNumber', 'milestoneDescription', 'completionDate', 'amount'],
        footerFields: ['qualityCertification', 'safetyCertification', 'authorizedSignature'],
        customFields: {
          'army-specific': 'USACE requirements',
          'milestone-tracking': 'Milestone completion tracking'
        }
      },
      spiritValidation: {
        rules: ['Army Corps requirements', 'milestone validation', 'quality assurance'],
        checks: ['milestone completion', 'quality standards', 'safety compliance'],
        autoValidation: true
      }
    },
    {
      id: 'template-individual',
      name: 'Individual Consultant Invoice Template',
      agency: 'Generic',
      solicitationType: 'T&M',
      requirements: {
        requiredFields: ['invoiceNumber', 'contractNumber', 'timesheet', 'hourlyRate', 'taxInfo'],
        optionalFields: ['expenseReimbursement', 'travelLog'],
        attachments: ['timesheet', 'expenseReceipts', 'taxForms'],
        certifications: ['taxClearance', 'backgroundCheck'],
        validations: ['timeValidation', 'rateValidation', 'taxCompliance']
      },
      format: {
        headerFields: ['contractNumber', 'invoiceNumber', 'consultantInfo', 'period'],
        lineItemFields: ['date', 'hours', 'rate', 'description', 'total'],
        footerFields: ['taxWithholding', 'netAmount', 'signature'],
        customFields: {
          'individual-specific': 'Individual consultant requirements',
          'tax-tracking': 'Tax withholding and compliance'
        }
      },
      spiritValidation: {
        rules: ['Individual payment rules', 'tax withholding', 'time validation'],
        checks: ['hourly rate compliance', 'time accuracy', 'tax compliance'],
        autoValidation: true
      }
    }
  ])

  const [paymentRecipients] = useState<PaymentRecipient[]>([
    {
      id: 'recipient-001',
      name: 'Reliable Mechanical Services',
      type: 'subcontractor',
      taxId: '12-3456789',
      address: {
        street: '123 Industrial Blvd',
        city: 'Baton Rouge',
        state: 'LA',
        zip: '70801',
        country: 'USA'
      },
      contact: {
        name: 'John Smith',
        email: 'john.smith@reliablemech.com',
        phone: '+1-555-123-4567'
      },
      paymentInfo: {
        method: 'ach',
        accountNumber: '****1234',
        routingNumber: '****5678',
        bankName: 'First National Bank'
      },
      taxClassification: 'corporate',
      certifications: {
        sam: true,
        cage: true,
        duns: true,
        taxClearance: true,
        other: ['ISO 9001', 'ASME Certified']
      },
      status: 'active'
    },
    {
      id: 'recipient-002',
      name: 'Dr. Sarah Johnson',
      type: 'individual',
      taxId: '123-45-6789',
      address: {
        street: '456 Oak Street',
        city: 'New Orleans',
        state: 'LA',
        zip: '70112',
        country: 'USA'
      },
      contact: {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@email.com',
        phone: '+1-555-987-6543'
      },
      paymentInfo: {
        method: 'check'
      },
      taxClassification: '1099',
      certifications: {
        sam: false,
        cage: false,
        duns: false,
        taxClearance: true,
        other: ['PhD Mechanical Engineering', 'PMP Certification']
      },
      status: 'active'
    },
    {
      id: 'recipient-003',
      name: 'Tech Solutions Consulting',
      type: 'consultant',
      taxId: '98-7654321',
      address: {
        street: '789 Tech Park',
        city: 'Lafayette',
        state: 'LA',
        zip: '70501',
        country: 'USA'
      },
      contact: {
        name: 'Mike Davis',
        email: 'mike.davis@techsolutions.com',
        phone: '+1-555-456-7890'
      },
      paymentInfo: {
        method: 'wire',
        accountNumber: '****5678',
        routingNumber: '****9012',
        bankName: 'Tech Bank'
      },
      taxClassification: 'corporate',
      certifications: {
        sam: true,
        cage: true,
        duns: true,
        taxClearance: true,
        other: ['Microsoft Certified', 'AWS Certified']
      },
      status: 'active'
    }
  ])

  const [calendarEvents] = useState<CalendarEvent[]>([
    {
      id: 'cal-001',
      title: 'Monthly Status Report Due',
      description: 'Submit monthly program status report for October 2025',
      date: '2025-10-31',
      type: 'deliverable',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Mike Davis',
      contractId: 'c-001',
      relatedItems: {
        deliverables: ['d-001'],
        invoices: ['inv-001']
      },
      attachments: ['template.docx', 'guidelines.pdf'],
      notes: 'Include progress on all CLINs and subcontractor performance',
      spiritValidation: {
        isProcessing: false,
        issues: [],
        recommendations: ['Prepare executive summary', 'Include risk updates'],
        automatedActions: ['Reminder sent', 'Template provided']
      }
    },
    {
      id: 'cal-002',
      title: 'Invoice #INV-00001 Payment Due',
      description: 'Payment due for Program Management Services',
      date: '2025-10-31',
      type: 'payment',
      priority: 'critical',
      status: 'pending',
      assignedTo: 'Sarah Johnson',
      contractId: 'c-001',
      relatedItems: {
        invoices: ['inv-001']
      },
      attachments: ['invoice.pdf', 'approval-form.pdf'],
      notes: 'Ensure all deliverables are complete before payment',
      spiritValidation: {
        isProcessing: false,
        issues: ['PM report missing'],
        recommendations: ['Submit missing documentation'],
        automatedActions: ['Payment hold applied', 'Notification sent']
      }
    },
    {
      id: 'cal-003',
      title: 'Final Inspection - Building 3',
      description: 'Final inspection for HVAC maintenance services',
      date: '2025-10-30',
      type: 'inspection',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Robert Wilson',
      contractId: 'c-001',
      relatedItems: {
        deliverables: ['d-002'],
        subcontractors: ['sub1']
      },
      attachments: ['inspection-checklist.pdf', 'safety-protocols.pdf'],
      notes: 'Coordinate with subcontractor and safety officer',
      spiritValidation: {
        isProcessing: false,
        issues: [],
        recommendations: ['Schedule safety briefing', 'Prepare inspection team'],
        automatedActions: ['Calendar invite sent', 'Checklist provided']
      }
    }
  ])

  const [deliverables] = useState<Deliverable[]>([
    {
      id: 'd-001',
      title: 'Monthly Performance Report',
      description: 'Comprehensive monthly performance report covering all contract metrics and deliverables',
      type: 'report',
      priority: 'high',
      status: 'pending',
      assignedTo: 'Mike Davis',
      dueDate: '2025-08-31',
      progress: 65,
      riskLevel: 'medium',
      qualityScore: 85,
      stakeholders: ['Contracting Officer', 'COR', 'Project Manager'],
      dependencies: ['Data Collection', 'Analysis'],
      attachments: ['template.docx', 'guidelines.pdf'],
      comments: [
        { id: 'c1', author: 'Mike Davis', content: 'Started data collection phase', timestamp: '2025-08-15T10:00:00Z' }
      ],
      metrics: {
        onTime: true,
        onBudget: true,
        qualityMet: true,
        customerSatisfaction: 4.2
      },
      automation: {
        autoReminders: true,
        autoEscalation: false,
        autoReporting: true
      },
      tasks: [
        {
          id: 't1',
          title: 'Data Collection',
          description: 'Gather all performance metrics and data points',
          status: 'completed',
          priority: 'high',
          assignedTo: 'Mike Davis',
          dueDate: '2025-08-20',
          estimatedHours: 8,
          actualHours: 7,
          dependencies: [],
          attachments: ['data-template.xlsx'],
          comments: [],
          qualityChecklist: [
            { id: 'qc1', item: 'Verify data accuracy', completed: true },
            { id: 'qc2', item: 'Cross-reference with previous reports', completed: true }
          ],
          timeTracking: { totalTime: 7 }
        },
        {
          id: 't2',
          title: 'Analysis and Review',
          description: 'Analyze collected data and prepare insights',
          status: 'in-progress',
          priority: 'high',
          assignedTo: 'Mike Davis',
          dueDate: '2025-08-25',
          estimatedHours: 12,
          actualHours: 6,
          dependencies: ['t1'],
          attachments: ['analysis-template.docx'],
          comments: [
            { id: 'c2', author: 'Mike Davis', content: 'Analysis phase started', timestamp: '2025-08-21T14:00:00Z' }
          ],
          qualityChecklist: [
            { id: 'qc3', item: 'Review trends and patterns', completed: false },
            { id: 'qc4', item: 'Validate conclusions', completed: false }
          ],
          timeTracking: { startTime: '2025-08-21T09:00:00Z', totalTime: 6 }
        }
      ],
      completionGuidance: {
        nextSteps: ['Submit for review', 'Schedule presentation', 'Archive report'],
        recommendations: ['Include more visual data', 'Add executive summary'],
        followUpActions: ['Follow up with stakeholders', 'Update project timeline'],
        successMetrics: ['Approval within 48 hours', 'No major revisions required']
      }
    },
    {
      id: 'd-002',
      title: 'Quality Control Plan Implementation',
      description: 'Implementation and documentation of quality control procedures for HVAC maintenance services',
      type: 'milestone',
      priority: 'critical',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      dueDate: '2025-09-15',
      progress: 75,
      riskLevel: 'high',
      qualityScore: 90,
      stakeholders: ['Quality Manager', 'Safety Officer', 'Project Manager'],
      dependencies: ['Training Completion', 'Equipment Setup'],
      attachments: ['qc-plan.pdf', 'procedures.docx'],
      comments: [
        { id: 'c3', author: 'Sarah Johnson', content: 'QC procedures documented', timestamp: '2025-08-18T16:00:00Z' }
      ],
      metrics: {
        onTime: true,
        onBudget: true,
        qualityMet: true,
        customerSatisfaction: 4.5
      },
      automation: {
        autoReminders: true,
        autoEscalation: true,
        autoReporting: true
      },
      tasks: [
        {
          id: 't3',
          title: 'Document QC Procedures',
          description: 'Create comprehensive quality control procedures',
          status: 'completed',
          priority: 'critical',
          assignedTo: 'Sarah Johnson',
          dueDate: '2025-08-20',
          estimatedHours: 16,
          actualHours: 14,
          dependencies: [],
          attachments: ['qc-procedures.docx'],
          comments: [],
          qualityChecklist: [
            { id: 'qc5', item: 'Review with safety team', completed: true },
            { id: 'qc6', item: 'Validate compliance requirements', completed: true }
          ],
          timeTracking: { totalTime: 14 }
        },
        {
          id: 't4',
          title: 'Train Team Members',
          description: 'Conduct training sessions for all team members',
          status: 'in-progress',
          priority: 'high',
          assignedTo: 'Sarah Johnson',
          dueDate: '2025-08-30',
          estimatedHours: 20,
          actualHours: 12,
          dependencies: ['t3'],
          attachments: ['training-materials.pptx'],
          comments: [
            { id: 'c4', author: 'Sarah Johnson', content: 'Training sessions scheduled', timestamp: '2025-08-22T11:00:00Z' }
          ],
          qualityChecklist: [
            { id: 'qc7', item: 'Complete all training modules', completed: false },
            { id: 'qc8', item: 'Verify understanding', completed: false }
          ],
          timeTracking: { startTime: '2025-08-22T09:00:00Z', totalTime: 12 }
        }
      ],
      completionGuidance: {
        nextSteps: ['Finalize training', 'Conduct pilot implementation', 'Full deployment'],
        recommendations: ['Include hands-on practice sessions', 'Add refresher training schedule'],
        followUpActions: ['Monitor implementation effectiveness', 'Collect feedback'],
        successMetrics: ['100% team training completion', 'Zero quality incidents']
      }
    }
  ])

  const [subcontractors] = useState<Subcontractor[]>([
    {
      id: 'sub1',
      contractId: 'c-001',
      name: 'Reliable Mechanical Services',
      type: 'Mechanical',
      specialties: ['HVAC', 'Preventive Maintenance'],
      pastPerformance: 92,
      priceCompetitiveness: 90,
      availability: 'high',
      certifications: ['ISO 9001', 'ASME Certified'],
      location: 'Maintenance Shop',
      contact: {
        name: 'John Smith',
        email: 'john.smith@reliablemech.com',
        phone: '+1-555-123-4567'
      },
      matchScore: 95,
      status: 'active',
      avatar: '/avatars/reliable-mech.jpg',
      logo: '/logos/reliable-mech.png',
      bidStatus: 'approved',
      assignedWork: {
        scopeItems: ['HVAC Installation', 'Preventive Maintenance'],
        estimatedValue: 500000,
        timeline: '2025-01-15 to 2026-01-14',
        requirements: ['FAR 52.242-15', 'Quality Assurance']
      },
      teamMembers: [
        { name: 'John Smith', role: 'Project Manager', avatar: '/avatars/john-smith.jpg', status: 'approved' },
        { name: 'Sarah Johnson', role: 'Quality Manager', avatar: '/avatars/sarah-johnson.jpg', status: 'approved' },
        { name: 'Robert Wilson', role: 'Safety Officer', avatar: '/avatars/robert-wilson.jpg', status: 'approved' }
      ],
      pricing: {
        proposedAmount: 500000,
        laborRates: { 'Project Manager': 100, 'Quality Manager': 90, 'Safety Officer': 80 },
        materials: 100000,
        overhead: 50000,
        profit: 25000
      },
      compliance: {
        insurance: true,
        bonding: true,
        certifications: ['ISO 9001', 'ASME Certified'],
        clearances: ['FAR 52.242-15', 'Quality Assurance']
      },
      performance: {
        quality: 95,
        schedule: 90,
        cost: 92,
        overall: 92
      },
      periodOfPerformance: { start: '2025-01-15', end: '2026-01-14' },
      value: 500000,
      tasks: ['HVAC Installation', 'Preventive Maintenance'],
      deliverables: [
        { id: 'd-001', title: 'Monthly Performance Report', dueDate: '2025-08-31', status: 'pending', assignedTo: 'Mike Davis' },
        { id: 'd-002', title: 'Quality Control Plan Implementation', dueDate: '2025-09-15', status: 'in-progress', assignedTo: 'Sarah Johnson' },
        { id: 'd-003', title: 'Safety Inspection Report', dueDate: '2025-09-30', status: 'pending', assignedTo: 'Robert Wilson' }
      ],
      invoices: [
        { id: 'i-001', invoiceNumber: 'INV-2025-001', amount: 208333, status: 'paid', submittedDate: '2025-02-01', paidDate: '2025-02-15' },
        { id: 'i-002', invoiceNumber: 'INV-2025-002', amount: 150000, status: 'submitted', submittedDate: '2025-03-01' },
        { id: 'i-003', invoiceNumber: 'INV-2025-003', amount: 100000, status: 'pending', submittedDate: '2025-04-01' }
      ],
      qualityControl: {
        inspections: [
          { id: 'qc-001', date: '2025-08-25', type: 'Pre-installation', result: 'pass', findings: [], correctiveActions: [] },
          { id: 'qc-002', date: '2025-09-15', type: 'Post-installation', result: 'pass', findings: [], correctiveActions: [] }
        ],
        nonConformances: [
          { id: 'nc-001', date: '2025-08-28', description: 'Minor issue with HVAC unit', severity: 'minor', status: 'closed', correctiveAction: 'Repaired' },
          { id: 'nc-002', date: '2025-09-20', description: 'Major issue with safety protocols', severity: 'major', status: 'open', correctiveAction: 'Immediate action required' }
        ]
      },
      safety: {
        incidents: [
          { id: 'si-001', date: '2025-08-25', type: 'Near miss', severity: 'minor', description: 'Minor equipment malfunction', status: 'resolved' },
          { id: 'si-002', date: '2025-09-15', type: 'Major incident', severity: 'major', description: 'Fire alarm malfunction', status: 'investigating' }
        ],
        training: [
          { id: 'tr-001', type: 'Safety training', date: '2025-08-25', participants: 10, status: 'completed' },
          { id: 'tr-002', type: 'Quality training', date: '2025-09-15', participants: 8, status: 'completed' }
        ]
      },
      communications: [
        { id: 'com-001', date: '2025-08-25', type: 'email', subject: 'Welcome to the Project', participants: ['John Smith', 'Sarah Johnson'], summary: 'Welcome to the project and introduction to team', followUpRequired: false },
        { id: 'com-002', date: '2025-09-15', type: 'phone', subject: 'Project Kickoff Meeting', participants: ['John Smith', 'Sarah Johnson', 'Robert Wilson'], summary: 'Discussed project scope and expectations', followUpRequired: true, followUpDate: '2025-09-20' },
        { id: 'com-003', date: '2025-10-01', type: 'site-visit', subject: 'Initial Site Visit', participants: ['John Smith', 'Sarah Johnson', 'Lisa Davis'], summary: 'Discussed project progress and concerns', followUpRequired: true, followUpDate: '2025-10-15' }
      ],
      riskAssessment: {
        riskLevel: 'medium',
        riskFactors: ['Data accuracy', 'Stakeholder availability', 'System integration'],
        mitigationStrategies: ['Schedule regular check-ins', 'Implement automated reporting', 'Establish clear communication channels'],
        lastAssessment: '2025-08-25'
      },
      automation: {
        autoReminders: true,
        autoEscalation: false,
        autoReporting: true,
        integrationPoints: ['ERP', 'Quality System', 'Project Management']
      }
    },
    {
      id: 'sub2',
      contractId: 'c-001',
      name: 'Precision Controls Inc.',
      type: 'Controls',
      specialties: ['Building Automation', 'System Integration'],
      pastPerformance: 88,
      priceCompetitiveness: 85,
      availability: 'medium',
      certifications: ['ISO 9001', 'BACnet Certified'],
      location: 'Control Room',
      contact: {
        name: 'Lisa Davis',
        email: 'lisa.davis@precisioncontrols.com',
        phone: '+1-555-234-5678'
      },
      matchScore: 87,
      status: 'active',
      avatar: '/avatars/precision-controls.jpg',
      logo: '/logos/precision-controls.png',
      bidStatus: 'approved',
      assignedWork: {
        scopeItems: ['Building Automation', 'System Integration'],
        estimatedValue: 300000,
        timeline: '2025-01-15 to 2026-01-14',
        requirements: ['FAR 52.242-15', 'Quality Assurance']
      },
      teamMembers: [
        { name: 'Lisa Davis', role: 'Project Manager', avatar: '/avatars/lisa-davis.jpg', status: 'approved' },
        { name: 'Michael Brown', role: 'Controls Specialist', avatar: '/avatars/michael-brown.jpg', status: 'approved' },
        { name: 'Jennifer Garcia', role: 'Quality Manager', avatar: '/avatars/jennifer-garcia.jpg', status: 'approved' }
      ],
      pricing: {
        proposedAmount: 300000,
        laborRates: { 'Project Manager': 95, 'Controls Specialist': 85, 'Quality Manager': 80 },
        materials: 150000,
        overhead: 30000,
        profit: 15000
      },
      compliance: {
        insurance: true,
        bonding: true,
        certifications: ['ISO 9001', 'BACnet Certified'],
        clearances: ['FAR 52.242-15', 'Quality Assurance']
      },
      performance: {
        quality: 90,
        schedule: 85,
        cost: 88,
        overall: 88
      },
      periodOfPerformance: { start: '2025-01-15', end: '2026-01-14' },
      value: 300000,
      tasks: ['Building Automation', 'System Integration'],
      deliverables: [
        { id: 'd-001', title: 'Monthly Performance Report', dueDate: '2025-08-31', status: 'pending', assignedTo: 'Lisa Davis' },
        { id: 'd-002', title: 'Quality Control Plan Implementation', dueDate: '2025-09-15', status: 'in-progress', assignedTo: 'Jennifer Garcia' },
        { id: 'd-003', title: 'Safety Inspection Report', dueDate: '2025-09-30', status: 'pending', assignedTo: 'Michael Brown' }
      ],
      invoices: [
        { id: 'i-001', invoiceNumber: 'INV-2025-001', amount: 125000, status: 'paid', submittedDate: '2025-02-01', paidDate: '2025-02-15' },
        { id: 'i-002', invoiceNumber: 'INV-2025-002', amount: 90000, status: 'submitted', submittedDate: '2025-03-01' }
      ],
      qualityControl: {
        inspections: [
          { id: 'qc-001', date: '2025-08-25', type: 'Pre-installation', result: 'pass', findings: [], correctiveActions: [] }
        ],
        nonConformances: []
      },
      safety: {
        incidents: [],
        training: [
          { id: 'tr-001', type: 'Safety training', date: '2025-08-25', participants: 5, status: 'completed' }
        ]
      },
      communications: [
        { id: 'com-001', date: '2025-08-25', type: 'email', subject: 'Welcome to the Project', participants: ['Lisa Davis', 'Jennifer Garcia'], summary: 'Welcome to the project and introduction to team', followUpRequired: false }
      ],
      riskAssessment: {
        riskLevel: 'low',
        riskFactors: ['System integration complexity'],
        mitigationStrategies: ['Regular testing and validation'],
        lastAssessment: '2025-08-25'
      },
      automation: {
        autoReminders: true,
        autoEscalation: false,
        autoReporting: true,
        integrationPoints: ['ERP', 'Quality System']
      }
    }
  ])

  // Subcontractor Management Functions
  const getTaskStats = (deliverable: Deliverable) => {
    const tasks = deliverable.tasks || []
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      unassigned: tasks.filter(t => t.status === 'unassigned').length
    }
  }

  const getCompletionGuidance = (deliverable: Deliverable) => {
    return deliverable.completionGuidance || {
      nextSteps: [],
      recommendations: [],
      followUpActions: [],
      successMetrics: []
    }
  }

  const assignTask = (taskId: string, assignee: string) => {
    console.log(`Assigning task ${taskId} to ${assignee}`)
  }

  const addToCalendar = (taskId: string) => {
    console.log(`Adding task ${taskId} to calendar`)
  }

  const updateTaskProgress = (taskId: string, progress: number) => {
    console.log(`Updating task ${taskId} progress to ${progress}%`)
  }

  // Invoicing Helper Functions
  const getInvoiceStats = () => {
    const total = invoices.length
    const submitted = invoices.filter(inv => inv.status === 'submitted').length
    const underReview = invoices.filter(inv => inv.status === 'under-review').length
    const approved = invoices.filter(inv => inv.status === 'approved').length
    const paid = invoices.filter(inv => inv.status === 'paid').length
    const overdue = invoices.filter(inv => inv.aging > 30).length

    return { total, submitted, underReview, approved, paid, overdue }
  }

  const getAgingBreakdown = () => {
    const over30 = invoices.filter(inv => inv.aging > 30).length
    const days15to30 = invoices.filter(inv => inv.aging > 15 && inv.aging <= 30).length
    const under15 = invoices.filter(inv => inv.aging <= 15).length

    return { over30, days15to30, under15 }
  }

  const getCalendarEventsByMonth = (year: number, month: number) => {
    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.getFullYear() === year && eventDate.getMonth() === month
    })
  }

  const getUpcomingEvents = (days: number = 7) => {
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + days)

    return calendarEvents.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate <= futureDate
    })
  }

  // Invoice Template & Recipient Helper Functions
  const getInvoiceTemplateByAgency = (agency: string) => {
    return invoiceTemplates.find(template => template.agency === agency)
  }

  const getRecipientsByType = (type: string) => {
    return paymentRecipients.filter(recipient => recipient.type === type)
  }

  const validateInvoiceCompliance = (invoice: Invoice) => {
    const template = invoiceTemplates.find(t => t.id === invoice.templateId)
    const recipient = paymentRecipients.find(r => r.id === invoice.recipientId)
    
    if (!template || !recipient) return { valid: false, issues: ['Template or recipient not found'] }

    const issues: string[] = []
    const recommendations: string[] = []

    // Check required fields
    template.requirements.requiredFields.forEach(field => {
      if (!invoice.customFields[field]) {
        issues.push(`Missing required field: ${field}`)
      }
    })

    // Check certifications
    template.requirements.certifications.forEach(cert => {
      if (!recipient.certifications[cert as keyof typeof recipient.certifications]) {
        issues.push(`Missing certification: ${cert}`)
      }
    })

    // Check tax compliance for individuals
    if (recipient.type === 'individual' && recipient.taxClassification === '1099') {
      if (invoice.taxWithholding === 0) {
        issues.push('Tax withholding required for 1099 individuals')
        recommendations.push('Calculate and apply appropriate tax withholding')
      }
    }

    // Check agency-specific requirements
    if (template.agency === 'DoTS') {
      if (!invoice.customFields['dots-specific']) {
        issues.push('DoTS specific requirements not met')
      }
    }

    return {
      valid: issues.length === 0,
      issues,
      recommendations,
      score: Math.max(0, 100 - (issues.length * 10))
    }
  }

  const calculateTaxWithholding = (recipient: PaymentRecipient, amount: number) => {
    if (recipient.taxClassification === '1099') {
      // 1099 individuals typically have 10% withholding
      return amount * 0.10
    } else if (recipient.taxClassification === 'foreign') {
      // Foreign entities may have different withholding rates
      return amount * 0.30
    }
    return 0
  }

  const handleCLINSelection = (clin: any) => {
    setSelectedCLIN(clin)
    setInvoiceAmount(clin.unitPrice)
    setSelectedRecipient(null)
    setSelectedTemplate(null)
    setTaxWithholding(0)
    setCurrentStep('recipient')
    setInvoiceData({
      invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
      description: '',
      quantity: 1,
      unitPrice: clin.unitPrice,
      lineItems: [],
      periodOfPerformance: '',
      certifications: [],
      attachments: [],
      notes: '',
      customFields: {}
    })
    setShowInvoiceBuilder(true)
  }

  const getSubcontractorStats = () => {
    const total = subcontractors.length
    const active = subcontractors.filter(s => s.status === 'active').length
    const completed = subcontractors.filter(s => s.status === 'completed').length
    const suspended = subcontractors.filter(s => s.status === 'suspended').length
    const totalValue = subcontractors.reduce((sum, s) => sum + s.value, 0)
    const avgPerformance = subcontractors.reduce((sum, s) => sum + s.performance.overall, 0) / total

    return {
      total,
      active,
      completed,
      suspended,
      totalValue,
      avgPerformance: Math.round(avgPerformance)
    }
  }

  const getFilteredSubcontractors = () => {
    let filtered = subcontractors.filter(subcontractor => {
      const matchesSearch = subcontractor.name.toLowerCase().includes(subcontractorSearch.toLowerCase()) ||
                           subcontractor.type.toLowerCase().includes(subcontractorSearch.toLowerCase()) ||
                           subcontractor.contact.name.toLowerCase().includes(subcontractorSearch.toLowerCase())
      const matchesFilter = subcontractorFilter === 'all' || subcontractor.status === subcontractorFilter
      return matchesSearch && matchesFilter
    })

    // Sort subcontractors
    filtered.sort((a, b) => {
      switch (subcontractorSortBy) {
        case 'name':
          return a.name.localeCompare(b.name)
        case 'performance':
          return b.performance.overall - a.performance.overall
        case 'value':
          return b.value - a.value
        case 'risk':
          const riskOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 }
          return riskOrder[b.riskAssessment.riskLevel] - riskOrder[a.riskAssessment.riskLevel]
        default:
          return 0
      }
    })

    return filtered
  }

  // Dashboard Tab
  const renderDashboardTab = () => (
    <div className="space-y-6">
      {/* Spirit AI Analysis */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Spirit AI Contract Health Analysis</h3>
              <p className="text-sm text-gray-600">Real-time contract performance and compliance monitoring</p>
            </div>
          </div>
          <Button className="btn-premium">
            <Sparkles className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Insights
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Contract performance is above target with 92% overall rating
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Budget burn rate of 35% is on track for contract completion
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                All subcontractors are compliant with flow-down requirements
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-blue-600 flex items-center">
              <Target className="h-4 w-4 mr-2" />
              Recommendations
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Schedule quarterly performance review with COR
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Prepare CPARS self-assessment for Q2 evaluation
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Review subcontractor performance metrics monthly
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-orange-600 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Warnings
            </h4>
            <ul className="space-y-2">
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Monthly performance report due in 5 days
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Quarterly quality review requires COR coordination
              </li>
              <li className="text-sm text-gray-700 flex items-start">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                Monitor invoice payment timelines for prompt pay compliance
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Contract Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Performance</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{contract.number}</h4>
                  <p className="text-sm text-gray-600">{contract.title}</p>
                </div>
                <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
                  {contract.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{contract.performance.overall}%</div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{contract.budget.burnRate}%</div>
                  <div className="text-sm text-gray-600">Budget Burn Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quality</span>
                  <span className="font-semibold">{contract.performance.quality}%</span>
                </div>
                <Progress value={contract.performance.quality} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Schedule</span>
                  <span className="font-semibold">{contract.performance.schedule}%</span>
                </div>
                <Progress value={contract.performance.schedule} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Cost</span>
                  <span className="font-semibold">{contract.performance.cost}%</span>
                </div>
                <Progress value={contract.performance.cost} className="h-2" />
              </div>
            </div>
          </div>
        </Card>

        <Card className="card-premium p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h3>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Budget</span>
                <span className="font-semibold">${(contract.budget.total / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Spent</span>
                <span className="font-semibold text-orange-600">${(contract.budget.spent / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Remaining</span>
                <span className="font-semibold text-green-600">${(contract.budget.remaining / 1000000).toFixed(1)}M</span>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-900 mb-1">Budget Status</h5>
                <p className="text-sm text-blue-800">
                  {contract.budget.burnRate < 50 ? 'On track' : 'Monitor closely'} - {contract.budget.burnRate}% spent
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="btn-ghost-premium h-auto p-4 flex flex-col items-center">
            <Upload className="h-6 w-6 mb-2" />
            <span className="text-sm">Upload Mod</span>
          </Button>
          <Button variant="outline" className="btn-ghost-premium h-auto p-4 flex flex-col items-center">
            <FileText className="h-6 w-6 mb-2" />
            <span className="text-sm">Create Report</span>
          </Button>
          <Button variant="outline" className="btn-ghost-premium h-auto p-4 flex flex-col items-center">
            <DollarSign className="h-6 w-6 mb-2" />
            <span className="text-sm">Submit Invoice</span>
          </Button>
          <Button variant="outline" className="btn-ghost-premium h-auto p-4 flex flex-col items-center">
            <Calendar className="h-6 w-6 mb-2" />
            <span className="text-sm">Schedule Review</span>
          </Button>
        </div>
      </Card>
    </div>
  )

  // Modifications Tab
  const renderModificationsTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contract Modification Tracker</h3>
            <p className="text-gray-600">Track every modification (SF30s, bilateral/unilateral) with timeline view</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Add Modification
          </Button>
        </div>

        {/* Timeline View */}
        <div className="space-y-6">
          <div className="relative">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">P00001</h4>
                    <p className="text-sm text-gray-600">Additional HVAC units for Building 3</p>
                    <p className="text-xs text-gray-500 mt-1">Effective: 2025-03-15</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">BILATERAL</Badge>
                    <Badge variant="default">APPROVED</Badge>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-xs text-gray-500">Impact:</span>
                  <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    🔁 Scope changes
                  </Badge>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    💰 Pricing changes
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Value:</span>
                    <p className="font-semibold">$150,000</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Documents:</span>
                    <p className="font-semibold">2 attached</p>
                  </div>
                </div>

                <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    ⚠️ <strong>Auto-alert:</strong> This mod changes CLIN values – update invoice logic?
                  </p>
                </div>

                <div className="mt-3 flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Documents
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download SF30
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  // Deliverables Tab
  const renderDeliverablesTab = () => (
    <div className="space-y-6">
      {/* Spirit AI Deliverable Analysis */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Spirit AI Deliverable Intelligence</h3>
              <p className="text-sm text-gray-600">Real-time deliverable performance and risk analysis</p>
            </div>
          </div>
          <Button className="btn-premium">
            <Sparkles className="h-4 w-4 mr-2" />
            Run Analysis
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600 font-medium">Overdue</p>
                <p className="text-2xl font-bold text-red-700">1</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-600 font-medium">Critical</p>
                <p className="text-2xl font-bold text-orange-700">2</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600 font-medium">Completed</p>
                <p className="text-2xl font-bold text-green-700">1</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">On Track</p>
                <p className="text-2xl font-bold text-blue-700">2</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
        </div>
      </Card>

      {/* Search and Filter */}
      <Card className="card-premium p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search deliverables..."
                className="pl-10 w-64"
              />
            </div>
            <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" className="btn-ghost-premium">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add Deliverable
            </Button>
          </div>
        </div>
      </Card>

      {/* Deliverables Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {deliverables.map((deliverable) => {
          const taskStats = getTaskStats(deliverable)
          return (
            <Card key={deliverable.id} className="card-premium p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{deliverable.title}</h4>
                    <Badge 
                      variant={deliverable.priority === 'critical' ? 'destructive' : deliverable.priority === 'high' ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {deliverable.priority.toUpperCase()}
                    </Badge>
                    <Badge 
                      variant={deliverable.status === 'completed' ? 'default' : deliverable.status === 'in-progress' ? 'secondary' : 'outline'} 
                      className="text-xs"
                    >
                      {deliverable.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{deliverable.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>Assigned: {deliverable.assignedTo}</span>
                    <span>Due: {deliverable.dueDate}</span>
                    <span>Type: {deliverable.type}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{deliverable.progress}%</span>
                </div>
                <Progress value={deliverable.progress} className="h-2" />
                
                {/* Task Overview */}
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Tasks: {taskStats.completed}/{taskStats.total} completed</span>
                  <span>Risk: {deliverable.riskLevel}</span>
                  <span>Quality: {deliverable.qualityScore}/100</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDeliverable(deliverable)
                    setShowTaskModal(true)
                  }}
                >
                  <ClipboardList className="h-4 w-4 mr-1" />
                  Tasks
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Comments
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )

  const renderTaskModal = () => {
    if (!selectedDeliverable) return null

    const taskStats = getTaskStats(selectedDeliverable)
    const completionGuidance = getCompletionGuidance(selectedDeliverable)

    return (
      <Dialog open={showTaskModal} onOpenChange={setShowTaskModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5" />
              <span>Task Management - {selectedDeliverable.title}</span>
            </DialogTitle>
            <DialogDescription>
              Manage tasks for this deliverable. Track progress, assign work, and monitor completion.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Task Statistics */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Task Overview</h4>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{taskStats.total}</div>
                  <div className="text-sm text-gray-600">Total Tasks</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{taskStats.completed}</div>
                  <div className="text-sm text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{taskStats.inProgress}</div>
                  <div className="text-sm text-gray-600">In Progress</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{taskStats.unassigned}</div>
                  <div className="text-sm text-gray-600">Unassigned</div>
                </div>
              </div>
            </Card>

            {/* Individual Tasks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Tasks</h4>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add Task
                </Button>
              </div>
              
              {selectedDeliverable.tasks.map((task) => (
                <Card key={task.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-medium">{task.title}</h5>
                        <Badge variant={task.status === 'completed' ? 'default' : task.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {task.status.toUpperCase()}
                        </Badge>
                        <Badge variant={task.priority === 'critical' ? 'destructive' : task.priority === 'high' ? 'default' : 'secondary'}>
                          {task.priority.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Assigned:</span>
                          <p className="font-medium">{task.assignedTo || 'Unassigned'}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Due:</span>
                          <p className="font-medium">{task.dueDate}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Hours:</span>
                          <p className="font-medium">{task.actualHours || 0}/{task.estimatedHours}</p>
                        </div>
                        <div>
                          <span className="text-gray-500">Dependencies:</span>
                          <p className="font-medium">{task.dependencies.length}</p>
                        </div>
                      </div>

                      {/* Quality Checklist */}
                      {task.qualityChecklist.length > 0 && (
                        <div className="mt-3">
                          <h6 className="text-sm font-medium mb-2">Quality Checklist</h6>
                          <div className="space-y-1">
                            {task.qualityChecklist.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2 text-sm">
                                <div className={`w-4 h-4 border rounded ${item.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                                  {item.completed && <CheckSquare className="w-3 h-3 text-white" />}
                                </div>
                                <span className={item.completed ? 'line-through text-gray-500' : ''}>
                                  {item.item}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                      <Button variant="outline" size="sm" onClick={() => assignTask(task.id, 'New Assignee')}>
                        <UserPlus className="h-4 w-4 mr-1" />
                        Assign
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => addToCalendar(task.id)}>
                        <Calendar className="h-4 w-4 mr-1" />
                        Calendar
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => updateTaskProgress(task.id, 50)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Update
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Completion Guidance */}
            {completionGuidance.nextSteps.length > 0 && (
              <Card className="p-4 bg-blue-50">
                <h4 className="font-semibold mb-3 text-blue-900">Completion Guidance</h4>
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-blue-800 mb-1">Next Steps</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {completionGuidance.nextSteps.map((step, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <ArrowRight className="h-3 w-3" />
                          <span>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-blue-800 mb-1">Recommendations</h5>
                    <ul className="text-sm text-blue-700 space-y-1">
                      {completionGuidance.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Lightbulb className="h-3 w-3" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTaskModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const renderInvoicingTab = () => {
    const invoiceStats = getInvoiceStats()
    const agingBreakdown = getAgingBreakdown()

    return (
      <div className="space-y-6">
        {/* Invoicing Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Payment & Invoicing</h3>
            <p className="text-sm text-gray-600">Manage invoices, payments, and billing for this contract</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setShowCalendarModal(true)}>
              <Calendar className="h-4 w-4 mr-2" />
              Contract Calendar
            </Button>
            <Button className="btn-premium" onClick={() => setShowInvoiceBuilder(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Invoice
            </Button>
          </div>
        </div>

        {/* Invoicing Tabs */}
        <Tabs value={activeInvoicingTab} onValueChange={setActiveInvoicingTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="text-xs flex-shrink-0">Overview</TabsTrigger>
            <TabsTrigger value="invoice-builder" className="text-xs flex-shrink-0">Invoice Builder</TabsTrigger>
            <TabsTrigger value="clin-matrix" className="text-xs flex-shrink-0">CLIN Billing Matrix</TabsTrigger>
            <TabsTrigger value="recipients" className="text-xs flex-shrink-0">Recipients</TabsTrigger>
            <TabsTrigger value="templates" className="text-xs flex-shrink-0">Templates</TabsTrigger>
            <TabsTrigger value="export" className="text-xs flex-shrink-0">Export & Submission</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Invoice Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{invoiceStats.submitted}</div>
                  <div className="text-sm text-gray-600">Submitted</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{invoiceStats.underReview}</div>
                  <div className="text-sm text-gray-600">Under Review</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{invoiceStats.approved}</div>
                  <div className="text-sm text-gray-600">Approved</div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{invoiceStats.paid}</div>
                  <div className="text-sm text-gray-600">Paid</div>
                </div>
              </Card>
            </div>

            {/* Aging Tracker */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Aging Tracker</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">30+ days</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-3 bg-red-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500 rounded-full" 
                        style={{ width: `${(agingBreakdown.over30 / invoiceStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{agingBreakdown.over30}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">15-30 days</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-3 bg-orange-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-orange-500 rounded-full" 
                        style={{ width: `${(agingBreakdown.days15to30 / invoiceStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{agingBreakdown.days15to30}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">&lt;15 days</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 h-3 bg-green-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full" 
                        style={{ width: `${(agingBreakdown.under15 / invoiceStats.total) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{agingBreakdown.under15}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Alerts */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Alerts</h4>
              <div className="space-y-3">
                {invoices.filter(inv => inv.status === 'submitted' && inv.aging > 7).map(invoice => (
                  <div key={invoice.id} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm text-red-800">
                      {invoice.invoiceNumber} is overdue (+{invoice.aging} days)
                    </span>
                    <ChevronRight className="h-4 w-4 text-red-500" />
                  </div>
                ))}
                {invoices.filter(inv => inv.status === 'under-review').map(invoice => (
                  <div key={invoice.id} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm text-blue-800">
                      {invoice.invoiceNumber} pending review
                    </span>
                    <ChevronRight className="h-4 w-4 text-blue-500" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Invoice Table */}
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Recent Invoices</h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Invoice</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">CLIN</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Description</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                      <th className="text-left py-2 text-sm font-medium text-gray-600">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(invoice => {
                      const clin = clins.find(c => c.id === invoice.clinId)
                      return (
                        <tr key={invoice.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 text-sm font-medium">{invoice.invoiceNumber}</td>
                          <td className="py-3 text-sm text-gray-600">{clin?.number}</td>
                          <td className="py-3 text-sm text-gray-600">{invoice.description}</td>
                          <td className="py-3">
                            <Badge 
                              variant={
                                invoice.status === 'approved' ? 'default' :
                                invoice.status === 'submitted' ? 'secondary' :
                                invoice.status === 'under-review' ? 'outline' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {invoice.status.toUpperCase()}
                            </Badge>
                          </td>
                          <td className="py-3 text-sm font-medium">${invoice.totalAmount.toLocaleString()}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="invoice-builder" className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Invoice Builder</h4>
              <p className="text-gray-600 mb-6">Select a CLIN to build an invoice</p>
              
                                      <div className="space-y-4">
                          {clins.map(clin => (
                            <Card key={clin.id} className="p-4 border-2 border-dashed border-gray-200 hover:border-blue-300 cursor-pointer" onClick={() => handleCLINSelection(clin)}>
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2 mb-2">
                                    <h5 className="font-medium">CLIN {clin.number} - {clin.title}</h5>
                                    <Badge 
                                      variant={
                                        clin.status === 'active' ? 'default' :
                                        clin.status === 'completed' ? 'secondary' :
                                        clin.status === 'under-review' ? 'outline' :
                                        clin.status === 'modification-required' ? 'destructive' : 'outline'
                                      }
                                      className="text-xs"
                                    >
                                      {clin.status.replace('-', ' ').toUpperCase()}
                                    </Badge>
                                    <Badge 
                                      variant={
                                        clin.priority === 'critical' ? 'destructive' :
                                        clin.priority === 'high' ? 'default' :
                                        clin.priority === 'medium' ? 'secondary' : 'outline'
                                      }
                                      className="text-xs"
                                    >
                                      {clin.priority.toUpperCase()}
                                    </Badge>
                                  </div>
                                  <p className="text-sm text-gray-600 mb-2">{clin.description}</p>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                                    <div>
                                      <span className="font-medium">Type:</span> {clin.type}
                                    </div>
                                    <div>
                                      <span className="font-medium">Total:</span> ${clin.totalAmount.toLocaleString()}
                                    </div>
                                    <div>
                                      <span className="font-medium">Progress:</span> {clin.performance?.milestones?.filter(m => m.status === 'completed').length || 0}/{clin.performance?.milestones?.length || 0}
                                    </div>
                                    <div>
                                      <span className="font-medium">Risk:</span> 
                                      <span className={`ml-1 ${
                                        clin.riskLevel === 'critical' ? 'text-red-600' :
                                        clin.riskLevel === 'high' ? 'text-orange-600' :
                                        clin.riskLevel === 'medium' ? 'text-yellow-600' : 'text-green-600'
                                      }`}>
                                        {clin.riskLevel.toUpperCase()}
                                      </span>
                                    </div>
                                  </div>
                                  {clin.performance?.issues && clin.performance.issues.length > 0 && (
                                    <div className="mt-2 p-2 bg-red-50 rounded border-l-4 border-red-500">
                                      <div className="text-xs font-medium text-red-800">Issues:</div>
                                      <div className="text-xs text-red-700">
                                        {clin.performance.issues.slice(0, 2).join(', ')}
                                        {clin.performance.issues.length > 2 && ` +${clin.performance.issues.length - 2} more`}
                                      </div>
                                    </div>
                                  )}
                                </div>
                                <ChevronRight className="h-5 w-5 text-gray-400 ml-4" />
                              </div>
                            </Card>
                          ))}
                        </div>
            </Card>
          </TabsContent>

          <TabsContent value="clin-matrix" className="space-y-6">
                                  <Card className="p-6">
                        <h4 className="font-semibold mb-4">CLIN Billing Matrix & Performance</h4>
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 text-sm font-medium text-gray-600">CLIN</th>
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Status</th>
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Progress</th>
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Funding</th>
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Billing</th>
                                <th className="text-left py-2 text-sm font-medium text-gray-600">Risk</th>
                              </tr>
                            </thead>
                            <tbody>
                              {clins.map(clin => (
                                <tr key={clin.id} className="border-b hover:bg-gray-50">
                                  <td className="py-3">
                                    <div>
                                      <div className="text-sm font-medium">CLIN {clin.number}</div>
                                      <div className="text-xs text-gray-500">{clin.title}</div>
                                    </div>
                                  </td>
                                  <td className="py-3">
                                    <Badge 
                                      variant={
                                        clin.status === 'active' ? 'default' :
                                        clin.status === 'completed' ? 'secondary' :
                                        clin.status === 'under-review' ? 'outline' :
                                        clin.status === 'modification-required' ? 'destructive' : 'outline'
                                      }
                                      className="text-xs"
                                    >
                                      {clin.status.replace('-', ' ').toUpperCase()}
                                    </Badge>
                                  </td>
                                  <td className="py-3">
                                    <div className="text-sm">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-blue-500 rounded-full" 
                                            style={{ width: `${clin.performance?.milestones?.filter(m => m.status === 'completed').length / (clin.performance?.milestones?.length || 1) * 100}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-gray-600">
                                          {clin.performance?.milestones?.filter(m => m.status === 'completed').length || 0}/{clin.performance?.milestones?.length || 0}
                                        </span>
                                      </div>
                                      <div className="text-xs text-gray-500 mt-1">
                                        Quality: {clin.performance?.qualityScore || 0}%
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3">
                                    <div className="text-sm">
                                      <div className="text-gray-600">
                                        ${clin.funding?.expended?.toLocaleString() || 0} / ${clin.funding?.obligated?.toLocaleString() || clin.totalAmount.toLocaleString()}
                                      </div>
                                      <div className="text-xs text-gray-500">
                                        {clin.funding?.remaining ? `$${clin.funding.remaining.toLocaleString()} remaining` : 'Fully expended'}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="py-3">
                                    <div className="text-sm text-gray-600">
                                      <div>Monthly: ${clin.billingMatrix.monthly.toLocaleString()}</div>
                                      <div>Quarterly: ${clin.billingMatrix.quarterly.toLocaleString()}</div>
                                      <div>Milestone: ${clin.billingMatrix.milestone.toLocaleString()}</div>
                                    </div>
                                  </td>
                                  <td className="py-3">
                                    <div className="flex items-center space-x-2">
                                      <Badge 
                                        variant={
                                          clin.riskLevel === 'critical' ? 'destructive' :
                                          clin.riskLevel === 'high' ? 'default' :
                                          clin.riskLevel === 'medium' ? 'secondary' : 'outline'
                                        }
                                        className="text-xs"
                                      >
                                        {clin.riskLevel.toUpperCase()}
                                      </Badge>
                                      {clin.spiritAnalysis?.riskScore && (
                                        <span className="text-xs text-gray-500">
                                          Score: {clin.spiritAnalysis.riskScore}
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </Card>
          </TabsContent>

          <TabsContent value="recipients" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Payment Recipients</h4>
                <Button className="btn-premium">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Recipient
                </Button>
              </div>
              
              <div className="space-y-4">
                {paymentRecipients.map(recipient => (
                  <Card key={recipient.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-medium">{recipient.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            {recipient.type}
                          </Badge>
                          <Badge variant={recipient.status === 'active' ? 'default' : 'destructive'} className="text-xs">
                            {recipient.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {recipient.taxClassification} • Tax ID: {recipient.taxId}
                        </p>
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>Payment: {recipient.paymentInfo.method}</span>
                          <span>Contact: {recipient.contact.name}</span>
                          <span>Email: {recipient.contact.email}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {recipient.certifications.sam && <Badge variant="secondary" className="text-xs">SAM</Badge>}
                        {recipient.certifications.cage && <Badge variant="secondary" className="text-xs">CAGE</Badge>}
                        {recipient.certifications.duns && <Badge variant="secondary" className="text-xs">DUNS</Badge>}
                        {recipient.certifications.taxClearance && <Badge variant="secondary" className="text-xs">Tax Clear</Badge>}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Invoice Templates</h4>
                <Button className="btn-premium">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </div>
              
              <div className="space-y-4">
                {invoiceTemplates.map(template => (
                  <Card key={template.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h5 className="font-medium">{template.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            {template.agency}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {template.solicitationType}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <h6 className="font-medium text-gray-700 mb-1">Required Fields:</h6>
                            <div className="flex flex-wrap gap-1">
                              {template.requirements.requiredFields.slice(0, 3).map(field => (
                                <Badge key={field} variant="outline" className="text-xs">
                                  {field}
                                </Badge>
                              ))}
                              {template.requirements.requiredFields.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.requirements.requiredFields.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700 mb-1">Validations:</h6>
                            <div className="flex flex-wrap gap-1">
                              {template.spiritValidation.checks.slice(0, 2).map(check => (
                                <Badge key={check} variant="outline" className="text-xs">
                                  {check}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant={template.spiritValidation.autoValidation ? 'default' : 'secondary'} className="text-xs">
                          {template.spiritValidation.autoValidation ? 'Auto-Validate' : 'Manual'}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="export" className="space-y-6">
            <Card className="p-6">
              <h4 className="font-semibold mb-4">Export & Submission</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Download className="h-6 w-6 mb-2" />
                  <span>Export Invoice Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Calendar className="h-6 w-6 mb-2" />
                  <span>Export Contract Calendar</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <FileText className="h-6 w-6 mb-2" />
                  <span>Generate Payment Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <BarChart3 className="h-6 w-6 mb-2" />
                  <span>Financial Analytics</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  const renderInvoiceBuilderModal = () => {
    if (!selectedCLIN) return null

    const handleRecipientChange = (recipient: PaymentRecipient) => {
      setSelectedRecipient(recipient)
      const withholding = calculateTaxWithholding(recipient, invoiceAmount)
      setTaxWithholding(withholding)
      
      // Auto-select template based on recipient type
      if (recipient.type === 'individual') {
        setSelectedTemplate(invoiceTemplates.find(t => t.id === 'template-individual') || null)
      } else {
        setSelectedTemplate(invoiceTemplates.find(t => t.id === 'template-dots') || null)
      }
    }

    const handleAmountChange = (amount: number) => {
      setInvoiceAmount(amount)
      if (selectedRecipient) {
        const withholding = calculateTaxWithholding(selectedRecipient, amount)
        setTaxWithholding(withholding)
      }
    }

    const addLineItem = () => {
      setInvoiceData(prev => ({
        ...prev,
        lineItems: [...prev.lineItems, {
          id: `line-${Date.now()}`,
          description: '',
          quantity: 1,
          unitPrice: 0,
          total: 0
        }]
      }))
    }

    const updateLineItem = (index: number, field: string, value: any) => {
      setInvoiceData(prev => {
        const newLineItems = [...prev.lineItems]
        newLineItems[index] = { ...newLineItems[index], [field]: value }
        
        // Calculate total for line item
        if (field === 'quantity' || field === 'unitPrice') {
          newLineItems[index].total = newLineItems[index].quantity * newLineItems[index].unitPrice
        }
        
        return { ...prev, lineItems: newLineItems }
      })
    }

    const removeLineItem = (index: number) => {
      setInvoiceData(prev => ({
        ...prev,
        lineItems: prev.lineItems.filter((_, i) => i !== index)
      }))
    }

    const calculateInvoiceTotal = () => {
      const lineItemsTotal = invoiceData.lineItems.reduce((sum, item) => sum + item.total, 0)
      return lineItemsTotal + invoiceData.unitPrice * invoiceData.quantity
    }

    const validateInvoice = () => {
      const template = selectedTemplate
      if (!template) return { valid: false, issues: ['No template selected'] }

      const issues: string[] = []
      
      // Check required fields
      template.requirements.requiredFields.forEach(field => {
        if (!invoiceData.customFields[field] && !invoiceData[field as keyof typeof invoiceData]) {
          issues.push(`Missing required field: ${field}`)
        }
      })

      // Check line items
      if (invoiceData.lineItems.length === 0) {
        issues.push('At least one line item is required')
      }

      // Check description
      if (!invoiceData.description.trim()) {
        issues.push('Invoice description is required')
      }

      return { valid: issues.length === 0, issues }
    }

          return (
        <Dialog open={showInvoiceBuilder} onOpenChange={setShowInvoiceBuilder}>
          <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Enterprise Invoice Builder - CLIN {selectedCLIN.number}</span>
              </DialogTitle>
              <DialogDescription>
                Build and submit enterprise-grade invoices for {selectedCLIN.title}
              </DialogDescription>
            </DialogHeader>

            {/* Step Navigation */}
            <div className="flex items-center space-x-4 mb-6">
              {['recipient', 'template', 'details', 'review', 'build'].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step 
                      ? 'bg-blue-600 text-white' 
                      : index < ['recipient', 'template', 'details', 'review', 'build'].indexOf(currentStep)
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === step ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.charAt(0).toUpperCase() + step.slice(1)}
                  </span>
                  {index < 4 && <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />}
                </div>
              ))}
            </div>

                        <div className="space-y-6">
              {/* Step 1: Recipient Selection */}
              {currentStep === 'recipient' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <UserCheck className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Step 1: Select Payment Recipient</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Choose the recipient for this invoice. The selection will determine the appropriate invoice template and tax requirements.</p>
                    
                    <div className="space-y-3">
                      {paymentRecipients.map(recipient => (
                        <div
                          key={recipient.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedRecipient?.id === recipient.id 
                              ? 'border-blue-500 bg-blue-50 shadow-md' 
                              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                          }`}
                          onClick={() => handleRecipientChange(recipient)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h5 className="font-medium">{recipient.name}</h5>
                                <Badge variant="outline" className="text-xs">
                                  {recipient.type}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {recipient.taxClassification}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {recipient.address.street}, {recipient.address.city}, {recipient.address.state} {recipient.address.zip}
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
                                <div>
                                  <span className="font-medium">Tax ID:</span> {recipient.taxId}
                                </div>
                                <div>
                                  <span className="font-medium">Payment:</span> {recipient.paymentInfo.method}
                                </div>
                                <div>
                                  <span className="font-medium">Contact:</span> {recipient.contact.name}
                                </div>
                                <div>
                                  <span className="font-medium">Status:</span> {recipient.status}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2 mt-2">
                                {recipient.certifications.sam && <Badge variant="secondary" className="text-xs">SAM</Badge>}
                                {recipient.certifications.cage && <Badge variant="secondary" className="text-xs">CAGE</Badge>}
                                {recipient.certifications.duns && <Badge variant="secondary" className="text-xs">DUNS</Badge>}
                                {recipient.certifications.taxClearance && <Badge variant="secondary" className="text-xs">Tax Clear</Badge>}
                              </div>
                            </div>
                            {selectedRecipient?.id === recipient.id && (
                              <CheckCircle className="h-6 w-6 text-blue-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  <div className="flex justify-end space-x-3">
                    <Button variant="outline" onClick={() => setShowInvoiceBuilder(false)}>
                      Cancel
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep('template')}
                      disabled={!selectedRecipient}
                      className="btn-premium"
                    >
                      Next: Select Template
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 2: Template Selection */}
              {currentStep === 'template' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Step 2: Select Invoice Template</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Choose the appropriate invoice template based on the recipient type and agency requirements.</p>
                    
                    <div className="space-y-4">
                      {invoiceTemplates
                        .filter(template => 
                          selectedRecipient?.type === 'individual' 
                            ? template.id === 'template-individual'
                            : template.agency === 'DoTS' || template.agency === 'US Army Corps of Engineers'
                        )
                        .map(template => (
                          <div
                            key={template.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedTemplate?.id === template.id 
                                ? 'border-purple-500 bg-purple-50 shadow-md' 
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                            }`}
                            onClick={() => setSelectedTemplate(template)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h5 className="font-medium">{template.name}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {template.agency}
                                  </Badge>
                                  <Badge variant="secondary" className="text-xs">
                                    {template.solicitationType}
                                  </Badge>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <h6 className="font-medium text-gray-700 mb-1">Required Fields:</h6>
                                    <div className="flex flex-wrap gap-1">
                                      {template.requirements.requiredFields.slice(0, 3).map(field => (
                                        <Badge key={field} variant="outline" className="text-xs">
                                          {field}
                                        </Badge>
                                      ))}
                                      {template.requirements.requiredFields.length > 3 && (
                                        <Badge variant="outline" className="text-xs">
                                          +{template.requirements.requiredFields.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  </div>
                                  <div>
                                    <h6 className="font-medium text-gray-700 mb-1">Validations:</h6>
                                    <div className="flex flex-wrap gap-1">
                                      {template.spiritValidation.checks.slice(0, 2).map(check => (
                                        <Badge key={check} variant="outline" className="text-xs">
                                          {check}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={template.spiritValidation.autoValidation ? 'default' : 'secondary'} className="text-xs">
                                  {template.spiritValidation.autoValidation ? 'Auto-Validate' : 'Manual'}
                                </Badge>
                                {selectedTemplate?.id === template.id && (
                                  <CheckCircle className="h-6 w-6 text-purple-600 mt-2" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    {selectedTemplate && (
                      <Card className="p-4 mt-4 bg-blue-50">
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <h6 className="font-medium text-blue-900">Template Requirements</h6>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
                          <div>
                            <h7 className="font-medium">Required Fields:</h7>
                            <ul className="mt-1 space-y-1">
                              {selectedTemplate.requirements.requiredFields.map(field => (
                                <li key={field} className="flex items-center space-x-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>{field}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h7 className="font-medium">Required Attachments:</h7>
                            <ul className="mt-1 space-y-1">
                              {selectedTemplate.requirements.attachments.map(attachment => (
                                <li key={attachment} className="flex items-center space-x-1">
                                  <CheckCircle className="h-3 w-3" />
                                  <span>{attachment}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>
                    )}
                  </Card>

                  <div className="flex justify-between space-x-3">
                    <Button variant="outline" onClick={() => setCurrentStep('recipient')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back: Recipient
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep('details')}
                      disabled={!selectedTemplate}
                      className="btn-premium"
                    >
                      Next: Invoice Details
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 3: Invoice Details */}
              {currentStep === 'details' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Edit className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Step 3: Invoice Details</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Enter the detailed information for this invoice including line items, descriptions, and amounts.</p>
                    
                    <div className="space-y-6">
                      {/* Basic Invoice Information */}
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Invoice Number
                          </label>
                          <Input 
                            value={invoiceData.invoiceNumber}
                            onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                            className="w-full"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Period of Performance
                          </label>
                          <Input 
                            value={invoiceData.periodOfPerformance}
                            onChange={(e) => setInvoiceData(prev => ({ ...prev, periodOfPerformance: e.target.value }))}
                            placeholder="e.g., October 1-31, 2025"
                            className="w-full"
                          />
                        </div>
                      </div>

                      {/* Invoice Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Invoice Description
                        </label>
                        <Textarea 
                          value={invoiceData.description}
                          onChange={(e) => setInvoiceData(prev => ({ ...prev, description: e.target.value }))}
                          placeholder="Describe the services or deliverables being invoiced..."
                          className="w-full"
                          rows={3}
                        />
                      </div>

                      {/* Line Items */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h6 className="font-medium text-gray-700">Line Items</h6>
                          <Button variant="outline" size="sm" onClick={addLineItem}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Line Item
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {invoiceData.lineItems.map((item, index) => (
                            <Card key={item.id} className="p-4">
                              <div className="grid grid-cols-12 gap-3 items-center">
                                <div className="col-span-5">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
                                  <Input 
                                    value={item.description}
                                    onChange={(e) => updateLineItem(index, 'description', e.target.value)}
                                    placeholder="Line item description"
                                    className="w-full text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Quantity</label>
                                  <Input 
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateLineItem(index, 'quantity', Number(e.target.value))}
                                    className="w-full text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit Price</label>
                                  <Input 
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => updateLineItem(index, 'unitPrice', Number(e.target.value))}
                                    className="w-full text-sm"
                                  />
                                </div>
                                <div className="col-span-2">
                                  <label className="block text-xs font-medium text-gray-700 mb-1">Total</label>
                                  <Input 
                                    value={`$${item.total.toLocaleString()}`}
                                    readOnly
                                    className="w-full text-sm bg-gray-50"
                                  />
                                </div>
                                <div className="col-span-1">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => removeLineItem(index)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>

                        {invoiceData.lineItems.length === 0 && (
                          <div className="text-center py-8 text-gray-500">
                            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                            <p>No line items added yet. Click "Add Line Item" to get started.</p>
                          </div>
                        )}
                      </div>

                      {/* Summary */}
                      <Card className="p-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Invoice Total:</span>
                          <span className="text-xl font-bold">${calculateInvoiceTotal().toLocaleString()}</span>
                        </div>
                        {selectedRecipient && (
                          <div className="mt-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                              <span>Tax Withholding:</span>
                              <span>${taxWithholding.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between font-medium">
                              <span>Net Payment:</span>
                              <span>${(calculateInvoiceTotal() - taxWithholding).toLocaleString()}</span>
                            </div>
                          </div>
                        )}
                      </Card>
                    </div>
                  </Card>

                  <div className="flex justify-between space-x-3">
                    <Button variant="outline" onClick={() => setCurrentStep('template')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back: Template
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep('review')}
                      disabled={invoiceData.lineItems.length === 0}
                      className="btn-premium"
                    >
                      Next: Review & Validate
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 4: Review & Validation */}
              {currentStep === 'review' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Step 4: Review & Validation</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Review the invoice details and validate compliance with the selected template requirements.</p>
                    
                    <div className="space-y-6">
                      {/* Invoice Summary */}
                      <Card className="p-4">
                        <h6 className="font-medium mb-3">Invoice Summary</h6>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Invoice Number:</span>
                            <p className="font-medium">{invoiceData.invoiceNumber}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Recipient:</span>
                            <p className="font-medium">{selectedRecipient?.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Template:</span>
                            <p className="font-medium">{selectedTemplate?.name}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Total Amount:</span>
                            <p className="font-medium">${calculateInvoiceTotal().toLocaleString()}</p>
                          </div>
                        </div>
                      </Card>

                      {/* Validation Results */}
                      <Card className="p-4">
                        <h6 className="font-medium mb-3">Validation Results</h6>
                        {(() => {
                          const validation = validateInvoice()
                          return (
                            <div className="space-y-2">
                              {validation.valid ? (
                                <div className="flex items-center space-x-2 text-green-600">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>All validations passed successfully</span>
                                </div>
                              ) : (
                                <div className="space-y-2">
                                  <div className="flex items-center space-x-2 text-red-600">
                                    <AlertTriangle className="h-4 w-4" />
                                    <span>Validation issues found:</span>
                                  </div>
                                  <ul className="ml-6 space-y-1">
                                    {validation.issues.map((issue, index) => (
                                      <li key={index} className="text-sm text-red-600">• {issue}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )
                        })()}
                      </Card>

                      {/* Spirit AI Analysis */}
                      <Card className="p-4 bg-blue-50">
                        <div className="flex items-center space-x-2 mb-3">
                          <Brain className="h-4 w-4 text-blue-600" />
                          <h6 className="font-medium text-blue-900">Spirit AI Analysis</h6>
                        </div>
                        <div className="space-y-2 text-sm text-blue-800">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3" />
                            <span>Template compliance validated</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3" />
                            <span>Tax withholding calculated correctly</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-3 w-3" />
                            <span>Line items properly formatted</span>
                          </div>
                          {selectedRecipient?.type === 'individual' && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3" />
                              <span>Individual payment requirements met</span>
                            </div>
                          )}
                          {selectedTemplate?.agency === 'DoTS' && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3" />
                              <span>DoTS agency requirements validated</span>
                            </div>
                          )}
                        </div>
                      </Card>
                    </div>
                  </Card>

                  <div className="flex justify-between space-x-3">
                    <Button variant="outline" onClick={() => setCurrentStep('details')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back: Details
                    </Button>
                    <Button 
                      onClick={() => setCurrentStep('build')}
                      disabled={!validateInvoice().valid}
                      className="btn-premium"
                    >
                      Next: Build Invoice
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Step 5: Build Invoice */}
              {currentStep === 'build' && (
                <>
                  <Card className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">Step 5: Build Final Invoice</h4>
                    </div>
                    <p className="text-gray-600 mb-4">Review the final invoice and submit for processing.</p>
                    
                    <div className="space-y-6">
                      {/* Invoice Preview */}
                      <Card className="p-6 border-2 border-gray-200">
                        <div className="text-center mb-6">
                          <h3 className="text-2xl font-bold text-gray-800">INVOICE</h3>
                          <p className="text-gray-600">Invoice #{invoiceData.invoiceNumber}</p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-8 mb-6">
                          <div>
                            <h6 className="font-medium text-gray-700 mb-2">Bill To:</h6>
                            <div className="text-sm text-gray-600">
                              <p className="font-medium">{selectedRecipient?.name}</p>
                              <p>{selectedRecipient?.address.street}</p>
                              <p>{selectedRecipient?.address.city}, {selectedRecipient?.address.state} {selectedRecipient?.address.zip}</p>
                              <p>Tax ID: {selectedRecipient?.taxId}</p>
                            </div>
                          </div>
                          <div>
                            <h6 className="font-medium text-gray-700 mb-2">Contract Information:</h6>
                            <div className="text-sm text-gray-600">
                              <p>Contract: {contract.number}</p>
                              <p>CLIN: {selectedCLIN.number}</p>
                              <p>Period: {invoiceData.periodOfPerformance}</p>
                              <p>Template: {selectedTemplate?.name}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-6">
                          <h6 className="font-medium text-gray-700 mb-2">Description:</h6>
                          <p className="text-sm text-gray-600">{invoiceData.description}</p>
                        </div>
                        
                        <div className="mb-6">
                          <table className="w-full">
                            <thead>
                              <tr className="border-b">
                                <th className="text-left py-2 text-sm font-medium text-gray-700">Description</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-700">Quantity</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-700">Unit Price</th>
                                <th className="text-right py-2 text-sm font-medium text-gray-700">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {invoiceData.lineItems.map((item, index) => (
                                <tr key={index} className="border-b">
                                  <td className="py-2 text-sm text-gray-600">{item.description}</td>
                                  <td className="py-2 text-sm text-gray-600 text-right">{item.quantity}</td>
                                  <td className="py-2 text-sm text-gray-600 text-right">${item.unitPrice.toLocaleString()}</td>
                                  <td className="py-2 text-sm text-gray-600 text-right">${item.total.toLocaleString()}</td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr className="border-t-2">
                                <td colSpan={3} className="py-2 text-sm font-medium text-gray-700 text-right">Total:</td>
                                <td className="py-2 text-sm font-medium text-gray-700 text-right">${calculateInvoiceTotal().toLocaleString()}</td>
                              </tr>
                              {selectedRecipient && (
                                <>
                                  <tr>
                                    <td colSpan={3} className="py-1 text-sm text-gray-600 text-right">Tax Withholding:</td>
                                    <td className="py-1 text-sm text-gray-600 text-right">${taxWithholding.toLocaleString()}</td>
                                  </tr>
                                  <tr className="border-t">
                                    <td colSpan={3} className="py-2 text-sm font-bold text-gray-800 text-right">Net Payment:</td>
                                    <td className="py-2 text-sm font-bold text-gray-800 text-right">${(calculateInvoiceTotal() - taxWithholding).toLocaleString()}</td>
                                  </tr>
                                </>
                              )}
                            </tfoot>
                          </table>
                        </div>
                        
                        <div className="text-center text-sm text-gray-500">
                          <p>This invoice complies with {selectedTemplate?.agency} requirements and has been validated by Spirit AI.</p>
                        </div>
                      </Card>
                    </div>
                  </Card>

                  <div className="flex justify-between space-x-3">
                    <Button variant="outline" onClick={() => setCurrentStep('review')}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Back: Review
                    </Button>
                    <Button 
                      onClick={() => {
                        // Here you would submit the invoice
                        console.log('Invoice submitted:', {
                          ...invoiceData,
                          recipient: selectedRecipient,
                          template: selectedTemplate,
                          clin: selectedCLIN,
                          total: calculateInvoiceTotal(),
                          taxWithholding,
                          netPayment: calculateInvoiceTotal() - taxWithholding
                        })
                        setShowInvoiceBuilder(false)
                      }}
                      className="btn-premium"
                    >
                      Submit Invoice
                      <Send className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}

              {/* Contract Information (always visible) */}
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Contract Information</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">State:</span>
                    <p className="font-medium">LA</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Agency:</span>
                    <p className="font-medium">DoTS</p>
                  </div>
                  <div>
                    <span className="text-gray-600">RFP:</span>
                    <p className="font-medium">24-IT-045</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Contract Type:</span>
                    <p className="font-medium">FFP + T&M Option</p>
                  </div>
                </div>
              </Card>

            {/* CLIN Details */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">CLIN {selectedCLIN.number} - {selectedCLIN.title}</h4>
                <Badge variant="outline">Draft</Badge>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{selectedCLIN.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                <div>
                  <span className="text-gray-600">Quantity:</span>
                  <p className="font-medium">{selectedCLIN.quantity}</p>
                </div>
                <div>
                  <span className="text-gray-600">Unit:</span>
                  <p className="font-medium">{selectedCLIN.unit}</p>
                </div>
                <div>
                  <span className="text-gray-600">Period:</span>
                  <p className="font-medium">{selectedCLIN.period}</p>
                </div>
                <div>
                  <span className="text-gray-600">Total:</span>
                  <p className="font-medium">${selectedCLIN.totalAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium mb-2">Deliverables</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCLIN.deliverables.map((deliverable: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckSquare className="h-3 w-3 text-green-500" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium mb-2">Key Personnel</h6>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedCLIN.keyPersonnel.map((person: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <UserCheck className="h-3 w-3 text-blue-500" />
                        <span>{person}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Payment Recipient Selection */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Payment Recipient</h4>
              <div className="space-y-3">
                {paymentRecipients.map(recipient => (
                  <div
                    key={recipient.id}
                    className={`p-3 border rounded-lg cursor-pointer ${
                      selectedRecipient?.id === recipient.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleRecipientChange(recipient)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium">{recipient.name}</h5>
                        <p className="text-sm text-gray-600">{recipient.type} • {recipient.taxClassification}</p>
                        <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                          <span>Tax ID: {recipient.taxId}</span>
                          <span>Payment: {recipient.paymentInfo.method}</span>
                          <span>Status: {recipient.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {recipient.certifications.sam && <Badge variant="outline" className="text-xs">SAM</Badge>}
                        {recipient.certifications.cage && <Badge variant="outline" className="text-xs">CAGE</Badge>}
                        {recipient.certifications.taxClearance && <Badge variant="outline" className="text-xs">Tax Clear</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Invoice Template Selection */}
            {selectedRecipient && (
              <Card className="p-4">
                <h4 className="font-semibold mb-4">Invoice Template</h4>
                <div className="space-y-3">
                  {invoiceTemplates
                    .filter(template => 
                      selectedRecipient.type === 'individual' 
                        ? template.id === 'template-individual'
                        : template.agency === 'DoTS' || template.agency === 'US Army Corps of Engineers'
                    )
                    .map(template => (
                      <div
                        key={template.id}
                        className={`p-3 border rounded-lg cursor-pointer ${
                          selectedTemplate?.id === template.id 
                            ? 'border-purple-500 bg-purple-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h5 className="font-medium">{template.name}</h5>
                            <p className="text-sm text-gray-600">{template.agency} • {template.solicitationType}</p>
                            <div className="mt-2">
                              <h6 className="text-xs font-medium text-gray-700">Required Fields:</h6>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {template.requirements.requiredFields.slice(0, 3).map(field => (
                                  <Badge key={field} variant="secondary" className="text-xs">
                                    {field}
                                  </Badge>
                                ))}
                                {template.requirements.requiredFields.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{template.requirements.requiredFields.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {template.spiritValidation.autoValidation ? 'Auto-Validate' : 'Manual'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            )}

            {/* Invoice Details */}
            <Card className="p-4">
              <h4 className="font-semibold mb-4">Invoice Details</h4>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Invoice Description
                  </label>
                  <Textarea 
                    placeholder="Describe the services or deliverables being invoiced..."
                    className="w-full"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity Delivered
                    </label>
                    <Input type="number" defaultValue="1" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Amount
                    </label>
                    <Input 
                      type="number" 
                      value={invoiceAmount}
                      onChange={(e) => handleAmountChange(Number(e.target.value))}
                      className="w-full" 
                    />
                  </div>
                </div>

                {selectedRecipient && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tax Withholding
                      </label>
                      <Input 
                        type="number" 
                        value={taxWithholding}
                        readOnly
                        className="w-full bg-gray-50" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Net Payment
                      </label>
                      <Input 
                        type="number" 
                        value={invoiceAmount - taxWithholding}
                        readOnly
                        className="w-full bg-gray-50" 
                      />
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Spirit Validation */}
            <Card className="p-4 bg-purple-50">
              <div className="flex items-center space-x-2 mb-3">
                <Brain className="h-4 w-4 text-purple-600" />
                <h4 className="font-semibold text-purple-900">Spirit Validation</h4>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-purple-800">Matches contract unit price.</span>
                </div>
                
                {selectedRecipient && selectedRecipient.type === 'individual' && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-purple-800">Tax withholding calculated for 1099 individual.</span>
                  </div>
                )}
                
                {selectedTemplate && selectedTemplate.agency === 'DoTS' && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-purple-800">DoTS agency requirements validated.</span>
                  </div>
                )}
                
                {selectedTemplate && selectedTemplate.agency === 'US Army Corps of Engineers' && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-purple-800">USACE milestone requirements checked.</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-purple-800">
                    PM report is missing for final period: Office united decd of the deliverable.
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-purple-800">Billing dates validated.</span>
                </div>
                
                {selectedRecipient && (
                  <div className="mt-3 p-2 bg-white rounded border">
                    <h6 className="text-xs font-medium text-purple-900 mb-1">Recipient Compliance:</h6>
                    <div className="space-y-1 text-xs text-purple-800">
                      {selectedRecipient.certifications.sam && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>SAM registration valid</span>
                        </div>
                      )}
                      {selectedRecipient.certifications.cage && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>CAGE code verified</span>
                        </div>
                      )}
                      {selectedRecipient.certifications.taxClearance && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>Tax clearance confirmed</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Evidence Upload */}
            <Card className="p-4">
              <h4 className="font-semibold mb-3">Evidence Upload</h4>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Drag and drop evidence or click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Supports PDF, DOC, XLS, and image files
                </p>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInvoiceBuilder(false)}>
              Cancel
            </Button>
            <Button className="btn-premium">
              Submit Invoice
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const renderCalendarModal = () => {
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth()
    const currentYear = currentDate.getFullYear()
    const monthEvents = getCalendarEventsByMonth(currentYear, currentMonth)
    const upcomingEvents = getUpcomingEvents(7)

    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
      return new Date(year, month, 1).getDay()
    }

    const getEventsForDay = (day: number) => {
      return monthEvents.filter(event => {
        const eventDate = new Date(event.date)
        return eventDate.getDate() === day
      })
    }

    const getEventTypeColor = (type: string) => {
      switch (type) {
        case 'deliverable': return 'bg-blue-100 text-blue-800 border-blue-200'
        case 'invoice': return 'bg-purple-100 text-purple-800 border-purple-200'
        case 'payment': return 'bg-green-100 text-green-800 border-green-200'
        case 'compliance': return 'bg-orange-100 text-orange-800 border-orange-200'
        case 'inspection': return 'bg-red-100 text-red-800 border-red-200'
        case 'meeting': return 'bg-gray-100 text-gray-800 border-gray-200'
        default: return 'bg-gray-100 text-gray-800 border-gray-200'
      }
    }

    const getEventPriorityColor = (priority: string) => {
      switch (priority) {
        case 'critical': return 'border-l-4 border-red-500'
        case 'high': return 'border-l-4 border-orange-500'
        case 'medium': return 'border-l-4 border-yellow-500'
        case 'low': return 'border-l-4 border-green-500'
        default: return 'border-l-4 border-gray-500'
      }
    }

    return (
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Contract Calendar - {contract.title}</span>
            </DialogTitle>
            <DialogDescription>
              View and manage all contract-related events, deliverables, and deadlines.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Calendar View */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold">October 2025</h4>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {/* Day Headers */}
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 bg-gray-50">
                      {day}
                    </div>
                  ))}

                  {/* Calendar Days */}
                  {Array.from({ length: getFirstDayOfMonth(currentYear, currentMonth) }, (_, i) => (
                    <div key={`empty-${i}`} className="p-2 min-h-[80px] bg-gray-50" />
                  ))}

                  {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => {
                    const day = i + 1
                    const dayEvents = getEventsForDay(day)
                    const isToday = day === currentDate.getDate()

                    return (
                      <div 
                        key={day} 
                        className={`p-2 min-h-[80px] border ${isToday ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                      >
                        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-900'}`}>
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map(event => (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded cursor-pointer ${getEventTypeColor(event.type)} ${getEventPriorityColor(event.priority)}`}
                              onClick={() => setSelectedCalendarEvent(event)}
                            >
                              {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Plus className="h-4 w-4" />
                  <h5 className="font-medium">Quick Actions</h5>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add Event
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </Card>

              {/* Upcoming Events */}
              <Card className="p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Clock className="h-4 w-4" />
                  <h5 className="font-medium">Upcoming (7 days)</h5>
                </div>
                <div className="space-y-2">
                  {upcomingEvents.map(event => (
                    <div
                      key={event.id}
                      className={`p-2 rounded cursor-pointer ${getEventTypeColor(event.type)} ${getEventPriorityColor(event.priority)}`}
                      onClick={() => setSelectedCalendarEvent(event)}
                    >
                      <div className="text-xs font-medium">{event.title}</div>
                      <div className="text-xs opacity-75">{new Date(event.date).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Spirit AI Insights */}
              <Card className="p-4 bg-blue-50">
                <div className="flex items-center space-x-2 mb-3">
                  <Brain className="h-4 w-4 text-blue-600" />
                  <h5 className="font-medium text-blue-900">Spirit AI Insights</h5>
                </div>
                <div className="space-y-2 text-sm text-blue-800">
                  <div>• The data is up to date.</div>
                  <div>• {upcomingEvents.length} tasks are due this week.</div>
                  <div>• Download your contract calendar via 'Generate Report'.</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Event Details Modal */}
          {selectedCalendarEvent && (
            <Dialog open={!!selectedCalendarEvent} onOpenChange={() => setSelectedCalendarEvent(null)}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${getEventTypeColor(selectedCalendarEvent.type).split(' ')[0]}`} />
                    <span>{selectedCalendarEvent.title}</span>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <h6 className="font-medium mb-2">Description</h6>
                    <p className="text-sm text-gray-600">{selectedCalendarEvent.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="font-medium mb-1">Date</h6>
                      <p className="text-sm text-gray-600">{new Date(selectedCalendarEvent.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Assigned To</h6>
                      <p className="text-sm text-gray-600">{selectedCalendarEvent.assignedTo}</p>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Priority</h6>
                      <Badge variant="outline" className="text-xs">
                        {selectedCalendarEvent.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <div>
                      <h6 className="font-medium mb-1">Status</h6>
                      <Badge 
                        variant={
                          selectedCalendarEvent.status === 'completed' ? 'default' :
                          selectedCalendarEvent.status === 'in-progress' ? 'secondary' : 'outline'
                        }
                        className="text-xs"
                      >
                        {selectedCalendarEvent.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {selectedCalendarEvent.notes && (
                    <div>
                      <h6 className="font-medium mb-2">Notes</h6>
                      <p className="text-sm text-gray-600">{selectedCalendarEvent.notes}</p>
                    </div>
                  )}

                  {selectedCalendarEvent.spiritValidation.recommendations.length > 0 && (
                    <div>
                      <h6 className="font-medium mb-2">Spirit AI Recommendations</h6>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {selectedCalendarEvent.spiritValidation.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Lightbulb className="h-3 w-3 text-yellow-500" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 pt-4">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit Event
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      Add to Calendar
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalendarModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const renderSubcontractorsTab = () => {
    const stats = getSubcontractorStats()
    const filteredSubcontractors = getFilteredSubcontractors()

    return (
      <div className="space-y-6">
        {/* Spirit AI Subcontractor Intelligence */}
        <Card className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Spirit AI Subcontractor Intelligence</h3>
                <p className="text-sm text-gray-600">Real-time subcontractor performance and risk analysis</p>
              </div>
            </div>
            <Button className="btn-premium">
              <Sparkles className="h-4 w-4 mr-2" />
              Run Analysis
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Active</p>
                  <p className="text-2xl font-bold text-green-700">{stats.active}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total Value</p>
                  <p className="text-2xl font-bold text-blue-700">${(stats.totalValue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-500" />
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Avg Performance</p>
                  <p className="text-2xl font-bold text-orange-700">{stats.avgPerformance}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600 font-medium">Suspended</p>
                  <p className="text-2xl font-bold text-red-700">{stats.suspended}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
          </div>
        </Card>

        {/* Search and Filter */}
        <Card className="card-premium p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search subcontractors..."
                  value={subcontractorSearch}
                  onChange={(e) => setSubcontractorSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                value={subcontractorFilter}
                onChange={(e) => setSubcontractorFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="suspended">Suspended</option>
                <option value="terminated">Terminated</option>
                <option value="pending">Pending</option>
              </select>
              <select 
                value={subcontractorSortBy}
                onChange={(e) => setSubcontractorSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="performance">Sort by Performance</option>
                <option value="value">Sort by Value</option>
                <option value="risk">Sort by Risk</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSubcontractorView('grid')}
                className={subcontractorView === 'grid' ? 'bg-blue-50 border-blue-200' : ''}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSubcontractorView('list')}
                className={subcontractorView === 'list' ? 'bg-blue-50 border-blue-200' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="btn-ghost-premium">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button className="btn-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Subcontractor
              </Button>
            </div>
          </div>
        </Card>

        {/* Subcontractors Grid/List */}
        {subcontractorView === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSubcontractors.map((subcontractor) => (
              <Card key={subcontractor.id} className="card-premium p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subcontractor.name}</h4>
                      <p className="text-sm text-gray-600">{subcontractor.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={
                      subcontractor.status === 'active' ? 'default' :
                      subcontractor.status === 'completed' ? 'secondary' :
                      subcontractor.status === 'suspended' ? 'destructive' : 'outline'
                    } className="text-xs">
                      {subcontractor.status.toUpperCase()}
                    </Badge>
                    <Badge variant={
                      subcontractor.riskAssessment.riskLevel === 'critical' ? 'destructive' :
                      subcontractor.riskAssessment.riskLevel === 'high' ? 'default' :
                      subcontractor.riskAssessment.riskLevel === 'medium' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {subcontractor.riskAssessment.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{subcontractor.performance.overall}%</div>
                    <div className="text-sm text-gray-600">Performance</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${(subcontractor.value / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-600">Value</div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <UserCheck className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{subcontractor.contact.name}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium">{subcontractor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">Period:</span>
                    <span className="font-medium">
                      {subcontractor.periodOfPerformance.start} - {subcontractor.periodOfPerformance.end}
                    </span>
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Team Members</h5>
                  <div className="flex items-center space-x-2">
                    {subcontractor.teamMembers.slice(0, 3).map((member, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{member.name.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <Badge variant={
                          member.status === 'approved' ? 'default' :
                          member.status === 'pending' ? 'secondary' : 'destructive'
                        } className="text-xs">
                          {member.status}
                        </Badge>
                      </div>
                    ))}
                    {subcontractor.teamMembers.length > 3 && (
                      <span className="text-xs text-gray-500">+{subcontractor.teamMembers.length - 3} more</span>
                    )}
                  </div>
                </div>

                {/* Compliance Status */}
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Compliance</h5>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {subcontractor.compliance.insurance ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs">Insurance</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {subcontractor.compliance.bonding ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <X className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-xs">Bonding</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span className="text-xs">{subcontractor.compliance.certifications.length} Certs</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      setSelectedSubcontractor(subcontractor.id)
                      setShowSubcontractorDetailsModal(true)
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Contact
                  </Button>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Performance
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Automation Indicators */}
                {subcontractor.automation.autoReminders && (
                  <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                    🔔 Auto-reminders enabled • {subcontractor.automation.integrationPoints.length} integrations
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSubcontractors.map((subcontractor) => (
              <Card key={subcontractor.id} className="card-premium p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{subcontractor.name}</h4>
                      <p className="text-sm text-gray-600">{subcontractor.type} • {subcontractor.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-lg font-bold text-blue-600">{subcontractor.performance.overall}%</div>
                      <div className="text-xs text-gray-600">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-green-600">${(subcontractor.value / 1000).toFixed(0)}K</div>
                      <div className="text-xs text-gray-600">Value</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        subcontractor.status === 'active' ? 'default' :
                        subcontractor.status === 'completed' ? 'secondary' :
                        subcontractor.status === 'suspended' ? 'destructive' : 'outline'
                      } className="text-xs">
                        {subcontractor.status.toUpperCase()}
                      </Badge>
                      <Badge variant={
                        subcontractor.riskAssessment.riskLevel === 'critical' ? 'destructive' :
                        subcontractor.riskAssessment.riskLevel === 'high' ? 'default' :
                        subcontractor.riskAssessment.riskLevel === 'medium' ? 'secondary' : 'outline'
                      } className="text-xs">
                        {subcontractor.riskAssessment.riskLevel.toUpperCase()} RISK
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedSubcontractor(subcontractor.id)
                        setShowSubcontractorDetailsModal(true)
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* No Results */}
        {filteredSubcontractors.length === 0 && (
          <Card className="card-premium p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No subcontractors found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Subcontractor
            </Button>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => router.push('/contract-admin')}
              className="btn-ghost-premium"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Contracts
            </Button>
            <div>
              <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
                {contract.number}
              </h1>
              <p className="text-gray-600 text-responsive-base">
                {contract.title} • {contract.agency}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="text-sm">
              {contract.type.toUpperCase()}
            </Badge>
            <Badge variant={contract.status === 'active' ? 'default' : 'secondary'}>
              {contract.status.toUpperCase()}
            </Badge>
            <Button variant="outline" className="btn-ghost-premium">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button className="btn-premium">
              <Settings className="h-4 w-4 mr-2" />
              Contract Settings
            </Button>
          </div>
        </div>

        {/* Contract Info Banner */}
        <Card className="card-premium p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Contract Value</p>
              <p className="text-2xl font-bold text-gray-900">${(contract.value / 1000000).toFixed(1)}M</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Performance</p>
              <p className="text-2xl font-bold text-blue-600">{contract.performance.overall}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Budget Burn</p>
              <p className={`text-2xl font-bold ${
                contract.budget.burnRate > 80 ? 'text-red-600' :
                contract.budget.burnRate > 60 ? 'text-orange-600' : 'text-green-600'
              }`}>
                {contract.budget.burnRate}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Days Remaining</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.ceil((new Date(contract.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
              </p>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg overflow-x-auto">
            <TabsTrigger value="dashboard" className="text-xs flex-shrink-0">Dashboard</TabsTrigger>
            <TabsTrigger value="modifications" className="text-xs flex-shrink-0">Modifications</TabsTrigger>
            <TabsTrigger value="deliverables" className="text-xs flex-shrink-0">Deliverables</TabsTrigger>
            <TabsTrigger value="subcontractors" className="text-xs flex-shrink-0">Subcontractors</TabsTrigger>
            <TabsTrigger value="invoicing" className="text-xs flex-shrink-0">Invoicing</TabsTrigger>
            <TabsTrigger value="gfp" className="text-xs flex-shrink-0">GFP Log</TabsTrigger>
            <TabsTrigger value="closeout" className="text-xs flex-shrink-0">Closeout</TabsTrigger>
            <TabsTrigger value="cpars" className="text-xs flex-shrink-0">CPARS</TabsTrigger>
            <TabsTrigger value="vault" className="text-xs flex-shrink-0">Vault</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboardTab()}
          </TabsContent>

          <TabsContent value="modifications" className="space-y-6">
            {renderModificationsTab()}
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-6">
            {renderDeliverablesTab()}
          </TabsContent>

          <TabsContent value="subcontractors" className="space-y-6">
            {renderSubcontractorsTab()}
          </TabsContent>

          <TabsContent value="invoicing" className="space-y-6">
            {renderInvoicingTab()}
          </TabsContent>

          {/* Add other tab contents here */}
        </Tabs>

        {/* Task Management Modal */}
        {renderTaskModal()}

        {/* Calendar Modal */}
        {renderCalendarModal()}

        {/* Invoice Builder Modal */}
        {renderInvoiceBuilderModal()}
      </div>
    </div>
  )
} 