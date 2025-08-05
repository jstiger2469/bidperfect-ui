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
  status: 'selected' | 'evaluating' | 'rejected'
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
      status: 'assigned'
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
      status: 'assigned'
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
      status: 'assigned'
    }
  ])

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
      status: 'evaluating'
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
      status: 'evaluating'
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
      teamReadiness: 85,
      gaps: {
        critical: [
          'Training Coordinator role unfilled - impacts user adoption',
          'Limited VA-specific experience in current team'
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
          'Select TechSolutions Inc. for system integration work (87% match)',
          'Consider SecureNet Systems for additional security support (82% match)',
          'Evaluate training subcontractors for user adoption support'
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
          'Team readiness score calculated (85%)'
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
    
    const newRecommendation = `Q: ${userQuestion}\nA: Based on my team analysis, I've identified an 85% team readiness score with 2 critical gaps. I recommend filling the Training Coordinator role and adding VA-specific experience. The current team has strong technical capabilities but needs user adoption expertise.`
    
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
              <h1 className="text-3xl font-bold text-gray-900">Intelligent Team Assembly</h1>
              <p className="text-gray-600">AI-Powered Team Building & Subcontractor Selection</p>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                onClick={startTeamAnalysis}
                disabled={spiritAnalysis.isProcessing}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Team Assembly Progress</span>
              <span>{Math.round(spiritAnalysis.progress)}% Complete • {spiritAnalysis.teamReadiness}% Team Readiness</span>
            </div>
            <Progress value={spiritAnalysis.progress} className="h-3" />
          </div>
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
                {/* Team Readiness Dashboard */}
                <Card className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Users className="h-6 w-6 mr-2 text-blue-600" />
                    Team Readiness Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{spiritAnalysis.teamReadiness}%</div>
                      <div className="text-sm text-green-800">Team Readiness</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{roleRequirements.filter(r => r.status === 'filled').length}</div>
                      <div className="text-sm text-blue-800">Roles Filled</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{roleRequirements.filter(r => r.status === 'gap').length}</div>
                      <div className="text-sm text-orange-800">Critical Gaps</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Team Composition</h4>
                      <Badge className="bg-green-100 text-green-800">
                        {teamMembers.filter(t => t.status === 'assigned').length} Internal + {subcontractors.filter(s => s.status === 'selected').length} Subcontractors
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Average Match Score</h4>
                      <Badge className="bg-blue-100 text-blue-800">
                        {Math.round(teamMembers.reduce((acc, t) => acc + t.matchScore, 0) / teamMembers.length)}%
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Critical Gaps */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Critical Gaps Identified
                  </h3>
                  <div className="space-y-3">
                    {spiritAnalysis.gaps.critical.map((gap, index) => (
                      <div key={index} className="flex items-start p-3 bg-red-50 rounded-lg border-l-4 border-red-400">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-red-800">{gap}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Automated Actions */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                    Automated Actions Completed
                  </h3>
                  <div className="space-y-2">
                    {spiritAnalysis.automatedActions.completed.map((action, index) => (
                      <div key={index} className="flex items-center p-2 bg-green-50 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                        <span className="text-green-800 text-sm">{action}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Role Requirements */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Role Requirements & Assignments</h3>
                  <div className="space-y-4">
                    {roleRequirements.map((role) => (
                      <div key={role.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">{role.title}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={role.status === 'filled' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                              {role.status === 'filled' ? 'Filled' : 'Gap'}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800">
                              {role.priority}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{role.description}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">{role.hours} hours • {role.experience} years exp</span>
                          {role.assignedTo && (
                            <span className="text-green-600">
                              ✓ Assigned to {teamMembers.find(t => t.id === role.assignedTo)?.name}
                            </span>
                          )}
                        </div>
                      </div>
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
                  <p className="text-sm text-gray-700">Team readiness: 85% with 2 critical gaps identified</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">Recommend TechSolutions Inc. for system integration</p>
                </div>
                <div className="p-3 bg-white/50 rounded-lg">
                  <p className="text-sm text-gray-700">Training Coordinator role needs immediate attention</p>
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

            {/* Team Recommendations */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-600" />
                Team Recommendations
              </h3>
              <div className="space-y-3">
                {spiritAnalysis.recommendations.internal.slice(0, 3).map((rec, index) => (
                  <div key={index} className="p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-800">{rec}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Subcontractor Analysis */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building2 className="h-5 w-5 mr-2 text-blue-600" />
                Subcontractor Analysis
              </h3>
              <div className="space-y-4">
                {subcontractors.map((sub) => (
                  <div key={sub.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{sub.name}</h4>
                      <Badge className="bg-blue-100 text-blue-800">{sub.matchScore}%</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{sub.type}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Past Performance: {sub.pastPerformance}</span>
                      <Badge className={sub.status === 'selected' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                        {sub.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
} 