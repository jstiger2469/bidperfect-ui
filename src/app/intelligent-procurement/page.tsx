'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Filter,
  FileText,
  DollarSign,
  Target,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Edit,
  Download,
  Upload,
  Plus,
  Eye,
  Star,
  Award,
  Shield,
  Zap,
  Brain,
  Database,
  BarChart3,
  Settings,
  HelpCircle,
  BookOpen,
  GraduationCap,
  Search as SearchIcon,
  Filter as FilterIcon,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  Target as TargetIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  TrendingUp as TrendingUpIcon,
  Building2 as Building2Icon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  ExternalLink as ExternalLinkIcon,
  Edit as EditIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  Plus as PlusIcon,
  Eye as EyeIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Shield as ShieldIcon,
  Zap as ZapIcon,
  Brain as BrainIcon,
  Database as DatabaseIcon,
  BarChart3 as BarChart3Icon,
  Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon,
  BookOpen as BookOpenIcon,
  GraduationCap as GraduationCapIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface Solicitation {
  id: string;
  title: string;
  agency: string;
  jurisdiction: 'federal' | 'state' | 'parish' | 'municipal';
  portal: string;
  solicitationNumber: string;
  dueDate: string;
  value: number;
  evaluationType: 'LPTA' | 'Best Value' | 'Tradeoff';
  status: 'active' | 'closing_soon' | 'closed' | 'awarded';
  category: string;
  location: string;
  complexity: 'low' | 'medium' | 'high';
  matchScore: number;
  requirements: string[];
  documents: string[];
}

interface ProcurementModule {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: 'available' | 'in_progress' | 'completed';
  progress: number;
  category: 'pre_award' | 'pricing' | 'post_award' | 'compliance';
}

interface SpiritInsight {
  id: string;
  type: 'opportunity' | 'risk' | 'compliance' | 'strategy';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action?: string;
  actionText?: string;
}

// Mock data for intelligent procurement system
const mockSolicitations: Solicitation[] = [
  {
    id: "sol-001",
    title: "IT Modernization Services - VA Medical Center",
    agency: "Department of Veterans Affairs",
    jurisdiction: "federal",
    portal: "SAM.gov",
    solicitationNumber: "36C10B24R0001",
    dueDate: "2024-05-15T17:00:00",
    value: 2500000,
    evaluationType: "Best Value",
    status: "active",
    category: "Information Technology",
    location: "New Orleans, LA",
    complexity: "high",
    matchScore: 87,
    requirements: ["CMMI Level 3", "Top Secret Clearance", "VA Experience"],
    documents: ["RFP", "PWS", "Wage Determination", "Past Performance"]
  },
  {
    id: "sol-002",
    title: "HVAC Maintenance Services - Louisiana State University",
    agency: "Louisiana State University",
    jurisdiction: "state",
    portal: "LaGov",
    solicitationNumber: "LSU-2024-001",
    dueDate: "2024-04-30T17:00:00",
    value: 450000,
    evaluationType: "LPTA",
    status: "closing_soon",
    category: "Facilities Management",
    location: "Baton Rouge, LA",
    complexity: "medium",
    matchScore: 92,
    requirements: ["Licensed HVAC Contractor", "5+ Years Experience"],
    documents: ["ITB", "SOW", "Bid Form"]
  },
  {
    id: "sol-003",
    title: "Security Services - City of New Orleans",
    agency: "City of New Orleans",
    jurisdiction: "municipal",
    portal: "BRASS",
    solicitationNumber: "NO-2024-SEC-001",
    dueDate: "2024-05-20T17:00:00",
    value: 1800000,
    evaluationType: "Best Value",
    status: "active",
    category: "Security Services",
    location: "New Orleans, LA",
    complexity: "medium",
    matchScore: 78,
    requirements: ["Security License", "Bonding", "Insurance"],
    documents: ["RFP", "Scope of Work", "Pricing Sheet"]
  }
]

const procurementModules: ProcurementModule[] = [
  {
    id: "solicitation-review",
    name: "Solicitation Review",
    description: "Reverse engineering method for strategic solicitation analysis",
    icon: <FileTextIcon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "pre_award"
  },
  {
    id: "proposal-pricing",
    name: "Proposal Pricing Builder",
    description: "Intelligent pricing with G&A, overhead, profit, and wage determinations",
    icon: <DollarSignIcon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "pricing"
  },
  {
    id: "invoice-builder",
    name: "Invoice Builder",
    description: "FAR-compliant invoice generation with multi-jurisdiction support",
    icon: <BarChart3Icon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "post_award"
  },
  {
    id: "contract-admin",
    name: "Contract Administration",
    description: "Post-award management with compliance tracking",
    icon: <ShieldIcon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "post_award"
  },
  {
    id: "wage-determinations",
    name: "Wage Determinations",
    description: "SCA/DBA compliance with automatic rate calculations",
    icon: <UsersIcon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "compliance"
  },
  {
    id: "multi-jurisdiction",
    name: "Multi-Jurisdiction Portal",
    description: "Unified access to federal, state, parish, and municipal portals",
    icon: <DatabaseIcon className="h-6 w-6" />,
    status: "available",
    progress: 0,
    category: "pre_award"
  }
]

const spiritInsights: SpiritInsight[] = [
  {
    id: "insight-001",
    type: "opportunity",
    title: "High Match Opportunity",
    message: "LSU HVAC contract matches your capabilities with 92% alignment. Your past performance in educational facilities gives you a competitive advantage.",
    priority: "high",
    action: "view_solicitation",
    actionText: "Review Solicitation"
  },
  {
    id: "insight-002",
    type: "compliance",
    title: "Wage Determination Update",
    message: "New SCA wage determination effective July 1, 2024 for New Orleans area. Your current rates need adjustment for upcoming bids.",
    priority: "medium",
    action: "update_rates",
    actionText: "Update Rates"
  },
  {
    id: "insight-003",
    type: "risk",
    title: "Contract Closeout Due",
    message: "VA contract 36C10B23D0001 expires in 30 days. Final invoice and closeout documentation required.",
    priority: "critical",
    action: "closeout_contract",
    actionText: "Start Closeout"
  }
]

function SpiritPanel({ insight }: { insight: SpiritInsight }) {
  const getTypeStyles = () => {
    switch (insight.type) {
      case 'opportunity': return 'border-green-200 bg-green-50'
      case 'risk': return 'border-red-200 bg-red-50'
      case 'compliance': return 'border-orange-200 bg-orange-50'
      case 'strategy': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityIcon = () => {
    switch (insight.priority) {
      case 'critical': return <AlertTriangleIcon className="h-4 w-4 text-red-600" />
      case 'high': return <TrendingUpIcon className="h-4 w-4 text-orange-600" />
      case 'medium': return <ClockIcon className="h-4 w-4 text-blue-600" />
      case 'low': return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      default: return <HelpCircleIcon className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={`card-premium p-4 ${getTypeStyles()}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <BrainIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">Spirit AI</span>
              <span className="text-xs text-gray-500">Intelligent Assistant</span>
              {getPriorityIcon()}
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
            <p className="text-sm text-gray-700 mb-3">{insight.message}</p>
            {insight.action && insight.actionText && (
              <Button 
                onClick={() => console.log(insight.action)} 
                size="sm" 
                className="btn-premium"
              >
                {insight.actionText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function SolicitationCard({ solicitation }: { solicitation: Solicitation }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-ready'
      case 'closing_soon': return 'status-warning'
      case 'closed': return 'status-info'
      case 'awarded': return 'status-error'
      default: return 'status-info'
    }
  }

  const getJurisdictionColor = (jurisdiction: string) => {
    switch (jurisdiction) {
      case 'federal': return 'bg-blue-100 text-blue-800'
      case 'state': return 'bg-green-100 text-green-800'
      case 'parish': return 'bg-purple-100 text-purple-800'
      case 'municipal': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'low': return 'text-green-600'
      case 'medium': return 'text-orange-600'
      case 'high': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const daysUntilDue = Math.ceil((new Date(solicitation.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getJurisdictionColor(solicitation.jurisdiction)}>
                {solicitation.jurisdiction.toUpperCase()}
              </Badge>
              <Badge className={getStatusColor(solicitation.status)}>
                {solicitation.status.replace('_', ' ')}
              </Badge>
              <Badge variant="outline" className={getComplexityColor(solicitation.complexity)}>
                {solicitation.complexity} complexity
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{solicitation.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{solicitation.agency}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>Due: {new Date(solicitation.dueDate).toLocaleDateString()}</span>
              <span>Value: ${(solicitation.value / 1000000).toFixed(1)}M</span>
              <span>Portal: {solicitation.portal}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-1">{solicitation.matchScore}%</div>
            <div className="text-xs text-gray-500">Match Score</div>
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Evaluation Type</p>
            <p className="text-sm text-gray-600">{solicitation.evaluationType}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Requirements</p>
            <div className="flex flex-wrap gap-1">
              {solicitation.requirements.slice(0, 3).map((req, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {req}
                </Badge>
              ))}
              {solicitation.requirements.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{solicitation.requirements.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            Review
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <ExternalLinkIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function ModuleCard({ module }: { module: ProcurementModule }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-ready'
      case 'in_progress': return 'status-warning'
      case 'available': return 'status-info'
      default: return 'status-info'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              {module.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{module.name}</h3>
              <p className="text-sm text-gray-600">{module.description}</p>
            </div>
          </div>
          <Badge className={getStatusColor(module.status)}>
            {module.status.replace('_', ' ')}
          </Badge>
        </div>

        {module.status === 'in_progress' && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-medium">{module.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${module.progress}%` }}
              />
            </div>
          </div>
        )}

        <Button className="btn-premium w-full">
          <ZapIcon className="h-4 w-4 mr-2" />
          Launch Module
        </Button>
      </Card>
    </motion.div>
  )
}

export default function IntelligentProcurementPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterJurisdiction, setFilterJurisdiction] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredSolicitations = useMemo(() => {
    let filtered = mockSolicitations

    if (searchTerm) {
      filtered = filtered.filter(sol =>
        sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sol.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterJurisdiction !== 'all') {
      filtered = filtered.filter(sol => sol.jurisdiction === filterJurisdiction)
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(sol => sol.category === filterCategory)
    }

    return filtered.sort((a, b) => b.matchScore - a.matchScore)
  }, [searchTerm, filterJurisdiction, filterCategory])

  const stats = useMemo(() => {
    const total = mockSolicitations.length
    const active = mockSolicitations.filter(s => s.status === 'active').length
    const closingSoon = mockSolicitations.filter(s => s.status === 'closing_soon').length
    const totalValue = mockSolicitations.reduce((sum, s) => sum + s.value, 0)

    return { total, active, closingSoon, totalValue }
  }, [])

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Intelligent Procurement Platform
            </h1>
            <p className="text-gray-600 text-responsive-base">
              AI-powered procurement lifecycle management for government contracting
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="btn-premium">
              <PlusIcon className="h-4 w-4 mr-2" />
              New Opportunity
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Opportunities</p>
                <p className="text-2xl font-bold text-blue-600">{stats.active}</p>
              </div>
              <TargetIcon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Closing Soon</p>
                <p className="text-2xl font-bold text-orange-600">{stats.closingSoon}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${(stats.totalValue / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Avg Match Score</p>
                <p className="text-2xl font-bold text-purple-600">85%</p>
              </div>
              <TrendingUpIcon className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="dashboard" className="flex-1">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities" className="flex-1">Opportunities</TabsTrigger>
            <TabsTrigger value="modules" className="flex-1">Intelligent Modules</TabsTrigger>
            <TabsTrigger value="portals" className="flex-1">Multi-Jurisdiction</TabsTrigger>
            <TabsTrigger value="learning" className="flex-1">Learning Center</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Spirit AI Insights */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Spirit AI Insights</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {spiritInsights.map((insight) => (
                  <SpiritPanel key={insight.id} insight={insight} />
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="btn-ghost-premium h-20 flex-col">
                  <FileTextIcon className="h-6 w-6 mb-2" />
                  <span>Review Solicitation</span>
                </Button>
                <Button variant="outline" className="btn-ghost-premium h-20 flex-col">
                  <DollarSignIcon className="h-6 w-6 mb-2" />
                  <span>Build Pricing</span>
                </Button>
                <Button variant="outline" className="btn-ghost-premium h-20 flex-col">
                  <BarChart3Icon className="h-6 w-6 mb-2" />
                  <span>Create Invoice</span>
                </Button>
                <Button variant="outline" className="btn-ghost-premium h-20 flex-col">
                  <ShieldIcon className="h-6 w-6 mb-2" />
                  <span>Contract Admin</span>
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-premium p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search opportunities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <select
                    value={filterJurisdiction}
                    onChange={(e) => setFilterJurisdiction(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Jurisdictions</option>
                    <option value="federal">Federal</option>
                    <option value="state">State</option>
                    <option value="parish">Parish</option>
                    <option value="municipal">Municipal</option>
                  </select>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Categories</option>
                    <option value="Information Technology">IT</option>
                    <option value="Facilities Management">Facilities</option>
                    <option value="Security Services">Security</option>
                  </select>
                </div>
              </div>
            </Card>

            {/* Opportunities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSolicitations.map((solicitation) => (
                <SolicitationCard key={solicitation.id} solicitation={solicitation} />
              ))}
            </div>

            {filteredSolicitations.length === 0 && (
              <Card className="card-premium p-12 text-center">
                <TargetIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
                <Button className="btn-premium">
                  <RefreshCwIcon className="h-4 w-4 mr-2" />
                  Refresh Opportunities
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Intelligent Procurement Modules</h2>
              <p className="text-gray-600 mb-6">
                AI-powered tools to guide you through every stage of the procurement lifecycle
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {procurementModules.map((module) => (
                <ModuleCard key={module.id} module={module} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="portals" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Multi-Jurisdiction Portal Access</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Federal</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      SAM.gov
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      PIEE
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      WAWF
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">State of Louisiana</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      LaGov Vendor Portal
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      LaPAC
                    </Button>
                  </div>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Municipal</h4>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      New Orleans BRASS
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <ExternalLinkIcon className="h-4 w-4 mr-2" />
                      Baton Rouge VSS
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="learning" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Center</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <BookOpenIcon className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium text-gray-900">Solicitation Review</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Learn the reverse engineering method for strategic solicitation analysis
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Course
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                    <h4 className="font-medium text-gray-900">Pricing Strategy</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Master G&A, overhead, profit, and wage determination calculations
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Course
                  </Button>
                </div>

                <div className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-3">
                    <BarChart3Icon className="h-6 w-6 text-purple-600" />
                    <h4 className="font-medium text-gray-900">Invoice Compliance</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    FAR-compliant invoicing across multiple jurisdictions
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Start Course
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 