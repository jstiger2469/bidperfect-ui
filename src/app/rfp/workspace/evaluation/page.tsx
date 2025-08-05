'use client'
import { useState, useMemo, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
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
  Building2,
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
  FileText as FileTextIcon,
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
  GitBranch as GitBranchIcon,
  GitCompare,
  GitFork,
  GitPullRequestClosed,
  GitPullRequestDraft,
  GitCommitVertical,
  GitCompareArrows,
  GitGraph,
  Plus,
  Minus,
  UserCheck,
  UserX,
  UserPlus,
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
  DistributeVertical,
  DistributeHorizontal,
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
  LinkBreak,
  LinkBreak2,
  Image,
  ImageOff,
  ImagePlus,
  VideoPlus,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SubmissionRequirement {
  id: string
  name: string
  description: string
  required: boolean
  status: 'uploaded' | 'missing' | 'incomplete' | 'optional'
  source?: string
  fileSize?: string
  lastModified?: string
  complianceScore: number
}

interface SpiritCheckRule {
  id: string
  rule: string
  intent: string
  status: 'pass' | 'warning' | 'fail'
  result: string
  notes: string
  impact: 'high' | 'medium' | 'low'
}

interface CapabilityGap {
  id: string
  requirement: string
  internalCapability: string
  gapLevel: 'critical' | 'moderate' | 'minor'
  impact: string
  solution: string
  estimatedCost: string
  timeline: string
  subcontractorOptions: SubcontractorOption[]
}

interface SubcontractorOption {
  id: string
  name: string
  type: string
  capabilities: string[]
  pastPerformance: number
  priceCompetitiveness: number
  availability: 'available' | 'limited' | 'unavailable'
  matchScore: number
  certifications: string[]
  experience: string[]
  pricing: {
    hourlyRate: string
    overhead: string
    profit: string
    total: string
  }
  riskFactors: string[]
  recommendations: string[]
}

interface RoleMapping {
  role: string
  requirement: string
  internalStaff?: {
    name: string
    matchScore: number
    availability: boolean
    rate: string
  }
  subcontractorOptions: SubcontractorOption[]
  status: 'filled' | 'partial' | 'unfilled'
}

export default function InteractiveRFPWorkspace() {
  const [activePhase, setActivePhase] = useState<'instructions' | 'capabilities' | 'subcontractors' | 'pricing' | 'compliance'>('instructions')
  const [selectedRequirement, setSelectedRequirement] = useState<string | null>(null)
  const [showSpiritAnalysis, setShowSpiritAnalysis] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock data for Instructions to Offerors
  const submissionRequirements: SubmissionRequirement[] = [
    {
      id: 'tech-proposal',
      name: 'Technical Proposal',
      description: 'Description of how work will be performed',
      required: true,
      status: 'uploaded',
      source: 'View PDF',
      fileSize: '2.4 MB',
      lastModified: '2024-07-15',
      complianceScore: 95
    },
    {
      id: 'past-performance',
      name: 'Past Performance',
      description: 'Details of similar projects',
      required: true,
      status: 'missing',
      complianceScore: 0
    },
    {
      id: 'pricing-sheet',
      name: 'Pricing Sheet',
      description: 'Completed cost table',
      required: true,
      status: 'uploaded',
      source: 'View Sheet',
      fileSize: '156 KB',
      lastModified: '2024-07-14',
      complianceScore: 88
    },
    {
      id: 'compliance-certs',
      name: 'Compliance Certifications',
      description: 'SBA, EEO, OSHA, etc.',
      required: true,
      status: 'incomplete',
      source: 'Fix',
      complianceScore: 65
    },
    {
      id: 'cover-letter',
      name: 'Cover Letter',
      description: 'Signed, official letter of intent',
      required: false,
      status: 'uploaded',
      source: 'View',
      fileSize: '89 KB',
      lastModified: '2024-07-13',
      complianceScore: 100
    }
  ]

  const spiritCheckRules: SpiritCheckRule[] = [
    {
      id: 'page-limits',
      rule: 'Follow exact page limits',
      intent: 'Proposal must not exceed 20 pages',
      status: 'pass',
      result: '19 pages total',
      notes: 'Within acceptable range',
      impact: 'low'
    },
    {
      id: 'formatting',
      rule: 'Use specified formatting',
      intent: 'Times New Roman, 12pt, 1" margins',
      status: 'warning',
      result: 'Detected Arial font',
      notes: 'Font mismatch in executive summary',
      impact: 'medium'
    },
    {
      id: 'sections',
      rule: 'Organize in specified sections',
      intent: 'Technical, Cost, Past Performance',
      status: 'pass',
      result: 'All sections identified',
      notes: 'Structure matches requirements',
      impact: 'low'
    },
    {
      id: 'evaluation-criteria',
      rule: 'Clear response to evaluation criteria',
      intent: 'Must directly address SOW objectives',
      status: 'warning',
      result: 'Two objectives underdeveloped',
      notes: 'Need stronger technical capacity language',
      impact: 'high'
    },
    {
      id: 'submission',
      rule: 'Submit via portal by due date',
      intent: '5:00 PM on 8/1/2025',
      status: 'pass',
      result: 'Auto-upload enabled',
      notes: 'Scheduled for submission',
      impact: 'high'
    }
  ]

  // Mock data for Capability Analysis
  const capabilityGaps: CapabilityGap[] = [
    {
      id: 'cloud-migration',
      requirement: 'Cloud Infrastructure Migration',
      internalCapability: 'Basic cloud knowledge',
      gapLevel: 'critical',
      impact: 'Cannot perform core SOW requirement',
      solution: 'Subcontractor with AWS/Azure expertise',
      estimatedCost: '$150,000',
      timeline: '2-3 months',
      subcontractorOptions: []
    },
    {
      id: 'security-implementation',
      requirement: 'FedRAMP Security Implementation',
      internalCapability: 'General security practices',
      gapLevel: 'critical',
      impact: 'Compliance requirement not met',
      solution: 'Security consultant with FedRAMP experience',
      estimatedCost: '$200,000',
      timeline: '3-4 months',
      subcontractorOptions: []
    },
    {
      id: 'va-integration',
      requirement: 'VA System Integration',
      internalCapability: 'None',
      gapLevel: 'moderate',
      impact: 'Reduced technical score',
      solution: 'VA-experienced subcontractor',
      estimatedCost: '$75,000',
      timeline: '1-2 months',
      subcontractorOptions: []
    }
  ]

  // Mock data for Subcontractor Options
  const subcontractorOptions: SubcontractorOption[] = [
    {
      id: 'tech-cloud',
      name: 'TechCloud Solutions',
      type: '8(a) Small Business',
      capabilities: ['AWS Migration', 'Azure Implementation', 'FedRAMP Compliance'],
      pastPerformance: 4.8,
      priceCompetitiveness: 85,
      availability: 'available',
      matchScore: 92,
      certifications: ['8(a)', 'WOSB', 'FedRAMP Authorized'],
      experience: ['VA Cloud Migration (2023)', 'DoD Security Implementation (2022)'],
      pricing: {
        hourlyRate: '$125',
        overhead: '15%',
        profit: '8%',
        total: '$142.50'
      },
      riskFactors: ['Limited VA-specific experience'],
      recommendations: ['Strong technical capabilities', 'Good past performance', 'Competitive pricing']
    },
    {
      id: 'secure-systems',
      name: 'Secure Systems Inc.',
      type: 'Veteran-Owned Small Business',
      capabilities: ['FedRAMP Implementation', 'Security Architecture', 'VA Integration'],
      pastPerformance: 4.6,
      priceCompetitiveness: 78,
      availability: 'available',
      matchScore: 88,
      certifications: ['VOSB', 'SDVOSB', 'FedRAMP Ready'],
      experience: ['VA Security Implementation (2023)', 'Multiple VA contracts'],
      pricing: {
        hourlyRate: '$135',
        overhead: '12%',
        profit: '10%',
        total: '$166.20'
      },
      riskFactors: ['Higher pricing than competitors'],
      recommendations: ['Excellent VA experience', 'Strong security focus', 'Veteran preference']
    },
    {
      id: 'data-migrate',
      name: 'Data Migration Pro',
      type: 'Large Business',
      capabilities: ['Cloud Migration', 'Data Architecture', 'System Integration'],
      pastPerformance: 4.9,
      priceCompetitiveness: 72,
      availability: 'limited',
      matchScore: 85,
      certifications: ['ISO 27001', 'CMMI Level 3'],
      experience: ['Large-scale cloud migrations', 'Federal system integration'],
      pricing: {
        hourlyRate: '$145',
        overhead: '18%',
        profit: '12%',
        total: '$191.40'
      },
      riskFactors: ['Limited availability', 'Higher cost'],
      recommendations: ['Excellent technical capabilities', 'Proven track record', 'Consider for critical roles']
    }
  ]

  // Mock data for Role Mapping
  const roleMappings: RoleMapping[] = [
    {
      role: 'Project Manager',
      requirement: 'PMP certified, 10+ years federal experience',
      internalStaff: {
        name: 'Sarah Johnson',
        matchScore: 95,
        availability: true,
        rate: '$85/hour'
      },
      subcontractorOptions: [],
      status: 'filled'
    },
    {
      role: 'Cloud Architect',
      requirement: 'AWS/Azure certified, FedRAMP experience',
      internalStaff: {
        name: 'Mike Chen',
        matchScore: 45,
        availability: true,
        rate: '$75/hour'
      },
      subcontractorOptions: [subcontractorOptions[0], subcontractorOptions[2]],
      status: 'partial'
    },
    {
      role: 'Security Specialist',
      requirement: 'FedRAMP implementation, VA experience',
      internalStaff: undefined,
      subcontractorOptions: [subcontractorOptions[1]],
      status: 'unfilled'
    }
  ]

  const phases = [
    { id: 'instructions', name: 'Instructions to Offerors', icon: FileText },
    { id: 'capabilities', name: 'Capability Analysis', icon: Cpu },
    { id: 'subcontractors', name: 'Subcontractor Selection', icon: Building2 },
    { id: 'pricing', name: 'Pricing & Cost', icon: TrendingUp },
    { id: 'compliance', name: 'Compliance Matrix', icon: CheckSquare }
  ]

  const renderInstructionsPhase = () => (
    <div className="space-y-6">
      {/* Submission Requirements Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Submission Requirements Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Requirement</th>
                <th className="text-left py-2 font-medium text-gray-700">Description</th>
                <th className="text-left py-2 font-medium text-gray-700">Required?</th>
                <th className="text-left py-2 font-medium text-gray-700">Status</th>
                <th className="text-left py-2 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissionRequirements.map((req) => (
                <tr key={req.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 font-medium text-gray-900">{req.name}</td>
                  <td className="py-3 text-gray-600">{req.description}</td>
                  <td className="py-3">
                    {req.required ? (
                      <Badge className="bg-red-100 text-red-800">Required</Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-800">Optional</Badge>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="flex items-center space-x-2">
                      {req.status === 'uploaded' && <CheckCircle className="h-4 w-4 text-green-600" />}
                      {req.status === 'missing' && <XCircle className="h-4 w-4 text-red-600" />}
                      {req.status === 'incomplete' && <AlertTriangle className="h-4 w-4 text-yellow-600" />}
                      <span className={`text-sm ${
                        req.status === 'uploaded' ? 'text-green-700' :
                        req.status === 'missing' ? 'text-red-700' :
                        req.status === 'incomplete' ? 'text-yellow-700' : 'text-gray-700'
                      }`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      {req.source && (
                        <Button variant="outline" size="sm">
                          {req.source}
                        </Button>
                      )}
                      {req.status === 'missing' && (
                        <Button size="sm">
                          <Upload className="h-3 w-3 mr-1" />
                          Upload
                        </Button>
                      )}
                      {req.status === 'incomplete' && (
                        <Button variant="outline" size="sm">
                          Fix
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

      {/* Spirit Check Compliance Engine */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Brain className="h-5 w-5 mr-2 text-purple-600" />
          Spirit Check Compliance Engine
        </h3>
        <div className="space-y-4">
          {spiritCheckRules.map((rule) => (
            <div key={rule.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{rule.rule}</h4>
                <Badge className={
                  rule.status === 'pass' ? 'bg-green-100 text-green-800' :
                  rule.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }>
                  {rule.status.toUpperCase()}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-2"><strong>Intent:</strong> {rule.intent}</p>
              <p className="text-sm text-gray-700 mb-2"><strong>Result:</strong> {rule.result}</p>
              <p className="text-sm text-gray-600"><strong>Notes:</strong> {rule.notes}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Missing Items / Gaps View */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Missing Items / Gaps</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center p-3 bg-red-50 rounded-lg">
            <XCircle className="h-4 w-4 text-red-600 mr-2" />
            <span className="text-red-800">Missing Past Performance narrative</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-yellow-800">Incorrect font style in executive summary</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
            <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
            <span className="text-yellow-800">Proposal refers to "attached appendix" but no attachment found</span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            Fix Formatting
          </Button>
          <Button variant="outline">
            Upload Missing File
          </Button>
          <Button>
            Auto-Generate Past Performance
          </Button>
        </div>
      </Card>

      {/* Notes to Admin / Writer */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes to Admin / Writer</h3>
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <p className="text-blue-800">
              💡 SOW reference on page 6 is vague – suggest stronger language on technical capacity.
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <p className="text-orange-800">
              🛑 Revise pricing table to match required layout (see page 11 of RFP).
            </p>
          </div>
        </div>
        <div className="mt-4">
          <Textarea placeholder="Add a note..." className="min-h-[80px]" />
          <Button className="mt-2">Add Note</Button>
        </div>
      </Card>
    </div>
  )

  const renderCapabilitiesPhase = () => (
    <div className="space-y-6">
      {/* Capability Gap Analysis */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Capability Gap Analysis</h3>
        <div className="space-y-4">
          {capabilityGaps.map((gap) => (
            <div key={gap.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{gap.requirement}</h4>
                <Badge className={
                  gap.gapLevel === 'critical' ? 'bg-red-100 text-red-800' :
                  gap.gapLevel === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }>
                  {gap.gapLevel.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Internal Capability:</strong> {gap.internalCapability}</p>
                  <p><strong>Impact:</strong> {gap.impact}</p>
                  <p><strong>Solution:</strong> {gap.solution}</p>
                </div>
                <div>
                  <p><strong>Estimated Cost:</strong> {gap.estimatedCost}</p>
                  <p><strong>Timeline:</strong> {gap.timeline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Role Mapping Matrix */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Mapping Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 font-medium text-gray-700">Role</th>
                <th className="text-left py-2 font-medium text-gray-700">Requirement</th>
                <th className="text-left py-2 font-medium text-gray-700">Internal Staff</th>
                <th className="text-left py-2 font-medium text-gray-700">Subcontractor Options</th>
                <th className="text-left py-2 font-medium text-gray-700">Status</th>
                <th className="text-left py-2 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {roleMappings.map((role) => (
                <tr key={role.role} className="border-b border-gray-100">
                  <td className="py-3 font-medium text-gray-900">{role.role}</td>
                  <td className="py-3 text-gray-600 text-sm">{role.requirement}</td>
                  <td className="py-3">
                    {role.internalStaff ? (
                      <div className="text-sm">
                        <p className="font-medium">{role.internalStaff.name}</p>
                        <p className="text-gray-600">Match: {role.internalStaff.matchScore}%</p>
                        <p className="text-gray-600">Rate: {role.internalStaff.rate}</p>
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="py-3">
                    <div className="space-y-1">
                      {role.subcontractorOptions.map((sub) => (
                        <div key={sub.id} className="text-sm">
                          <p className="font-medium">{sub.name}</p>
                          <p className="text-gray-600">Match: {sub.matchScore}%</p>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge className={
                      role.status === 'filled' ? 'bg-green-100 text-green-800' :
                      role.status === 'partial' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }>
                      {role.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="py-3">
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  const renderSubcontractorsPhase = () => (
    <div className="space-y-6">
      {/* Subcontractor Options */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Subcontractor Options</h3>
        <div className="space-y-4">
          {subcontractorOptions.map((sub) => (
            <div key={sub.id} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">{sub.name}</h4>
                  <p className="text-sm text-gray-600">{sub.type}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-blue-100 text-blue-800">{sub.availability}</Badge>
                  <Badge className="bg-green-100 text-green-800">Match: {sub.matchScore}%</Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Capabilities</p>
                  <div className="space-y-1">
                    {sub.capabilities.map((cap) => (
                      <Badge key={cap} variant="outline" className="text-xs mr-1 mb-1">
                        {cap}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Performance</p>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">{sub.pastPerformance}/5.0</span>
                  </div>
                  <p className="text-sm text-gray-600">Price Competitiveness: {sub.priceCompetitiveness}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Pricing</p>
                  <p className="text-sm">Hourly: {sub.pricing.hourlyRate}</p>
                  <p className="text-sm">Total: {sub.pricing.total}</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button size="sm">Select</Button>
                <Button size="sm" variant="outline">View Details</Button>
                <Button size="sm" variant="outline">Compare</Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderPricingPhase = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Analysis</h3>
        <p className="text-gray-600">Pricing phase content will be implemented here...</p>
      </Card>
    </div>
  )

  const renderCompliancePhase = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Matrix</h3>
        <p className="text-gray-600">Compliance matrix content will be implemented here...</p>
      </Card>
    </div>
  )

  const renderPhaseContent = () => {
    switch (activePhase) {
      case 'instructions':
        return renderInstructionsPhase()
      case 'capabilities':
        return renderCapabilitiesPhase()
      case 'subcontractors':
        return renderSubcontractorsPhase()
      case 'pricing':
        return renderPricingPhase()
      case 'compliance':
        return renderCompliancePhase()
      default:
        return renderInstructionsPhase()
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Interactive RFP Workspace</h1>
          <p className="text-gray-600">VA IT Infrastructure Modernization Services • RFP-2024-001</p>
        </div>

        {/* Phase Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            {phases.map((phase) => {
              const Icon = phase.icon
              return (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id as any)}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activePhase === phase.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {phase.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {renderPhaseContent()}
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
                    I've analyzed your RFP and identified 3 critical capability gaps. 
                    Let me help you find the right subcontractors.
                  </p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    Your submission compliance score is 78%. 
                    Focus on the missing Past Performance narrative.
                  </p>
                </div>
              </div>
              
              <div className="space-y-3">
                <Textarea
                  placeholder="Ask Spirit AI anything..."
                  className="min-h-[80px] resize-none"
                />
                <Button className="w-full" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Ask Spirit AI
                </Button>
              </div>
            </Card>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Search className="h-4 w-4 mr-2" />
                  Find Subcontractors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckSquare className="h-4 w-4 mr-2" />
                  Run Compliance Check
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Pricing
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 