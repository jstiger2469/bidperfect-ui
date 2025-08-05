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
  Cloud
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

interface Deliverable {
  id: string
  contractId: string
  title: string
  description: string
  type: 'report' | 'milestone' | 'inspection' | 'review'
  dueDate: string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue'
  assignedTo: string
  documents: string[]
  notes: string
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

  const [deliverables] = useState<Deliverable[]>([
    {
      id: 'd-001',
      contractId: 'c-001',
      title: 'Monthly Performance Report',
      description: 'Monthly status report covering quality metrics and schedule adherence',
      type: 'report',
      dueDate: '2025-08-31',
      status: 'pending',
      assignedTo: 'Mike Davis',
      documents: [],
      notes: 'Include subcontractor performance metrics'
    }
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

          {/* Add other tab contents here */}
        </Tabs>
      </div>
    </div>
  )
} 