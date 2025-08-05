'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Target,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Download,
  Upload,
  ArrowLeft,
  Brain,
  Search,
  Filter,
  Star,
  Award,
  Users,
  DollarSign,
  Calendar,
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Edit,
  FileText as FileTextIcon,
  Target as TargetIcon,
  Clock as ClockIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Eye as EyeIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  ArrowLeft as ArrowLeftIcon,
  Brain as BrainIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Star as StarIcon,
  Award as AwardIcon,
  Users as UsersIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon,
  Building2 as Building2Icon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  ExternalLink as ExternalLinkIcon,
  Edit as EditIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface EvaluationFactor {
  id: string;
  name: string;
  weight: number;
  description: string;
  criteria: string[];
  importance: 'critical' | 'high' | 'medium' | 'low';
}

interface Instruction {
  id: string;
  category: string;
  requirement: string;
  details: string;
  status: 'compliant' | 'non_compliant' | 'missing' | 'review_needed';
  impact: 'disqualifying' | 'major' | 'minor';
}

interface PWSItem {
  id: string;
  clin: string;
  description: string;
  quantity: number;
  unit: string;
  period: string;
  requirements: string[];
  deliverables: string[];
}

interface SpiritAnalysis {
  id: string;
  type: 'opportunity' | 'risk' | 'strategy' | 'compliance';
  title: string;
  message: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  recommendations: string[];
}

// Mock data for solicitation review
const mockEvaluationFactors: EvaluationFactor[] = [
  {
    id: "eval-1",
    name: "Technical Approach",
    weight: 40,
    description: "Demonstrated understanding of requirements and proposed technical solution",
    criteria: [
      "Clear understanding of PWS requirements",
      "Innovative technical approach",
      "Realistic implementation timeline",
      "Risk mitigation strategies"
    ],
    importance: "critical"
  },
  {
    id: "eval-2",
    name: "Past Performance",
    weight: 30,
    description: "Relevant experience and performance history",
    criteria: [
      "Similar scope and complexity",
      "Recent performance (within 3 years)",
      "Positive CPARS ratings",
      "Relevant NAICS codes"
    ],
    importance: "high"
  },
  {
    id: "eval-3",
    name: "Price",
    weight: 30,
    description: "Total evaluated price and cost realism",
    criteria: [
      "Competitive pricing",
      "Cost realism analysis",
      "Price reasonableness",
      "Value for money"
    ],
    importance: "high"
  }
]

const mockInstructions: Instruction[] = [
  {
    id: "inst-1",
    category: "Formatting",
    requirement: "Page Limits",
    details: "Technical proposal shall not exceed 20 pages, excluding cover page and table of contents",
    status: "compliant",
    impact: "disqualifying"
  },
  {
    id: "inst-2",
    category: "Formatting",
    requirement: "Font Requirements",
    details: "Times New Roman, 12pt font, 1-inch margins",
    status: "non_compliant",
    impact: "major"
  },
  {
    id: "inst-3",
    category: "Submission",
    requirement: "Portal Submission",
    details: "Submit via SAM.gov portal by 5:00 PM EST on due date",
    status: "compliant",
    impact: "disqualifying"
  },
  {
    id: "inst-4",
    category: "Documents",
    requirement: "Required Certifications",
    details: "SF 1449, Representations and Certifications, Past Performance Questionnaire",
    status: "missing",
    impact: "disqualifying"
  }
]

const mockPWSItems: PWSItem[] = [
  {
    id: "clin-001",
    clin: "CLIN 0001",
    description: "IT Infrastructure Modernization",
    quantity: 1,
    unit: "Lot",
    period: "12 months",
    requirements: [
      "Network infrastructure upgrade",
      "Security system implementation",
      "Cloud migration support"
    ],
    deliverables: [
      "System design documents",
      "Implementation plan",
      "Training materials",
      "Final acceptance report"
    ]
  },
  {
    id: "clin-002",
    clin: "CLIN 0002",
    description: "Ongoing Support and Maintenance",
    quantity: 12,
    unit: "Months",
    period: "12 months",
    requirements: [
      "24/7 help desk support",
      "System monitoring",
      "Regular maintenance"
    ],
    deliverables: [
      "Monthly status reports",
      "Incident reports",
      "Performance metrics"
    ]
  }
]

const mockSpiritAnalysis: SpiritAnalysis[] = [
  {
    id: "analysis-1",
    type: "opportunity",
    title: "Strong Technical Match",
    message: "Your company's experience in healthcare IT modernization aligns perfectly with this VA requirement. Your past performance on similar projects gives you a competitive advantage.",
    priority: "high",
    recommendations: [
      "Highlight specific VA or healthcare IT experience",
      "Emphasize security certifications and compliance",
      "Showcase successful cloud migration projects"
    ]
  },
  {
    id: "analysis-2",
    type: "risk",
    title: "Formatting Compliance Issue",
    message: "Current proposal uses Arial font instead of required Times New Roman. This could result in disqualification.",
    priority: "critical",
    recommendations: [
      "Convert all text to Times New Roman 12pt",
      "Verify 1-inch margins throughout",
      "Check page count compliance"
    ]
  },
  {
    id: "analysis-3",
    type: "strategy",
    title: "Pricing Strategy Recommendation",
    message: "This is a Best Value procurement with 40% technical weight. Focus on technical excellence over price competition.",
    priority: "high",
    recommendations: [
      "Invest in detailed technical approach",
      "Include innovative solutions",
      "Price competitively but don't undercut quality"
    ]
  }
]

function SpiritPanel({ analysis }: { analysis: SpiritAnalysis }) {
  const getTypeStyles = () => {
    switch (analysis.type) {
      case 'opportunity': return 'border-green-200 bg-green-50'
      case 'risk': return 'border-red-200 bg-red-50'
      case 'strategy': return 'border-blue-200 bg-blue-50'
      case 'compliance': return 'border-orange-200 bg-orange-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getPriorityIcon = () => {
    switch (analysis.priority) {
      case 'critical': return <AlertTriangleIcon className="h-4 w-4 text-red-600" />
      case 'high': return <StarIcon className="h-4 w-4 text-orange-600" />
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
              <span className="text-xs text-gray-500">Strategic Analysis</span>
              {getPriorityIcon()}
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{analysis.title}</h4>
            <p className="text-sm text-gray-700 mb-3">{analysis.message}</p>
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-600">Recommendations:</p>
              <ul className="text-xs text-gray-700 space-y-1">
                {analysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function EvaluationFactorCard({ factor }: { factor: EvaluationFactor }) {
  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
            <h3 className="font-semibold text-gray-900 mb-1">{factor.name}</h3>
            <p className="text-sm text-gray-600">{factor.description}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600 mb-1">{factor.weight}%</div>
            <div className="text-xs text-gray-500">Weight</div>
          </div>
        </div>

        <div className="mb-4">
          <Badge className={getImportanceColor(factor.importance)}>
            {factor.importance} importance
          </Badge>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Evaluation Criteria:</p>
          <ul className="space-y-1">
            {factor.criteria.map((criterion, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}

function InstructionCard({ instruction }: { instruction: Instruction }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case 'non_compliant': return <AlertTriangleIcon className="h-4 w-4 text-red-600" />
      case 'missing': return <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
      case 'review_needed': return <ClockIcon className="h-4 w-4 text-blue-600" />
      default: return <HelpCircleIcon className="h-4 w-4 text-gray-600" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'disqualifying': return 'text-red-600 bg-red-50 border-red-200'
      case 'major': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'minor': return 'text-blue-600 bg-blue-50 border-blue-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
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
          <div className="flex items-center space-x-2">
            {getStatusIcon(instruction.status)}
            <div>
              <h4 className="font-medium text-gray-900">{instruction.requirement}</h4>
              <p className="text-xs text-gray-500">{instruction.category}</p>
            </div>
          </div>
          <Badge className={getImpactColor(instruction.impact)}>
            {instruction.impact}
          </Badge>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{instruction.details}</p>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EditIcon className="h-4 w-4 mr-2" />
            Fix Issue
          </Button>
          <Button variant="outline" size="sm">
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function PWSItemCard({ item }: { item: PWSItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{item.clin}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">{item.quantity}</div>
            <div className="text-xs text-gray-500">{item.unit}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Requirements:</p>
            <ul className="space-y-1">
              {item.requirements.map((req, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Deliverables:</p>
            <ul className="space-y-1">
              {item.deliverables.map((del, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start space-x-2">
                  <span className="text-green-600 mt-1">•</span>
                  <span>{del}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Period: {item.period}</span>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4 mr-2" />
            Map to Pricing
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function SolicitationReviewPage() {
  const [activeTab, setActiveTab] = useState('evaluation')

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Button variant="outline" size="sm" className="btn-ghost-premium">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Solicitation Review - Reverse Engineering Method
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Strategic analysis of VA IT Modernization Services (36C10B24R0001)
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <DownloadIcon className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
            <Button className="btn-premium">
              <EditIcon className="h-4 w-4 mr-2" />
              Start Proposal
            </Button>
          </div>
        </div>

        {/* Spirit AI Analysis */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spirit AI Strategic Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockSpiritAnalysis.map((analysis) => (
              <SpiritPanel key={analysis.id} analysis={analysis} />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="evaluation" className="flex-1">Step 1: Evaluation Factors</TabsTrigger>
            <TabsTrigger value="instructions" className="flex-1">Step 2: Instructions</TabsTrigger>
            <TabsTrigger value="pws" className="flex-1">Step 3: PWS/SOW</TabsTrigger>
            <TabsTrigger value="summary" className="flex-1">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluation" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Factors for Award</h3>
              <p className="text-gray-600 mb-6">
                Understanding how your proposal will be evaluated is critical for strategic positioning. 
                This is a <strong>Best Value/Tradeoff</strong> evaluation with the following factors:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockEvaluationFactors.map((factor) => (
                <EvaluationFactorCard key={factor.id} factor={factor} />
              ))}
            </div>

            <Card className="card-premium p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Strategic Implications</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Technical Approach (40%):</strong> This high weight indicates the government values 
                    innovative solutions and technical excellence over price. Invest heavily in detailed technical approach.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Past Performance (30%):</strong> Your relevant experience will be heavily weighted. 
                    Ensure all past performance references are current and relevant.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Price (30%):</strong> While important, price is not the primary factor. 
                    Focus on value proposition rather than being the lowest bidder.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="instructions" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Instructions to Offerors</h3>
              <p className="text-gray-600 mb-6">
                These are the rules for submission. Missing one detail can disqualify an otherwise strong proposal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockInstructions.map((instruction) => (
                <InstructionCard key={instruction.id} instruction={instruction} />
              ))}
            </div>

            <Card className="card-premium p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Compliance Summary</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2</div>
                  <div className="text-sm text-green-800">Compliant</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">1</div>
                  <div className="text-sm text-red-800">Non-Compliant</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">1</div>
                  <div className="text-sm text-orange-800">Missing</div>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">0</div>
                  <div className="text-sm text-blue-800">Review Needed</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="pws" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Work Statement (PWS)</h3>
              <p className="text-gray-600 mb-6">
                Compare scope of work against CLINs to ensure pricing structure matches deliverables and requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockPWSItems.map((item) => (
                <PWSItemCard key={item.id} item={item} />
              ))}
            </div>

            <Card className="card-premium p-6">
              <h4 className="font-semibold text-gray-900 mb-4">PWS Analysis</h4>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Scope Alignment:</strong> CLINs properly align with PWS requirements. 
                    No scope gaps identified.
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Deliverables:</strong> Clear deliverable schedule with measurable outcomes. 
                    Good basis for pricing structure.
                  </p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <p className="text-sm text-orange-800">
                    <strong>Risk Areas:</strong> 12-month implementation timeline may be aggressive. 
                    Consider phased approach in technical solution.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reverse Engineering Summary</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Strategic Positioning</h4>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      This is a <strong>Best Value procurement</strong> where technical excellence and past performance 
                      outweigh price considerations. Your company should focus on demonstrating superior technical 
                      approach and relevant experience rather than competing on price alone.
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Critical Success Factors</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Fix formatting compliance issues (font, margins)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Include all required certifications and documents</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Develop innovative technical approach (40% weight)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Highlight relevant past performance (30% weight)</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleIcon className="h-4 w-4 text-green-600 mt-0.5" />
                      <span className="text-sm text-gray-700">Price competitively but focus on value (30% weight)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Next Steps</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button className="btn-premium w-full">
                      <EditIcon className="h-4 w-4 mr-2" />
                      Start Proposal Builder
                    </Button>
                    <Button variant="outline" className="btn-ghost-premium w-full">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export Analysis
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 