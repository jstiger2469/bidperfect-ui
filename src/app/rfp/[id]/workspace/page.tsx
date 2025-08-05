'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Target,
  DollarSign,
  Upload,
  Download,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Share,
  Lock,
  CheckCircle,
  Clock,
  AlertTriangle,
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  FileText as FileTextIcon,
  Users as UsersIcon,
  MessageSquare as MessageSquareIcon,
  Calendar as CalendarIcon,
  Target as TargetIcon,
  DollarSign as DollarSignIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  Share as ShareIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  AlertTriangle as AlertTriangleIcon,
  ArrowLeft as ArrowLeftIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface RFP {
  id: string;
  title: string;
  agency: string;
  solicitationNumber: string;
  dueDate: string;
  value: number;
  status: 'draft' | 'in_progress' | 'submitted' | 'awarded' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: string;
  location: string;
  description: string;
  requirements: string[];
  teamMembers: string[];
  documents: string[];
  notes: string;
  winProbability: number;
  lastUpdated: string;
}

interface Document {
  id: string;
  name: string;
  type: 'rfp' | 'amendment' | 'technical' | 'past_performance' | 'price' | 'other';
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  status: 'draft' | 'review' | 'approved' | 'final';
  version: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  category: 'technical' | 'past_performance' | 'price' | 'management';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  documentId?: string;
  taskId?: string;
}

interface Scenario {
  id: string;
  name: string;
  description: string;
  baseValue: number;
  adjustedValue: number;
  winProbability: number;
  adjustedWinProbability: number;
  costStructure: {
    labor: number;
    materials: number;
    overhead: number;
    profit: number;
  };
  assumptions: string[];
  createdDate: string;
  status: 'draft' | 'active' | 'archived';
}

interface Subcontractor {
  id: string;
  companyName: string;
  naicsCode: string;
  cageCode: string;
  ueiCode: string;
  primaryContact: string;
  email: string;
  proposedRole: string;
  documents: {
    w9: 'complete' | 'missing' | 'expired';
    certificateOfInsurance: 'complete' | 'missing' | 'expired';
    sebdCertification: 'complete' | 'missing' | 'expired';
    bondingLetter: 'complete' | 'missing' | 'expired';
  };
  readiness: {
    capabilityMatch: 'qualified' | 'partial' | 'unqualified';
    pastPerformance: 'complete' | 'partial' | 'missing';
    licensing: 'complete' | 'partial' | 'missing';
  };
  pricing: {
    baseWage: number;
    fringeRate: number;
    totalBurdenedRate: number;
    hours: number;
    totalAmount: number;
  };
  status: 'pending' | 'approved' | 'rejected' | 'scope_confirmed';
}

// Mock data - this would normally come from an API
const mockRFPs: RFP[] = [
  {
    id: "RFP-2024-001",
    title: "VA IT Modernization Services",
    agency: "Department of Veterans Affairs",
    solicitationNumber: "VA-IT-2024-001",
    dueDate: "2024-04-15T17:00:00",
    value: 2500000,
    status: "in_progress",
    priority: "critical",
    category: "IT Services",
    location: "Washington, DC",
    description: "Comprehensive IT modernization services for VA facilities nationwide",
    requirements: ["Cloud Migration", "Cybersecurity", "Data Analytics", "System Integration"],
    teamMembers: ["Sarah Johnson", "Michael Chen", "Jennifer Rodriguez", "David Thompson"],
    documents: ["RFP_Solicitation.pdf", "Technical_Requirements.pdf"],
    notes: "High priority project with aggressive timeline",
    winProbability: 75,
    lastUpdated: "2024-03-20"
  },
  {
    id: "RFP-2024-002",
    title: "DoD Cybersecurity Assessment",
    agency: "Department of Defense",
    solicitationNumber: "DoD-CYB-2024-002",
    dueDate: "2024-05-01T17:00:00",
    value: 1800000,
    status: "draft",
    priority: "high",
    category: "Cybersecurity",
    location: "Arlington, VA",
    description: "Cybersecurity assessment and improvement services",
    requirements: ["Security Audits", "Penetration Testing", "Compliance Review"],
    teamMembers: ["Jennifer Rodriguez", "David Thompson"],
    documents: ["RFP_Solicitation.pdf", "Security_Requirements.pdf"],
    notes: "Focus on zero-trust architecture",
    winProbability: 60,
    lastUpdated: "2024-03-18"
  },
  {
    id: "RFP-2024-003",
    title: "HHS Data Analytics Platform",
    agency: "Department of Health and Human Services",
    solicitationNumber: "HHS-DATA-2024-003",
    dueDate: "2024-05-15T17:00:00",
    value: 3200000,
    status: "draft",
    priority: "medium",
    category: "Data Analytics",
    location: "Bethesda, MD",
    description: "Advanced data analytics platform for healthcare data",
    requirements: ["Machine Learning", "Data Visualization", "API Development"],
    teamMembers: ["Sarah Johnson", "Michael Chen", "Lisa Wang"],
    documents: ["RFP_Solicitation.pdf", "Technical_Specifications.pdf"],
    notes: "Requires HIPAA compliance",
    winProbability: 70,
    lastUpdated: "2024-03-15"
  }
]

const mockDocuments: Document[] = [
  {
    id: "doc-1",
    name: "RFP_Solicitation_VA_IT_Modernization.pdf",
    type: "rfp",
    size: "2.4 MB",
    uploadedBy: "System",
    uploadedDate: "2024-03-01",
    status: "final",
    version: "1.0"
  },
  {
    id: "doc-2",
    name: "Amendment_001_Technical_Requirements.pdf",
    type: "amendment",
    size: "1.8 MB",
    uploadedBy: "System",
    uploadedDate: "2024-03-15",
    status: "final",
    version: "1.1"
  },
  {
    id: "doc-3",
    name: "Technical_Approach_Draft.docx",
    type: "technical",
    size: "856 KB",
    uploadedBy: "Sarah Johnson",
    uploadedDate: "2024-03-20",
    status: "review",
    version: "2.1"
  },
  {
    id: "doc-4",
    name: "Past_Performance_Summary.docx",
    type: "past_performance",
    size: "1.2 MB",
    uploadedBy: "Jennifer Rodriguez",
    uploadedDate: "2024-03-18",
    status: "approved",
    version: "1.0"
  },
  {
    id: "doc-5",
    name: "Price_Worksheet.xlsx",
    type: "price",
    size: "2.1 MB",
    uploadedBy: "Michael Chen",
    uploadedDate: "2024-03-22",
    status: "draft",
    version: "1.3"
  }
]

const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Complete Technical Approach Section",
    description: "Finalize the technical approach narrative for Section L",
    assignee: "Sarah Johnson",
    dueDate: "2024-04-05",
    priority: "critical",
    status: "in_progress",
    category: "technical"
  },
  {
    id: "task-2",
    title: "Review Past Performance References",
    description: "Verify and update all past performance references",
    assignee: "Jennifer Rodriguez",
    dueDate: "2024-04-03",
    priority: "high",
    status: "completed",
    category: "past_performance"
  },
  {
    id: "task-3",
    title: "Finalize Price Structure",
    description: "Complete pricing analysis and finalize cost structure",
    assignee: "Michael Chen",
    dueDate: "2024-04-08",
    priority: "critical",
    status: "pending",
    category: "price"
  },
  {
    id: "task-4",
    title: "Management Plan Development",
    description: "Develop comprehensive project management plan",
    assignee: "David Thompson",
    dueDate: "2024-04-06",
    priority: "high",
    status: "in_progress",
    category: "management"
  }
]

const mockComments: Comment[] = [
  {
    id: "comment-1",
    author: "Sarah Johnson",
    content: "Technical approach draft is ready for review. Please provide feedback on the cloud migration strategy.",
    timestamp: "2024-03-20T14:30:00",
    documentId: "doc-3"
  },
  {
    id: "comment-2",
    author: "Michael Chen",
    content: "Price worksheet updated with latest labor rates. Need to review subcontractor costs.",
    timestamp: "2024-03-22T09:15:00",
    documentId: "doc-5"
  },
  {
    id: "comment-3",
    author: "Jennifer Rodriguez",
    content: "Past performance references verified. All projects are within the 3-year window.",
    timestamp: "2024-03-18T16:45:00",
    documentId: "doc-4"
  }
]

// Subcontractor data for each RFP
const mockSubcontractors: { [rfpId: string]: Subcontractor[] } = {
  "RFP-2024-001": [
    {
      id: "sub-va-1",
      companyName: "ACME Mechanical",
      naicsCode: "236220 - Plumbing, Heating, and Air-Conditioning Contractors",
      cageCode: "7YXZ1",
      ueiCode: "GHL8JWCRWB5",
      primaryContact: "John Smith",
      email: "john.smith@acmemechanical.com",
      proposedRole: "HVAC Technician",
      documents: {
        w9: 'complete',
        certificateOfInsurance: 'complete',
        sebdCertification: 'missing',
        bondingLetter: 'expired'
      },
      readiness: {
        capabilityMatch: 'qualified',
        pastPerformance: 'partial',
        licensing: 'missing'
      },
      pricing: {
        baseWage: 30.29,
        fringeRate: 4.29,
        totalBurdenedRate: 59.30,
        hours: 80,
        totalAmount: 4744.00
      },
      status: 'pending'
    },
    {
      id: "sub-va-2",
      companyName: "Guinn Construction",
      naicsCode: "238210 - Electrical Contractors",
      cageCode: "8ABC2",
      ueiCode: "KLM9NOPQRST6",
      primaryContact: "Sarah Johnson",
      email: "sarah.johnson@guinnconstruction.com",
      proposedRole: "Electrician",
      documents: {
        w9: 'complete',
        certificateOfInsurance: 'complete',
        sebdCertification: 'complete',
        bondingLetter: 'complete'
      },
      readiness: {
        capabilityMatch: 'qualified',
        pastPerformance: 'complete',
        licensing: 'complete'
      },
      pricing: {
        baseWage: 39.52,
        fringeRate: 4.99,
        totalBurdenedRate: 44.51,
        hours: 150,
        totalAmount: 6676.50
      },
      status: 'scope_confirmed'
    }
  ],
  "RFP-2024-002": [
    {
      id: "sub-dod-1",
      companyName: "CyberTech Solutions",
      naicsCode: "541511 - Custom Computer Programming Services",
      cageCode: "9DEF3",
      ueiCode: "UVW0XYZ12345",
      primaryContact: "Mike Chen",
      email: "mike.chen@cybertechsolutions.com",
      proposedRole: "Cybersecurity Specialist",
      documents: {
        w9: 'complete',
        certificateOfInsurance: 'complete',
        sebdCertification: 'complete',
        bondingLetter: 'complete'
      },
      readiness: {
        capabilityMatch: 'qualified',
        pastPerformance: 'complete',
        licensing: 'complete'
      },
      pricing: {
        baseWage: 65.00,
        fringeRate: 8.50,
        totalBurdenedRate: 73.50,
        hours: 200,
        totalAmount: 14700.00
      },
      status: 'approved'
    }
  ]
}

// Scenario data for each RFP
const mockScenarios: { [rfpId: string]: Scenario[] } = {
  "RFP-2024-001": [
    {
      id: "scenario-va-1",
      name: "Conservative Approach",
      description: "Conservative pricing with focus on proven technologies",
      baseValue: 2500000,
      adjustedValue: 2300000,
      winProbability: 75,
      adjustedWinProbability: 85,
      costStructure: {
        labor: 1200000,
        materials: 400000,
        overhead: 300000,
        profit: 400000
      },
      assumptions: [
        "Use existing team members",
        "Standard technology stack",
        "Conservative timeline estimates"
      ],
      createdDate: "2024-04-01",
      status: "active"
    },
    {
      id: "scenario-va-2",
      name: "Aggressive Innovation",
      description: "Cutting-edge solutions with premium pricing",
      baseValue: 2500000,
      adjustedValue: 3200000,
      winProbability: 75,
      adjustedWinProbability: 60,
      costStructure: {
        labor: 1800000,
        materials: 600000,
        overhead: 400000,
        profit: 400000
      },
      assumptions: [
        "Hire specialized consultants",
        "Advanced AI/ML solutions",
        "Accelerated delivery timeline"
      ],
      createdDate: "2024-04-02",
      status: "active"
    }
  ],
  "RFP-2024-002": [
    {
      id: "scenario-dod-1",
      name: "Balanced Strategy",
      description: "Optimal balance of innovation and cost-effectiveness",
      baseValue: 1800000,
      adjustedValue: 1950000,
      winProbability: 60,
      adjustedWinProbability: 70,
      costStructure: {
        labor: 1000000,
        materials: 300000,
        overhead: 250000,
        profit: 400000
      },
      assumptions: [
        "Mixed team approach",
        "Proven security frameworks",
        "Realistic timeline"
      ],
      createdDate: "2024-04-03",
      status: "draft"
    }
  ],
  "RFP-2024-003": [
    {
      id: "scenario-hhs-1",
      name: "Premium Analytics Solution",
      description: "Advanced analytics with AI/ML capabilities",
      baseValue: 3200000,
      adjustedValue: 3800000,
      winProbability: 70,
      adjustedWinProbability: 55,
      costStructure: {
        labor: 2000000,
        materials: 800000,
        overhead: 500000,
        profit: 500000
      },
      assumptions: [
        "Advanced AI/ML specialists",
        "Custom analytics platform",
        "Extended development timeline"
      ],
      createdDate: "2024-04-04",
      status: "active"
    }
  ]
}

function DocumentCard({ document }: { document: Document }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rfp': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'amendment': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'technical': return 'text-green-600 bg-green-50 border-green-200'
      case 'past_performance': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'price': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return 'status-ready'
      case 'approved': return 'status-ready'
      case 'review': return 'status-warning'
      case 'draft': return 'status-info'
      default: return 'status-info'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <FileTextIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-1">{document.name}</h3>
              <p className="text-sm text-gray-600">{document.size} • v{document.version}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(document.status)}>
              {document.status}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge className={getTypeColor(document.type)}>
              {document.type.replace('_', ' ')}
            </Badge>
            <span className="text-sm text-gray-600">by {document.uploadedBy}</span>
          </div>
          <span className="text-sm text-gray-500">{document.uploadedDate}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-ready'
      case 'in_progress': return 'status-info'
      case 'overdue': return 'status-error'
      case 'pending': return 'status-warning'
      default: return 'status-info'
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={`
        card-premium p-4 cursor-pointer transition-all duration-300
        ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}
      `}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EditIcon className="h-4 w-4 mr-2" />
            Update
          </Button>
          <Button variant="outline" size="sm">
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function ProgressCard({ title, percentage, color }: { title: string; percentage: number; color: string }) {
  return (
    <Card className="card-premium p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-lg font-bold" style={{ color }}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </Card>
  )
}

function SpiritPanel({ message, action, actionText, type = 'info' }: { 
  message: string; 
  action?: () => void; 
  actionText?: string;
  type?: 'info' | 'warning' | 'success' | 'error';
}) {
  const getTypeStyles = () => {
    switch (type) {
      case 'warning': return 'border-orange-200 bg-orange-50'
      case 'success': return 'border-green-200 bg-green-50'
      case 'error': return 'border-red-200 bg-red-50'
      default: return 'border-blue-200 bg-blue-50'
    }
  }

  return (
    <Card className={`card-premium p-4 ${getTypeStyles()}`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">Λ</span>
          </div>
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <span className="font-semibold text-gray-900">Spirit</span>
            <span className="text-xs text-gray-500">AI Assistant</span>
          </div>
          <p className="text-sm text-gray-700 mb-3">{message}</p>
          {action && actionText && (
            <Button 
              onClick={action} 
              size="sm" 
              className="btn-premium"
            >
              {actionText}
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}

function SubcontractorCard({ subcontractor }: { subcontractor: Subcontractor }) {
  const getDocumentStatus = (status: string) => {
    switch (status) {
      case 'complete': return { icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />, text: 'Complete' }
      case 'missing': return { icon: <AlertTriangleIcon className="h-4 w-4 text-red-600" />, text: 'Missing' }
      case 'expired': return { icon: <ClockIcon className="h-4 w-4 text-orange-600" />, text: 'Expired' }
      default: return { icon: <AlertTriangleIcon className="h-4 w-4 text-red-600" />, text: 'Missing' }
    }
  }

  const getReadinessStatus = (status: string) => {
    switch (status) {
      case 'qualified': return { icon: <CheckCircleIcon className="h-4 w-4 text-green-600" />, text: 'Qualified', color: 'text-green-600' }
      case 'partial': return { icon: <AlertTriangleIcon className="h-4 w-4 text-orange-600" />, text: 'Partial', color: 'text-orange-600' }
      case 'missing': return { icon: <AlertTriangleIcon className="h-4 w-4 text-red-600" />, text: 'Missing', color: 'text-red-600' }
      default: return { icon: <AlertTriangleIcon className="h-4 w-4 text-red-600" />, text: 'Missing', color: 'text-red-600' }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'status-ready'
      case 'scope_confirmed': return 'status-info'
      case 'pending': return 'status-warning'
      case 'rejected': return 'status-error'
      default: return 'status-info'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{subcontractor.companyName}</h3>
            <p className="text-sm text-gray-600">{subcontractor.proposedRole}</p>
            <p className="text-xs text-gray-500">{subcontractor.naicsCode}</p>
          </div>
          <Badge className={getStatusColor(subcontractor.status)}>
            {subcontractor.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Documents</p>
            <div className="space-y-1">
              {Object.entries(subcontractor.documents).map(([doc, status]) => {
                const statusInfo = getDocumentStatus(status)
                return (
                  <div key={doc} className="flex items-center space-x-2">
                    {statusInfo.icon}
                    <span className="text-xs text-gray-600 capitalize">{doc.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Readiness</p>
            <div className="space-y-1">
              {Object.entries(subcontractor.readiness).map(([item, status]) => {
                const statusInfo = getReadinessStatus(status)
                return (
                  <div key={item} className="flex items-center space-x-2">
                    {statusInfo.icon}
                    <span className={`text-xs capitalize ${statusInfo.color}`}>
                      {item.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-3 bg-gray-50 rounded-lg mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Pricing</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <span className="text-gray-600">Base Wage:</span>
              <p className="font-medium">${subcontractor.pricing.baseWage}/hr</p>
            </div>
            <div>
              <span className="text-gray-600">Fringe:</span>
              <p className="font-medium">${subcontractor.pricing.fringeRate}/hr</p>
            </div>
            <div>
              <span className="text-gray-600">Total:</span>
              <p className="font-medium">${subcontractor.pricing.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            Review
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function ScenarioCard({ scenario }: { scenario: Scenario }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-ready'
      case 'draft': return 'status-warning'
      case 'archived': return 'status-info'
      default: return 'status-info'
    }
  }

  const valueChange = scenario.adjustedValue - scenario.baseValue
  const probabilityChange = scenario.adjustedWinProbability - scenario.winProbability

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{scenario.name}</h3>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </div>
          <Badge className={getStatusColor(scenario.status)}>
            {scenario.status}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Value</span>
              <div className="flex items-center space-x-1">
                {valueChange > 0 ? (
                  <TrendingUpIcon className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${valueChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {valueChange > 0 ? '+' : ''}${(valueChange / 1000000).toFixed(1)}M
                </span>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              ${(scenario.adjustedValue / 1000000).toFixed(1)}M
            </p>
          </div>
          
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Win Probability</span>
              <div className="flex items-center space-x-1">
                {probabilityChange > 0 ? (
                  <TrendingUpIcon className="h-3 w-3 text-green-600" />
                ) : (
                  <TrendingDownIcon className="h-3 w-3 text-red-600" />
                )}
                <span className={`text-xs ${probabilityChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {probabilityChange > 0 ? '+' : ''}{probabilityChange}%
                </span>
              </div>
            </div>
            <p className="text-lg font-semibold text-gray-900">
              {scenario.adjustedWinProbability}%
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">Assumptions:</p>
          <div className="flex flex-wrap gap-1">
            {scenario.assumptions.map((assumption, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {assumption}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View Details
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function RFPWorkspacePage() {
  const params = useParams()
  const rfpId = params.id as string
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [rfp, setRfp] = useState<RFP | null>(null)

  useEffect(() => {
    // Find the RFP by ID
    const foundRfp = mockRFPs.find(r => r.id === rfpId)
    setRfp(foundRfp || null)
  }, [rfpId])

  if (!rfp) {
    return (
      <div className="gradient-bg-primary min-h-screen">
        <div className="container-responsive py-6">
          <Card className="card-premium p-12 text-center">
            <AlertTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">RFP Not Found</h2>
            <p className="text-gray-600 mb-4">
              The RFP you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  const filteredTasks = mockTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDocuments = mockDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const daysUntilDue = Math.ceil((new Date(rfp.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  const progress = {
    technical: 75,
    pastPerformance: 100,
    price: 60,
    overall: 78
  }

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="mb-4"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to RFPs
            </Button>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              {rfp.title}
            </h1>
            <p className="text-gray-600 text-responsive-base">
              {rfp.agency} • Due in {daysUntilDue} days • {rfp.solicitationNumber}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="btn-premium">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contract Value</p>
                <p className="text-2xl font-bold text-gray-900">${(rfp.value / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Members</p>
                <p className="text-2xl font-bold text-blue-600">{rfp.teamMembers.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Documents</p>
                <p className="text-2xl font-bold text-purple-600">{mockDocuments.length}</p>
              </div>
              <FileTextIcon className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Win Probability</p>
                <p className="text-2xl font-bold text-orange-600">{rfp.winProbability}%</p>
              </div>
              <TargetIcon className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ProgressCard title="Technical" percentage={progress.technical} color="#3B82F6" />
          <ProgressCard title="Past Performance" percentage={progress.pastPerformance} color="#10B981" />
          <ProgressCard title="Price" percentage={progress.price} color="#EF4444" />
          <ProgressCard title="Overall" percentage={progress.overall} color="#F59E0B" />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="scenarios" className="flex-1">Scenarios</TabsTrigger>
            <TabsTrigger value="subcontractors" className="flex-1">Subcontractors</TabsTrigger>
            <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
            <TabsTrigger value="comments" className="flex-1">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Spirit AI Assistant */}
            <SpiritPanel 
              message="I've analyzed your RFP submission and identified 3 critical items that need attention: Missing Past Performance narrative, incorrect font style in executive summary, and proposal refers to 'attached appendix' but no attachment found. Would you like me to help fix these issues?"
              action={() => console.log('Fix issues')}
              actionText="Fix Issues"
              type="warning"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* RFP Details */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">RFP Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Description</p>
                    <p className="text-gray-900">{rfp.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Category</p>
                      <p className="font-semibold text-gray-900">{rfp.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Location</p>
                      <p className="font-semibold text-gray-900">{rfp.location}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Requirements</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {rfp.requirements.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {mockComments.slice(0, 5).map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Compliance Check */}
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Spirit Check Compliance Engine</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Submission Requirements</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Technical Proposal</p>
                        <p className="text-xs text-gray-600">Description of how work will be performed</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">View PDF</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Past Performance</p>
                        <p className="text-xs text-gray-600">Details of similar projects</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangleIcon className="h-4 w-4 text-red-600" />
                        <span className="text-sm text-red-600">Missing</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Pricing Sheet</p>
                        <p className="text-xs text-gray-600">Completed cost table</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Attached</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Automated Checks</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Page Limits</p>
                        <p className="text-xs text-gray-600">Proposal must not exceed 20 pages</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">Pass</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Formatting</p>
                        <p className="text-xs text-gray-600">Times New Roman, 12pt, 1" margins</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
                        <span className="text-sm text-orange-600">Detected Arial font</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">Sections</p>
                        <p className="text-xs text-gray-600">Technical, Cost, Past Performance</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-600">All sections identified</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-premium p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-premium p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Scenario Modeling</h2>
                <p className="text-gray-600">Analyze different pricing strategies and win probability scenarios</p>
              </div>
              <Button className="btn-premium">
                <PlusIcon className="h-4 w-4 mr-2" />
                New Scenario
              </Button>
            </div>

            {/* Scenarios Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockScenarios[rfpId]?.map((scenario) => (
                <ScenarioCard key={scenario.id} scenario={scenario} />
              ))}
            </div>

            {(!mockScenarios[rfpId] || mockScenarios[rfpId].length === 0) && (
              <Card className="card-premium p-12 text-center">
                <TargetIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No scenarios created yet</h3>
                <p className="text-gray-600 mb-4">
                  Create your first scenario to analyze different pricing strategies and win probabilities.
                </p>
                <Button className="btn-premium">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Create Scenario
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="subcontractors" className="space-y-6">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Subcontractor Management</h2>
                <p className="text-gray-600">Manage subcontractors, review readiness, and track compliance</p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="btn-ghost-premium">
                  <FilterIcon className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button className="btn-premium">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Subcontractor
                </Button>
              </div>
            </div>

            {/* Spirit AI Assistant */}
            <SpiritPanel 
              message="I've analyzed your subcontractor submissions and identified 2 companies that need attention. ACME Mechanical is missing SEBD certification and has an expired bonding letter. Would you like me to send gap alerts?"
              action={() => console.log('Send gap alerts')}
              actionText="Send Gap Alerts"
              type="warning"
            />

            {/* Subcontractors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockSubcontractors[rfpId]?.map((subcontractor) => (
                <SubcontractorCard key={subcontractor.id} subcontractor={subcontractor} />
              ))}
            </div>

            {(!mockSubcontractors[rfpId] || mockSubcontractors[rfpId].length === 0) && (
              <Card className="card-premium p-12 text-center">
                <UsersIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No subcontractors added yet</h3>
                <p className="text-gray-600 mb-4">
                  Add subcontractors to your RFP team and track their readiness and compliance.
                </p>
                <Button className="btn-premium">
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Add Subcontractor
                </Button>
              </Card>
            )}

            {/* Invoice Builder Section */}
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Builder</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Selected Subcontractors</h4>
                  <div className="space-y-2">
                    {mockSubcontractors[rfpId]?.filter(sub => sub.status === 'approved' || sub.status === 'scope_confirmed').map(sub => (
                      <div key={sub.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">{sub.companyName}</p>
                          <p className="text-xs text-gray-600">{sub.proposedRole}</p>
                        </div>
                        <span className="text-sm font-medium">${sub.pricing.totalAmount.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Invoice Summary</h4>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="space-y-2">
                      {mockSubcontractors[rfpId]?.filter(sub => sub.status === 'approved' || sub.status === 'scope_confirmed').map(sub => (
                        <div key={sub.id} className="flex justify-between text-sm">
                          <span>{sub.proposedRole}</span>
                          <span>${sub.pricing.totalAmount.toLocaleString()}</span>
                        </div>
                      ))}
                      <hr className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total</span>
                        <span>${mockSubcontractors[rfpId]?.filter(sub => sub.status === 'approved' || sub.status === 'scope_confirmed').reduce((sum, sub) => sum + sub.pricing.totalAmount, 0).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <SpiritPanel 
                    message="Your base wage is $30.29/hour, fringe is $4.29/hour, and Paid Holiday fringe rates at $2.50/hour. Shall I auto-fill your total burdened rate?"
                    action={() => console.log('Auto-fill rates')}
                    actionText="Auto-fill Rates"
                    type="info"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
              <div className="space-y-3">
                {rfp.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">
                          {member.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">{member}</span>
                    </div>
                    <Badge className="status-ready">Active</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments & Discussions</h3>
              <div className="space-y-4">
                {mockComments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 