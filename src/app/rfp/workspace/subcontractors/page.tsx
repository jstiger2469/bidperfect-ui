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
  FileSpreadsheet,
  Users,
  UserCheck,
  UserX,
  UserPlus
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  status: 'selected' | 'evaluating' | 'rejected' | 'approved' | 'pending'
  compliance: {
    loi: 'signed' | 'pending' | 'missing'
    wdAlignment: 'compliant' | 'pending' | 'non-compliant'
    coi: 'active' | 'expired' | 'missing'
    licenses: 'valid' | 'expired' | 'missing'
    debarment: 'clear' | 'pending' | 'flagged'
  }
  pricing: {
    hourlyRate: number
    overhead: number
    profit: number
    total: number
    markup: number
  }
  readiness: number
  riskFactors: string[]
  recommendations: string[]
}

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

export default function SubcontractorManagementPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedSubcontractor, setSelectedSubcontractor] = useState<string | null>(null)
  const [showSpiritAnalysis, setShowSpiritAnalysis] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  
  // CRUD Modal States
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [editingSubcontractor, setEditingSubcontractor] = useState<Subcontractor | null>(null)
  const [deletingSubcontractor, setDeletingSubcontractor] = useState<Subcontractor | null>(null)
  
  // Form States
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

  const [subcontractors, setSubcontractors] = useState<Subcontractor[]>([
    {
      id: 'sub1',
      name: 'TechSolutions Inc.',
      type: '8(a) Small Business',
      specialties: ['System Integration', 'Legacy Migration', 'Training'],
      pastPerformance: 4.8,
      priceCompetitiveness: 85,
      availability: 'high',
      certifications: ['CMMI Level 3', 'ISO 9001', 'ISO 27001'],
      location: 'Reston, VA',
      contact: {
        name: 'Robert Wilson',
        email: 'r.wilson@techsolutions.com',
        phone: '(555) 456-7890'
      },
      matchScore: 87,
      status: 'evaluating',
      compliance: {
        loi: 'signed',
        wdAlignment: 'compliant',
        coi: 'active',
        licenses: 'valid',
        debarment: 'clear'
      },
      pricing: {
        hourlyRate: 125,
        overhead: 15,
        profit: 8,
        total: 142.50,
        markup: 12
      },
      readiness: 92,
      riskFactors: ['Limited VA-specific experience'],
      recommendations: ['Strong technical capabilities', 'Good past performance', 'Competitive pricing']
    },
    {
      id: 'sub2',
      name: 'SecureNet Systems',
      type: 'Veteran-Owned Small Business',
      specialties: ['Cybersecurity', 'Compliance', 'Security Assessments'],
      pastPerformance: 4.6,
      priceCompetitiveness: 78,
      availability: 'medium',
      certifications: ['CMMI Level 2', 'ISO 27001'],
      location: 'Bethesda, MD',
      contact: {
        name: 'Lisa Rodriguez',
        email: 'l.rodriguez@securenetsys.com',
        phone: '(555) 567-8901'
      },
      matchScore: 82,
      status: 'pending',
      compliance: {
        loi: 'pending',
        wdAlignment: 'pending',
        coi: 'active',
        licenses: 'valid',
        debarment: 'clear'
      },
      pricing: {
        hourlyRate: 135,
        overhead: 12,
        profit: 10,
        total: 166.20,
        markup: 15
      },
      readiness: 65,
      riskFactors: ['Missing LOI', 'WD alignment pending'],
      recommendations: ['Request LOI immediately', 'Verify WD compliance']
    },
    {
      id: 'sub3',
      name: 'Data Migration Pro',
      type: 'Large Business',
      specialties: ['Cloud Migration', 'Data Architecture', 'System Integration'],
      pastPerformance: 4.9,
      priceCompetitiveness: 72,
      availability: 'low',
      certifications: ['ISO 27001', 'CMMI Level 3'],
      location: 'Arlington, VA',
      contact: {
        name: 'David Chen',
        email: 'd.chen@datamigrationpro.com',
        phone: '(555) 678-9012'
      },
      matchScore: 85,
      status: 'approved',
      compliance: {
        loi: 'signed',
        wdAlignment: 'compliant',
        coi: 'active',
        licenses: 'valid',
        debarment: 'clear'
      },
      pricing: {
        hourlyRate: 145,
        overhead: 18,
        profit: 12,
        total: 191.40,
        markup: 18
      },
      readiness: 95,
      riskFactors: ['Higher cost', 'Limited availability'],
      recommendations: ['Excellent technical capabilities', 'Proven track record']
    }
  ])

  const [complianceChecks, setComplianceChecks] = useState<ComplianceCheck[]>([
    {
      id: 'check1',
      requirement: 'Letter of Intent (LOI)',
      status: 'pass',
      details: 'Signed and notarized LOI received',
      impact: 'high',
      actionRequired: 'None - ready for proposal'
    },
    {
      id: 'check2',
      requirement: 'Wage Determination Alignment',
      status: 'pass',
      details: 'All labor categories match WD requirements',
      impact: 'high',
      actionRequired: 'None - compliant'
    },
    {
      id: 'check3',
      requirement: 'Certificate of Insurance (COI)',
      status: 'warning',
      details: 'COI expires in 30 days',
      impact: 'medium',
      actionRequired: 'Request updated COI before submission'
    },
    {
      id: 'check4',
      requirement: 'Required Licenses',
      status: 'pass',
      details: 'All required licenses verified and active',
      impact: 'high',
      actionRequired: 'None - compliant'
    },
    {
      id: 'check5',
      requirement: 'Debarment Check',
      status: 'pass',
      details: 'No debarment found in SAM.gov',
      impact: 'high',
      actionRequired: 'None - clear'
    }
  ])

  const [pricingEstimates, setPricingEstimates] = useState<PricingEstimate[]>([
    {
      role: 'Cloud Migration Lead',
      hours: 1920,
      rate: 125,
      fringe: 25,
      overhead: 15,
      profit: 8,
      total: 142.50,
      wdCompliance: true
    },
    {
      role: 'Security Specialist',
      hours: 1440,
      rate: 135,
      fringe: 27,
      overhead: 12,
      profit: 10,
      total: 166.20,
      wdCompliance: true
    },
    {
      role: 'Training Coordinator',
      hours: 960,
      rate: 95,
      fringe: 19,
      overhead: 15,
      profit: 8,
      total: 115.50,
      wdCompliance: false
    }
  ])

  const selectedSub = subcontractors.find(sub => sub.id === selectedSubcontractor)

  const overallCompliance = Math.round(
    (complianceChecks.filter(check => check.status === 'pass').length / complianceChecks.length) * 100
  )

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

  const handleEditSubcontractor = (subcontractor: Subcontractor) => {
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
      hourlyRate: subcontractor.pricing.hourlyRate,
      overhead: subcontractor.pricing.overhead,
      profit: subcontractor.pricing.profit
    })
    setShowEditModal(true)
  }

  const handleDeleteSubcontractor = (subcontractor: Subcontractor) => {
    setDeletingSubcontractor(subcontractor)
    setShowDeleteModal(true)
  }

  const saveSubcontractor = () => {
    if (editingSubcontractor) {
      // Update existing subcontractor
      setSubcontractors(prev => prev.map(sub => 
        sub.id === editingSubcontractor.id 
          ? {
              ...sub,
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
                ...sub.pricing,
                hourlyRate: formData.hourlyRate,
                overhead: formData.overhead,
                profit: formData.profit,
                total: formData.hourlyRate * (1 + formData.overhead/100) * (1 + formData.profit/100),
                markup: formData.overhead + formData.profit
              }
            }
          : sub
      ))
      setShowEditModal(false)
      setEditingSubcontractor(null)
    } else {
      // Add new subcontractor
      const newSubcontractor: Subcontractor = {
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
        status: 'pending' as const,
        compliance: {
          loi: 'pending' as const,
          wdAlignment: 'pending' as const,
          coi: 'active' as const,
          licenses: 'valid' as const,
          debarment: 'clear' as const
        },
        pricing: {
          hourlyRate: formData.hourlyRate,
          overhead: formData.overhead,
          profit: formData.profit,
          total: formData.hourlyRate * (1 + formData.overhead/100) * (1 + formData.profit/100),
          markup: formData.overhead + formData.profit
        },
        readiness: 70,
        riskFactors: ['New subcontractor - needs evaluation'],
        recommendations: ['Complete compliance check', 'Verify certifications']
      }
      setSubcontractors(prev => [...prev, newSubcontractor])
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
      setSubcontractors(prev => prev.filter(sub => sub.id !== deletingSubcontractor.id))
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
                <th className="text-left py-3 font-medium text-gray-700">LOI</th>
                <th className="text-left py-3 font-medium text-gray-700">WD Alignment</th>
                <th className="text-left py-3 font-medium text-gray-700">COI</th>
                <th className="text-left py-3 font-medium text-gray-700">Licenses</th>
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
                      {sub.compliance.loi === 'signed' && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.loi === 'pending' && <AlertTriangle className="h-4 w-4 text-yellow-600 mr-1" />}
                      {sub.compliance.loi === 'missing' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.loi}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.wdAlignment === 'compliant' && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.wdAlignment === 'pending' && <AlertTriangle className="h-4 w-4 text-yellow-600 mr-1" />}
                      {sub.compliance.wdAlignment === 'non-compliant' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.wdAlignment}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.coi === 'active' && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.coi === 'expired' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      {sub.compliance.coi === 'missing' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.coi}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {sub.compliance.licenses === 'valid' && <CheckCircle className="h-4 w-4 text-green-600 mr-1" />}
                      {sub.compliance.licenses === 'expired' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      {sub.compliance.licenses === 'missing' && <XCircle className="h-4 w-4 text-red-600 mr-1" />}
                      <span className="text-sm capitalize">{sub.compliance.licenses}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge className={
                      sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                      sub.status === 'evaluating' ? 'bg-blue-100 text-blue-800' :
                      sub.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
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
                      {sub.status === 'pending' && (
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
      {/* Team Assembly Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Contractor Team Assembly</h3>
            <p className="text-gray-600">Building your winning team with Spirit AI guidance</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">82%</div>
            <div className="text-sm text-gray-600">Team Readiness</div>
          </div>
        </div>
      </Card>

      {/* Prime Contractor Section */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Prime Contractor</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Colleen', role: 'Prime Contractor', badges: ['Project Manager', 'SECRET Clearance'] },
            { name: 'Ethan', role: 'Estimator', badges: [] },
            { name: 'Sarah', role: 'Compliance Lead', badges: [], warning: true },
            { name: 'James', role: 'Proposal Writer', badges: [] }
          ].map((member, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center mb-2">
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <span className="text-blue-600 font-medium">{member.name[0]}</span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.role}</div>
                </div>
              </div>
              <div className="space-y-1">
                {member.badges.map((badge, badgeIndex) => (
                  <Badge key={badgeIndex} className="bg-green-100 text-green-800 text-xs mr-1">
                    {badge}
                  </Badge>
                ))}
                {member.warning && (
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Subcontractors Section */}
      <Card className="p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Subcontractors</h4>
        <div className="space-y-4">
          {subcontractors.map((sub) => (
            <div key={sub.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{sub.name}</div>
                    <div className="text-sm text-gray-600">{sub.type}</div>
                  </div>
                </div>
                <Badge className={
                  sub.status === 'approved' ? 'bg-green-100 text-green-800' :
                  sub.status === 'evaluating' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }>
                  {sub.status}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-700">Readiness</div>
                  <div className="text-lg font-semibold text-blue-600">{sub.readiness}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Match Score</div>
                  <div className="text-lg font-semibold text-green-600">{sub.matchScore}%</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700">Pricing</div>
                  <div className="text-lg font-semibold text-purple-600">${sub.pricing.total}/hr</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Compliance Check</TabsTrigger>
                <TabsTrigger value="pricing">Pricing Estimator</TabsTrigger>
                <TabsTrigger value="team">Team Assembly</TabsTrigger>
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
    </div>
  )
} 