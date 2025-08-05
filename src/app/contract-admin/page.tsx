'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  FileText, 
  Search, 
  Plus, 
  CheckCircle, 
  Clock, 
  Award,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

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

export default function ContractAdminPage() {
  const router = useRouter()
  const [contractFilter, setContractFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock Data - This would come from your Zustand store or API
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
      number: 'N00189-25-C-0002',
      title: 'IT Infrastructure Support',
      agency: 'Naval Air Systems Command',
      value: 1800000,
      startDate: '2025-02-01',
      endDate: '2026-01-31',
      status: 'active',
      type: 'cost-plus',
      contractingOfficer: 'Michael Brown',
      cor: 'Lisa Davis',
      budget: {
        total: 1800000,
        spent: 720000,
        remaining: 1080000,
        burnRate: 40
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
      number: 'FA8601-25-C-0003',
      title: 'Facility Security Systems',
      agency: 'Air Force Life Cycle Management Center',
      value: 3200000,
      startDate: '2025-01-01',
      endDate: '2026-12-31',
      status: 'pending',
      type: 'fixed-price',
      contractingOfficer: 'Robert Wilson',
      cor: 'Jennifer Garcia',
      budget: {
        total: 3200000,
        spent: 0,
        remaining: 3200000,
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
      id: 'c-004',
      number: 'W912P8-24-C-0004',
      title: 'Environmental Remediation',
      agency: 'US Army Corps of Engineers',
      value: 4500000,
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      status: 'completed',
      type: 'time-materials',
      contractingOfficer: 'David Miller',
      cor: 'Amanda Taylor',
      budget: {
        total: 4500000,
        spent: 4500000,
        remaining: 0,
        burnRate: 100
      },
      performance: {
        quality: 96,
        schedule: 94,
        cost: 98,
        overall: 96
      }
    },
    {
      id: 'c-005',
      number: 'N00189-24-C-0005',
      title: 'Training Program Development',
      agency: 'Naval Air Systems Command',
      value: 1200000,
      startDate: '2024-09-01',
      endDate: '2025-08-31',
      status: 'terminated',
      type: 'fixed-price',
      contractingOfficer: 'Christopher Lee',
      cor: 'Rachel Martinez',
      budget: {
        total: 1200000,
        spent: 480000,
        remaining: 720000,
        burnRate: 40
      },
      performance: {
        quality: 75,
        schedule: 60,
        cost: 80,
        overall: 72
      }
    }
  ])

  const handleContractClick = (contractId: string) => {
    router.push(`/contract-admin/${contractId}`)
  }

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.agency.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = contractFilter === 'all' || contract.status === contractFilter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Contract Administration
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Post-Award Management & Administration
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <Building2 className="h-4 w-4 mr-2" />
              Contract Templates
            </Button>
            <Button className="btn-premium">
              <Plus className="h-4 w-4 mr-2" />
              Add New Contract
            </Button>
          </div>
        </div>

        {/* Contract Selection - Apple Style Cards */}
        <div className="space-y-6">
          {/* Search and Filter Bar */}
          <Card className="card-premium p-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="flex items-center space-x-4">
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
                <select 
                  value={contractFilter}
                  onChange={(e) => setContractFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Contracts</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="terminated">Terminated</option>
                </select>
              </div>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Active: {contracts.filter(c => c.status === 'active').length}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                  Pending: {contracts.filter(c => c.status === 'pending').length}
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                  Completed: {contracts.filter(c => c.status === 'completed').length}
                </div>
              </div>
            </div>
          </Card>

          {/* Contract Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContracts.map((contract) => (
              <Card 
                key={contract.id}
                className="card-premium p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:bg-gray-50"
                onClick={() => handleContractClick(contract.id)}
              >
                {/* Contract Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{contract.number}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{contract.title}</p>
                  </div>
                  <Badge variant={
                    contract.status === 'active' ? 'default' : 
                    contract.status === 'completed' ? 'secondary' : 'outline'
                  } className="ml-2">
                    {contract.status.toUpperCase()}
                  </Badge>
                </div>

                {/* Agency Info */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Agency</p>
                  <p className="text-sm font-medium text-gray-900">{contract.agency}</p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Value</p>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(contract.value / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Performance</p>
                    <p className="text-sm font-semibold text-blue-600">
                      {contract.performance.overall}%
                    </p>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Budget Burn</span>
                    <span className={`font-medium ${
                      contract.budget.burnRate > 80 ? 'text-red-600' :
                      contract.budget.burnRate > 60 ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {contract.budget.burnRate}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        contract.budget.burnRate > 80 ? 'bg-red-500' :
                        contract.budget.burnRate > 60 ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(contract.budget.burnRate, 100)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Contract Details */}
                <div className="space-y-2 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-medium">{contract.startDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span className="font-medium">{contract.endDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{contract.type.replace('-', ' ')}</span>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <FileText className="h-3 w-3 text-white" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredContracts.length === 0 && (
            <Card className="card-premium p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No contracts found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
              <Button className="btn-premium">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Contract
              </Button>
            </Card>
          )}
        </div>

        {/* Contract Selection Instructions */}
        <Card className="card-premium p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Contract to Manage</h3>
            <p className="text-gray-600 mb-4">
              Click on any contract card above to access its dedicated workspace with full administration tools
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                Active Contracts
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                Pending Review
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
                Completed
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
} 