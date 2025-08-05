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
  Hash as HashIcon8,
  Hash as HashIcon9,
  Hash as HashIcon10
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

          <TabsContent value="subcontractors" className="space-y-6">
            {renderSubcontractorsTab()}
          </TabsContent>

          {/* Add other tab contents here */}
        </Tabs>
      </div>
    </div>
  )
} 