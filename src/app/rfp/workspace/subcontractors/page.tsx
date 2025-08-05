'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star, 
  TrendingUp, 
  Brain, 
  Zap, 
  Lightbulb, 
  ArrowRight, 
  Download, 
  Upload, 
  Search, 
  Filter, 
  Settings, 
  Eye, 
  Edit, 
  Copy, 
  ExternalLink,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Award,
  ClipboardList,
  PieChart,
  Activity,
  Briefcase,
  GraduationCap,
  Layers,
  GitBranch,
  Cpu,
  Gauge,
  ChevronRight,
  ChevronDown,
  Play,
  Pause,
  SkipForward,
  BookOpen,
  MessageSquare,
  HelpCircle,
  Info,
  CheckSquare,
  Square,
  Send,
  Loader2,
  Sparkles,
  Wand2,
  Bot,
  FileUp,
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileCheck,
  FileX,
  FileSearch,
  FileText,
  Database,
  Network,
  Server,
  Cloud,
  Lock,
  Unlock,
  Key,
  Settings2,
  Cog,
  Workflow,
  GitCommit,
  GitPullRequest,
  GitMerge,
  GitCompare,
  GitFork,
  GitPullRequestClosed,
  GitPullRequestDraft,
  GitCommitVertical,
  GitCompareArrows,
  GitGraph,
  Plus,
  Minus,
  Shield,
  DollarSign,
  Percent,
  Timer,
  Check,
  X,
  MoreHorizontal,
  MoreVertical,
  ChevronUp,
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Target,
  BarChart3
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useBidStore, Subcontractor } from '@/app/shared/stores/useBidStore'
import { useSearchParams } from 'next/navigation'

interface ComplianceCheck {
  id: string
  requirement: string
  status: 'pass' | 'warning' | 'fail'
  details: string
  impact: 'high' | 'medium' | 'low'
  actionRequired: string
}

interface PricingEstimate {
  role: string
  hours: number
  rate: number
  fringe: number
  overhead: number
  profit: number
  total: number
  wdCompliance: boolean
}

interface TeamMember {
  id: string
  name: string
  title: string
  email: string
  phone: string
  location: string
  skills: string[]
  experience: number
  clearance: string
  availability: 'available' | 'partially' | 'unavailable'
  rate: number
  matchScore: number
  status: 'assigned' | 'available' | 'unavailable'
  avatar: string
  badges: string[]
}

interface RoleRequirement {
  id: string
  title: string
  description: string
  requiredSkills: string[]
  experience: number
  clearance: string
  hours: number
  priority: 'critical' | 'high' | 'medium' | 'low'
  status: 'filled' | 'pending' | 'gap'
  assignedTo?: string
}

interface SpiritTeamAnalysis {
  isProcessing: boolean
  progress: number
  currentPhase: string
  teamReadiness: number
  gaps: {
    critical: string[]
    high: string[]
    medium: string[]
  }
  recommendations: {
    internal: string[]
    subcontractor: string[]
    strategic: string[]
  }
  automatedActions: {
    completed: string[]
    inProgress: string[]
    pending: string[]
  }
}

interface TeamAssemblySubcontractor {
  id: string
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
  status: 'selected' | 'evaluating' | 'rejected' | 'approved' | 'contracted'
  avatar: string
  logo: string
  bidStatus: 'submitted' | 'approved' | 'pending' | 'rejected'
  assignedWork: {
    scopeItems: string[]
    estimatedValue: number
    timeline: string
    requirements: string[]
  }
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
  teamMembers: {
    name: string
    role: string
    avatar: string
    status: 'approved' | 'pending' | 'needs-review'
  }[]
}

export default function SubcontractorManagementPage() {
  const searchParams = useSearchParams()
  const rfpId = searchParams.get('rfpId') || 'rfp1'
  
  // Zustand Store
  const {
    getCurrentRFP,
    getRFPById,
    getTeamMembers,
    getSubcontractors,
    getSpiritAnalysis,
    startTeamAnalysis,
    updateTeamAssemblyData,
    completeStep,
    updateSpiritAnalysis,
    addSubcontractor,
    updateSubcontractor,
    removeSubcontractor
  } = useBidStore()

  // Get current RFP data
  const currentRFP = getRFPById(rfpId)
  const teamMembers = getTeamMembers(rfpId)
  const subcontractors = getSubcontractors(rfpId)
  const spiritAnalysis = getSpiritAnalysis(rfpId)
  const teamAssemblyData = currentRFP?.teamAssemblyData

  // Local state for UI
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('name')

  // CRUD Modal States
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingSubcontractor, setEditingSubcontractor] = useState<Subcontractor | null>(null)
  const [deletingSubcontractor, setDeletingSubcontractor] = useState<Subcontractor | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    specialties: [] as string[],
    location: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    certifications: [] as string[],
    hourlyRate: 0,
    overhead: 0,
    profit: 0
  })

  // Pricing Estimator State
  const [pricingEstimates, setPricingEstimates] = useState<PricingEstimate[]>([
    {
      role: 'HVAC Technician',
      hours: 1920,
      rate: 85,
      fringe: 25.5,
      overhead: 42.5,
      profit: 12.75,
      total: 317520,
      wdCompliance: true
    },
    {
      role: 'Controls Specialist',
      hours: 960,
      rate: 95,
      fringe: 28.5,
      overhead: 47.5,
      profit: 14.25,
      total: 177840,
      wdCompliance: true
    },
    {
      role: 'Helper',
      hours: 1440,
      rate: 45,
      fringe: 13.5,
      overhead: 22.5,
      profit: 6.75,
      total: 126720,
      wdCompliance: true
    }
  ])

  // Team Assembly Functions
  const getStepStatus = (stepId: number) => {
    if (!currentRFP) return 'pending'
    if (currentRFP.completedSteps.includes(stepId)) return 'completed'
    if (currentRFP.currentStep === stepId) return 'active'
    return 'pending'
  }

  const openStepModal = async (step: any) => {
    if (!currentRFP) return
    
    updateTeamAssemblyData(rfpId, {
      currentStepData: step,
      aiSuggestions: null,
      showStepModal: true
    })
    
    await generateAISuggestions(step)
  }

  const generateAISuggestions = async (step: any) => {
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const suggestions = {
      step1: {
        title: 'AI Recommendations for Critical Gaps',
        suggestions: [
          {
            type: 'critical',
            title: 'Replace Safety Officer',
            description: 'Replace Thomas with qualified OSHA-certified personnel',
            confidence: 95,
            action: () => handleReplaceMember('Thomas')
          },
          {
            type: 'critical',
            title: 'Hire Construction Manager',
            description: 'Add construction manager to fill critical role',
            confidence: 92,
            action: () => handleHireConstructionManager()
          }
        ],
        autoProcess: false
      },
      step2: {
        title: 'AI Recommendations for Scope Distribution',
        suggestions: [
          {
            type: 'primary',
            title: 'Review & Send Scope',
            description: 'Review scope details then send to subcontractors',
            confidence: 88,
            action: () => handleReviewScope()
          },
          {
            type: 'secondary',
            title: 'Send Scope Directly',
            description: 'Send scope immediately without review',
            confidence: 75,
            action: () => handleSendScope()
          }
        ],
        autoProcess: false
      },
      step3: {
        title: 'AI Recommendations for Team Optimization',
        suggestions: [
          {
            type: 'optimize',
            title: 'Optimize team composition for 89% readiness',
            description: 'AI can improve team readiness from 82% to 89%',
            confidence: 87,
            action: () => handleOptimizeTeam()
          }
        ],
        autoProcess: true
      },
      step4: {
        title: 'AI Recommendations for Final Team Assembly',
        suggestions: [
          {
            type: 'optimize',
            title: 'Optimize Team Composition',
            description: 'AI analysis shows 89% team readiness with optimization opportunities',
            confidence: 92,
            action: () => handleOptimizeTeam()
          },
          {
            type: 'verify',
            title: 'Verify All Credentials & Clearances',
            description: 'Ensure all team members have required certifications and security clearances',
            confidence: 95,
            action: () => console.log('Verify credentials')
          },
          {
            type: 'compliance',
            title: 'Run Complete Compliance Check',
            description: 'Verify Davis-Bacon Act compliance and insurance requirements',
            confidence: 88,
            action: () => console.log('Run compliance check')
          },
          {
            type: 'balance',
            title: 'Balance Team Workload',
            description: 'Distribute work evenly across team members for optimal efficiency',
            confidence: 85,
            action: () => console.log('Balance workload')
          },
          {
            type: 'backup',
            title: 'Identify Backup Personnel',
            description: 'Assign backup team members for critical roles',
            confidence: 90,
            action: () => console.log('Assign backups')
          }
        ],
        autoProcess: false
      }
    }
    
    const stepKey = `step${step.id}` as keyof typeof suggestions
    
    if (suggestions[stepKey]) {
      updateTeamAssemblyData(rfpId, {
        aiSuggestions: suggestions[stepKey]
      })
    } else {
      updateTeamAssemblyData(rfpId, {
        aiSuggestions: {
          title: 'AI Recommendations',
          suggestions: [
            {
              type: 'general',
              title: 'Complete this step',
              description: 'Proceed with the recommended actions for this step',
              confidence: 85,
              action: () => completeStep(rfpId, step.id)
            }
          ],
          autoProcess: false
        }
      })
    }
  }

  const handleAutoProcessing = async () => {
    if (!teamAssemblyData?.aiSuggestions) return
    
    updateTeamAssemblyData(rfpId, { autoProcessing: true })
    
    for (const suggestion of teamAssemblyData.aiSuggestions.suggestions) {
      await suggestion.action()
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    updateTeamAssemblyData(rfpId, { 
      autoProcessing: false,
      showStepModal: false
    })
    completeStep(rfpId, currentRFP?.currentStep || 1)
  }

  const handleReplaceMember = async (memberName: string) => {
    updateTeamAssemblyData(rfpId, {
      actionInProgress: true,
      selectedAction: 'replacing-member'
    })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update team member in store
    const updatedTeamMembers = teamMembers.map(member => 
      member.name === memberName 
        ? { ...member, name: 'Sarah Mitchell', title: 'Safety Officer', badges: [...member.badges, 'OSHA Certified'] }
        : member
    )
    
    // Update spirit analysis
    updateSpiritAnalysis(rfpId, {
      teamReadiness: 89,
      gaps: {
        ...spiritAnalysis?.gaps,
        critical: spiritAnalysis?.gaps.critical.filter(gap => !gap.includes('Safety Officer')) || []
      }
    })
    
    updateTeamAssemblyData(rfpId, {
      actionInProgress: false,
      selectedAction: null
    })
    completeStep(rfpId, 1)
  }

  const handleHireConstructionManager = async () => {
    updateTeamAssemblyData(rfpId, {
      actionInProgress: true,
      selectedAction: 'hiring-manager'
    })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newManager = {
      id: '5',
      name: 'Alex Rodriguez',
      title: 'Construction Manager',
      email: 'alex.rodriguez@company.com',
      phone: '(555) 567-8901',
      location: 'Washington, DC',
      skills: ['Construction Management', 'Federal Projects', 'Safety'],
      experience: 12,
      clearance: 'Secret',
      availability: 'available' as const,
      rate: 115,
      matchScore: 91,
      status: 'assigned' as const,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      badges: ['PMP', 'OSHA Certified']
    }
    
    // Add to team members
    const updatedTeamMembers = [...teamMembers, newManager]
    
    // Update spirit analysis
    updateSpiritAnalysis(rfpId, {
      teamReadiness: 89,
      gaps: {
        ...spiritAnalysis?.gaps,
        critical: spiritAnalysis?.gaps.critical.filter(gap => !gap.includes('Construction Manager')) || []
      }
    })
    
    updateTeamAssemblyData(rfpId, {
      actionInProgress: false,
      selectedAction: null
    })
    completeStep(rfpId, 1)
  }

  const handleOptimizeTeam = async () => {
    updateTeamAssemblyData(rfpId, {
      actionInProgress: true,
      selectedAction: 'optimizing-team'
    })
    
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    updateSpiritAnalysis(rfpId, {
      teamReadiness: 94,
      automatedActions: {
        ...spiritAnalysis?.automatedActions,
        completed: [...(spiritAnalysis?.automatedActions.completed || []), 'Team optimization completed']
      }
    })
    
    updateTeamAssemblyData(rfpId, {
      actionInProgress: false,
      selectedAction: null
    })
  }

  const handleSendScope = async () => {
    updateTeamAssemblyData(rfpId, {
      actionInProgress: true,
      selectedAction: 'sending-scope'
    })
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    updateSpiritAnalysis(rfpId, {
      automatedActions: {
        ...spiritAnalysis?.automatedActions,
        completed: [...(spiritAnalysis?.automatedActions.completed || []), 'Scope sent to subcontractors']
      }
    })
    
    updateTeamAssemblyData(rfpId, {
      actionInProgress: false,
      selectedAction: null
    })
    completeStep(rfpId, 2)
  }

  const handleReviewScope = async () => {
    updateTeamAssemblyData(rfpId, {
      showStepModal: false,
      showScopeModal: true
    })
  }

  const workflowSteps = [
    {
      id: 1,
      title: 'Resolve Critical Gaps',
      description: 'Address safety officer certification and construction manager role',
      status: 'active'
    },
    {
      id: 2,
      title: 'Review & Send Scope',
      description: 'Review scope details then send to selected subcontractors',
      status: 'pending'
    },
    {
      id: 3,
      title: 'Team Optimization',
      description: 'Optimize team composition and workload distribution',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Final Team Assembly',
      description: 'Complete team assembly and final approval',
      status: 'pending'
    }
  ]

  // Calculate overall compliance from subcontractor data
  const overallCompliance = subcontractors.length > 0 
    ? Math.round(
        (subcontractors.filter(sub => 
          sub.compliance.insurance && 
          sub.compliance.bonding && 
          sub.compliance.certifications.length > 0
        ).length / subcontractors.length) * 100
      )
    : 0

  // CRUD Functions
  const handleAddSubcontractor = () => {
    setFormData({
      name: '',
      type: '',
      specialties: [],
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      certifications: [],
      hourlyRate: 0,
      overhead: 0,
      profit: 0
    })
    setShowAddModal(true)
  }

  const handleEditSubcontractor = (subcontractor: any) => {
    setEditingSubcontractor(subcontractor)
    setFormData({
      name: subcontractor.name,
      type: subcontractor.type,
      specialties: subcontractor.specialties,
      location: subcontractor.location,
      contactName: subcontractor.contact.name,
      contactEmail: subcontractor.contact.email,
      contactPhone: subcontractor.contact.phone,
      certifications: subcontractor.certifications,
      hourlyRate: subcontractor.pricing.proposedAmount / 1920, // Estimate hourly rate
      overhead: subcontractor.pricing.overhead,
      profit: subcontractor.pricing.profit
    })
    setShowEditModal(true)
  }

  const handleDeleteSubcontractor = (subcontractor: any) => {
    setDeletingSubcontractor(subcontractor)
    setShowDeleteModal(true)
  }

  const saveSubcontractor = () => {
    if (editingSubcontractor) {
      // Update existing subcontractor
      updateSubcontractor(rfpId, editingSubcontractor.id, {
        name: formData.name,
        type: formData.type,
        specialties: formData.specialties,
        location: formData.location,
        contact: {
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone
        },
        certifications: formData.certifications,
        pricing: {
          proposedAmount: formData.hourlyRate * 1920,
          laborRates: { 'Default': formData.hourlyRate },
          materials: 0,
          overhead: formData.overhead,
          profit: formData.profit
        }
      })
      setShowEditModal(false)
      setEditingSubcontractor(null)
    } else {
      // Add new subcontractor
      const newSubcontractor = {
        id: `sub${Date.now()}`,
        name: formData.name,
        type: formData.type,
        specialties: formData.specialties,
        pastPerformance: 4.5,
        priceCompetitiveness: 80,
        availability: 'high' as const,
        certifications: formData.certifications,
        location: formData.location,
        contact: {
          name: formData.contactName,
          email: formData.contactEmail,
          phone: formData.contactPhone
        },
        matchScore: 85,
        status: 'evaluating' as const,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        logo: 'NEW',
        bidStatus: 'pending' as const,
        assignedWork: {
          scopeItems: [],
          estimatedValue: 0,
          timeline: '',
          requirements: []
        },
        pricing: {
          proposedAmount: formData.hourlyRate * 1920,
          laborRates: { 'Default': formData.hourlyRate },
          materials: 0,
          overhead: formData.overhead,
          profit: formData.profit
        },
        compliance: {
          insurance: true,
          bonding: true,
          certifications: formData.certifications,
          clearances: []
        },
        teamMembers: []
      }
      addSubcontractor(rfpId, newSubcontractor)
      setShowAddModal(false)
    }
    setFormData({
      name: '',
      type: '',
      specialties: [],
      location: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      certifications: [],
      hourlyRate: 0,
      overhead: 0,
      profit: 0
    })
  }

  const confirmDelete = () => {
    if (deletingSubcontractor) {
      removeSubcontractor(rfpId, deletingSubcontractor.id)
      setShowDeleteModal(false)
      setDeletingSubcontractor(null)
    }
  }

  const addSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }))
    }
  }

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }))
  }

  const addCertification = (certification: string) => {
    if (certification && !formData.certifications.includes(certification)) {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, certification]
      }))
    }
  }

  const removeCertification = (certification: string) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(c => c !== certification)
    }))
  }

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Compliance Check Summary */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Compliance Check Summary</h3>
            <p className="text-gray-600">Final checkpoint before proposal submission – let's ensure every sub meets the mark.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{overallCompliance}%</div>
            <div className="text-sm text-gray-600">Overall Compliance</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">COI Compliance Status</span>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <Progress value={85} className="h-2" />
            <p className="text-xs text-gray-600 mt-1">Estimated submission risk 15%</p>
          </div>
          <div className="bg-white/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">WD Alignment</span>
              <Badge className="bg-green-100 text-green-800">Compliant</Badge>
            </div>
            <Progress value={92} className="h-2" />
            <p className="text-xs text-gray-600 mt-1">All labor categories verified</p>
          </div>
        </div>
      </Card>

      {/* Subcontractor Compliance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Subcontractor Compliance Matrix</h3>
          <Button 
            onClick={handleAddSubcontractor}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Subcontractor
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 font-medium text-gray-700">Subcontractor</th>
                <th className="text-left py-3 font-medium text-gray-700">Insurance</th>
                <th className="text-left py-3 font-medium text-gray-700">Bonding</th>
                <th className="text-left py-3 font-medium text-gray-700">Certifications</th>
                <th className="text-left py-3 font-medium text-gray-700">Clearances</th>
                <th className="text-left py-3 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcontractors.map((sub) => (
                <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3">
                    <div>
                      <div className="font-medium text-gray-900">{sub.name}</div>
                      <div className="text-sm text-gray-600">{sub.type}</div>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.insurance && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {!sub.compliance.insurance && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.insurance ? 'Active' : 'Missing'}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.bonding && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {!sub.compliance.bonding && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.bonding ? 'Active' : 'Missing'}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.certifications.length > 0 && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.certifications.length === 0 && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.certifications.length > 0 ? `${sub.compliance.certifications.length} Active` : 'None'}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.clearances.length > 0 && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.clearances.length === 0 && <AlertTriangle className="h-4 w-4 text-yellow-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.clearances.length > 0 ? `${sub.compliance.clearances.length} Active` : 'None'}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge className={
                      sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                      sub.status === 'evaluating' ? 'bg-blue-100 text-blue-800' :
                      sub.status === 'evaluating' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {sub.status}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => setSelectedSubcontractor(sub.id)}>
                        <Eye className="h-3 w-3 mr-1" />
                        Review
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleEditSubcontractor(sub)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleDeleteSubcontractor(sub)}
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                      {sub.status === 'evaluating' && (
                        <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700">
                          Request Update
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const renderPricingTab = () => (
    <div className="space-y-6">
      {/* Pricing Estimator */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Estimator</h3>
        <p className="text-gray-600 mb-6">Internal view before sending scope and pricing to subcontractors</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Labor Cost Breakdown</h4>
            <div className="space-y-3">
              {pricingEstimates.map((estimate, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{estimate.role}</span>
                    <Badge className={estimate.wdCompliance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {estimate.wdCompliance ? 'WD Compliant' : 'WD Issue'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>Hours: {estimate.hours}</div>
                    <div>Rate: ${estimate.rate}/hr</div>
                    <div>Fringe: ${estimate.fringe}/hr</div>
                    <div>Total: ${estimate.total}/hr</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Pricing Summary</h4>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">$412,000</div>
                <div className="text-sm text-blue-800">Total Estimated Cost</div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="text-lg font-semibold text-green-600">12%</div>
                <div className="text-sm text-green-800">Suggested Markup</div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg">
                <div className="text-lg font-semibold text-yellow-600">Fair</div>
                <div className="text-sm text-yellow-800">Competitive Position</div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Spirit AI Pricing Insights */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 border-0">
        <div className="flex items-center mb-4">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 flex items-center justify-center mr-3">
            <Brain className="h-4 w-4 text-white" />
          </div>
          <h3 className="font-semibold text-gray-900">Spirit AI Pricing Insights</h3>
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-700">
              ⚠️ Fringe not calculated for 2 roles - may impact WD compliance
            </p>
          </div>
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-700">
              💡 Suggested markup is below standard for this NAICS in Louisiana
            </p>
          </div>
          <div className="p-3 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-700">
              ✅ Pricing structure aligns well with evaluation criteria (30% weight)
            </p>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-3">
          <Button size="sm">
            Review with Sub
          </Button>
          <Button size="sm" variant="outline">
            Adjust Pricing
          </Button>
        </div>
      </Card>
    </div>
  )

  const renderTeamAssemblyTab = () => (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contractor Team Assembly</h1>
            <p className="text-gray-600">AI-Powered Team Building & Subcontractor Selection</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline"
              onClick={() => setShowScenarioSimulator(true)}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Scenario Simulator
            </Button>
            <Button className="bg-blue-600 text-white hover:bg-blue-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Overall Readiness
            </Button>
            <Button 
              onClick={startTeamAnalysis}
              disabled={spiritAnalysis.isProcessing}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            >
              {spiritAnalysis.isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Bot className="h-4 w-4 mr-2" />
                  Start Team Analysis
                </>
              )}
            </Button>
          </div>
        </div>
        
        {/* Project Card */}
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">HVAC Replacement at MVA Westminster Branch</h2>
                <p className="text-gray-600">Federal project with multiple subcontractor requirements</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{spiritAnalysis.teamReadiness}%</div>
              <div className="text-sm text-gray-600">Team Readiness</div>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Processing Status */}
          {spiritAnalysis.isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                <div className="flex items-center mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                  <h3 className="font-semibold text-blue-900">Spirit AI is Analyzing Your Team</h3>
                </div>
                <p className="text-blue-800 mb-3">{spiritAnalysis.currentPhase}</p>
                <Progress value={spiritAnalysis.progress} className="h-2" />
              </Card>
            </motion.div>
          )}

          {/* Team Analysis Results */}
          {!spiritAnalysis.isProcessing && spiritAnalysis.progress > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Prime Contractor Section */}
              <Card className="p-8 bg-gradient-to-br from-white to-gray-50/30 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Prime Contractor Team
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {teamMembers.map((member) => (
                    <motion.div 
                      key={member.id} 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ y: -4, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group relative p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="relative mb-4">
                          <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                            <img 
                              src={member.avatar} 
                              alt={member.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          {member.name === 'Jennifer Davis' && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full border-3 border-white shadow-sm flex items-center justify-center">
                              <AlertTriangle className="h-2.5 w-2.5 text-white" />
                            </div>
                          )}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-white" />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <h4 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h4>
                          <p className="text-sm text-gray-600 font-medium">{member.title}</p>
                        </div>
                        
                        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
                          {member.badges.map((badge, badgeIndex) => (
                            <Badge 
                              key={badgeIndex} 
                              className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800 border border-blue-200 text-xs font-medium px-2 py-1"
                            >
                              {badge}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="w-full space-y-2">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">Match Score</span>
                            <span className="font-semibold text-green-600">{member.matchScore}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-green-600 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${member.matchScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>

              {/* Subcontractors Section */}
              <Card className="p-8 bg-gradient-to-br from-white to-blue-50/30 border-0 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                  Subcontractor Partners
                </h3>
                <div className="space-y-6">
                  {teamAssemblySubcontractors.map((sub) => (
                    <motion.div 
                      key={sub.id} 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.3 }}
                      className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center">
                          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mr-4 border-4 border-white shadow-lg">
                            <span className="text-blue-700 font-bold text-xl">{sub.logo}</span>
                          </div>
                          <div>
                            <h4 className="text-xl font-bold text-gray-900 mb-1">{sub.name}</h4>
                            <p className="text-sm text-gray-600 font-medium">{sub.type}</p>
                            <div className="flex items-center mt-2 space-x-4 text-sm">
                              <span className="text-gray-500">Match: <span className="font-semibold text-blue-600">{sub.matchScore}%</span></span>
                              <span className="text-gray-500">Performance: <span className="font-semibold text-green-600">{sub.pastPerformance}/5.0</span></span>
                              <span className="text-gray-500">Bid: <span className="font-semibold text-purple-600">${(sub.pricing.proposedAmount / 1000).toFixed(0)}K</span></span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge className={
                            sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                            sub.status === 'selected' ? 'bg-blue-100 text-blue-800' :
                            sub.status === 'contracted' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {sub.status}
                          </Badge>
                          <Button size="sm" variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                            <Eye className="h-3 w-3 mr-1" />
                            View Details
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Assigned Work</h5>
                          <div className="space-y-2">
                            {sub.assignedWork.scopeItems.map((item, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Team Members</h5>
                          <div className="space-y-2">
                            {sub.teamMembers.map((member, index) => (
                              <div key={index} className="flex items-center text-sm">
                                <img 
                                  src={member.avatar} 
                                  alt={member.name}
                                  className="h-6 w-6 rounded-full mr-2"
                                />
                                <span className="text-gray-700">{member.name}</span>
                                <Badge className={`ml-auto text-xs ${
                                  member.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  member.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {member.status}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold text-gray-900 mb-2">Compliance</h5>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Insurance</span>
                              <Badge className={sub.compliance.insurance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {sub.compliance.insurance ? 'Active' : 'Missing'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Bonding</span>
                              <Badge className={sub.compliance.bonding ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {sub.compliance.bonding ? 'Active' : 'Missing'}
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Certifications</span>
                              <Badge className="bg-blue-100 text-blue-800">
                                {sub.compliance.certifications.length}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Team Assembly Workflow */}
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Team Assembly Workflow</h3>
                <p className="text-gray-600">Guided process to assemble and optimize your project team</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">{spiritAnalysis.teamReadiness}%</div>
                <div className="text-sm text-gray-600">Team Readiness</div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{workflowProgress}%</span>
              </div>
              <Progress value={workflowProgress} className="h-3" />
            </div>

            {/* Workflow Steps */}
            <div className="grid grid-cols-1 gap-4">
              {workflowSteps.map((step, index) => {
                const status = getStepStatus(step.id)
                return (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                      status === 'completed' 
                        ? 'bg-green-50 border-green-200' 
                        : status === 'active'
                        ? 'bg-blue-50 border-blue-200 shadow-lg'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        status === 'completed' 
                          ? 'bg-green-500 text-white' 
                          : status === 'active'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}>
                        {status === 'completed' ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          step.id
                        )}
                      </div>
                      <Badge className={
                        status === 'completed' ? 'bg-green-100 text-green-800' :
                        status === 'active' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-600'
                      }>
                        {status === 'completed' ? 'Completed' : status === 'active' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    
                    <h4 className={`font-semibold mb-2 ${
                      status === 'completed' ? 'text-green-900' :
                      status === 'active' ? 'text-blue-900' :
                      'text-gray-700'
                    }`}>
                      {step.title}
                    </h4>
                    
                    <p className={`text-sm mb-4 ${
                      status === 'completed' ? 'text-green-700' :
                      status === 'active' ? 'text-blue-700' :
                      'text-gray-600'
                    }`}>
                      {step.description}
                    </p>

                    {status === 'active' && (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="relative overflow-hidden"
                      >
                        <Button 
                          size="sm"
                          className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:from-purple-700 hover:via-blue-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 border-0 text-white font-semibold py-3 px-4 relative overflow-hidden group"
                          onClick={() => openStepModal(step)}
                          disabled={actionInProgress}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                          
                          <div className="relative flex items-center justify-center">
                            <div className="mr-2 p-1 rounded-full bg-white/20 backdrop-blur-sm">
                              <Brain className="h-4 w-4 text-white drop-shadow-sm" />
                            </div>
                            <span className="text-sm font-medium tracking-wide">
                              Begin Analysis
                            </span>
                            <ChevronRight className="h-4 w-4 ml-2 text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
                          </div>
                        </Button>
                        
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse pointer-events-none"></div>
                      </motion.div>
                    )}
                    
                    {status === 'completed' && (
                      <div className="flex items-center text-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm font-medium">Step Complete</span>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </Card>

          {/* Critical Gaps */}
          <Card className="p-6 bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Critical Gaps
            </h3>
            <div className="space-y-3">
              {spiritAnalysis.gaps.critical.map((gap, index) => (
                <div key={index} className="flex items-center p-3 bg-white rounded-lg border border-red-200">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                  <span className="text-red-800">{gap}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Subcontractor Management</h1>
              <p className="text-gray-600">Pre-award subcontractor onboarding & compliance verification</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Subcontractor
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Compliance Check</TabsTrigger>
                <TabsTrigger value="pricing">Pricing Estimator</TabsTrigger>
                <TabsTrigger value="team">Team Assembly</TabsTrigger>
                <TabsTrigger value="management">Sub Management</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                {renderOverviewTab()}
              </TabsContent>
              
              <TabsContent value="pricing" className="mt-6">
                {renderPricingTab()}
              </TabsContent>
              
              <TabsContent value="team" className="mt-6">
                {renderTeamAssemblyTab()}
              </TabsContent>
              
              <TabsContent value="management" className="mt-6">
                {renderTeamAssemblyTab()}
              </TabsContent>
            </Tabs>
          </div>

          {/* Spirit AI Sidebar */}
          <div className="space-y-6">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Spirit AI Assistant</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {overallCompliance}% of subcontractors are fully compliant. {subcontractors.filter(s => s.status === 'pending').length} require updated COIs and W/D alignment.
                  </p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Would you like to request missing documents now?
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" size="sm">
                  Send Reminder
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Replace Sub
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Edit Scope
                </Button>
              </div>
            </Card>

            {/* Insights */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                Insights
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    SecureNet Systems' LOI has not been digitally signed – submission risk.
                  </p>
                </div>
                <div className="p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                  <p className="text-sm text-red-800">
                    TechSolutions COI expires in 30 days. License requires this to be updated prior to submission.
                  </p>
                </div>
              </div>
            </Card>

            {/* Risk Forecast */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-red-600" />
                Risk Forecast
              </h3>
              <div className="p-3 bg-red-50 rounded-lg">
                <p className="text-sm text-red-800">
                  Submission risk: 15% due to unconfirmed subcontractor compliance.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Add Subcontractor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Add New Subcontractor</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., 8(a) Small Business"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <Input
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Primary contact"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        {specialty}
                        <button
                          onClick={() => removeSpecialty(specialty)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add specialty"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSpecialty((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add specialty"]') as HTMLInputElement
                      if (input) {
                        addSpecialty(input.value)
                        input.value = ''
                      }
                    }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {cert}
                        <button
                          onClick={() => removeCertification(cert)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add certification"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addCertification((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add certification"]') as HTMLInputElement
                      if (input) {
                        addCertification(input.value)
                        input.value = ''
                      }
                    }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    placeholder="125"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overhead (%)</label>
                  <Input
                    type="number"
                    value={formData.overhead}
                    onChange={(e) => setFormData(prev => ({ ...prev, overhead: Number(e.target.value) }))}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profit (%)</label>
                  <Input
                    type="number"
                    value={formData.profit}
                    onChange={(e) => setFormData(prev => ({ ...prev, profit: Number(e.target.value) }))}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={saveSubcontractor} className="bg-blue-600 hover:bg-blue-700">
                  Add Subcontractor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subcontractor Modal */}
      {showEditModal && editingSubcontractor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Subcontractor</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEditModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    placeholder="e.g., 8(a) Small Business"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Input
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <Input
                    value={formData.contactName}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                    placeholder="Primary contact"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
                    placeholder="contact@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <Input
                    value={formData.contactPhone}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialties</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.specialties.map((specialty, index) => (
                      <Badge key={index} className="bg-blue-100 text-blue-800">
                        {specialty}
                        <button
                          onClick={() => removeSpecialty(specialty)}
                          className="ml-1 text-blue-600 hover:text-blue-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add specialty"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addSpecialty((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add specialty"]') as HTMLInputElement
                      if (input) {
                        addSpecialty(input.value)
                        input.value = ''
                      }
                    }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.certifications.map((cert, index) => (
                      <Badge key={index} className="bg-green-100 text-green-800">
                        {cert}
                        <button
                          onClick={() => removeCertification(cert)}
                          className="ml-1 text-green-600 hover:text-green-800"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add certification"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addCertification((e.target as HTMLInputElement).value)
                          ;(e.target as HTMLInputElement).value = ''
                        }
                      }}
                    />
                    <Button size="sm" onClick={() => {
                      const input = document.querySelector('input[placeholder="Add certification"]') as HTMLInputElement
                      if (input) {
                        addCertification(input.value)
                        input.value = ''
                      }
                    }}>
                      Add
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate ($)</label>
                  <Input
                    type="number"
                    value={formData.hourlyRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, hourlyRate: Number(e.target.value) }))}
                    placeholder="125"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Overhead (%)</label>
                  <Input
                    type="number"
                    value={formData.overhead}
                    onChange={(e) => setFormData(prev => ({ ...prev, overhead: Number(e.target.value) }))}
                    placeholder="15"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profit (%)</label>
                  <Input
                    type="number"
                    value={formData.profit}
                    onChange={(e) => setFormData(prev => ({ ...prev, profit: Number(e.target.value) }))}
                    placeholder="8"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Cancel
                </Button>
                <Button onClick={saveSubcontractor} className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingSubcontractor && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Delete Subcontractor</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDeleteModal(false)}
                  className="text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600 mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Deletion</h3>
                  <p className="text-gray-600">This action cannot be undone.</p>
                </div>
              </div>
              
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-800">
                  Are you sure you want to delete <strong>{deletingSubcontractor.name}</strong>?
                </p>
                <p className="text-red-700 text-sm mt-1">
                  This will remove all associated data and cannot be recovered.
                </p>
              </div>

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                  Delete Subcontractor
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Team Assembly Step Modal */}
      <AnimatePresence>
        {teamAssemblyData?.showStepModal && teamAssemblyData.currentStepData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Step {teamAssemblyData.currentStepData.id}: {teamAssemblyData.currentStepData.title}</h2>
                    <p className="text-blue-100">{teamAssemblyData.currentStepData.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => updateTeamAssemblyData(rfpId, { showStepModal: false })}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Spirit AI Recommendations */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-600" />
                      Spirit AI Recommendations
                    </h3>
                    
                    {!teamAssemblyData.aiSuggestions ? (
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center">
                          <Loader2 className="h-4 w-4 animate-spin text-purple-600 mr-2" />
                          <span className="text-purple-800">Spirit AI is analyzing options...</span>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {teamAssemblyData.aiSuggestions.suggestions.map((suggestion: any, index: number) => (
                          <div key={index} className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{suggestion.title}</h4>
                              <Badge className="bg-purple-100 text-purple-800">
                                {suggestion.confidence}% confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{suggestion.description}</p>
                            <Button 
                              size="sm" 
                              className="w-full bg-purple-600 hover:bg-purple-700"
                              onClick={suggestion.action}
                              disabled={actionInProgress}
                            >
                              {actionInProgress && selectedAction === suggestion.title.toLowerCase().replace(/\s+/g, '-') ? (
                                <>
                                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                  Processing...
                                </>
                              ) : (
                                <>
                                  <Check className="h-3 w-3 mr-1" />
                                  Apply This Recommendation
                                </>
                              )}
                            </Button>
                          </div>
                        ))}
                        
                        {teamAssemblyData.aiSuggestions.autoProcess && (
                          <Button 
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                            onClick={handleAutoProcessing}
                            disabled={autoProcessing}
                          >
                            {autoProcessing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Auto-Processing All Recommendations...
                              </>
                            ) : (
                              <>
                                <Zap className="h-4 w-4 mr-2" />
                                Auto-Process All Recommendations
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Manual Options */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-gray-600" />
                      Manual Options
                    </h3>
                    
                    <div className="space-y-4">
                      {teamAssemblyData.currentStepData.id === 1 && (
                        <div className="space-y-4">
                          {/* Safety Officer Options */}
                          <div className={`p-4 rounded-xl border transition-all duration-300 ${
                            satisfactionStates['safety-officer'] === 'satisfied' 
                              ? 'bg-gradient-to-r from-green-50 to-green-100/50 border-green-200' 
                              : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                          }`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className={`font-semibold flex items-center ${
                                satisfactionStates['safety-officer'] === 'satisfied' 
                                  ? 'text-green-900' 
                                  : 'text-red-900'
                              }`}>
                                {satisfactionStates['safety-officer'] === 'satisfied' ? (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                )}
                                Safety Officer Certification Issue
                              </h4>
                              {satisfactionStates['safety-officer'] === 'satisfied' && (
                                <Badge className="bg-green-100 text-green-800 border border-green-300">
                                  ✅ Resolved
                                </Badge>
                              )}
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-red-100">
                              <p className="text-sm text-gray-600 mb-3">Thomas's OSHA certification has expired. Choose an action:</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-red-600 hover:bg-red-700"
                                  onClick={() => handleReplaceMember('Thomas')}
                                  disabled={actionInProgress}
                                >
                                  {actionInProgress && selectedAction === 'replacing-member' ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Replacing...
                                    </>
                                  ) : (
                                    <>
                                      <UserCheck className="h-3 w-3 mr-1" />
                                      Replace with Sarah Mitchell
                                    </>
                                  )}
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-red-200 text-red-700">
                                  <Search className="h-3 w-3 mr-1" />
                                  Find Other Candidates
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-red-200 text-red-700">
                                  <RefreshCw className="h-3 w-3 mr-1" />
                                  Request Certification Renewal
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Construction Manager Options */}
                          <div className={`p-4 rounded-xl border transition-all duration-300 ${
                            satisfactionStates['construction-manager'] === 'satisfied' 
                              ? 'bg-gradient-to-r from-green-50 to-green-100/50 border-green-200' 
                              : 'bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200'
                          }`}>
                            <div className="flex items-center justify-between mb-3">
                              <h4 className={`font-semibold flex items-center ${
                                satisfactionStates['construction-manager'] === 'satisfied' 
                                  ? 'text-green-900' 
                                  : 'text-orange-900'
                              }`}>
                                {satisfactionStates['construction-manager'] === 'satisfied' ? (
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 mr-2" />
                                )}
                                Construction Manager Role
                              </h4>
                              {satisfactionStates['construction-manager'] === 'satisfied' && (
                                <Badge className="bg-green-100 text-green-800 border border-green-300">
                                  ✅ Filled
                                </Badge>
                              )}
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-orange-100">
                              <p className="text-sm text-gray-600 mb-3">Construction Manager role is unfilled. Choose an action:</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-orange-600 hover:bg-orange-700"
                                  onClick={() => handleHireConstructionManager()}
                                  disabled={actionInProgress}
                                >
                                  {actionInProgress && selectedAction === 'hiring-manager' ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Hiring...
                                    </>
                                  ) : (
                                    <>
                                      <UserPlus className="h-3 w-3 mr-1" />
                                      Hire Alex Rodriguez
                                    </>
                                  )}
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700">
                                  <Search className="h-3 w-3 mr-1" />
                                  Find Other Candidates
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700">
                                  <Building2 className="h-3 w-3 mr-1" />
                                  Subcontract This Role
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {teamAssemblyData.currentStepData.id === 2 && (
                        <div className="space-y-4">
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                              <Send className="h-4 w-4 mr-2" />
                              Scope Distribution Options
                            </h4>
                            <div className="space-y-3">
                              <div className="p-3 bg-white rounded-lg border border-blue-100">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900">Review & Send Scope</h5>
                                  <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Review scope details then send to subcontractors</p>
                                <Button 
                                  size="sm" 
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                  onClick={() => handleReviewScope()}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Review & Send Scope
                                </Button>
                              </div>
                              
                              <div className="p-3 bg-white rounded-lg border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium text-gray-900">Send Scope Directly</h5>
                                  <Badge className="bg-gray-100 text-gray-800">Quick Action</Badge>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">Send scope immediately without review</p>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="w-full border-gray-200 text-gray-700"
                                  onClick={() => handleSendScope()}
                                  disabled={actionInProgress}
                                >
                                  {actionInProgress && selectedAction === 'sending-scope' ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Sending...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="h-3 w-3 mr-1" />
                                      Send Scope Now
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {teamAssemblyData.currentStepData.id === 3 && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                            <TrendingUp className="h-4 w-4 mr-2" />
                            Team Optimization Options
                          </h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded-lg border border-green-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Optimize Team</h5>
                                <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">AI-powered team composition optimization</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  onClick={() => handleOptimizeTeam()}
                                  disabled={actionInProgress}
                                >
                                  {actionInProgress && selectedAction === 'optimizing-team' ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Optimizing...
                                    </>
                                  ) : (
                                    <>
                                      <Brain className="h-3 w-3 mr-1" />
                                      Run AI Optimization
                                    </>
                                  )}
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-green-200 text-green-700">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verify All Credentials
                                </Button>
                                <Button size="sm" variant="outline" className="w-full border-green-200 text-green-700">
                                  <CheckSquare className="h-3 w-3 mr-1" />
                                  Run Compliance Check
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {teamAssemblyData.currentStepData.id === 4 && (
                        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Final Team Assembly Options
                          </h4>
                          <div className="space-y-3">
                            <div className="p-3 bg-white rounded-lg border border-green-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Optimize Team Composition</h5>
                                <Badge className="bg-green-100 text-green-800">Recommended</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">AI analysis shows 89% team readiness with optimization opportunities</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-green-600 hover:bg-green-700"
                                  onClick={() => handleOptimizeTeam()}
                                  disabled={actionInProgress}
                                >
                                  {actionInProgress && selectedAction === 'optimizing-team' ? (
                                    <>
                                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                      Optimizing...
                                    </>
                                  ) : (
                                    <>
                                      <Brain className="h-3 w-3 mr-1" />
                                      Run AI Optimization
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-blue-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Verify Credentials & Clearances</h5>
                                <Badge className="bg-blue-100 text-blue-800">Critical</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Ensure all team members have required certifications and security clearances</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-blue-600 hover:bg-blue-700"
                                  onClick={() => console.log('Verify credentials')}
                                >
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verify All Credentials
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-purple-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Run Compliance Check</h5>
                                <Badge className="bg-purple-100 text-purple-800">Required</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Verify Davis-Bacon Act compliance and insurance requirements</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-purple-600 hover:bg-purple-700"
                                  onClick={() => console.log('Run compliance check')}
                                >
                                  <CheckSquare className="h-3 w-3 mr-1" />
                                  Run Compliance Check
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-orange-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Balance Team Workload</h5>
                                <Badge className="bg-orange-100 text-orange-800">Optimization</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Distribute work evenly across team members for optimal efficiency</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-orange-600 hover:bg-orange-700"
                                  onClick={() => console.log('Balance workload')}
                                >
                                  <BarChart3 className="h-3 w-3 mr-1" />
                                  Balance Workload
                                </Button>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-white rounded-lg border border-yellow-100">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-medium text-gray-900">Identify Backup Personnel</h5>
                                <Badge className="bg-yellow-100 text-yellow-800">Risk Mitigation</Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">Assign backup team members for critical roles</p>
                              <div className="space-y-2">
                                <Button 
                                  size="sm" 
                                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                                  onClick={() => console.log('Assign backups')}
                                >
                                  <Users className="h-3 w-3 mr-1" />
                                  Assign Backup Personnel
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 