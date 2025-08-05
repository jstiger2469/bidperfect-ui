'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Search,
  Filter,
  Plus,
  Calendar,
  DollarSign,
  Building2,
  Eye,
  Edit,
  Download,
  Share2,
  Star,
  Clock,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  FileText,
  Target,
  Award,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  MoreHorizontal
} from 'lucide-react'

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

// Mock data
const rfps: RFP[] = [
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
    requirements: ["Cloud Migration", "Cybersecurity", "Data Analytics", "User Training"],
    teamMembers: ["Sarah Johnson", "Michael Chen", "Jennifer Rodriguez"],
    documents: ["Technical Proposal", "Past Performance", "Price Proposal"],
    notes: "High priority - strategic win for federal market entry",
    winProbability: 75,
    lastUpdated: "2024-03-20T10:30:00"
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
    teamMembers: ["David Thompson", "Lisa Wang"],
    documents: ["Capability Statement", "Team Resumes"],
    notes: "Need to strengthen cybersecurity credentials",
    winProbability: 60,
    lastUpdated: "2024-03-18T14:15:00"
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
    requirements: ["Big Data Processing", "Machine Learning", "HIPAA Compliance"],
    teamMembers: ["Alex Martinez", "Rachel Green"],
    documents: ["Technical Approach", "Past Performance"],
    notes: "Good opportunity in healthcare sector",
    winProbability: 45,
    lastUpdated: "2024-03-15T09:45:00"
  },
  {
    id: "RFP-2024-004",
    title: "NASA Satellite Communications",
    agency: "National Aeronautics and Space Administration",
    solicitationNumber: "NASA-SAT-2024-004",
    dueDate: "2024-06-01T17:00:00",
    value: 4500000,
    status: "draft",
    priority: "low",
    category: "Communications",
    location: "Houston, TX",
    description: "Satellite communications system development",
    requirements: ["Satellite Design", "Ground Station Integration", "Testing"],
    teamMembers: ["Robert Wilson"],
    documents: ["Capability Statement"],
    notes: "Long-term opportunity, requires specialized expertise",
    winProbability: 30,
    lastUpdated: "2024-03-10T16:20:00"
  },
  {
    id: "RFP-2024-005",
    title: "EPA Environmental Monitoring",
    agency: "Environmental Protection Agency",
    solicitationNumber: "EPA-ENV-2024-005",
    dueDate: "2024-04-30T17:00:00",
    value: 1200000,
    status: "submitted",
    priority: "medium",
    category: "Environmental",
    location: "Research Triangle Park, NC",
    description: "Environmental monitoring and reporting system",
    requirements: ["Sensor Networks", "Data Collection", "Regulatory Reporting"],
    teamMembers: ["Emily Davis", "James Brown"],
    documents: ["Technical Proposal", "Price Proposal", "Past Performance"],
    notes: "Submitted on time, awaiting evaluation",
    winProbability: 80,
    lastUpdated: "2024-03-25T11:00:00"
  }
]

function RFPCard({ rfp }: { rfp: RFP }) {
  const [isHovered, setIsHovered] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'awarded': return 'status-ready'
      case 'submitted': return 'status-info'
      case 'in_progress': return 'status-warning'
      case 'draft': return 'status-info'
      case 'lost': return 'status-error'
      default: return 'status-info'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const daysUntilDue = Math.ceil((new Date(rfp.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -2,
        transition: { duration: 0.2, ease: "easeOut" }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Card 
        className={`
          card-premium p-6 cursor-pointer transition-all duration-300
          ${isHovered ? 'shadow-xl border-blue-200' : ''}
          ${daysUntilDue <= 7 && rfp.status !== 'submitted' ? 'border-red-200 bg-red-50/30' : ''}
        `}
        onClick={() => window.location.href = `/rfp/${rfp.id}/workspace`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getPriorityColor(rfp.priority)}>
                {rfp.priority}
              </Badge>
              <Badge className={getStatusColor(rfp.status)}>
                {rfp.status.replace('_', ' ')}
              </Badge>
            </div>
            <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2">{rfp.title}</h3>
            <p className="text-sm text-gray-600">{rfp.agency}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">{formatDate(rfp.dueDate)}</p>
              <p className="text-xs text-gray-500">
                {daysUntilDue > 0 ? `${daysUntilDue} days left` : 'Overdue'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-900">${(rfp.value / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500">Estimated Value</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{rfp.description}</p>

        {/* Requirements */}
        <div className="mb-4">
          <p className="text-xs font-medium text-gray-700 mb-2">Key Requirements:</p>
          <div className="flex flex-wrap gap-1">
            {rfp.requirements.slice(0, 3).map((req, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {req}
              </Badge>
            ))}
            {rfp.requirements.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{rfp.requirements.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Team & Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {rfp.teamMembers.length} team member{rfp.teamMembers.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{rfp.winProbability}% win probability</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => window.location.href = `/rfp/${rfp.id}/workspace`}
          >
            <Eye className="h-4 w-4 mr-2" />
            View Workspace
          </Button>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function RFPsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredRFPs = useMemo(() => {
    let filtered = rfps

    if (searchTerm) {
      filtered = filtered.filter(rfp =>
        rfp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfp.agency.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rfp.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(rfp => rfp.status === filterStatus)
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(rfp => rfp.priority === filterPriority)
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(rfp => rfp.category === filterCategory)
    }

    return filtered.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
  }, [searchTerm, filterStatus, filterPriority, filterCategory])

  const analytics = useMemo(() => {
    const total = rfps.length
    const active = rfps.filter(r => r.status === 'in_progress' || r.status === 'draft').length
    const submitted = rfps.filter(r => r.status === 'submitted').length
    const totalValue = rfps.reduce((sum, rfp) => sum + rfp.value, 0)

    return {
      total,
      active,
      submitted,
      totalValue: (totalValue / 1000000).toFixed(1)
    }
  }, [rfps])

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Request for Proposals
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Browse and manage government RFPs and opportunities
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add RFP
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total RFPs</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.total}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.active}</p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Submitted</p>
                <p className="text-2xl font-bold text-green-600">{analytics.submitted}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Value</p>
                <p className="text-2xl font-bold text-purple-600">${analytics.totalValue}M</p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="card-premium p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search RFPs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="in_progress">In Progress</option>
                <option value="submitted">Submitted</option>
                <option value="awarded">Awarded</option>
                <option value="lost">Lost</option>
              </select>
              <select
                value={filterPriority}
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="IT Services">IT Services</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Data Analytics">Data Analytics</option>
                <option value="Communications">Communications</option>
                <option value="Environmental">Environmental</option>
              </select>
            </div>
          </div>
        </Card>

        {/* RFPs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRFPs.map((rfp) => (
            <RFPCard key={rfp.id} rfp={rfp} />
          ))}
        </div>

        {filteredRFPs.length === 0 && (
          <Card className="card-premium p-12 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No RFPs found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search criteria or add a new RFP.
            </p>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add RFP
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
} 