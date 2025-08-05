'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { 
  Users, 
  UserCheck, 
  UserX, 
  UserPlus, 
  Building2, 
  Target, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star, 
  TrendingUp, 
  BarChart3, 
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
  ChevronLeft,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  ArrowDownLeft,
  ArrowUpLeft,
  Move,
  RotateCcw,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
  Camera,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Headphones,
  Speaker,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
  Music,
  Music2,
  SkipBack,
  Rewind,
  FastForward,
  Shuffle,
  Repeat,
  Repeat1,
  List,
  Grid,
  Columns,
  Rows,
  Layout,
  Sidebar,
  SidebarClose,
  SidebarOpen,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  ListOrdered,
  ListChecks,
  Indent,
  Outdent,
  AlignStartVertical,
  AlignCenterVertical,
  AlignEndVertical,
  AlignStartHorizontal,
  AlignCenterHorizontal,
  AlignEndHorizontal,
  Space,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Text,
  TextQuote,
  Hash,
  Link,
  Link2,
  Image,
  ImageOff,
  ImagePlus,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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

interface Subcontractor {
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

export default function TeamAssemblyPage() {
  const [spiritAnalysis, setSpiritAnalysis] = useState<SpiritTeamAnalysis>({
    isProcessing: false,
    progress: 0,
    currentPhase: '',
    teamReadiness: 0,
    gaps: { critical: [], high: [], medium: [] },
    recommendations: { internal: [], subcontractor: [], strategic: [] },
    automatedActions: { completed: [], inProgress: [], pending: [] }
  })

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      title: 'Senior Cloud Architect',
      email: 'sarah.johnson@company.com',
      phone: '(555) 123-4567',
      location: 'Washington, DC',
      skills: ['AWS', 'Azure', 'Cloud Migration', 'DevOps', 'Security'],
      experience: 8,
      clearance: 'Secret',
      availability: 'available',
      rate: 125,
      matchScore: 95,
      status: 'assigned',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      badges: ['Project Manager', 'SECRET Clearance']
    },
    {
      id: '2',
      name: 'Michael Chen',
      title: 'Security Engineer',
      email: 'michael.chen@company.com',
      phone: '(555) 234-5678',
      location: 'Arlington, VA',
      skills: ['FISMA', 'FedRAMP', 'Security Controls', 'Compliance'],
      experience: 6,
      clearance: 'Top Secret',
      availability: 'available',
      rate: 110,
      matchScore: 88,
      status: 'assigned',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      badges: ['Security Lead']
    },
    {
      id: '3',
      name: 'Jennifer Davis',
      title: 'Project Manager',
      email: 'jennifer.davis@company.com',
      phone: '(555) 345-6789',
      location: 'Alexandria, VA',
      skills: ['PMP', 'Agile', 'Federal Contracts', 'Risk Management'],
      experience: 10,
      clearance: 'Secret',
      availability: 'partially',
      rate: 95,
      matchScore: 92,
      status: 'assigned',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      badges: ['PMP Certified', 'Agile Lead'],
      // Note: This matches the mockup where Sarah has an orange dot warning
    },
    {
      id: '4',
      name: 'James Wilson',
      title: 'Proposal Writer',
      email: 'james.wilson@company.com',
      phone: '(555) 456-7890',
      location: 'Reston, VA',
      skills: ['Technical Writing', 'Federal Proposals', 'Compliance'],
      experience: 7,
      clearance: 'Public Trust',
      availability: 'available',
      rate: 85,
      matchScore: 89,
      status: 'assigned',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      badges: ['Technical Writer']
    }
  ])

  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([
    {
      id: 'sub1',
      name: 'Gun HVAC',
      type: 'HVAC Contractor',
      specialties: ['HVAC Installation', 'System Maintenance', 'Controls'],
      pastPerformance: 4.8,
      priceCompetitiveness: 85,
      availability: 'high',
      certifications: ['NAICS 238220', 'Licensed HVAC'],
      location: 'Reston, VA',
      contact: {
        name: 'Paul Johnson',
        email: 'p.johnson@gunhvac.com',
        phone: '(555) 456-7890'
      },
      matchScore: 87,
      status: 'approved',
      bidStatus: 'approved',
      assignedWork: {
        scopeItems: ['HVAC System Removal', 'New HVAC Installation', 'Controls Integration'],
        estimatedValue: 450000,
        timeline: '8 weeks',
        requirements: ['OSHA 10 certification', 'HVAC license', 'EPA certification']
      },
      pricing: {
        proposedAmount: 450000,
        laborRates: { 'HVAC Technician': 85, 'Controls Specialist': 95, 'Helper': 45 },
        materials: 280000,
        overhead: 45000,
        profit: 80000
      },
      compliance: {
        insurance: true,
        bonding: true,
        certifications: ['OSHA 10', 'HVAC License', 'EPA 608'],
        clearances: ['Public Trust']
      },
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      logo: 'GUNN',
      teamMembers: [
        {
          name: 'Paul',
          role: 'HVAC Technician',
          avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
          status: 'approved'
        },
        {
          name: 'Thomas',
          role: 'Safety Officer',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          status: 'needs-review'
        }
      ]
    },
    {
      id: 'sub2',
      name: 'Bregman Electric',
      type: 'Electrical Contractor',
      specialties: ['Electrical Installation', 'Wiring', 'Controls'],
      pastPerformance: 4.6,
      priceCompetitiveness: 78,
      availability: 'medium',
      certifications: ['NAICS 238210', 'Licensed Electrician'],
      location: 'Bethesda, MD',
      contact: {
        name: 'Lisa Rodriguez',
        email: 'l.rodriguez@bregmanelectric.com',
        phone: '(555) 567-8901'
      },
      matchScore: 82,
      status: 'selected',
      bidStatus: 'submitted',
      assignedWork: {
        scopeItems: ['Electrical Integration', 'Panel Upgrades', 'Wiring Installation'],
        estimatedValue: 280000,
        timeline: '6 weeks',
        requirements: ['Electrical license', 'NEC knowledge', 'Safety training']
      },
      pricing: {
        proposedAmount: 280000,
        laborRates: { 'Electrician': 75, 'Journeyman': 65, 'Helper': 40 },
        materials: 180000,
        overhead: 28000,
        profit: 52000
      },
      compliance: {
        insurance: true,
        bonding: true,
        certifications: ['Electrical License', 'NEC Training'],
        clearances: ['Public Trust']
      },
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      logo: '⚡',
      teamMembers: [
        {
          name: 'Natalie',
          role: 'Electrician',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
          status: 'pending'
        },
        {
          name: 'Jacob',
          role: 'Journeyman',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          status: 'approved'
        }
      ]
    },
    {
      id: 'sub3',
      name: 'Carroll Plumbing',
      type: 'Plumbing Contractor',
      specialties: ['Plumbing Installation', 'Pipe Systems', 'Fixtures'],
      pastPerformance: 4.7,
      priceCompetitiveness: 82,
      availability: 'high',
      certifications: ['NAICS 238220', 'Licensed Plumber'],
      location: 'Arlington, VA',
      contact: {
        name: 'David Chen',
        email: 'd.chen@carrollplumbing.com',
        phone: '(555) 678-9012'
      },
      matchScore: 85,
      status: 'contracted',
      bidStatus: 'approved',
      assignedWork: {
        scopeItems: ['Plumbing Integration', 'Condensate Lines', 'Water Connections'],
        estimatedValue: 180000,
        timeline: '4 weeks',
        requirements: ['Plumbing license', 'Local code knowledge', 'Safety training']
      },
      pricing: {
        proposedAmount: 180000,
        laborRates: { 'Plumber': 70, 'Helper': 35 },
        materials: 120000,
        overhead: 18000,
        profit: 32000
      },
      compliance: {
        insurance: true,
        bonding: true,
        certifications: ['Plumbing License', 'Local Code Training'],
        clearances: ['Public Trust']
      },
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      logo: 'C',
      teamMembers: [
        {
          name: 'Matthew',
          role: 'Plumber',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          status: 'approved'
        },
        {
          name: 'Olivia',
          role: 'Plumbing Helper',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
          status: 'approved'
        }
      ]
    }
  ])

  const [roleRequirements, setRoleRequirements] = useState<RoleRequirement[]>([
    {
      id: 'role1',
      title: 'Cloud Migration Lead',
      description: 'Lead the migration of legacy systems to cloud infrastructure',
      requiredSkills: ['AWS/Azure', 'Cloud Migration', 'DevOps'],
      experience: 7,
      clearance: 'Secret',
      hours: 1920,
      priority: 'critical',
      status: 'filled',
      assignedTo: '1'
    },
    {
      id: 'role2',
      title: 'Security Compliance Specialist',
      description: 'Ensure FedRAMP and FISMA compliance throughout the project',
      requiredSkills: ['FedRAMP', 'FISMA', 'Security Controls'],
      experience: 5,
      clearance: 'Top Secret',
      hours: 1440,
      priority: 'critical',
      status: 'filled',
      assignedTo: '2'
    },
    {
      id: 'role3',
      title: 'Project Manager',
      description: 'Manage project timeline, budget, and stakeholder communications',
      requiredSkills: ['PMP', 'Federal Contracts', 'Risk Management'],
      experience: 8,
      clearance: 'Secret',
      hours: 1920,
      priority: 'high',
      status: 'filled',
      assignedTo: '3'
    },
    {
      id: 'role4',
      title: 'Training Coordinator',
      description: 'Develop and deliver training materials for end users',
      requiredSkills: ['Training Development', 'Change Management', 'VA Systems'],
      experience: 4,
      clearance: 'Public Trust',
      hours: 960,
      priority: 'medium',
      status: 'gap'
    }
  ])

  const [userQuestion, setUserQuestion] = useState('')
  const [isAskingSpirit, setIsAskingSpirit] = useState(false)
  const [showScopeModal, setShowScopeModal] = useState(false)
  const [showHiringModal, setShowHiringModal] = useState(false)
  const [showReplacementModal, setShowReplacementModal] = useState(false)
  const [selectedAction, setSelectedAction] = useState<string | null>(null)
  const [actionInProgress, setActionInProgress] = useState(false)
  const [showScenarioSimulator, setShowScenarioSimulator] = useState(false)
  const [currentScenario, setCurrentScenario] = useState<string>('baseline')
  const [scenarioResults, setScenarioResults] = useState<any>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [scopeData, setScopeData] = useState<{
    projectTitle: string
    projectNumber: string
    agency: string
    location: string
    estimatedValue: string
    projectTimeline: string
    scopeItems: Array<{
      id: string
      title: string
      description: string
      quantity: string
      estimatedHours: number
      requirements: string[]
    }>
    specialRequirements: string[]
    complianceRequirements: string[]
    deliverables: string[]
    timeline: Record<string, string>
  } | null>(null)
  const [selectedSubcontractors, setSelectedSubcontractors] = useState<string[]>([])
  const [scopeApproved, setScopeApproved] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [workflowProgress, setWorkflowProgress] = useState(0)
  const [showStepModal, setShowStepModal] = useState(false)
  const [currentStepData, setCurrentStepData] = useState<any>(null)
  const [aiSuggestions, setAiSuggestions] = useState<any>(null)
  const [autoProcessing, setAutoProcessing] = useState(false)
  const [showCandidateModal, setShowCandidateModal] = useState(false)
  const [candidateType, setCandidateType] = useState<'safety-officer' | 'construction-manager' | null>(null)
  const [availableCandidates, setAvailableCandidates] = useState<any[]>([])
  const [selectedCandidates, setSelectedCandidates] = useState<{
    'safety-officer': any | null
    'construction-manager': any | null
  }>({
    'safety-officer': null,
    'construction-manager': null
  })
  const [satisfactionStates, setSatisfactionStates] = useState<{
    'safety-officer': 'pending' | 'satisfied' | 'modifying'
    'construction-manager': 'pending' | 'satisfied' | 'modifying'
  }>({
    'safety-officer': 'pending',
    'construction-manager': 'pending'
  })

  // Start Spirit AI Team Analysis
  const startTeamAnalysis = async () => {
    setSpiritAnalysis(prev => ({ ...prev, isProcessing: true, progress: 0 }))
    
    const phases = [
      'Analyzing role requirements and skill gaps...',
      'Evaluating internal team capabilities...',
      'Identifying critical personnel gaps...',
      'Analyzing subcontractor options...',
      'Generating team optimization recommendations...',
      'Creating automated team assembly plan...'
    ]

    for (let i = 0; i < phases.length; i++) {
      setSpiritAnalysis(prev => ({ 
        ...prev, 
        currentPhase: phases[i],
        progress: ((i + 1) / phases.length) * 100
      }))
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    // Finalize analysis
    await new Promise(resolve => setTimeout(resolve, 2000))

    setSpiritAnalysis(prev => ({
      ...prev,
      isProcessing: false,
      teamReadiness: 82,
      gaps: {
        critical: [
          'Safety Officer from Gun HVAC lacks valid OSHA certification',
          'Construction Manager role uncovered - critical gap'
        ],
        high: [
          'Need additional cloud security expertise',
          'Require backup personnel for critical roles'
        ],
        medium: [
          'Consider adding change management specialist',
          'Evaluate additional subcontractor options'
        ]
      },
      recommendations: {
        internal: [
          'Assign Sarah Johnson as Cloud Migration Lead (95% match)',
          'Assign Michael Chen as Security Compliance Specialist (88% match)',
          'Assign Jennifer Davis as Project Manager (92% match)'
        ],
        subcontractor: [
          'Select Gun HVAC for HVAC work (87% match)',
          'Consider Bregman Electric for electrical work (82% match)',
          'Select Carroll Plumbing for plumbing work (85% match)'
        ],
        strategic: [
          'Focus on technical excellence given 40% evaluation weight',
          'Emphasize team VA experience in proposal',
          'Consider value-added services to differentiate'
        ]
      },
      automatedActions: {
        completed: [
          'Role requirements analyzed and mapped',
          'Internal team capabilities evaluated',
          'Skill gaps identified and prioritized',
          'Subcontractor options analyzed',
          'Team readiness score calculated (82%)'
        ],
        inProgress: [
          'Subcontractor selection optimization',
          'Team composition validation'
        ],
        pending: [
          'Final team assembly approval',
          'Subcontractor agreement preparation'
        ]
      }
    }))
  }

  const askSpirit = async () => {
    if (!userQuestion.trim()) return
    
    setIsAskingSpirit(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const newRecommendation = `Q: ${userQuestion}\nA: Based on my team analysis, I've identified an 82% team readiness score with 2 critical gaps. I recommend addressing the Safety Officer certification issue and filling the Construction Manager role. The current team has strong technical capabilities but needs compliance verification.`
    
    setSpiritAnalysis(prev => ({
      ...prev,
      recommendations: {
        ...prev.recommendations,
        strategic: [...prev.recommendations.strategic, newRecommendation]
      }
    }))
    
    setUserQuestion('')
    setIsAskingSpirit(false)
  }

  // Action Handlers
  const handleSendScope = async () => {
    setActionInProgress(true)
    setSelectedAction('sending-scope')
    
    // Simulate sending scope of work
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update subcontractor status
    setSubcontractors(prev => prev.map(sub => 
      sub.status === 'selected' ? { ...sub, status: 'evaluating' } : sub
    ))
    
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 2
    completeStep(2)
  }

  const handleReviewScope = async () => {
    // Close any open modals first
    setShowStepModal(false)
    setShowCandidateModal(false)
    
    // Prepare scope data for review
    const scopeData = {
      projectTitle: 'HVAC Replacement at MVA Westminster Branch',
      projectNumber: 'VA-2024-001',
      agency: 'Department of Veterans Affairs',
      location: 'Westminster, MD',
      estimatedValue: '$1,250,000',
      projectTimeline: '12 months',
      scopeItems: [
        {
          id: '1',
          title: 'HVAC System Removal',
          description: 'Complete removal of existing HVAC systems including ductwork, units, and controls',
          quantity: '1 system',
          estimatedHours: 160,
          requirements: ['OSHA 10 certification', 'HVAC license', 'Safety equipment']
        },
        {
          id: '2',
          title: 'New HVAC Installation',
          description: 'Installation of new energy-efficient HVAC system with modern controls',
          quantity: '1 system',
          estimatedHours: 320,
          requirements: ['HVAC license', 'EPA certification', 'Controls experience']
        },
        {
          id: '3',
          title: 'Electrical Integration',
          description: 'Electrical work for new HVAC system including wiring and panel upgrades',
          quantity: '1 system',
          estimatedHours: 120,
          requirements: ['Electrical license', 'NEC knowledge', 'Safety training']
        },
        {
          id: '4',
          title: 'Plumbing Integration',
          description: 'Plumbing work for HVAC system including condensate lines and water connections',
          quantity: '1 system',
          estimatedHours: 80,
          requirements: ['Plumbing license', 'Local code knowledge', 'Safety training']
        }
      ],
      specialRequirements: [
        'All work must be performed during non-business hours (6 PM - 6 AM)',
        'Security clearance required for all personnel',
        'Daily safety meetings required',
        'All materials must be approved by VA facilities manager',
        'Progress reports due weekly',
        'Final inspection by VA engineering team required'
      ],
      complianceRequirements: [
        'Davis-Bacon Act compliance required',
        'All personnel must be US citizens',
        'Drug testing required for all workers',
        'Background checks required',
        'Insurance: $2M general liability, $1M auto, $1M workers comp'
      ],
      deliverables: [
        'Complete HVAC system installation',
        'As-built drawings and documentation',
        'Operation and maintenance manuals',
        'Training for VA facilities staff',
        'Warranty documentation',
        'Final inspection report'
      ],
      timeline: {
        mobilization: '2 weeks',
        removal: '4 weeks',
        installation: '8 weeks',
        testing: '2 weeks',
        closeout: '2 weeks'
      }
    }

    setScopeData(scopeData)
    setSelectedSubcontractors(subcontractors.filter(sub => sub.status === 'selected').map(sub => sub.id))
    setShowScopeModal(true)
  }

  const handleReplaceMember = async (memberName: string, replacementName?: string) => {
    setActionInProgress(true)
    setSelectedAction('replacing-member')
    
    // Simulate replacement process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Update team member status - replace Thomas with Sarah Mitchell
    setSubcontractors(prev => prev.map(sub => ({
      ...sub,
      teamMembers: sub.teamMembers.map(member => 
        member.name === memberName 
          ? { 
              name: replacementName || 'Sarah Mitchell',
              role: 'Safety Officer',
              avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
              status: 'approved' as const
            }
          : member
      )
    })))
    
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 1 if both critical actions are done
    if (memberName === 'Thomas') {
      completeStep(1)
    }
  }

  const handleHireConstructionManager = async () => {
    setActionInProgress(true)
    setSelectedAction('hiring-manager')
    
    // Simulate hiring process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Add new team member
    setTeamMembers(prev => [...prev, {
      id: '5',
      name: 'Alex Rodriguez',
      title: 'Construction Manager',
      email: 'alex.rodriguez@company.com',
      phone: '(555) 789-0123',
      location: 'Washington, DC',
      skills: ['Construction Management', 'Federal Projects', 'Safety'],
      experience: 12,
      clearance: 'Secret',
      availability: 'available',
      rate: 140,
      matchScore: 94,
      status: 'assigned',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      badges: ['PMP', 'OSHA Certified']
    }])
    
    // Update team readiness score
    setSpiritAnalysis(prev => ({
      ...prev,
      teamReadiness: 89
    }))
    
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 1 if both critical actions are done
    completeStep(1)
  }

  const handleRequestCertification = async (memberName: string) => {
    setActionInProgress(true)
    setSelectedAction('requesting-cert')
    
    // Simulate certification request
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setActionInProgress(false)
    setSelectedAction(null)
  }

  const handleOptimizeTeam = async () => {
    setActionInProgress(true)
    setSelectedAction('optimizing-team')
    
    // Simulate team optimization
    await new Promise(resolve => setTimeout(resolve, 2500))
    
    // Update team readiness score
    setSpiritAnalysis(prev => ({
      ...prev,
      teamReadiness: 89
    }))
    
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 3
    completeStep(3)
  }

  // Scenario Simulator Functions
  const scenarios = {
    baseline: {
      name: 'Baseline',
      description: 'Current team composition',
      teamReadiness: 82,
      cost: 1250000,
      timeline: 12,
      risk: 'medium'
    },
    aggressive: {
      name: 'Aggressive',
      description: 'Fast-track with premium resources',
      teamReadiness: 94,
      cost: 1450000,
      timeline: 8,
      risk: 'low'
    },
    conservative: {
      name: 'Conservative',
      description: 'Cost-optimized approach',
      teamReadiness: 78,
      cost: 1100000,
      timeline: 16,
      risk: 'high'
    },
    hybrid: {
      name: 'Hybrid',
      description: 'Balanced approach with mixed team',
      teamReadiness: 87,
      cost: 1300000,
      timeline: 10,
      risk: 'medium'
    }
  }

  const runScenarioSimulation = async (scenarioKey: string) => {
    setIsSimulating(true)
    setCurrentScenario(scenarioKey)
    
    // Simulate scenario analysis
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const scenario = scenarios[scenarioKey as keyof typeof scenarios]
    setScenarioResults({
      ...scenario,
      key: scenarioKey,
      recommendations: [
        `Team readiness improves to ${scenario.teamReadiness}%`,
        `Project cost: $${scenario.cost.toLocaleString()}`,
        `Timeline: ${scenario.timeline} months`,
        `Risk level: ${scenario.risk}`,
        scenarioKey === 'aggressive' ? 'Consider premium subcontractors for faster delivery' : '',
        scenarioKey === 'conservative' ? 'May need additional oversight for risk mitigation' : '',
        scenarioKey === 'hybrid' ? 'Balanced approach recommended for this project' : ''
      ].filter(Boolean)
    })
    
    setIsSimulating(false)
  }

  const applyScenario = async () => {
    if (!scenarioResults) return
    
    setActionInProgress(true)
    setSelectedAction('applying-scenario')
    
    // Simulate applying scenario changes
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update team readiness based on scenario
    setSpiritAnalysis(prev => ({
      ...prev,
      teamReadiness: scenarioResults.teamReadiness
    }))
    
    setShowScenarioSimulator(false)
    setActionInProgress(false)
    setSelectedAction(null)
  }

  const sendScopeToSubcontractors = async () => {
    setActionInProgress(true)
    setSelectedAction('sending-scope')
    
    // Simulate sending scope of work
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update subcontractor status
    setSubcontractors(prev => prev.map(sub => 
      selectedSubcontractors.includes(sub.id) ? { ...sub, status: 'evaluating' } : sub
    ))
    
    setShowScopeModal(false)
    setScopeApproved(false)
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 2
    completeStep(2)
  }

  // Workflow Steps and Guidance System
  const workflowSteps = [
    {
      id: 1,
      title: 'Resolve Critical Gaps',
      description: 'Address safety officer certification and construction manager role',
      status: 'active',
      actions: [
        {
          id: 'replace-safety-officer',
          title: 'Replace Safety Officer',
          description: 'Replace Thomas with qualified OSHA-certified personnel',
          type: 'critical',
          action: () => handleReplaceMember('Thomas')
        },
        {
          id: 'hire-construction-manager',
          title: 'Hire Construction Manager',
          description: 'Add construction manager to fill critical role',
          type: 'critical',
          action: () => handleHireConstructionManager()
        }
      ]
    },
    {
      id: 2,
      title: 'Review & Send Scope',
      description: 'Review scope of work and distribute to selected subcontractors',
      status: 'pending',
      actions: [
        {
          id: 'review-scope',
          title: 'Review & Send Scope',
          description: 'Review scope details then send to subcontractors',
          type: 'primary',
          action: () => handleReviewScope()
        },
        {
          id: 'send-scope',
          title: 'Send Scope Directly',
          description: 'Send scope immediately without review',
          type: 'secondary',
          action: () => handleSendScope()
        }
      ]
    },
    {
      id: 3,
      title: 'Verify Team Readiness',
      description: 'Ensure all team members meet requirements and are available',
      status: 'pending',
      actions: [
        {
          id: 'optimize-team',
          title: 'Optimize Team Composition',
          description: 'AI-powered team optimization and role assignment',
          type: 'primary',
          action: () => handleOptimizeTeam()
        },
        {
          id: 'verify-credentials',
          title: 'Verify Credentials',
          description: 'Check all certifications and clearances',
          type: 'secondary',
          action: () => console.log('Verify credentials')
        }
      ]
    },
    {
      id: 4,
      title: 'Complete Team Assembly',
      description: 'Final approval and move to next phase',
      status: 'pending',
      actions: [
        {
          id: 'final-approval',
          title: 'Final Team Approval',
          description: 'Review complete team and approve for next phase',
          type: 'success',
          action: () => completeTeamAssembly()
        }
      ]
    }
  ]

  const completeStep = (stepId: number) => {
    setCompletedSteps(prev => [...prev, stepId])
    setCurrentStep(prev => Math.min(prev + 1, workflowSteps.length))
    setWorkflowProgress(prev => Math.min(prev + 25, 100))
  }

  const completeTeamAssembly = async () => {
    setActionInProgress(true)
    setSelectedAction('completing-assembly')
    
    // Simulate completion process
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Update progress to 100%
    setWorkflowProgress(100)
    setCompletedSteps([1, 2, 3, 4])
    
    setActionInProgress(false)
    setSelectedAction(null)
  }

  const getStepStatus = (stepId: number) => {
    if (completedSteps.includes(stepId)) return 'completed'
    if (currentStep === stepId) return 'active'
    return 'pending'
  }

  // Enhanced Workflow Functions
  const openStepModal = async (step: any) => {
    setCurrentStepData(step)
    setShowStepModal(true)
    setAiSuggestions(null) // Reset AI suggestions to show loading state
    
    // Generate AI suggestions
    await generateAISuggestions(step)
  }

  const generateAISuggestions = async (step: any) => {
    console.log('Generating AI suggestions for step:', step.id)
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const suggestions = {
      step1: {
        title: 'AI Recommendations for Critical Gaps',
        suggestions: [
          {
            type: 'replacement',
            title: 'Replace Thomas with Sarah Mitchell',
            description: 'Sarah Mitchell has valid OSHA certification and 8 years HVAC experience',
            confidence: 94,
            action: () => handleReplaceMember('Thomas', 'Sarah Mitchell')
          },
          {
            type: 'hire',
            title: 'Hire Alex Rodriguez as Construction Manager',
            description: 'Alex has 12 years federal construction experience and PMP certification',
            confidence: 89,
            action: () => handleHireConstructionManager()
          }
        ],
        autoProcess: true
      },
      step2: {
        title: 'AI Recommendations for Scope Distribution',
        suggestions: [
          {
            type: 'scope',
            title: 'Send scope to all approved subcontractors',
            description: 'Gun HVAC and Carroll Plumbing are ready for scope distribution',
            confidence: 96,
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
    console.log('Step key:', stepKey, 'Available keys:', Object.keys(suggestions))
    
    if (suggestions[stepKey]) {
      console.log('Setting AI suggestions for step:', stepKey)
      setAiSuggestions(suggestions[stepKey])
    } else {
      console.log('Using fallback suggestions for step:', step.id)
      // Fallback for any step
      setAiSuggestions({
        title: 'AI Recommendations',
        suggestions: [
          {
            type: 'general',
            title: 'Complete this step',
            description: 'Proceed with the recommended actions for this step',
            confidence: 85,
            action: () => completeStep(step.id)
          }
        ],
        autoProcess: false
      })
    }
  }

  const handleAutoProcessing = async () => {
    setAutoProcessing(true)
    
    // Execute all AI suggestions automatically
    if (aiSuggestions) {
      for (const suggestion of aiSuggestions.suggestions) {
        await suggestion.action()
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    setAutoProcessing(false)
    setShowStepModal(false)
    completeStep(currentStep)
  }

  const handleFindCandidates = async (type: 'safety-officer' | 'construction-manager') => {
    setCandidateType(type)
    setShowCandidateModal(true)
    
    // Simulate candidate search
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    if (type === 'safety-officer') {
      setAvailableCandidates([
        {
          id: '1',
          name: 'Sarah Mitchell',
          title: 'Safety Officer',
          experience: 8,
          certifications: ['OSHA 30', 'First Aid', 'CPR'],
          availability: 'Immediate',
          rate: 85,
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
          matchScore: 94
        },
        {
          id: '2',
          name: 'David Thompson',
          title: 'Safety Specialist',
          experience: 12,
          certifications: ['OSHA 30', 'Safety Management', 'HazMat'],
          availability: '2 weeks',
          rate: 95,
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          matchScore: 87
        },
        {
          id: '3',
          name: 'Maria Garcia',
          title: 'Safety Coordinator',
          experience: 6,
          certifications: ['OSHA 10', 'Safety Training'],
          availability: '1 week',
          rate: 75,
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
          matchScore: 82
        }
      ])
    } else {
      setAvailableCandidates([
        {
          id: '1',
          name: 'Alex Rodriguez',
          title: 'Construction Manager',
          experience: 12,
          certifications: ['PMP', 'OSHA 30', 'LEED AP'],
          availability: 'Immediate',
          rate: 140,
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          matchScore: 94
        },
        {
          id: '2',
          name: 'Robert Chen',
          title: 'Senior Project Manager',
          experience: 15,
          certifications: ['PMP', 'PE', 'Safety Management'],
          availability: '3 weeks',
          rate: 160,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          matchScore: 91
        },
        {
          id: '3',
          name: 'Lisa Anderson',
          title: 'Construction Director',
          experience: 18,
          certifications: ['PMP', 'PE', 'LEED AP', 'Safety Management'],
          availability: '2 weeks',
          rate: 180,
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          matchScore: 89
        }
      ])
    }
  }

  const handleSelectCandidate = async (candidate: any) => {
    setActionInProgress(true)
    setSelectedAction('selecting-candidate')
    
    // Simulate selection process
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Store the selected candidate
    setSelectedCandidates(prev => ({
      ...prev,
      [candidateType!]: candidate
    }))
    
    // Set satisfaction state
    setSatisfactionStates(prev => ({
      ...prev,
      [candidateType!]: 'satisfied'
    }))
    
    setShowCandidateModal(false)
    setActionInProgress(false)
    setSelectedAction(null)
  }

  const handleConfirmSelections = async () => {
    setActionInProgress(true)
    setSelectedAction('confirming-selections')
    
    // Simulate confirmation process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Apply safety officer selection
    if (selectedCandidates['safety-officer']) {
      const candidate = selectedCandidates['safety-officer']
      setSubcontractors(prev => prev.map(sub => ({
        ...sub,
        teamMembers: sub.teamMembers.map(member => 
          member.name === 'Thomas' 
            ? { 
                name: candidate.name,
                role: 'Safety Officer',
                avatar: candidate.avatar,
                status: 'approved' as const
              }
            : member
        )
      })))
    }
    
    // Apply construction manager selection
    if (selectedCandidates['construction-manager']) {
      const candidate = selectedCandidates['construction-manager']
      setTeamMembers(prev => [...prev, {
        id: `cm-${candidate.id}`,
        name: candidate.name,
        title: candidate.title,
        email: `${candidate.name.toLowerCase().replace(' ', '.')}@company.com`,
        phone: '(555) 789-0123',
        location: 'Washington, DC',
        skills: ['Construction Management', 'Federal Projects', 'Safety'],
        experience: candidate.experience,
        clearance: 'Secret',
        availability: 'available',
        rate: candidate.rate,
        matchScore: candidate.matchScore,
        status: 'assigned',
        avatar: candidate.avatar,
        badges: ['PMP', 'OSHA Certified']
      }])
    }
    
    // Update team readiness score
    setSpiritAnalysis(prev => ({
      ...prev,
      teamReadiness: 89
    }))
    
    setActionInProgress(false)
    setSelectedAction(null)
    
    // Complete step 1
    completeStep(1)
  }

  const handleModifySelection = (type: 'safety-officer' | 'construction-manager') => {
    setSatisfactionStates(prev => ({
      ...prev,
      [type]: 'modifying'
    }))
    setCandidateType(type)
    setShowCandidateModal(true)
  }

  const handleRemoveSelection = (type: 'safety-officer' | 'construction-manager') => {
    setSelectedCandidates(prev => ({
      ...prev,
      [type]: null
    }))
    setSatisfactionStates(prev => ({
      ...prev,
      [type]: 'pending'
    }))
  }

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
                    {subcontractors.map((sub) => (
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
                          <div className="text-right">
                            <Badge className={
                              sub.status === 'contracted' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' :
                              sub.status === 'approved' ? 'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300' :
                              sub.status === 'selected' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300' :
                              'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300'
                            }>
                              {sub.status === 'contracted' ? 'Contracted' : 
                               sub.status === 'approved' ? 'Approved' :
                               sub.status === 'selected' ? 'Selected' : 'Under Review'}
                            </Badge>
                            <div className="text-xs text-gray-500 mt-1">
                              {sub.bidStatus === 'approved' ? '✅ Bid Approved' :
                               sub.bidStatus === 'submitted' ? '📋 Bid Submitted' :
                               sub.bidStatus === 'pending' ? '⏳ Bid Pending' : '❌ Bid Rejected'}
                            </div>
                          </div>
                        </div>
                        
                        {/* Assigned Work */}
                        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-blue-600" />
                            Assigned Work
                          </h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Scope Items:</span>
                              <span className="font-medium text-gray-900">{sub.assignedWork.scopeItems.length} items</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Value:</span>
                              <span className="font-medium text-green-600">${(sub.assignedWork.estimatedValue / 1000).toFixed(0)}K</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Timeline:</span>
                              <span className="font-medium text-blue-600">{sub.assignedWork.timeline}</span>
                            </div>
                            <div className="mt-2">
                              <div className="text-xs text-gray-500 mb-1">Scope Items:</div>
                              <div className="flex flex-wrap gap-1">
                                {sub.assignedWork.scopeItems.map((item, index) => (
                                  <Badge key={index} variant="outline" className="text-xs bg-white">
                                    {item}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Team Members */}
                        <div className="space-y-3">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Team Members</h5>
                          {sub.teamMembers.map((member, index) => (
                            <motion.div 
                              key={index} 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
                            >
                              <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm mr-3">
                                  <img 
                                    src={member.avatar} 
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-semibold text-gray-900">{member.name}</div>
                                  <div className="text-sm text-gray-600">{member.role}</div>
                                </div>
                              </div>
                              <Badge className={
                                member.status === 'approved' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300' :
                                member.status === 'pending' ? 'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300' :
                                'bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300'
                              }>
                                {member.status === 'approved' ? 'Approved' : 
                                 member.status === 'pending' ? 'Pending' : 'Needs Review'}
                              </Badge>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>

                {/* Critical Gaps */}
                <Card className="p-8 bg-gradient-to-br from-white to-red-50/30 border-0 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Critical Gaps Identified
                  </h3>
                  <div className="space-y-4">
                    {spiritAnalysis.gaps.critical.map((gap, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start p-4 bg-gradient-to-r from-red-50 to-red-100/50 rounded-xl border border-red-200 shadow-sm"
                      >
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                          <AlertTriangle className="h-4 w-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <span className="text-red-800 font-medium">{gap}</span>
                          <div className="mt-2 flex space-x-2">
                            <Badge className="bg-red-100 text-red-800 border border-red-300 text-xs">
                              Critical Priority
                            </Badge>
                            <Badge className="bg-orange-100 text-orange-800 border border-orange-300 text-xs">
                              Immediate Action Required
                            </Badge>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Start Analysis Prompt */}
            {!spiritAnalysis.isProcessing && spiritAnalysis.progress === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-8 text-center">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Intelligent Team Assembly
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Spirit AI will analyze role requirements, evaluate team capabilities, identify gaps, and recommend optimal team composition and subcontractor selection.
                  </p>
                  <Button 
                    onClick={startTeamAnalysis}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-4"
                  >
                    <Bot className="h-5 w-5 mr-2" />
                    Start Team Analysis
                  </Button>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Spirit AI Assistant */}
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900">Spirit AI Assistant</h3>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">Team readiness: 82% with 2 critical gaps identified</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">Recommend Gun HVAC for HVAC work</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">Safety Officer certification needs immediate attention</p>
                </div>
              </div>
              
              {/* Ask Spirit AI */}
              <div className="space-y-3">
                <Textarea
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ask Spirit AI about team assembly..."
                  className="min-h-[80px] resize-none"
                />
                <Button 
                  onClick={askSpirit}
                  disabled={!userQuestion.trim() || isAskingSpirit}
                  className="w-full"
                  size="sm"
                >
                  {isAskingSpirit ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Spirit is thinking...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Ask Spirit AI
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Guided Workflow */}
            <Card className="p-6 bg-gradient-to-br from-white to-purple-50/30 border-0 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <Workflow className="h-5 w-5 mr-2 text-purple-600" />
                  Team Assembly Workflow
                </h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-purple-600">{workflowProgress}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${workflowProgress}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {workflowSteps.map((step, index) => (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border transition-all duration-300 ${
                      getStepStatus(step.id) === 'completed' 
                        ? 'bg-gradient-to-r from-green-50 to-green-100/50 border-green-200' 
                        : getStepStatus(step.id) === 'active'
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100/50 border-purple-200 shadow-md'
                        : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start">
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          getStepStatus(step.id) === 'completed' 
                            ? 'bg-green-100' 
                            : getStepStatus(step.id) === 'active'
                            ? 'bg-purple-100'
                            : 'bg-gray-100'
                        }`}>
                          {getStepStatus(step.id) === 'completed' ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : getStepStatus(step.id) === 'active' ? (
                            <div className="h-4 w-4 bg-purple-600 rounded-full animate-pulse"></div>
                          ) : (
                            <div className="h-4 w-4 bg-gray-400 rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h4 className={`font-semibold mb-1 ${
                            getStepStatus(step.id) === 'completed' 
                              ? 'text-green-900' 
                              : getStepStatus(step.id) === 'active'
                              ? 'text-purple-900'
                              : 'text-gray-500'
                          }`}>
                            Step {step.id}: {step.title}
                          </h4>
                          <p className={`text-sm ${
                            getStepStatus(step.id) === 'completed' 
                              ? 'text-green-700' 
                              : getStepStatus(step.id) === 'active'
                              ? 'text-purple-700'
                              : 'text-gray-500'
                          }`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                      <Badge className={
                        getStepStatus(step.id) === 'completed' 
                          ? 'bg-green-100 text-green-800 border border-green-300' 
                          : getStepStatus(step.id) === 'active'
                          ? 'bg-purple-100 text-purple-800 border border-purple-300'
                          : 'bg-gray-100 text-gray-600 border border-gray-300'
                      }>
                        {getStepStatus(step.id) === 'completed' ? 'Completed' : 
                         getStepStatus(step.id) === 'active' ? 'Active' : 'Pending'}
                      </Badge>
                    </div>
                    
                                         {/* Actions */}
                     {getStepStatus(step.id) === 'active' && (
                       <div className="space-y-2">
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
                             {/* Animated background effect */}
                             <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                             
                             {/* Icon with glow effect */}
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
                           
                           {/* Subtle pulse animation for active steps */}
                           <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400/20 to-blue-400/20 animate-pulse pointer-events-none"></div>
                         </motion.div>
                         
                         <div className="text-xs text-gray-500 text-center px-2">
                           Spirit AI will analyze this step and provide intelligent recommendations
                         </div>
                       </div>
                     )}
                  </motion.div>
                ))}
              </div>
              
              {/* Next Phase Button */}
              {workflowProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                >
                  <div className="text-center">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-green-900 mb-2">Team Assembly Complete!</h4>
                    <p className="text-sm text-green-700 mb-4">Your team is ready for the next phase</p>
                    <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Proceed to Pricing & Cost Analysis
                    </Button>
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Quick Actions */}
            <Card className="p-6 bg-gradient-to-br from-white to-yellow-50/30 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-600" />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button className="w-full justify-start bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-800 hover:text-yellow-900 shadow-sm">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate LOI Templates
                  </Button>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button className="w-full justify-start bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-800 hover:text-yellow-900 shadow-sm">
                    <DollarSign className="h-4 w-4 mr-2" />
                    Request Pricing
                  </Button>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button className="w-full justify-start bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-800 hover:text-yellow-900 shadow-sm">
                    <Shield className="h-4 w-4 mr-2" />
                    Verify Credentials
                  </Button>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button className="w-full justify-start bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-800 hover:text-yellow-900 shadow-sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Interviews
                  </Button>
                </motion.div>
                <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                  <Button className="w-full justify-start bg-white hover:bg-yellow-50 border border-yellow-200 text-yellow-800 hover:text-yellow-900 shadow-sm">
                    <CheckSquare className="h-4 w-4 mr-2" />
                    Run Compliance Check
                  </Button>
                </motion.div>
              </div>
            </Card>

            {/* Team Optimization */}
            <Card className="p-6 bg-gradient-to-br from-white to-green-50/30 border-0 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Team Optimization
              </h3>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl border border-green-200 shadow-sm"
                >
                  <div className="flex items-start mb-3">
                    <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <GitBranch className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-green-800 font-medium">Split HVAC across two subcontractors</p>
                      <p className="text-xs text-green-600 mt-1">For schedule optimization</p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700 shadow-sm">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Second Sub
                  </Button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-4 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl border border-purple-200 shadow-sm"
                >
                  <div className="flex items-start mb-3">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3 flex-shrink-0">
                      <Brain className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-purple-800 font-medium">Optimize team composition</p>
                      <p className="text-xs text-purple-600 mt-1">AI can suggest better role assignments</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-purple-600 hover:bg-purple-700 shadow-sm"
                    onClick={handleOptimizeTeam}
                    disabled={actionInProgress}
                  >
                    {actionInProgress && selectedAction === 'optimizing-team' ? (
                      <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                    ) : (
                      <Brain className="h-3 w-3 mr-1" />
                    )}
                    Optimize Now
                  </Button>
                </motion.div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scope Review Modal */}
      <AnimatePresence>
        {showScopeModal && scopeData && (
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
              className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Scope of Work Review</h2>
                    <p className="text-blue-100">Review and approve scope before sending to subcontractors</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowScopeModal(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(95vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Project Overview */}
                    <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-600">Project</div>
                          <div className="font-semibold text-gray-900">{scopeData.projectTitle}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Number</div>
                          <div className="font-semibold text-gray-900">{scopeData.projectNumber}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Agency</div>
                          <div className="font-semibold text-gray-900">{scopeData.agency}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Location</div>
                          <div className="font-semibold text-gray-900">{scopeData.location}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Value</div>
                          <div className="font-semibold text-blue-600">{scopeData.estimatedValue}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">Timeline</div>
                          <div className="font-semibold text-purple-600">{scopeData.projectTimeline}</div>
                        </div>
                      </div>
                    </Card>

                    {/* Scope Items */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Scope of Work Items</h3>
                      <div className="space-y-4">
                        {scopeData.scopeItems.map((item: any, index: number) => (
                          <div key={item.id} className="p-4 bg-gray-50 rounded-lg border-l-4 border-blue-400">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{item.title}</h4>
                              <Badge className="bg-blue-100 text-blue-800">{item.estimatedHours} hours</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-medium text-gray-700 mb-1">Quantity</div>
                                <div className="text-sm text-gray-600">{item.quantity}</div>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-700 mb-1">Requirements</div>
                                <div className="flex flex-wrap gap-1">
                                  {item.requirements.map((req: string, reqIndex: number) => (
                                    <Badge key={reqIndex} variant="outline" className="text-xs">
                                      {req}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Special Requirements */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Requirements</h3>
                      <div className="space-y-2">
                        {scopeData.specialRequirements.map((req: string, index: number) => (
                          <div key={index} className="flex items-start p-2 bg-orange-50 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-orange-800">{req}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Compliance Requirements */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Requirements</h3>
                      <div className="space-y-2">
                        {scopeData.complianceRequirements.map((req: string, index: number) => (
                          <div key={index} className="flex items-start p-2 bg-green-50 rounded-lg">
                            <Shield className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-green-800">{req}</span>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Deliverables */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Deliverables</h3>
                      <div className="space-y-2">
                        {scopeData.deliverables.map((deliverable: string, index: number) => (
                          <div key={index} className="flex items-start p-2 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-blue-800">{deliverable}</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Timeline */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Timeline</h3>
                      <div className="space-y-3">
                        {Object.entries(scopeData.timeline).map(([phase, duration]) => (
                          <div key={phase} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                            <span className="text-sm font-medium text-gray-700 capitalize">{phase}</span>
                            <Badge className="bg-gray-100 text-gray-800">{duration}</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Selected Subcontractors */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipients</h3>
                      <div className="space-y-3">
                        {subcontractors
                          .filter(sub => selectedSubcontractors.includes(sub.id))
                          .map(sub => (
                            <div key={sub.id} className="flex items-center p-3 bg-blue-50 rounded-lg">
                              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <span className="text-blue-600 font-bold text-sm">{sub.logo}</span>
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{sub.name}</div>
                                <div className="text-sm text-gray-600">{sub.type}</div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Card>

                    {/* Approval Actions */}
                    <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Scope Review Complete</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-2 bg-white/50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                          <span className="text-sm text-gray-700">Scope reviewed and approved</span>
                        </div>
                        <div className="flex items-center p-2 bg-white/50 rounded-lg">
                          <Users className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm text-gray-700">{selectedSubcontractors.length} subcontractors selected</span>
                        </div>
                        <div className="flex items-center p-2 bg-white/50 rounded-lg">
                          <FileText className="h-4 w-4 text-purple-600 mr-2" />
                          <span className="text-sm text-gray-700">All requirements documented</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 space-y-3">
                        <Button
                          onClick={() => {
                            setShowScopeModal(false)
                            // After closing modal, automatically trigger send scope
                            setTimeout(() => handleSendScope(), 500)
                          }}
                          disabled={actionInProgress}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          {actionInProgress && selectedAction === 'sending-scope' ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Sending Scope to Subcontractors...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 mr-2" />
                              Send Scope to Subcontractors
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setShowScopeModal(false)}
                          className="w-full"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Close Review
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step Details Modal */}
      <AnimatePresence>
        {showStepModal && currentStepData && (
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
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">Step {currentStepData.id}: {currentStepData.title}</h2>
                    <p className="text-purple-100">{currentStepData.description}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowStepModal(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* AI Suggestions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-purple-600" />
                      Spirit AI Recommendations
                    </h3>
                    
                    {aiSuggestions ? (
                      <div className="space-y-4">
                        {aiSuggestions.suggestions.map((suggestion: any, index: number) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-purple-900">{suggestion.title}</h4>
                              <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
                                {suggestion.confidence}% confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-purple-700 mb-4">{suggestion.description}</p>
                            <Button
                              size="sm"
                              className="bg-purple-600 hover:bg-purple-700"
                              onClick={suggestion.action}
                              disabled={actionInProgress}
                            >
                              {actionInProgress ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              )}
                              Apply This Recommendation
                            </Button>
                          </motion.div>
                        ))}
                        
                        {aiSuggestions.autoProcess && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                          >
                            <div className="flex items-center mb-3">
                              <Zap className="h-5 w-5 mr-2 text-green-600" />
                              <h4 className="font-semibold text-green-900">Auto-Processing Available</h4>
                            </div>
                            <p className="text-sm text-green-700 mb-4">
                              Spirit AI can automatically execute all recommendations for this step.
                            </p>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                              onClick={handleAutoProcessing}
                              disabled={autoProcessing}
                            >
                              {autoProcessing ? (
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                              ) : (
                                <Zap className="h-3 w-3 mr-1" />
                              )}
                              {autoProcessing ? 'Processing...' : 'Auto-Process All'}
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    ) : (
                      <div className="p-6 bg-gray-50 rounded-xl text-center">
                        <Loader2 className="h-8 w-8 text-gray-400 mx-auto mb-2 animate-spin" />
                        <p className="text-gray-600">Spirit AI is analyzing options...</p>
                      </div>
                    )}
                  </div>

                  {/* Manual Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <Settings className="h-5 w-5 mr-2 text-blue-600" />
                      Manual Options
                    </h3>
                    
                                         {currentStepData.id === 1 && (
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
                           
                           {satisfactionStates['safety-officer'] === 'satisfied' ? (
                             <div className="p-4 bg-white rounded-lg border border-green-200">
                               <div className="flex items-center mb-3">
                                 <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-green-200 mr-3">
                                   <img 
                                     src={selectedCandidates['safety-officer']?.avatar} 
                                     alt={selectedCandidates['safety-officer']?.name}
                                     className="h-full w-full object-cover"
                                   />
                                 </div>
                                 <div>
                                   <h5 className="font-semibold text-gray-900">{selectedCandidates['safety-officer']?.name}</h5>
                                   <p className="text-sm text-gray-600">{selectedCandidates['safety-officer']?.title}</p>
                                   <div className="flex items-center mt-1">
                                     <span className="text-xs text-green-600 font-medium">{selectedCandidates['safety-officer']?.matchScore}% match</span>
                                     <span className="text-xs text-gray-500 ml-2">• ${selectedCandidates['safety-officer']?.rate}/hr</span>
                                   </div>
                                 </div>
                               </div>
                               <div className="flex space-x-2">
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   className="border-green-200 text-green-700 hover:bg-green-50"
                                   onClick={() => handleModifySelection('safety-officer')}
                                 >
                                   <Edit className="h-3 w-3 mr-1" />
                                   Change Selection
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   className="border-red-200 text-red-700 hover:bg-red-50"
                                   onClick={() => handleRemoveSelection('safety-officer')}
                                 >
                                   <X className="h-3 w-3 mr-1" />
                                   Remove
                                 </Button>
                               </div>
                             </div>
                           ) : (
                             <div className="space-y-3">
                               <div className="p-3 bg-white rounded-lg border border-red-100">
                                 <div className="flex items-center justify-between mb-2">
                                   <h5 className="font-medium text-gray-900">Replace Thomas</h5>
                                   <Badge className="bg-red-100 text-red-800">Critical</Badge>
                                 </div>
                                 <p className="text-sm text-gray-600 mb-3">Replace with qualified OSHA-certified personnel</p>
                                 <div className="space-y-2">
                                   <Button size="sm" className="w-full bg-red-600 hover:bg-red-700">
                                     <UserX className="h-3 w-3 mr-1" />
                                     Replace with Sarah Mitchell (OSHA Certified)
                                   </Button>
                                   <Button 
                                     size="sm" 
                                     variant="outline" 
                                     className="w-full border-red-200 text-red-700"
                                     onClick={() => handleFindCandidates('safety-officer')}
                                   >
                                     <Search className="h-3 w-3 mr-1" />
                                     Find Other Candidates
                                   </Button>
                                   <Button size="sm" variant="outline" className="w-full border-red-200 text-red-700">
                                     <Mail className="h-3 w-3 mr-1" />
                                     Request Certification from Thomas
                                   </Button>
                                 </div>
                               </div>
                             </div>
                           )}
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
                                 <UserPlus className="h-4 w-4 mr-2" />
                               )}
                               Construction Manager Role
                             </h4>
                             {satisfactionStates['construction-manager'] === 'satisfied' && (
                               <Badge className="bg-green-100 text-green-800 border border-green-300">
                                 ✅ Filled
                               </Badge>
                             )}
                           </div>
                           
                           {satisfactionStates['construction-manager'] === 'satisfied' ? (
                             <div className="p-4 bg-white rounded-lg border border-green-200">
                               <div className="flex items-center mb-3">
                                 <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-green-200 mr-3">
                                   <img 
                                     src={selectedCandidates['construction-manager']?.avatar} 
                                     alt={selectedCandidates['construction-manager']?.name}
                                     className="h-full w-full object-cover"
                                   />
                                 </div>
                                 <div>
                                   <h5 className="font-semibold text-gray-900">{selectedCandidates['construction-manager']?.name}</h5>
                                   <p className="text-sm text-gray-600">{selectedCandidates['construction-manager']?.title}</p>
                                   <div className="flex items-center mt-1">
                                     <span className="text-xs text-green-600 font-medium">{selectedCandidates['construction-manager']?.matchScore}% match</span>
                                     <span className="text-xs text-gray-500 ml-2">• ${selectedCandidates['construction-manager']?.rate}/hr</span>
                                   </div>
                                 </div>
                               </div>
                               <div className="flex space-x-2">
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   className="border-green-200 text-green-700 hover:bg-green-50"
                                   onClick={() => handleModifySelection('construction-manager')}
                                 >
                                   <Edit className="h-3 w-3 mr-1" />
                                   Change Selection
                                 </Button>
                                 <Button 
                                   size="sm" 
                                   variant="outline" 
                                   className="border-red-200 text-red-700 hover:bg-red-50"
                                   onClick={() => handleRemoveSelection('construction-manager')}
                                 >
                                   <X className="h-3 w-3 mr-1" />
                                   Remove
                                 </Button>
                               </div>
                             </div>
                           ) : (
                             <div className="space-y-3">
                               <div className="p-3 bg-white rounded-lg border border-orange-100">
                                 <div className="flex items-center justify-between mb-2">
                                   <h5 className="font-medium text-gray-900">Hire Construction Manager</h5>
                                   <Badge className="bg-orange-100 text-orange-800">High Priority</Badge>
                                 </div>
                                 <p className="text-sm text-gray-600 mb-3">Fill critical construction manager role</p>
                                 <div className="space-y-2">
                                   <Button size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                                     <UserPlus className="h-3 w-3 mr-1" />
                                     Hire Alex Rodriguez (PMP, 12 years exp)
                                   </Button>
                                   <Button 
                                     size="sm" 
                                     variant="outline" 
                                     className="w-full border-orange-200 text-orange-700"
                                     onClick={() => handleFindCandidates('construction-manager')}
                                   >
                                     <Search className="h-3 w-3 mr-1" />
                                     Find Other Candidates
                                   </Button>
                                   <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700">
                                     <Building2 className="h-3 w-3 mr-1" />
                                     Subcontract Construction Management
                                   </Button>
                                   <Button size="sm" variant="outline" className="w-full border-orange-200 text-orange-700">
                                     <Users className="h-3 w-3 mr-1" />
                                     Assign Internal Team Member
                                   </Button>
                                 </div>
                               </div>
                             </div>
                           )}
                         </div>

                         {/* Confirmation Section */}
                         {(satisfactionStates['safety-officer'] === 'satisfied' || satisfactionStates['construction-manager'] === 'satisfied') && (
                           <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{ opacity: 1, y: 0 }}
                             className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-200"
                           >
                             <div className="flex items-center mb-3">
                               <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                               <h4 className="font-semibold text-green-900">Selections Ready</h4>
                             </div>
                             <p className="text-sm text-green-700 mb-4">
                               {satisfactionStates['safety-officer'] === 'satisfied' && satisfactionStates['construction-manager'] === 'satisfied' 
                                 ? 'Both critical gaps have been addressed. Ready to apply changes to your team.'
                                 : 'One critical gap has been addressed. You can continue or address the remaining gap.'
                               }
                             </p>
                             <Button
                               onClick={handleConfirmSelections}
                               disabled={actionInProgress}
                               className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                             >
                               {actionInProgress && selectedAction === 'confirming-selections' ? (
                                 <>
                                   <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                   Applying Changes...
                                 </>
                               ) : (
                                 <>
                                   <CheckCircle className="h-4 w-4 mr-2" />
                                   Apply Selections to Team
                                 </>
                               )}
                             </Button>
                           </motion.div>
                         )}
                       </div>
                     )}

                    {currentStepData.id === 2 && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                        <h4 className="font-semibold text-blue-900 mb-3 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          Scope Distribution Options
                        </h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-white rounded-lg border border-blue-100">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">Review & Send Scope</h5>
                              <Badge className="bg-blue-100 text-blue-800">Recommended</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Review scope details then send to selected subcontractors</p>
                            <div className="space-y-2">
                              <Button 
                                size="sm" 
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                onClick={() => handleReviewScope()}
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                Review & Send Scope
                              </Button>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-white rounded-lg border border-green-100">
                            <div className="flex items-center justify-between mb-2">
                              <h5 className="font-medium text-gray-900">Send Scope Directly</h5>
                              <Badge className="bg-green-100 text-green-800">Quick Action</Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-3">Send scope immediately without review</p>
                            <div className="space-y-2">
                              <Button 
                                size="sm" 
                                className="w-full bg-green-600 hover:bg-green-700"
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

                    {currentStepData.id === 3 && (
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
                              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                                <Brain className="h-3 w-3 mr-1" />
                                Run AI Optimization
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

                    {currentStepData.id === 4 && (
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scenario Simulator Modal */}
      <AnimatePresence>
        {showScenarioSimulator && (
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
                    <h2 className="text-2xl font-bold">Scenario Simulator</h2>
                    <p className="text-blue-100">Test different team compositions and strategies</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowScenarioSimulator(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Scenario Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Available Scenarios</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(scenarios).map(([key, scenario]) => (
                        <Card
                          key={key}
                          className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                            currentScenario === key ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                          onClick={() => runScenarioSimulation(key)}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                            <Badge className={
                              scenario.risk === 'low' ? 'bg-green-100 text-green-800' :
                              scenario.risk === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }>
                              {scenario.risk} risk
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{scenario.teamReadiness}%</div>
                              <div className="text-gray-500">Readiness</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">${(scenario.cost / 1000000).toFixed(1)}M</div>
                              <div className="text-gray-500">Cost</div>
                            </div>
                            <div className="text-center">
                              <div className="font-semibold text-gray-900">{scenario.timeline}mo</div>
                              <div className="text-gray-500">Timeline</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Results Panel */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Simulation Results</h3>
                    
                    {isSimulating && (
                      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
                        <div className="flex items-center mb-4">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
                          <h4 className="font-semibold text-blue-900">Running Simulation...</h4>
                        </div>
                        <p className="text-blue-800">Analyzing team composition and calculating outcomes</p>
                      </Card>
                    )}

                    {scenarioResults && !isSimulating && (
                      <div className="space-y-4">
                        {/* Summary Card */}
                        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-0">
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-gray-900">{scenarioResults.name} Scenario</h4>
                            <Badge className="bg-green-100 text-green-800">
                              {scenarioResults.teamReadiness}% Ready
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-blue-600">${(scenarioResults.cost / 1000000).toFixed(1)}M</div>
                              <div className="text-sm text-gray-600">Total Cost</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-purple-600">{scenarioResults.timeline}mo</div>
                              <div className="text-sm text-gray-600">Timeline</div>
                            </div>
                            <div className="text-center">
                              <div className="text-2xl font-bold text-orange-600">{scenarioResults.risk}</div>
                              <div className="text-sm text-gray-600">Risk Level</div>
                            </div>
                          </div>
                        </Card>

                        {/* Recommendations */}
                        <Card className="p-6">
                          <h4 className="font-semibold text-gray-900 mb-4">Recommendations</h4>
                          <div className="space-y-2">
                            {scenarioResults.recommendations.map((rec: string, index: number) => (
                              <div key={index} className="flex items-start p-2 bg-gray-50 rounded-lg">
                                <CheckCircle className="h-4 w-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{rec}</span>
                              </div>
                            ))}
                          </div>
                        </Card>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Button
                            onClick={applyScenario}
                            disabled={actionInProgress}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                          >
                            {actionInProgress && selectedAction === 'applying-scenario' ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Applying...
                              </>
                            ) : (
                              <>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Apply This Scenario
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => setScenarioResults(null)}
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}

                    {!scenarioResults && !isSimulating && (
                      <Card className="p-6 text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Select a scenario to run simulation</p>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Candidate Selection Modal */}
      <AnimatePresence>
        {showCandidateModal && candidateType && (
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
                    <h2 className="text-2xl font-bold">
                      {candidateType === 'safety-officer' ? 'Safety Officer' : 'Construction Manager'} Candidates
                    </h2>
                    <p className="text-blue-100">Select the best candidate for your team</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCandidateModal(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="p-6 max-h-[calc(90vh-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableCandidates.map((candidate, index) => (
                    <motion.div
                      key={candidate.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group"
                      onClick={() => handleSelectCandidate(candidate)}
                    >
                      <div className="text-center mb-4">
                        <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto mb-3 group-hover:shadow-xl transition-shadow duration-300">
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{candidate.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">{candidate.title}</p>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Experience</span>
                          <span className="font-semibold text-gray-900">{candidate.experience} years</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Rate</span>
                          <span className="font-semibold text-blue-600">${candidate.rate}/hr</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Availability</span>
                          <span className="font-semibold text-green-600">{candidate.availability}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Match Score</span>
                          <span className="font-semibold text-purple-600">{candidate.matchScore}%</span>
                        </div>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${candidate.matchScore}%` }}
                          ></div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-xs font-medium text-gray-700">Certifications:</div>
                          <div className="flex flex-wrap gap-1">
                            {candidate.certifications.map((cert: string, certIndex: number) => (
                              <Badge key={certIndex} variant="outline" className="text-xs bg-blue-50">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        disabled={actionInProgress}
                      >
                        {actionInProgress && selectedAction === 'selecting-candidate' ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Selecting...
                          </>
                        ) : (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Select This Candidate
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 