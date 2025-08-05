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
  ListTodo,
  X
} from 'lucide-react'
import { motion } from 'framer-motion'

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

interface ContractModification {
  id: string
  contractId: string
  modificationNumber: string
  type: 'bilateral' | 'unilateral' | 'administrative' | 'substantive'
  description: string
  effectiveDate: string
  value: number
  status: 'pending' | 'approved' | 'rejected'
  impact: {
    scope: boolean
    pricing: boolean
    schedule: boolean
  }
  documents: string[]
}

interface DeliverableTask {
  id: string
  deliverableId: string
  title: string
  description: string
  status: 'unassigned' | 'assigned' | 'in-progress' | 'completed' | 'overdue' | 'blocked'
  priority: 'low' | 'medium' | 'high' | 'critical'
  assignee?: {
    id: string
    name: string
    email: string
    role: string
    avatar: string
  }
  assignedDate?: string
  dueDate: string
  estimatedHours: number
  actualHours?: number
  progress: number
  dependencies: string[]
  tags: string[]
  location?: string
  calendarEvent?: {
    id: string
    title: string
    startTime: string
    endTime: string
    calendar: 'outlook' | 'google' | 'teams' | 'internal'
  }
  attachments: {
    name: string
    type: string
    size: string
    uploadedBy: string
    uploadedDate: string
  }[]
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
    type: 'internal' | 'external' | 'assignee'
  }[]
  timeTracking: {
    startTime?: string
    endTime?: string
    breaks: number
    totalTime: number
  }
  qualityChecklist: {
    item: string
    completed: boolean
    completedBy?: string
    completedDate?: string
  }[]
  automation: {
    autoAssign: boolean
    autoRemind: boolean
    autoEscalate: boolean
    calendarSync: boolean
  }
}

interface Deliverable {
  id: string
  contractId: string
  title: string
  description: string
  type: 'report' | 'milestone' | 'inspection' | 'review' | 'training' | 'compliance' | 'financial'
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue' | 'approved' | 'rejected'
  assignedTo: string
  documents: string[]
  notes: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  dependencies: string[]
  stakeholders: string[]
  qualityScore?: number
  costVariance?: number
  scheduleVariance?: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
  lastUpdated: string
  nextReviewDate?: string
  approvalRequired: boolean
  approvedBy?: string
  approvedDate?: string
  rejectionReason?: string
  resubmissionDate?: string
  tasks: DeliverableTask[]
  completionGuidance: {
    isComplete: boolean
    completionDate?: string
    nextSteps: string[]
    recommendations: string[]
    lessonsLearned: string[]
    followUpActions: string[]
    successMetrics: {
      onTime: boolean
      onBudget: boolean
      qualityMet: boolean
      stakeholderSatisfied: boolean
    }
  }
  attachments: {
    name: string
    type: string
    size: string
    uploadedBy: string
    uploadedDate: string
    version: string
  }[]
  comments: {
    id: string
    author: string
    content: string
    timestamp: string
    type: 'internal' | 'external' | 'cor' | 'stakeholder'
  }[]
  metrics: {
    onTimeDelivery: boolean
    qualityCompliance: boolean
    costPerformance: boolean
    stakeholderSatisfaction: number
  }
  automation: {
    autoReminders: boolean
    autoEscalation: boolean
    autoApproval: boolean
    integrationPoints: string[]
  }
}

interface DeliverableAssignment {
  id: string
  deliverableId: string
  assigneeId: string
  assigneeName: string
  assigneeEmail: string
  assigneeRole: string
  assignedDate: string
  dueDate: string
  status: 'assigned' | 'in-progress' | 'completed' | 'overdue'
  progress: number
  notes: string
  skills: string[]
  availability: 'available' | 'partially' | 'unavailable'
  workload: number
  performance: {
    onTimeDelivery: number
    qualityScore: number
    stakeholderSatisfaction: number
  }
}

interface DeliverableTemplate {
  id: string
  name: string
  description: string
  type: string
  category: string
  defaultDuration: number
  requiredDocuments: string[]
  approvalWorkflow: string[]
  qualityCriteria: string[]
  complianceRequirements: string[]
  riskFactors: string[]
  automationRules: {
    autoAssign: boolean
    autoRemind: boolean
    autoEscalate: boolean
    integrationTriggers: string[]
  }
}

interface Subcontractor {
  id: string
  contractId: string
  name: string
  tasks: string[]
  periodOfPerformance: {
    start: string
    end: string
  }
  value: number
  status: 'active' | 'completed' | 'terminated'
  performance: {
    quality: number
    schedule: number
    cost: number
  }
  compliance: {
    flowDownClauses: boolean
    wageDeterminations: boolean
    cybersecurity: boolean
  }
}

interface Invoice {
  id: string
  contractId: string
  invoiceNumber: string
  period: string
  amount: number
  status: 'submitted' | 'in-review' | 'paid' | 'rejected'
  submittedDate: string
  paidDate?: string
  daysOutstanding: number
  notes: string
}

interface GovernmentFurnishedProperty {
  id: string
  contractId: string
  item: string
  serialNumber: string
  description: string
  receivedDate: string
  returnDate?: string
  status: 'in-use' | 'returned' | 'transferred'
  location: string
  condition: 'excellent' | 'good' | 'fair' | 'poor'
}

interface CPARSReport {
  id: string
  contractId: string
  evaluationPeriod: string
  dueDate: string
  status: 'pending' | 'submitted' | 'completed'
  ratings: {
    quality: number
    schedule: number
    cost: number
    management: number
    overall: number
  }
  comments: string
}

export default function ContractWorkspacePage() {
  const params = useParams()
  const router = useRouter()
  const contractId = params.contractId as string
  const [activeTab, setActiveTab] = useState('dashboard')
  const [deliverableFilter, setDeliverableFilter] = useState('all')
  const [deliverableSearch, setDeliverableSearch] = useState('')
  const [selectedDeliverable, setSelectedDeliverable] = useState<string | null>(null)
  const [showDeliverableModal, setShowDeliverableModal] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<string | null>(null)
  const [taskFilter, setTaskFilter] = useState('all')
  const [showCalendarIntegration, setShowCalendarIntegration] = useState(false)
  const [deliverableTemplates] = useState<DeliverableTemplate[]>([
    {
      id: 't-001',
      name: 'Monthly Performance Report',
      description: 'Standard monthly performance reporting template',
      type: 'report',
      category: 'Performance',
      defaultDuration: 30,
      requiredDocuments: ['Performance Metrics', 'Quality Data', 'Schedule Variance'],
      approvalWorkflow: ['Team Lead', 'COR', 'Contracting Officer'],
      qualityCriteria: ['On-time delivery', 'Complete data', 'Stakeholder approval'],
      complianceRequirements: ['FAR 52.242-15', 'Quality Assurance'],
      riskFactors: ['Data accuracy', 'Stakeholder availability', 'System integration'],
      automationRules: {
        autoAssign: true,
        autoRemind: true,
        autoEscalate: true,
        integrationTriggers: ['ERP', 'Quality System', 'Project Management']
      }
    },
    {
      id: 't-002',
      name: 'Quality Control Implementation',
      description: 'Quality control plan implementation milestone',
      type: 'milestone',
      category: 'Quality',
      defaultDuration: 45,
      requiredDocuments: ['QC Plan', 'Implementation Checklist', 'Training Materials'],
      approvalWorkflow: ['Quality Manager', 'COR', 'Safety Officer'],
      qualityCriteria: ['Plan approval', 'Implementation complete', 'Training completed'],
      complianceRequirements: ['ISO 9001', 'Safety Standards'],
      riskFactors: ['Resource availability', 'Training completion', 'Stakeholder buy-in'],
      automationRules: {
        autoAssign: false,
        autoRemind: true,
        autoEscalate: true,
        integrationTriggers: ['Quality System', 'Training Platform']
      }
    }
  ])
  const [spiritAnalysis, setSpiritAnalysis] = useState({
    isProcessing: false,
    progress: 0,
    insights: [] as string[],
    recommendations: [] as string[],
    warnings: [] as string[]
  })

  // Mock Data - This would come from your Zustand store or API
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

  const [modifications] = useState<ContractModification[]>([
    {
      id: 'm-001',
      contractId: 'c-001',
      modificationNumber: 'P00001',
      type: 'bilateral',
      description: 'Additional HVAC units for Building 3',
      effectiveDate: '2025-03-15',
      value: 150000,
      status: 'approved',
      impact: { scope: true, pricing: true, schedule: false },
      documents: ['SF30-P00001.pdf', 'Scope-Change-Request.pdf']
    }
  ])

  // Helper function to create complete deliverable objects
  const createDeliverable = (base: any): Deliverable => ({
    ...base,
    priority: base.priority || 'medium',
    progress: base.progress || 0,
    dependencies: base.dependencies || [],
    stakeholders: base.stakeholders || ['COR'],
    qualityScore: base.qualityScore || undefined,
    costVariance: base.costVariance || 0,
    scheduleVariance: base.scheduleVariance || 0,
    riskLevel: base.riskLevel || 'medium',
    lastUpdated: base.lastUpdated || new Date().toISOString(),
    nextReviewDate: base.nextReviewDate || undefined,
    approvalRequired: base.approvalRequired || false,
    approvedBy: base.approvedBy || undefined,
    approvedDate: base.approvedDate || undefined,
    rejectionReason: base.rejectionReason || undefined,
    resubmissionDate: base.resubmissionDate || undefined,
    tasks: base.tasks || [],
    completionGuidance: base.completionGuidance || {
      isComplete: false,
      nextSteps: [],
      recommendations: [],
      lessonsLearned: [],
      followUpActions: [],
      successMetrics: {
        onTime: true,
        onBudget: true,
        qualityMet: true,
        stakeholderSatisfied: true
      }
    },
    attachments: base.attachments || [],
    comments: base.comments || [],
    metrics: base.metrics || {
      onTimeDelivery: true,
      qualityCompliance: true,
      costPerformance: true,
      stakeholderSatisfaction: 4.0
    },
    automation: base.automation || {
      autoReminders: true,
      autoEscalation: false,
      autoApproval: false,
      integrationPoints: []
    }
  })

  const [deliverables] = useState<Deliverable[]>([
    createDeliverable({
      id: 'd-001',
      contractId: 'c-001',
      title: 'Monthly Performance Report',
      description: 'Comprehensive monthly status report covering quality metrics, schedule adherence, cost performance, and subcontractor performance metrics',
      type: 'report',
      dueDate: '2025-08-31',
      status: 'pending',
      assignedTo: 'Mike Davis',
      documents: ['Monthly_Report_Template.docx', 'Performance_Metrics_Guide.pdf'],
      notes: 'Include subcontractor performance metrics, quality control data, and schedule variance analysis',
      priority: 'high',
      progress: 65,
      dependencies: ['d-006'],
      stakeholders: ['COR', 'Contracting Officer', 'Quality Manager'],
      qualityScore: 85,
      costVariance: -2.5,
      scheduleVariance: 0,
      riskLevel: 'medium',
      lastUpdated: '2025-08-28',
      nextReviewDate: '2025-09-05',
      approvalRequired: true,
      attachments: [
        {
          name: 'Monthly_Report_Template.docx',
          type: 'document',
          size: '2.3 MB',
          uploadedBy: 'Mike Davis',
          uploadedDate: '2025-08-25',
          version: '2.1'
        }
      ],
      comments: [
        {
          id: 'c-001',
          author: 'Sarah Johnson',
          content: 'Please include subcontractor performance metrics in section 3.2',
          timestamp: '2025-08-27T10:30:00Z',
          type: 'cor'
        }
      ],
      metrics: {
        onTimeDelivery: true,
        qualityCompliance: true,
        costPerformance: true,
        stakeholderSatisfaction: 4.2
      },
      automation: {
        autoReminders: true,
        autoEscalation: true,
        autoApproval: false,
        integrationPoints: ['ERP', 'Quality Management System']
      },
      tasks: [
        {
          id: 't-001-001',
          deliverableId: 'd-001',
          title: 'Gather Performance Metrics',
          description: 'Collect quality metrics, schedule adherence data, and cost performance indicators',
          status: 'completed',
          priority: 'high',
          assignee: {
            id: 'user-001',
            name: 'Mike Davis',
            email: 'mike.davis@company.com',
            role: 'Project Manager',
            avatar: '/avatars/mike-davis.jpg'
          },
          assignedDate: '2025-08-25',
          dueDate: '2025-08-28',
          estimatedHours: 4,
          actualHours: 3.5,
          progress: 100,
          dependencies: [],
          tags: ['data-collection', 'metrics'],
          location: 'Office',
          calendarEvent: {
            id: 'cal-001',
            title: 'Gather Performance Metrics - Monthly Report',
            startTime: '2025-08-28T09:00:00Z',
            endTime: '2025-08-28T13:00:00Z',
            calendar: 'outlook'
          },
          attachments: [
            {
              name: 'Performance_Data.xlsx',
              type: 'spreadsheet',
              size: '1.2 MB',
              uploadedBy: 'Mike Davis',
              uploadedDate: '2025-08-28'
            }
          ],
          comments: [
            {
              id: 'c-t-001',
              author: 'Sarah Johnson',
              content: 'Quality metrics look good, please include subcontractor performance data',
              timestamp: '2025-08-28T10:30:00Z',
              type: 'cor'
            }
          ],
          timeTracking: {
            startTime: '2025-08-28T09:00:00Z',
            endTime: '2025-08-28T12:30:00Z',
            breaks: 0.5,
            totalTime: 3.5
          },
          qualityChecklist: [
            { item: 'Data accuracy verified', completed: true, completedBy: 'Mike Davis', completedDate: '2025-08-28' },
            { item: 'Metrics validated', completed: true, completedBy: 'Mike Davis', completedDate: '2025-08-28' },
            { item: 'Stakeholder review complete', completed: true, completedBy: 'Sarah Johnson', completedDate: '2025-08-28' }
          ],
          automation: {
            autoAssign: true,
            autoRemind: true,
            autoEscalate: false,
            calendarSync: true
          }
        },
        {
          id: 't-001-002',
          deliverableId: 'd-001',
          title: 'Draft Report Content',
          description: 'Write comprehensive report content including analysis and recommendations',
          status: 'in-progress',
          priority: 'high',
          assignee: {
            id: 'user-001',
            name: 'Mike Davis',
            email: 'mike.davis@company.com',
            role: 'Project Manager',
            avatar: '/avatars/mike-davis.jpg'
          },
          assignedDate: '2025-08-28',
          dueDate: '2025-08-30',
          estimatedHours: 6,
          actualHours: 2,
          progress: 65,
          dependencies: ['t-001-001'],
          tags: ['writing', 'analysis'],
          location: 'Office',
          attachments: [],
          comments: [],
          timeTracking: {
            startTime: '2025-08-29T09:00:00Z',
            breaks: 0.5,
            totalTime: 2
          },
          qualityChecklist: [
            { item: 'Executive summary written', completed: true, completedBy: 'Mike Davis', completedDate: '2025-08-29' },
            { item: 'Performance analysis complete', completed: false },
            { item: 'Recommendations drafted', completed: false },
            { item: 'Stakeholder review scheduled', completed: false }
          ],
          automation: {
            autoAssign: true,
            autoRemind: true,
            autoEscalate: true,
            calendarSync: true
          }
        },
        {
          id: 't-001-003',
          deliverableId: 'd-001',
          title: 'Final Review and Submission',
          description: 'Final review with stakeholders and submission to COR',
          status: 'unassigned',
          priority: 'critical',
          dueDate: '2025-08-31',
          estimatedHours: 2,
          progress: 0,
          dependencies: ['t-001-002'],
          tags: ['review', 'submission'],
          location: 'Office',
          attachments: [],
          comments: [],
          timeTracking: {
            breaks: 0,
            totalTime: 0
          },
          qualityChecklist: [
            { item: 'Content review complete', completed: false },
            { item: 'Stakeholder approval received', completed: false },
            { item: 'Document formatting final', completed: false },
            { item: 'Submission to COR', completed: false }
          ],
          automation: {
            autoAssign: false,
            autoRemind: true,
            autoEscalate: true,
            calendarSync: true
          }
        }
      ],
      completionGuidance: {
        isComplete: false,
        nextSteps: [
          'Complete report drafting (Task 2)',
          'Schedule stakeholder review meeting',
          'Prepare final submission package',
          'Submit to COR for approval'
        ],
        recommendations: [
          'Include visual charts for better data presentation',
          'Add subcontractor performance comparison',
          'Highlight cost savings achieved',
          'Recommend process improvements'
        ],
        lessonsLearned: [],
        followUpActions: [
          'Schedule next month\'s data collection',
          'Update performance tracking templates',
          'Review and update metrics as needed'
        ],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: false,
          stakeholderSatisfied: false
        }
      }
    }),
    createDeliverable({
      id: 'd-002',
      contractId: 'c-001',
      title: 'Quality Control Plan Implementation',
      description: 'Implementation and documentation of quality control procedures for HVAC maintenance services',
      type: 'milestone',
      dueDate: '2025-09-15',
      status: 'in-progress',
      assignedTo: 'Sarah Johnson',
      documents: ['QC_Plan_v2.1.pdf', 'Implementation_Checklist.xlsx', 'Training_Materials.zip'],
      notes: 'Requires COR approval before proceeding to next phase',
      priority: 'critical',
      progress: 75,
      dependencies: ['d-001'],
      stakeholders: ['COR', 'Quality Manager', 'Safety Officer'],
      qualityScore: 92,
      riskLevel: 'high',
      approvalRequired: true,
      tasks: [
        {
          id: 't-002-001',
          deliverableId: 'd-002',
          title: 'Review QC Plan',
          description: 'Review and approve quality control plan documentation',
          status: 'completed',
          priority: 'high',
          assignee: {
            id: 'user-002',
            name: 'Sarah Johnson',
            email: 'sarah.johnson@company.com',
            role: 'Quality Manager',
            avatar: '/avatars/sarah-johnson.jpg'
          },
          assignedDate: '2025-08-20',
          dueDate: '2025-08-25',
          estimatedHours: 3,
          actualHours: 2.5,
          progress: 100,
          dependencies: [],
          tags: ['review', 'quality'],
          location: 'Office',
          attachments: [],
          comments: [],
          timeTracking: {
            startTime: '2025-08-25T09:00:00Z',
            endTime: '2025-08-25T11:30:00Z',
            breaks: 0.5,
            totalTime: 2.5
          },
          qualityChecklist: [
            { item: 'Plan completeness verified', completed: true, completedBy: 'Sarah Johnson', completedDate: '2025-08-25' }
          ],
          automation: {
            autoAssign: true,
            autoRemind: true,
            autoEscalate: false,
            calendarSync: true
          }
        }
      ],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Complete implementation', 'Schedule COR inspection'],
        recommendations: ['Include visual aids', 'Create reference guides'],
        lessonsLearned: [],
        followUpActions: ['Schedule quarterly reviews'],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: false,
          stakeholderSatisfied: false
        }
      }
    }),
    createDeliverable({
      id: 'd-003',
      contractId: 'c-001',
      title: 'Safety Inspection Report',
      description: 'Quarterly safety inspection and compliance report for all maintenance activities',
      type: 'inspection',
      dueDate: '2025-09-30',
      status: 'pending',
      assignedTo: 'Robert Wilson',
      documents: ['Safety_Protocols.pdf', 'Inspection_Checklist.docx'],
      notes: 'Coordinate with base safety officer for joint inspection',
      priority: 'high',
      progress: 0,
      stakeholders: ['Safety Officer', 'COR', 'Base Safety Officer'],
      riskLevel: 'medium',
      approvalRequired: true,
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Schedule inspection', 'Prepare checklist'],
        recommendations: ['Coordinate with base safety'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-004',
      contractId: 'c-001',
      title: 'Subcontractor Performance Review',
      description: 'Quarterly review of subcontractor performance, compliance, and deliverables',
      type: 'review',
      dueDate: '2025-10-15',
      status: 'pending',
      assignedTo: 'Lisa Davis',
      documents: ['Subcontractor_Evaluation_Form.docx', 'Performance_Criteria.pdf'],
      notes: 'Include past performance data and recommendations for contract modifications',
      priority: 'medium',
      progress: 0,
      dependencies: ['d-001'],
      stakeholders: ['COR', 'Subcontractor Manager'],
      riskLevel: 'low',
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Collect performance data', 'Schedule review meetings'],
        recommendations: ['Include past performance metrics'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-005',
      contractId: 'c-001',
      title: 'Annual Contract Review',
      description: 'Comprehensive annual review of contract performance, financial status, and strategic planning',
      type: 'review',
      dueDate: '2025-12-31',
      status: 'pending',
      assignedTo: 'John Smith',
      documents: ['Annual_Review_Template.docx', 'Financial_Summary.xlsx', 'Strategic_Plan_2026.pdf'],
      notes: 'Major deliverable requiring COR and Contracting Officer participation',
      priority: 'critical',
      progress: 0,
      dependencies: ['d-001', 'd-002', 'd-004'],
      stakeholders: ['COR', 'Contracting Officer', 'Program Manager'],
      riskLevel: 'high',
      approvalRequired: true,
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Prepare financial summary', 'Schedule stakeholder meetings'],
        recommendations: ['Include strategic planning'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-006',
      contractId: 'c-001',
      title: 'Equipment Maintenance Log',
      description: 'Detailed maintenance logs for all HVAC equipment including preventive and corrective maintenance',
      type: 'report',
      dueDate: '2025-08-15',
      status: 'completed',
      assignedTo: 'Mike Davis',
      documents: ['Maintenance_Log_July_2025.xlsx', 'Equipment_Inventory.pdf', 'Maintenance_Schedule.pdf'],
      notes: 'Completed on time with 100% compliance rate',
      priority: 'medium',
      progress: 100,
      stakeholders: ['COR', 'Maintenance Manager'],
      qualityScore: 95,
      approvedBy: 'Sarah Johnson',
      approvedDate: '2025-08-15',
      metrics: {
        onTimeDelivery: true,
        qualityCompliance: true,
        costPerformance: true,
        stakeholderSatisfaction: 4.8
      },
      tasks: [],
      completionGuidance: {
        isComplete: true,
        completionDate: '2025-08-15',
        nextSteps: ['Continue monthly logging', 'Update inventory as needed'],
        recommendations: ['Maintain current process'],
        lessonsLearned: ['Process working well'],
        followUpActions: ['Schedule next month\'s maintenance'],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-007',
      contractId: 'c-001',
      title: 'Environmental Compliance Report',
      description: 'Quarterly environmental compliance report for refrigerant handling and disposal',
      type: 'report',
      dueDate: '2025-10-31',
      status: 'pending',
      assignedTo: 'Jennifer Garcia',
      documents: ['Environmental_Compliance_Guide.pdf', 'Refrigerant_Handling_Procedures.docx'],
      notes: 'Requires EPA compliance verification and base environmental officer review',
      priority: 'high',
      progress: 0,
      stakeholders: ['Environmental Officer', 'COR', 'EPA Representative'],
      riskLevel: 'high',
      approvalRequired: true,
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Verify EPA compliance', 'Schedule environmental review'],
        recommendations: ['Coordinate with EPA'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-008',
      contractId: 'c-001',
      title: 'Training Program Completion',
      description: 'Completion of required training programs for all personnel on new equipment and procedures',
      type: 'milestone',
      dueDate: '2025-09-30',
      status: 'in-progress',
      assignedTo: 'Amanda Taylor',
      documents: ['Training_Curriculum.pdf', 'Certification_Records.xlsx', 'Training_Schedule.pdf'],
      notes: '85% complete - remaining personnel scheduled for next week',
      priority: 'medium',
      progress: 85,
      stakeholders: ['Training Manager', 'COR'],
      riskLevel: 'low',
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Complete remaining training', 'Verify certifications'],
        recommendations: ['Schedule follow-up training'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    }),
    createDeliverable({
      id: 'd-009',
      contractId: 'c-001',
      title: 'Cost Performance Report',
      description: 'Monthly cost performance report including budget variance analysis and forecasting',
      type: 'report',
      dueDate: '2025-08-31',
      status: 'overdue',
      assignedTo: 'David Miller',
      documents: ['Cost_Report_Template.xlsx', 'Budget_Variance_Analysis.pdf'],
      notes: 'Overdue by 3 days - requires immediate attention and COR notification',
      priority: 'critical',
      progress: 40,
      stakeholders: ['COR', 'Financial Manager'],
      riskLevel: 'critical',
      automation: {
        autoReminders: true,
        autoEscalation: true,
        autoApproval: false,
        integrationPoints: ['ERP', 'Financial System']
      },
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Complete report immediately', 'Notify COR of delay'],
        recommendations: ['Implement better tracking'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: false,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: false
        }
      }
    }),
    createDeliverable({
      id: 'd-010',
      contractId: 'c-001',
      title: 'Emergency Response Plan Update',
      description: 'Annual update to emergency response procedures for HVAC system failures',
      type: 'milestone',
      dueDate: '2025-11-15',
      status: 'pending',
      assignedTo: 'Christopher Lee',
      documents: ['Emergency_Response_Plan_2024.pdf', 'Update_Requirements.docx'],
      notes: 'Coordinate with base emergency management for approval',
      priority: 'high',
      progress: 0,
      stakeholders: ['Emergency Manager', 'COR', 'Base Emergency Management'],
      riskLevel: 'high',
      approvalRequired: true,
      tasks: [],
      completionGuidance: {
        isComplete: false,
        nextSteps: ['Review current plan', 'Coordinate with emergency management'],
        recommendations: ['Include new procedures'],
        lessonsLearned: [],
        followUpActions: [],
        successMetrics: {
          onTime: true,
          onBudget: true,
          qualityMet: true,
          stakeholderSatisfied: true
        }
      }
    })
  ])

  const [subcontractors] = useState<Subcontractor[]>([
    {
      id: 's-001',
      contractId: 'c-001',
      name: 'Reliable Mechanical Services',
      tasks: ['HVAC Installation', 'Preventive Maintenance'],
      periodOfPerformance: { start: '2025-01-15', end: '2026-01-14' },
      value: 500000,
      status: 'active',
      performance: { quality: 92, schedule: 85, cost: 90 },
      compliance: { flowDownClauses: true, wageDeterminations: true, cybersecurity: true }
    }
  ])

  const [invoices] = useState<Invoice[]>([
    {
      id: 'i-001',
      contractId: 'c-001',
      invoiceNumber: 'INV-2025-001',
      period: 'January 2025',
      amount: 208333,
      status: 'paid',
      submittedDate: '2025-02-01',
      paidDate: '2025-02-15',
      daysOutstanding: 0,
      notes: 'Payment received on time'
    }
  ])

  const [gfpItems] = useState<GovernmentFurnishedProperty[]>([
    {
      id: 'g-001',
      contractId: 'c-001',
      item: 'HVAC Diagnostic Equipment',
      serialNumber: 'DIAG-2025-001',
      description: 'Advanced HVAC diagnostic and testing equipment',
      receivedDate: '2025-01-20',
      status: 'in-use',
      location: 'Maintenance Shop',
      condition: 'excellent'
    }
  ])

  const [cparsReports] = useState<CPARSReport[]>([
    {
      id: 'cp-001',
      contractId: 'c-001',
      evaluationPeriod: 'Q1 2025',
      dueDate: '2025-04-30',
      status: 'completed',
      ratings: { quality: 4, schedule: 4, cost: 4, management: 4, overall: 4 },
      comments: 'Excellent performance across all evaluation factors'
    }
  ])

  // Task Management Functions
  const assignTask = (taskId: string, assigneeId: string) => {
    // Implementation for task assignment
    console.log(`Assigning task ${taskId} to ${assigneeId}`)
  }

  const addToCalendar = (taskId: string, calendarType: 'outlook' | 'google' | 'teams' | 'internal') => {
    // Implementation for calendar integration
    console.log(`Adding task ${taskId} to ${calendarType} calendar`)
  }

  const updateTaskProgress = (taskId: string, progress: number) => {
    // Implementation for updating task progress
    console.log(`Updating task ${taskId} progress to ${progress}%`)
  }

  const getTaskStats = (deliverableId: string) => {
    const deliverable = deliverables.find(d => d.id === deliverableId)
    if (!deliverable) return { total: 0, completed: 0, inProgress: 0, unassigned: 0 }
    
    const tasks = deliverable.tasks || []
    return {
      total: tasks.length,
      completed: tasks.filter(t => t.status === 'completed').length,
      inProgress: tasks.filter(t => t.status === 'in-progress').length,
      unassigned: tasks.filter(t => t.status === 'unassigned').length
    }
  }

  const getCompletionGuidance = (deliverableId: string) => {
    const deliverable = deliverables.find(d => d.id === deliverableId)
    if (!deliverable) return null
    
    const taskStats = getTaskStats(deliverableId)
    const isComplete = taskStats.completed === taskStats.total && taskStats.total > 0
    
    if (isComplete) {
      return {
        message: "🎉 Deliverable completed successfully!",
        nextSteps: deliverable.completionGuidance.nextSteps,
        recommendations: deliverable.completionGuidance.recommendations,
        followUpActions: deliverable.completionGuidance.followUpActions
      }
    } else {
      return {
        message: "📋 Continue working on remaining tasks",
        nextSteps: deliverable.completionGuidance.nextSteps,
        recommendations: deliverable.completionGuidance.recommendations,
        followUpActions: []
      }
    }
  }

  // Spirit AI Analysis
  const startSpiritAnalysis = async () => {
    setSpiritAnalysis(prev => ({ ...prev, isProcessing: true, progress: 0 }))
    
    const phases = [
      'Analyzing contract performance...',
      'Reviewing compliance status...',
      'Checking deliverable timelines...',
      'Assessing subcontractor performance...',
      'Evaluating financial health...',
      'Generating recommendations...'
    ]

    for (let i = 0; i < phases.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800))
      setSpiritAnalysis(prev => ({ 
        ...prev, 
        progress: ((i + 1) / phases.length) * 100 
      }))
    }

    setSpiritAnalysis({
      isProcessing: false,
      progress: 100,
      insights: [
        'Contract performance is above target with 92% overall rating',
        'Budget burn rate of 35% is on track for contract completion',
        'All subcontractors are compliant with flow-down requirements',
        'No overdue deliverables or compliance issues detected'
      ],
      recommendations: [
        'Schedule quarterly performance review with COR',
        'Prepare CPARS self-assessment for Q2 evaluation',
        'Review subcontractor performance metrics monthly',
        'Update GFP inventory for upcoming inspection'
      ],
      warnings: [
        'Monthly performance report due in 5 days',
        'Quarterly quality review requires COR coordination',
        'Monitor invoice payment timelines for prompt pay compliance'
      ]
    })
  }

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
          <Button 
            onClick={startSpiritAnalysis}
            disabled={spiritAnalysis.isProcessing}
            className="btn-premium"
          >
            {spiritAnalysis.isProcessing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Run Analysis
              </>
            )}
          </Button>
        </div>

        {spiritAnalysis.isProcessing && (
          <div className="space-y-3">
            <Progress value={spiritAnalysis.progress} className="h-2" />
            <p className="text-sm text-gray-600">Analyzing contract health and compliance...</p>
          </div>
        )}

        {!spiritAnalysis.isProcessing && spiritAnalysis.insights.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Insights
              </h4>
              <ul className="space-y-2">
                {spiritAnalysis.insights.map((insight, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-blue-600 flex items-center">
                <Target className="h-4 w-4 mr-2" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {spiritAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-orange-600 flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Warnings
              </h4>
              <ul className="space-y-2">
                {spiritAnalysis.warnings.map((warning, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                    {warning}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
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
          {modifications.map((mod, index) => (
            <div key={mod.id} className="relative">
              {/* Timeline Line */}
              {index < modifications.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-300"></div>
              )}
              
              <div className="flex items-start space-x-4">
                {/* Timeline Dot */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                  mod.status === 'approved' ? 'bg-green-100' : 
                  mod.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'
                }`}>
                  <FileText className={`h-6 w-6 ${
                    mod.status === 'approved' ? 'text-green-600' : 
                    mod.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                  }`} />
                </div>

                {/* Modification Content */}
                <div className="flex-1 border border-gray-200 rounded-lg p-4 bg-white">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-900">{mod.modificationNumber}</h4>
                      <p className="text-sm text-gray-600">{mod.description}</p>
                      <p className="text-xs text-gray-500 mt-1">Effective: {mod.effectiveDate}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        mod.type === 'bilateral' ? 'default' : 
                        mod.type === 'unilateral' ? 'secondary' : 'outline'
                      }>
                        {mod.type.toUpperCase()}
                      </Badge>
                      <Badge variant={mod.status === 'approved' ? 'default' : 'destructive'}>
                        {mod.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Impact Tags */}
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xs text-gray-500">Impact:</span>
                    {mod.impact.scope && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        🔁 Scope changes
                      </Badge>
                    )}
                    {mod.impact.pricing && (
                      <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                        💰 Pricing changes
                      </Badge>
                    )}
                    {mod.impact.schedule && (
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                        🗓️ Period extensions
                      </Badge>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Value:</span>
                      <p className="font-semibold">${mod.value.toLocaleString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Documents:</span>
                      <p className="font-semibold">{mod.documents.length} attached</p>
                    </div>
                  </div>

                  {/* Auto Alert */}
                  {mod.impact.pricing && (
                    <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                      <p className="text-sm text-yellow-800">
                        ⚠️ <strong>Auto-alert:</strong> This mod changes CLIN values – update invoice logic?
                      </p>
                    </div>
                  )}

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
          ))}
        </div>
      </Card>
    </div>
  )

  const renderDeliverablesTab = () => {
    const filteredDeliverables = deliverables.filter(deliverable => {
      const matchesSearch = deliverable.title.toLowerCase().includes(deliverableSearch.toLowerCase()) ||
                           deliverable.assignedTo.toLowerCase().includes(deliverableSearch.toLowerCase())
      const matchesFilter = deliverableFilter === 'all' || deliverable.status === deliverableFilter
      return matchesSearch && matchesFilter
    })

    const overdueDeliverables = deliverables.filter(d => d.status === 'overdue')
    const criticalDeliverables = deliverables.filter(d => d.priority === 'critical')
    const completedDeliverables = deliverables.filter(d => d.status === 'completed')

    return (
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
                  <p className="text-2xl font-bold text-red-700">{overdueDeliverables.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 font-medium">Critical</p>
                  <p className="text-2xl font-bold text-orange-700">{criticalDeliverables.length}</p>
                </div>
                <Target className="h-8 w-8 text-orange-500" />
              </div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Completed</p>
                  <p className="text-2xl font-bold text-green-700">{completedDeliverables.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">On Track</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {deliverables.filter(d => d.status === 'in-progress' && d.progress > 50).length}
                  </p>
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
                  value={deliverableSearch}
                  onChange={(e) => setDeliverableSearch(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <select 
                value={deliverableFilter}
                onChange={(e) => setDeliverableFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
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
          {filteredDeliverables.map((deliverable) => (
            <Card key={deliverable.id} className="card-premium p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{deliverable.title}</h4>
                    <Badge variant={
                      deliverable.priority === 'critical' ? 'destructive' :
                      deliverable.priority === 'high' ? 'default' :
                      deliverable.priority === 'medium' ? 'secondary' : 'outline'
                    } className="text-xs">
                      {deliverable.priority.toUpperCase()}
                    </Badge>
                    <Badge variant={
                      deliverable.status === 'completed' ? 'default' :
                      deliverable.status === 'overdue' ? 'destructive' :
                      deliverable.status === 'in-progress' ? 'secondary' : 'outline'
                    } className="text-xs">
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

              {/* Task Overview */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Tasks</span>
                  <span className="text-xs text-gray-500">
                    {getTaskStats(deliverable.id).completed}/{getTaskStats(deliverable.id).total} completed
                  </span>
                </div>
                <div className="space-y-2">
                  {(deliverable.tasks || []).slice(0, 2).map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-2 bg-gray-50 rounded text-xs">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          task.status === 'completed' ? 'bg-green-500' :
                          task.status === 'in-progress' ? 'bg-blue-500' :
                          task.status === 'unassigned' ? 'bg-gray-400' : 'bg-red-500'
                        }`} />
                        <span className="font-medium">{task.title}</span>
                        {task.assignee && (
                          <span className="text-gray-500">• {task.assignee.name}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-500">{task.progress}%</span>
                        {task.calendarEvent && (
                          <Calendar className="h-3 w-3 text-blue-500" />
                        )}
                      </div>
                    </div>
                  ))}
                  {(deliverable.tasks || []).length > 2 && (
                    <div className="text-xs text-blue-600 font-medium cursor-pointer hover:underline">
                      +{(deliverable.tasks || []).length - 2} more tasks
                    </div>
                  )}
                </div>
              </div>

              {/* Progress and Metrics */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-semibold">{deliverable.progress}%</span>
                </div>
                <Progress value={deliverable.progress} className="h-2" />
                
                {deliverable.qualityScore && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Quality Score</span>
                    <span className={`font-semibold ${
                      deliverable.qualityScore >= 90 ? 'text-green-600' :
                      deliverable.qualityScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {deliverable.qualityScore}%
                    </span>
                  </div>
                )}
              </div>

              {/* Risk and Stakeholders */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Risk Level</span>
                  <Badge variant={
                    deliverable.riskLevel === 'critical' ? 'destructive' :
                    deliverable.riskLevel === 'high' ? 'default' :
                    deliverable.riskLevel === 'medium' ? 'secondary' : 'outline'
                  } className="text-xs">
                    {deliverable.riskLevel.toUpperCase()}
                  </Badge>
                </div>
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Stakeholders:</span> {deliverable.stakeholders.join(', ')}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDeliverable(deliverable.id)
                    setShowDeliverableModal(true)
                  }}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setSelectedDeliverable(deliverable.id)
                    setShowTaskModal(true)
                  }}
                >
                  <ListTodo className="h-4 w-4 mr-1" />
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

              {/* Automation Indicators */}
              {deliverable.automation.autoReminders && (
                <div className="mt-3 p-2 bg-blue-50 rounded text-xs text-blue-700">
                  🔔 Auto-reminders enabled • {deliverable.automation.integrationPoints.length} integrations
                </div>
              )}
            </Card>
          ))}
        </div>

        {/* Completion Guidance */}
        <Card className="card-premium p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Completion Guidance & Next Steps</h3>
              <p className="text-sm text-gray-600">Spirit AI-powered guidance for deliverable completion</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completed Deliverables */}
            <div className="space-y-4">
              <h4 className="font-semibold text-green-600 flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Completed Deliverables
              </h4>
              {deliverables.filter(d => d.status === 'completed').map(deliverable => {
                const guidance = getCompletionGuidance(deliverable.id)
                return (
                  <div key={deliverable.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h5 className="font-medium text-green-800 mb-2">{deliverable.title}</h5>
                    <p className="text-sm text-green-700 mb-3">{guidance?.message}</p>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-green-600">Next Steps:</span>
                        <ul className="text-xs text-green-700 mt-1 space-y-1">
                          {guidance?.nextSteps.slice(0, 2).map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-green-600">Follow-up Actions:</span>
                        <ul className="text-xs text-green-700 mt-1 space-y-1">
                          {guidance?.followUpActions.slice(0, 2).map((action, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* In Progress Deliverables */}
            <div className="space-y-4">
              <h4 className="font-semibold text-blue-600 flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                In Progress Deliverables
              </h4>
              {deliverables.filter(d => d.status === 'in-progress').map(deliverable => {
                const guidance = getCompletionGuidance(deliverable.id)
                const taskStats = getTaskStats(deliverable.id)
                return (
                  <div key={deliverable.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-800 mb-2">{deliverable.title}</h5>
                    <p className="text-sm text-blue-700 mb-3">{guidance?.message}</p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-blue-600">Task Progress</span>
                        <span className="text-blue-700">{taskStats.completed}/{taskStats.total} completed</span>
                      </div>
                      <Progress value={(taskStats.completed / taskStats.total) * 100} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="text-xs font-medium text-blue-600">Next Steps:</span>
                        <ul className="text-xs text-blue-700 mt-1 space-y-1">
                          {guidance?.nextSteps.slice(0, 3).map((step, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              {step}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs font-medium text-blue-600">Recommendations:</span>
                        <ul className="text-xs text-blue-700 mt-1 space-y-1">
                          {guidance?.recommendations.slice(0, 2).map((rec, index) => (
                            <li key={index} className="flex items-start">
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></div>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* You're Not Alone Section */}
          <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-semibold text-purple-800">You're Not Alone - Spirit AI is Here to Help</h4>
            </div>
            <p className="text-sm text-purple-700 mb-3">
              Our AI assistant provides real-time guidance, automates routine tasks, and ensures you never miss a deadline. 
              Get personalized recommendations, automated reminders, and expert-level insights for every deliverable.
            </p>
            <div className="flex items-center space-x-4 text-xs text-purple-600">
              <span className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Automated task assignment
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Calendar integration
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Progress tracking
              </span>
              <span className="flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Completion guidance
              </span>
            </div>
          </div>
        </Card>

        {/* No Results */}
        {filteredDeliverables.length === 0 && (
          <Card className="card-premium p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No deliverables found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Deliverable
            </Button>
          </Card>
        )}
      </div>
    )
  }

  // Task Management Modal
  const renderTaskModal = () => {
    if (!selectedDeliverable) return null
    
    const deliverable = deliverables.find(d => d.id === selectedDeliverable)
    if (!deliverable) return null

    const tasks = deliverable.tasks || []
    const filteredTasks = tasks.filter(task => {
      if (taskFilter === 'all') return true
      return task.status === taskFilter
    })

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
          {/* Header - Fixed */}
          <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Task Manager</h2>
              <p className="text-gray-600">{deliverable.title}</p>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="unassigned">Unassigned</option>
                <option value="assigned">Assigned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="blocked">Blocked</option>
              </select>
              <Button className="btn-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowTaskModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Task Statistics - Fixed */}
          <div className="p-6 bg-gray-50 border-b flex-shrink-0">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
                <div className="text-sm text-gray-600">Total Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {tasks.filter(t => t.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {tasks.filter(t => t.status === 'in-progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {tasks.filter(t => t.status === 'unassigned').length}
                </div>
                <div className="text-sm text-gray-600">Unassigned</div>
              </div>
            </div>
          </div>

          {/* Task List - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ListTodo className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-600 mb-4">Create your first task to get started</p>
                  <Button className="btn-premium">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Task
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map((task) => (
                    <div key={task.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`w-3 h-3 rounded-full ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'in-progress' ? 'bg-blue-500' :
                              task.status === 'unassigned' ? 'bg-gray-400' : 'bg-red-500'
                            }`} />
                            <h3 className="font-semibold text-gray-900">{task.title}</h3>
                            <Badge variant={
                              task.priority === 'critical' ? 'destructive' :
                              task.priority === 'high' ? 'default' :
                              task.priority === 'medium' ? 'secondary' : 'outline'
                            } className="text-xs">
                              {task.priority.toUpperCase()}
                            </Badge>
                            <Badge variant={
                              task.status === 'completed' ? 'default' :
                              task.status === 'overdue' ? 'destructive' :
                              task.status === 'in-progress' ? 'secondary' : 'outline'
                            } className="text-xs">
                              {task.status.toUpperCase()}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                          
                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Assignee:</span>
                              <p className="font-medium">
                                {task.assignee ? task.assignee.name : 'Unassigned'}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">Due Date:</span>
                              <p className="font-medium">{task.dueDate}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">Progress:</span>
                              <div className="flex items-center space-x-2">
                                <Progress value={task.progress} className="h-2 flex-1" />
                                <span className="text-xs">{task.progress}%</span>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-500">Hours:</span>
                              <p className="font-medium">
                                {task.actualHours || 0}/{task.estimatedHours} hrs
                              </p>
                            </div>
                          </div>

                          {/* Tags */}
                          {task.tags.length > 0 && (
                            <div className="flex items-center space-x-2 mt-3">
                              <span className="text-xs text-gray-500">Tags:</span>
                              {task.tags.map((tag, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}

                          {/* Quality Checklist */}
                          {task.qualityChecklist.length > 0 && (
                            <div className="mt-3">
                              <span className="text-xs text-gray-500">Quality Checklist:</span>
                              <div className="mt-1 space-y-1">
                                {task.qualityChecklist.slice(0, 3).map((item, index) => (
                                  <div key={index} className="flex items-center space-x-2 text-xs">
                                    {item.completed ? (
                                      <CheckSquare className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <Square className="h-3 w-3 text-gray-400" />
                                    )}
                                    <span className={item.completed ? 'text-green-700' : 'text-gray-600'}>
                                      {item.item}
                                    </span>
                                  </div>
                                ))}
                                {task.qualityChecklist.length > 3 && (
                                  <div className="text-xs text-blue-600">
                                    +{task.qualityChecklist.length - 3} more items
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col space-y-2 ml-4">
                          {!task.assignee && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => assignTask(task.id, 'user-001')}
                            >
                              <Users className="h-4 w-4 mr-1" />
                              Assign
                            </Button>
                          )}
                          
                          {!task.calendarEvent && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => addToCalendar(task.id, 'outlook')}
                            >
                              <Calendar className="h-4 w-4 mr-1" />
                              Add to Calendar
                            </Button>
                          )}
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => updateTaskProgress(task.id, Math.min(task.progress + 25, 100))}
                          >
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Update Progress
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Comments
                          </Button>
                          
                          <Button variant="outline" size="sm">
                            <Upload className="h-4 w-4 mr-1" />
                            Upload
                          </Button>
                        </div>
                      </div>

                      {/* Calendar Integration Indicator */}
                      {task.calendarEvent && (
                        <div className="mt-3 p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                          <div className="flex items-center space-x-2 text-xs text-blue-700">
                            <Calendar className="h-3 w-3" />
                            <span>Added to {task.calendarEvent.calendar} calendar</span>
                            <span>• {task.calendarEvent.startTime.split('T')[0]}</span>
                          </div>
                        </div>
                      )}

                      {/* Time Tracking */}
                      {task.timeTracking.totalTime > 0 && (
                        <div className="mt-3 p-2 bg-green-50 rounded border-l-4 border-green-400">
                          <div className="flex items-center space-x-2 text-xs text-green-700">
                            <Clock className="h-3 w-3" />
                            <span>Time tracked: {task.timeTracking.totalTime}h</span>
                            {task.timeTracking.breaks > 0 && (
                              <span>• {task.timeTracking.breaks}h breaks</span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
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

          {/* Add other tab contents here */}
        </Tabs>

        {/* Task Management Modal */}
        {showTaskModal && renderTaskModal()}
      </div>
    </div>
  )
} 