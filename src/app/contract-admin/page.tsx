'use client'

import { useState, useEffect } from 'react'
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
  ArrowRight,
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

export default function ContractAdminPage() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [selectedContract, setSelectedContract] = useState<string>('c-001')
  const [contractFilter, setContractFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [adminProgress, setAdminProgress] = useState(0)
  const [spiritAnalysis, setSpiritAnalysis] = useState({
    isProcessing: false,
    progress: 0,
    insights: [] as string[],
    recommendations: [] as string[],
    warnings: [] as string[]
  })

  // Mock Data - Multiple Contracts
  const [contracts] = useState<Contract[]>([
    {
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
    },
    {
      id: 'c-002',
      number: 'W912P8-25-C-0002',
      title: 'IT Infrastructure Support',
      agency: 'Department of Defense',
      value: 1800000,
      startDate: '2025-02-01',
      endDate: '2026-01-31',
      status: 'active',
      type: 'cost-plus',
      contractingOfficer: 'Mike Johnson',
      cor: 'Lisa Chen',
      budget: {
        total: 1800000,
        spent: 540000,
        remaining: 1260000,
        burnRate: 30
      },
      performance: {
        quality: 88,
        schedule: 92,
        cost: 85,
        overall: 88
      }
    },
    {
      id: 'c-003',
      number: 'W912P8-25-C-0003',
      title: 'Facility Security Services',
      agency: 'Department of Homeland Security',
      value: 3200000,
      startDate: '2024-11-01',
      endDate: '2025-10-31',
      status: 'active',
      type: 'fixed-price',
      contractingOfficer: 'David Wilson',
      cor: 'Robert Brown',
      budget: {
        total: 3200000,
        spent: 2560000,
        remaining: 640000,
        burnRate: 80
      },
      performance: {
        quality: 92,
        schedule: 95,
        cost: 90,
        overall: 92
      }
    },
    {
      id: 'c-004',
      number: 'W912P8-25-C-0004',
      title: 'Environmental Consulting',
      agency: 'Environmental Protection Agency',
      value: 950000,
      startDate: '2025-03-01',
      endDate: '2026-02-28',
      status: 'pending',
      type: 'time-materials',
      contractingOfficer: 'Jennifer Davis',
      cor: 'Thomas Anderson',
      budget: {
        total: 950000,
        spent: 0,
        remaining: 950000,
        burnRate: 0
      },
      performance: {
        quality: 0,
        schedule: 0,
        cost: 0,
        overall: 0
      }
    },
    {
      id: 'c-005',
      number: 'W912P8-25-C-0005',
      title: 'Training Program Development',
      agency: 'Department of Veterans Affairs',
      value: 750000,
      startDate: '2024-08-01',
      endDate: '2025-07-31',
      status: 'completed',
      type: 'fixed-price',
      contractingOfficer: 'Patricia Garcia',
      cor: 'Michael Taylor',
      budget: {
        total: 750000,
        spent: 750000,
        remaining: 0,
        burnRate: 100
      },
      performance: {
        quality: 96,
        schedule: 94,
        cost: 98,
        overall: 96
      }
    }
  ])

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
    },
    {
      id: 'd-002',
      contractId: 'c-001',
      title: 'Quarterly Quality Review',
      description: 'Comprehensive quality assessment and improvement recommendations',
      type: 'review',
      dueDate: '2025-09-30',
      status: 'in-progress',
      assignedTo: 'Lisa Chen',
      documents: ['Quality-Assessment-Template.docx'],
      notes: 'Schedule meeting with COR for review'
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
    },
    {
      id: 'i-002',
      contractId: 'c-001',
      invoiceNumber: 'INV-2025-002',
      period: 'February 2025',
      amount: 208333,
      status: 'in-review',
      submittedDate: '2025-03-01',
      daysOutstanding: 15,
      notes: 'Under COR review'
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

  // Contract filtering and selection
  const filteredContracts = contracts.filter(contract => {
    const matchesFilter = contractFilter === 'all' || contract.status === contractFilter
    const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.agency.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const currentContract = contracts.find(c => c.id === selectedContract) || contracts[0]

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

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Contract Workspace Header */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Contract Workspace</h3>
            <p className="text-gray-600">Post-Award Management & Administration</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-sm">
              {currentContract.type.toUpperCase()}
            </Badge>
            <Badge variant={currentContract.status === 'active' ? 'default' : 'secondary'}>
              {currentContract.status.toUpperCase()}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Contract Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Number:</span>
                <span className="font-medium">{currentContract.number}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Agency:</span>
                <span className="font-medium">{currentContract.agency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contracting Officer:</span>
                <span className="font-medium">{currentContract.contractingOfficer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">COR:</span>
                <span className="font-medium">{currentContract.cor}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Period of Performance</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span className="font-medium">{currentContract.startDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">End Date:</span>
                <span className="font-medium">{currentContract.endDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Contract Value:</span>
                <span className="font-medium">${(currentContract.value / 1000000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-900">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Upload className="h-4 w-4 mr-2" />
                Upload Modification
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Submit Invoice
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Review
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Contracts Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Contracts</p>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <FileText className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>
        
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Contracts</p>
              <p className="text-2xl font-bold text-green-600">
                {contracts.filter(c => c.status === 'active').length}
              </p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>
        
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Value</p>
              <p className="text-2xl font-bold text-purple-600">
                ${(contracts.reduce((total, c) => total + c.value, 0) / 1000000).toFixed(1)}M
              </p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </Card>
        
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(contracts.reduce((total, c) => total + c.performance.overall, 0) / contracts.length)}%
              </p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* All Contracts Table */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Contracts</h3>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Showing {filteredContracts.length} of {contracts.length} contracts</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Contract</th>
                <th className="text-left p-3">Agency</th>
                <th className="text-right p-3">Value</th>
                <th className="text-center p-3">Status</th>
                <th className="text-center p-3">Performance</th>
                <th className="text-center p-3">Burn Rate</th>
                <th className="text-center p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContracts.map((contract) => (
                <tr 
                  key={contract.id} 
                  className={`border-b hover:bg-gray-50 cursor-pointer ${
                    selectedContract === contract.id ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => setSelectedContract(contract.id)}
                >
                  <td className="p-3">
                    <div>
                      <p className="font-medium text-gray-900">{contract.number}</p>
                      <p className="text-sm text-gray-600">{contract.title}</p>
                    </div>
                  </td>
                  <td className="p-3 text-gray-600">{contract.agency}</td>
                  <td className="p-3 text-right font-semibold">
                    ${(contract.value / 1000000).toFixed(1)}M
                  </td>
                  <td className="p-3 text-center">
                    <Badge variant={
                      contract.status === 'active' ? 'default' : 
                      contract.status === 'completed' ? 'secondary' : 'outline'
                    }>
                      {contract.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className="font-semibold text-blue-600">{contract.performance.overall}%</span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center">
                      <span className={`font-semibold ${
                        contract.budget.burnRate > 80 ? 'text-red-600' :
                        contract.budget.burnRate > 60 ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {contract.budget.burnRate}%
                      </span>
                    </div>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
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
                  <h4 className="font-medium text-gray-900">{currentContract.number}</h4>
                  <p className="text-sm text-gray-600">{currentContract.title}</p>
                </div>
                <Badge variant={currentContract.status === 'active' ? 'default' : 'secondary'}>
                  {currentContract.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{currentContract.performance.overall}%</div>
                  <div className="text-sm text-gray-600">Overall Rating</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{currentContract.budget.burnRate}%</div>
                  <div className="text-sm text-gray-600">Budget Burn Rate</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Quality</span>
                  <span className="font-semibold">{currentContract.performance.quality}%</span>
                </div>
                <Progress value={currentContract.performance.quality} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Schedule</span>
                  <span className="font-semibold">{currentContract.performance.schedule}%</span>
                </div>
                <Progress value={currentContract.performance.schedule} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Cost</span>
                  <span className="font-semibold">{currentContract.performance.cost}%</span>
                </div>
                <Progress value={currentContract.performance.cost} className="h-2" />
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
                <span className="font-semibold">${(currentContract.budget.total / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Spent</span>
                <span className="font-semibold text-orange-600">${(currentContract.budget.spent / 1000000).toFixed(1)}M</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Remaining</span>
                <span className="font-semibold text-green-600">${(currentContract.budget.remaining / 1000000).toFixed(1)}M</span>
              </div>
              
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <h5 className="font-medium text-blue-900 mb-1">Budget Status</h5>
                <p className="text-sm text-blue-800">
                  {currentContract.budget.burnRate < 50 ? 'On track' : 'Monitor closely'} - {currentContract.budget.burnRate}% spent
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

  const renderDeliverablesTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Deliverables & Performance Reporting</h3>
            <p className="text-gray-600">Track deliverables, milestones, and performance checkpoints</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Add Deliverable
          </Button>
        </div>

        <div className="space-y-4">
          {deliverables.map((deliverable) => (
            <div key={deliverable.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{deliverable.title}</h4>
                  <p className="text-sm text-gray-600">{deliverable.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    deliverable.type === 'report' ? 'default' : 
                    deliverable.type === 'milestone' ? 'secondary' : 'outline'
                  }>
                    {deliverable.type.toUpperCase()}
                  </Badge>
                  <Badge variant={
                    deliverable.status === 'completed' ? 'default' : 
                    deliverable.status === 'overdue' ? 'destructive' : 'secondary'
                  }>
                    {deliverable.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Due Date:</span>
                  <p className="font-semibold">{deliverable.dueDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Assigned To:</span>
                  <p className="font-semibold">{deliverable.assignedTo}</p>
                </div>
                <div>
                  <span className="text-gray-600">Documents:</span>
                  <p className="font-semibold">{deliverable.documents.length} attached</p>
                </div>
              </div>

              {deliverable.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">{deliverable.notes}</p>
                </div>
              )}

              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Document
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Update Status
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderSubcontractorsTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Subcontractor Management</h3>
            <p className="text-gray-600">Monitor subcontractor performance and flow-down compliance</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Add Subcontractor
          </Button>
        </div>

        <div className="space-y-4">
          {subcontractors.map((sub) => (
            <div key={sub.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{sub.name}</h4>
                  <p className="text-sm text-gray-600">Value: ${sub.value.toLocaleString()}</p>
                </div>
                <Badge variant={sub.status === 'active' ? 'default' : 'secondary'}>
                  {sub.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Performance Metrics</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Quality</span>
                      <span className="font-semibold">{sub.performance.quality}%</span>
                    </div>
                    <Progress value={sub.performance.quality} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Schedule</span>
                      <span className="font-semibold">{sub.performance.schedule}%</span>
                    </div>
                    <Progress value={sub.performance.schedule} className="h-2" />
                    
                    <div className="flex justify-between text-sm">
                      <span>Cost</span>
                      <span className="font-semibold">{sub.performance.cost}%</span>
                    </div>
                    <Progress value={sub.performance.cost} className="h-2" />
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Compliance Status</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Flow-Down Clauses</span>
                      <Badge variant={sub.compliance.flowDownClauses ? 'default' : 'destructive'}>
                        {sub.compliance.flowDownClauses ? 'Compliant' : 'Non-Compliant'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Wage Determinations</span>
                      <Badge variant={sub.compliance.wageDeterminations ? 'default' : 'destructive'}>
                        {sub.compliance.wageDeterminations ? 'Compliant' : 'Non-Compliant'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Cybersecurity</span>
                      <Badge variant={sub.compliance.cybersecurity ? 'default' : 'destructive'}>
                        {sub.compliance.cybersecurity ? 'Compliant' : 'Non-Compliant'}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-1" />
                  View Contract
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-1" />
                  Performance Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderInvoicingTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Invoicing & Accounts Receivable</h3>
            <p className="text-gray-600">Track invoice status, payment timelines, and AR aging</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Create Invoice
          </Button>
        </div>

        <div className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{invoice.invoiceNumber}</h4>
                  <p className="text-sm text-gray-600">{invoice.period}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-lg">${invoice.amount.toLocaleString()}</span>
                  <Badge variant={
                    invoice.status === 'paid' ? 'default' : 
                    invoice.status === 'rejected' ? 'destructive' : 'secondary'
                  }>
                    {invoice.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Submitted:</span>
                  <p className="font-semibold">{invoice.submittedDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Days Outstanding:</span>
                  <p className="font-semibold">{invoice.daysOutstanding}</p>
                </div>
                <div>
                  <span className="text-gray-600">Paid Date:</span>
                  <p className="font-semibold">{invoice.paidDate || 'Pending'}</p>
                </div>
              </div>

              {invoice.notes && (
                <div className="mt-3 p-2 bg-gray-50 rounded">
                  <p className="text-sm text-gray-700">{invoice.notes}</p>
                </div>
              )}

              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download Invoice
                </Button>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  Follow Up
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderGFPTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Government-Furnished Property (GFP) Log</h3>
            <p className="text-gray-600">Track equipment or materials loaned by the government</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Add GFP Item
          </Button>
        </div>

        <div className="space-y-4">
          {gfpItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{item.item}</h4>
                  <p className="text-sm text-gray-600">S/N: {item.serialNumber}</p>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={
                    item.status === 'in-use' ? 'default' : 
                    item.status === 'returned' ? 'secondary' : 'outline'
                  }>
                    {item.status.toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.condition}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Received:</span>
                  <p className="font-semibold">{item.receivedDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <p className="font-semibold">{item.location}</p>
                </div>
                <div>
                  <span className="text-gray-600">Return Date:</span>
                  <p className="font-semibold">{item.returnDate || 'TBD'}</p>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Upload className="h-4 w-4 mr-1" />
                  Upload Return Form
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Update Status
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderCloseoutTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Final Invoice & Contract Closeout Checklist</h3>
            <p className="text-gray-600">Guide contractors through FAR-compliant closeout steps</p>
          </div>
          <Button className="btn-premium">
            <Download className="h-4 w-4 mr-2" />
            Export Checklist
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Closeout Checklist</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Final invoice submitted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">GFP returned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Release of Claims signed (SF 1428)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Final report submitted</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Warnings & Alerts</h4>
              <div className="space-y-2">
                <div className="p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                  <p className="text-sm text-yellow-800">
                    ⚠️ Don't forget WDs or final COR sign-off!
                  </p>
                </div>
                <div className="p-2 bg-red-50 rounded border-l-4 border-red-400">
                  <p className="text-sm text-red-800">
                    🚨 GFP due for return in 30 days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderCPARSTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">CPARS Performance Prep</h3>
            <p className="text-gray-600">Help contractors prepare for CPARS evaluations and monitor ratings</p>
          </div>
          <Button className="btn-premium">
            <Plus className="h-4 w-4 mr-2" />
            Create Self-Assessment
          </Button>
        </div>

        <div className="space-y-4">
          {cparsReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{report.evaluationPeriod}</h4>
                  <p className="text-sm text-gray-600">Due: {report.dueDate}</p>
                </div>
                <Badge variant={report.status === 'completed' ? 'default' : 'secondary'}>
                  {report.status.toUpperCase()}
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center">
                  <p className="text-gray-600">Quality</p>
                  <p className="font-semibold text-lg">{report.ratings.quality}/5</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Schedule</p>
                  <p className="font-semibold text-lg">{report.ratings.schedule}/5</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Cost</p>
                  <p className="font-semibold text-lg">{report.ratings.cost}/5</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-600">Management</p>
                  <p className="font-semibold text-lg">{report.ratings.management}/5</p>
                </div>
              </div>

              <div className="mt-3 flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Report
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Assessment
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderVaultTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Compliance Document Vault</h3>
            <p className="text-gray-600">Secure archive of all contract-related compliance documents</p>
          </div>
          <Button className="btn-premium">
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Modifications</h4>
              <Badge variant="outline">12 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">SF30s and contract modifications</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Invoices</h4>
              <Badge variant="outline">8 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">Submitted invoices and payment records</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Wage Determinations</h4>
              <Badge variant="outline">5 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">SCA and DBA compliance documents</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Subcontractor Certs</h4>
              <Badge variant="outline">15 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">Certifications and compliance docs</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Property Logs</h4>
              <Badge variant="outline">3 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">GFP tracking and return forms</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">CPARS Reports</h4>
              <Badge variant="outline">4 files</Badge>
            </div>
            <p className="text-sm text-gray-600 mb-3">Performance evaluation reports</p>
            <Button variant="outline" size="sm" className="w-full">
              <Eye className="h-4 w-4 mr-1" />
              View Documents
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Post-Award Contract Administration
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Comprehensive contract management and compliance tracking
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <Download className="h-4 w-4 mr-2" />
              Export Reports
            </Button>
            <Button className="btn-premium">
              <Settings className="h-4 w-4 mr-2" />
              Admin Settings
            </Button>
          </div>
        </div>

        {/* Contract Selection */}
        <Card className="card-premium p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Select Contract</label>
                <select 
                  value={selectedContract}
                  onChange={(e) => setSelectedContract(e.target.value)}
                  className="w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {filteredContracts.map((contract) => (
                    <option key={contract.id} value={contract.id}>
                      {contract.number} - {contract.title}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Filter by Status</label>
                <select 
                  value={contractFilter}
                  onChange={(e) => setContractFilter(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search contracts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" className="btn-ghost-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Contract
              </Button>
            </div>
          </div>
        </Card>

        {/* Current Contract Info */}
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{currentContract.number}</h3>
              <p className="text-gray-600">{currentContract.title}</p>
              <p className="text-sm text-gray-500">{currentContract.agency}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Contract Value</p>
                <p className="text-lg font-semibold">${(currentContract.value / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Status</p>
                <Badge variant={
                  currentContract.status === 'active' ? 'default' : 
                  currentContract.status === 'completed' ? 'secondary' : 'outline'
                }>
                  {currentContract.status.toUpperCase()}
                </Badge>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Performance</p>
                <p className="text-lg font-semibold text-blue-600">{currentContract.performance.overall}%</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-10">
            <TabsTrigger value="overview">📄 Overview</TabsTrigger>
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="modifications">✍️ Modifications</TabsTrigger>
            <TabsTrigger value="deliverables">📆 Deliverables</TabsTrigger>
            <TabsTrigger value="subcontractors">🤝 Subcontractors</TabsTrigger>
            <TabsTrigger value="invoicing">📥 Invoicing</TabsTrigger>
            <TabsTrigger value="gfp">📦 GFP Log</TabsTrigger>
            <TabsTrigger value="closeout">📋 Closeout</TabsTrigger>
            <TabsTrigger value="cpars">🧾 CPARS</TabsTrigger>
            <TabsTrigger value="vault">🔐 Vault</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboardTab()}
          </TabsContent>

          <TabsContent value="modifications" className="space-y-6">
            {renderModificationsTab()}
          </TabsContent>

          <TabsContent value="deliverables" className="space-y-6">
            {renderDeliverablesTab()}
          </TabsContent>

          <TabsContent value="subcontractors" className="space-y-6">
            {renderSubcontractorsTab()}
          </TabsContent>

          <TabsContent value="invoicing" className="space-y-6">
            {renderInvoicingTab()}
          </TabsContent>

          <TabsContent value="gfp" className="space-y-6">
            {renderGFPTab()}
          </TabsContent>

          <TabsContent value="closeout" className="space-y-6">
            {renderCloseoutTab()}
          </TabsContent>

          <TabsContent value="cpars" className="space-y-6">
            {renderCPARSTab()}
          </TabsContent>

          <TabsContent value="vault" className="space-y-6">
            {renderVaultTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 