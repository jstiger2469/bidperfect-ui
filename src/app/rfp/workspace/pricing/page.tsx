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
  Calculator, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Users, 
  FileText, 
  Download, 
  Upload, 
  Search, 
  Settings, 
  Info,
  ArrowRight,
  Sparkles,
  Brain,
  Zap,
  Target,
  Shield,
  Building2,
  Car,
  Plane,
  Hotel,
  Utensils,
  Briefcase,
  GraduationCap,
  Award,
  FileCheck,
  AlertCircle,
  CheckSquare,
  Square
} from 'lucide-react'
import { motion } from 'framer-motion'

interface PricingComponent {
  id: string
  name: string
  description: string
  baseAmount: number
  percentage: number
  calculatedAmount: number
  status: 'pending' | 'calculated' | 'reviewed' | 'approved'
  notes: string
  compliance: {
    required: boolean
    compliant: boolean
    warnings: string[]
  }
}

interface WageDetermination {
  id: string
  number: string
  type: 'SCA' | 'DBA'
  location: string
  effectiveDate: string
  laborCategories: LaborCategory[]
  fringeBenefits: FringeBenefit[]
  status: 'active' | 'expired' | 'pending'
}

interface LaborCategory {
  id: string
  title: string
  baseWage: number
  fringeRate: number
  totalRate: number
  hours: number
  totalCost: number
  compliance: 'compliant' | 'non-compliant' | 'pending'
}

interface FringeBenefit {
  type: string
  rate: number
  description: string
  required: boolean
}

interface TravelCost {
  type: 'mileage' | 'per-diem' | 'lodging' | 'meals'
  description: string
  rate: number
  quantity: number
  total: number
  compliance: 'compliant' | 'non-compliant'
  regulation: 'FTR' | 'Louisiana' | 'GSA'
}

interface TaxCalculation {
  type: 'state' | 'local' | 'parish'
  rate: number
  taxableAmount: number
  taxAmount: number
  exempt: boolean
  certificate: string
}

interface PricingSummary {
  directCosts: number
  indirectCosts: number
  totalCost: number
  profit: number
  totalPrice: number
  complianceScore: number
  riskLevel: 'low' | 'medium' | 'high'
}

export default function PricingPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [pricingProgress, setPricingProgress] = useState(0)
  const [spiritAnalysis, setSpiritAnalysis] = useState({
    isProcessing: false,
    progress: 0,
    insights: [] as string[],
    recommendations: [] as string[],
    warnings: [] as string[]
  })

  // Pricing Components State
  const [pricingComponents, setPricingComponents] = useState<PricingComponent[]>([
    {
      id: 'ga',
      name: 'General & Administrative (G&A)',
      description: 'Indirect business expenses (rent, utilities, office supplies, HR services)',
      baseAmount: 150000,
      percentage: 12.5,
      calculatedAmount: 18750,
      status: 'calculated',
      notes: 'Based on historical G&A rate analysis',
      compliance: { required: true, compliant: true, warnings: [] }
    },
    {
      id: 'overhead',
      name: 'Overhead',
      description: 'Contract-specific indirect costs (supervision, safety, project management)',
      baseAmount: 120000,
      percentage: 15.0,
      calculatedAmount: 18000,
      status: 'calculated',
      notes: 'Includes safety programs and project management salaries',
      compliance: { required: true, compliant: true, warnings: [] }
    },
    {
      id: 'profit',
      name: 'Profit / Fee',
      description: 'Contractor return for project risk and investment',
      baseAmount: 36750,
      percentage: 8.5,
      calculatedAmount: 3124,
      status: 'reviewed',
      notes: 'Competitive rate for price-sensitive bid',
      compliance: { required: true, compliant: true, warnings: [] }
    }
  ])

  // Wage Determinations State
  const [wageDeterminations, setWageDeterminations] = useState<WageDetermination[]>([
    {
      id: 'wd-001',
      number: '2025-1234',
      type: 'SCA',
      location: 'New Orleans, LA',
      effectiveDate: '2025-01-01',
      status: 'active',
      laborCategories: [
        {
          id: 'lc-001',
          title: 'HVAC Technician',
          baseWage: 28.50,
          fringeRate: 4.98,
          totalRate: 33.48,
          hours: 160,
          totalCost: 5356.80,
          compliance: 'compliant'
        },
        {
          id: 'lc-002',
          title: 'Construction Manager',
          baseWage: 45.00,
          fringeRate: 4.98,
          totalRate: 49.98,
          hours: 160,
          totalCost: 7996.80,
          compliance: 'compliant'
        }
      ],
      fringeBenefits: [
        { type: 'Health & Welfare', rate: 4.98, description: 'Based on 40-hour workweek', required: true },
        { type: 'Paid Holidays', rate: 2.5, description: '10 paid holidays per year', required: true },
        { type: 'Vacation', rate: 1.5, description: '2 weeks paid vacation', required: true }
      ]
    }
  ])

  // Travel Costs State
  const [travelCosts, setTravelCosts] = useState<TravelCost[]>([
    {
      type: 'mileage',
      description: 'Vehicle mileage for site visits',
      rate: 0.70,
      quantity: 500,
      total: 350.00,
      compliance: 'compliant',
      regulation: 'FTR'
    },
    {
      type: 'per-diem',
      description: 'Daily allowance for overnight travel',
      rate: 155.00,
      quantity: 10,
      total: 1550.00,
      compliance: 'compliant',
      regulation: 'GSA'
    }
  ])

  // Tax Calculations State
  const [taxCalculations, setTaxCalculations] = useState<TaxCalculation[]>([
    {
      type: 'state',
      rate: 4.45,
      taxableAmount: 25000,
      taxAmount: 1112.50,
      exempt: false,
      certificate: ''
    },
    {
      type: 'local',
      rate: 2.50,
      taxableAmount: 25000,
      taxAmount: 625.00,
      exempt: false,
      certificate: ''
    }
  ])

  // Pricing Summary State
  const [pricingSummary, setPricingSummary] = useState<PricingSummary>({
    directCosts: 13353.60,
    indirectCosts: 36750,
    totalCost: 50103.60,
    profit: 3124,
    totalPrice: 53227.60,
    complianceScore: 95,
    riskLevel: 'low'
  })

  // Spirit AI Analysis
  const startSpiritAnalysis = async () => {
    setSpiritAnalysis(prev => ({ ...prev, isProcessing: true, progress: 0 }))
    
    const phases = [
      'Analyzing pricing components...',
      'Validating wage determinations...',
      'Checking travel compliance...',
      'Reviewing tax calculations...',
      'Assessing competitive positioning...',
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
        'G&A rate of 12.5% is competitive for your industry',
        'Wage determinations are fully compliant with SCA requirements',
        'Travel costs follow GSA per diem rates correctly',
        'Profit margin of 8.5% positions you competitively'
      ],
      recommendations: [
        'Consider increasing profit margin to 10% for higher-risk work',
        'Review fringe benefit calculations for accuracy',
        'Verify Louisiana tax exemptions for government contracts'
      ],
      warnings: [
        'Ensure all fringe benefits are properly documented',
        'Monitor wage determination expiration dates'
      ]
    })
  }

  // Calculate pricing components
  const calculatePricingComponent = (id: string, baseAmount: number, percentage: number) => {
    const calculatedAmount = (baseAmount * percentage) / 100
    setPricingComponents(prev => 
      prev.map(comp => 
        comp.id === id 
          ? { ...comp, calculatedAmount, status: 'calculated' as const }
          : comp
      )
    )
  }

  // Update pricing summary
  useEffect(() => {
    const directCosts = wageDeterminations.reduce((total, wd) => 
      total + wd.laborCategories.reduce((catTotal, cat) => catTotal + cat.totalCost, 0), 0
    )
    
    const indirectCosts = pricingComponents
      .filter(comp => ['ga', 'overhead'].includes(comp.id))
      .reduce((total, comp) => total + comp.calculatedAmount, 0)
    
    const profit = pricingComponents
      .find(comp => comp.id === 'profit')?.calculatedAmount || 0
    
    const totalCost = directCosts + indirectCosts
    const totalPrice = totalCost + profit

    setPricingSummary({
      directCosts,
      indirectCosts,
      totalCost,
      profit,
      totalPrice,
      complianceScore: 95,
      riskLevel: 'low'
    })
  }, [pricingComponents, wageDeterminations])

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Spirit AI Analysis */}
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Spirit AI Pricing Analysis</h3>
              <p className="text-sm text-gray-600">Intelligent pricing insights and recommendations</p>
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
            <p className="text-sm text-gray-600">Processing pricing components...</p>
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

      {/* Pricing Summary */}
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Direct Costs</span>
              <span className="font-semibold">${pricingSummary.directCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Indirect Costs</span>
              <span className="font-semibold">${pricingSummary.indirectCosts.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Profit</span>
              <span className="font-semibold">${pricingSummary.profit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <span className="text-gray-900 font-semibold">Total Price</span>
              <span className="text-xl font-bold text-blue-600">${pricingSummary.totalPrice.toLocaleString()}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Compliance Score</span>
              <Badge variant={pricingSummary.complianceScore >= 90 ? 'default' : 'destructive'}>
                {pricingSummary.complianceScore}%
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Risk Level</span>
              <Badge variant={
                pricingSummary.riskLevel === 'low' ? 'default' : 
                pricingSummary.riskLevel === 'medium' ? 'secondary' : 'destructive'
              }>
                {pricingSummary.riskLevel.toUpperCase()}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Profit Margin</span>
              <span className="font-semibold text-green-600">
                {((pricingSummary.profit / pricingSummary.totalCost) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderGATab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">General & Administrative (G&A) Costs</h3>
        <p className="text-gray-600 mb-6">
          Indirect business expenses necessary to operate the company but not directly attributable to a specific contract.
        </p>

        <div className="space-y-4">
          {pricingComponents.filter(comp => ['ga', 'overhead', 'profit'].includes(comp.id)).map((component) => (
            <div key={component.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{component.name}</h4>
                  <p className="text-sm text-gray-600">{component.description}</p>
                </div>
                <Badge variant={
                  component.status === 'approved' ? 'default' : 
                  component.status === 'reviewed' ? 'secondary' : 'outline'
                }>
                  {component.status.charAt(0).toUpperCase() + component.status.slice(1)}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">Base Amount</label>
                  <Input
                    type="number"
                    value={component.baseAmount}
                    onChange={(e) => {
                      const newAmount = parseFloat(e.target.value) || 0
                      setPricingComponents(prev => 
                        prev.map(comp => 
                          comp.id === component.id 
                            ? { ...comp, baseAmount: newAmount }
                            : comp
                        )
                      )
                      calculatePricingComponent(component.id, newAmount, component.percentage)
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Percentage (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={component.percentage}
                    onChange={(e) => {
                      const newPercentage = parseFloat(e.target.value) || 0
                      setPricingComponents(prev => 
                        prev.map(comp => 
                          comp.id === component.id 
                            ? { ...comp, percentage: newPercentage }
                            : comp
                        )
                      )
                      calculatePricingComponent(component.id, component.baseAmount, newPercentage)
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">Calculated Amount</label>
                  <div className="mt-1 p-2 bg-gray-50 rounded border text-gray-900 font-semibold">
                    ${component.calculatedAmount.toLocaleString()}
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">Notes</label>
                <Textarea
                  value={component.notes}
                  onChange={(e) => setPricingComponents(prev => 
                    prev.map(comp => 
                      comp.id === component.id 
                        ? { ...comp, notes: e.target.value }
                        : comp
                    )
                  )}
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderWageDeterminationsTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Wage Determinations (WDs)</h3>
            <p className="text-gray-600">Service Contract Act (SCA) and Davis-Bacon Act (DBA) compliance</p>
          </div>
          <Button className="btn-premium">
            <Search className="h-4 w-4 mr-2" />
            Search WDs
          </Button>
        </div>

        <div className="space-y-4">
          {wageDeterminations.map((wd) => (
            <div key={wd.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900">WD #{wd.number}</h4>
                  <p className="text-sm text-gray-600">{wd.type} • {wd.location} • Effective: {wd.effectiveDate}</p>
                </div>
                <Badge variant={wd.status === 'active' ? 'default' : 'destructive'}>
                  {wd.status.toUpperCase()}
                </Badge>
              </div>

              <div className="space-y-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Labor Categories</h5>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Category</th>
                          <th className="text-right p-2">Base Wage</th>
                          <th className="text-right p-2">Fringe</th>
                          <th className="text-right p-2">Total Rate</th>
                          <th className="text-right p-2">Hours</th>
                          <th className="text-right p-2">Total Cost</th>
                          <th className="text-center p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wd.laborCategories.map((category) => (
                          <tr key={category.id} className="border-b">
                            <td className="p-2">{category.title}</td>
                            <td className="text-right p-2">${category.baseWage}</td>
                            <td className="text-right p-2">${category.fringeRate}</td>
                            <td className="text-right p-2 font-semibold">${category.totalRate}</td>
                            <td className="text-right p-2">{category.hours}</td>
                            <td className="text-right p-2 font-semibold">${category.totalCost.toLocaleString()}</td>
                            <td className="text-center p-2">
                              <Badge variant={
                                category.compliance === 'compliant' ? 'default' : 'destructive'
                              }>
                                {category.compliance}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Fringe Benefits</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {wd.fringeBenefits.map((fringe, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{fringe.type}</p>
                          <p className="text-sm text-gray-600">{fringe.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${fringe.rate}/hr</p>
                          {fringe.required && (
                            <Badge variant="outline" className="text-xs">Required</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderTravelCostsTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Travel Costs</h3>
            <p className="text-gray-600">Federal Travel Regulation (FTR) and GSA Per Diem compliance</p>
          </div>
          <Button className="btn-premium">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Travel
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Travel Components</h4>
            {travelCosts.map((cost, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    {cost.type === 'mileage' && <Car className="h-4 w-4 text-blue-600" />}
                    {cost.type === 'per-diem' && <Hotel className="h-4 w-4 text-green-600" />}
                    {cost.type === 'lodging' && <Building2 className="h-4 w-4 text-purple-600" />}
                    {cost.type === 'meals' && <Utensils className="h-4 w-4 text-orange-600" />}
                    <span className="font-medium text-gray-900">{cost.description}</span>
                  </div>
                  <Badge variant={cost.compliance === 'compliant' ? 'default' : 'destructive'}>
                    {cost.regulation}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Rate:</span>
                    <p className="font-semibold">${cost.rate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Quantity:</span>
                    <p className="font-semibold">{cost.quantity}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total:</span>
                    <p className="font-semibold text-green-600">${cost.total.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Travel Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Travel Costs</span>
                <span className="font-semibold">
                  ${travelCosts.reduce((total, cost) => total + cost.total, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Compliant Items</span>
                <Badge variant="default">
                  {travelCosts.filter(cost => cost.compliance === 'compliant').length}/{travelCosts.length}
                </Badge>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h5 className="font-medium text-blue-900 mb-2">Travel Compliance Notes</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Mileage rate follows current IRS Standard Mileage Rate (70¢/mile)</li>
                <li>• Per diem rates based on GSA tables for destination</li>
                <li>• All travel costs are compliant with FTR requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )

  const renderTaxesTab = () => (
    <div className="space-y-6">
      <Card className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Louisiana Tax Calculations</h3>
            <p className="text-gray-600">State, local, and parish tax compliance for supply items</p>
          </div>
          <Button className="btn-premium">
            <FileCheck className="h-4 w-4 mr-2" />
            Tax Exemption Check
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Tax Breakdown</h4>
            {taxCalculations.map((tax, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h5 className="font-medium text-gray-900 capitalize">{tax.type} Tax</h5>
                    <p className="text-sm text-gray-600">Rate: {tax.rate}%</p>
                  </div>
                  <Badge variant={tax.exempt ? 'secondary' : 'outline'}>
                    {tax.exempt ? 'Exempt' : 'Applicable'}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Taxable Amount:</span>
                    <p className="font-semibold">${tax.taxableAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Tax Amount:</span>
                    <p className="font-semibold text-red-600">${tax.taxAmount.toLocaleString()}</p>
                  </div>
                </div>

                {tax.exempt && tax.certificate && (
                  <div className="mt-3 p-2 bg-green-50 rounded border-l-4 border-green-500">
                    <p className="text-sm text-green-800">
                      <strong>Exemption Certificate:</strong> {tax.certificate}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Tax Summary</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Taxable Amount</span>
                <span className="font-semibold">
                  ${taxCalculations.reduce((total, tax) => total + tax.taxableAmount, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Total Tax Amount</span>
                <span className="font-semibold text-red-600">
                  ${taxCalculations.reduce((total, tax) => total + tax.taxAmount, 0).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <h5 className="font-medium text-orange-900 mb-2">Important Tax Notes</h5>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Sales taxes cannot be passed on as separate line items</li>
                <li>• Taxes must be included in unit or extended prices</li>
                <li>• Verify tax exemptions for government contracts</li>
                <li>• Consider resale certificates where applicable</li>
              </ul>
            </div>
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
              Pricing & Proposal Development
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Develop competitive and compliant pricing strategy
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <Download className="h-4 w-4 mr-2" />
              Export Pricing
            </Button>
            <Button className="btn-premium">
              <ArrowRight className="h-4 w-4 mr-2" />
              Build Proposal
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <Card className="card-premium p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phase 3: Pricing & Proposal Development</h3>
                <p className="text-sm text-gray-600">Complete pricing components to proceed to proposal builder</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{pricingProgress}%</div>
              <div className="text-sm text-gray-600">Complete</div>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ga">G&A & Overhead</TabsTrigger>
            <TabsTrigger value="wages">Wage Determinations</TabsTrigger>
            <TabsTrigger value="travel">Travel Costs</TabsTrigger>
            <TabsTrigger value="taxes">Taxes</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="ga" className="space-y-6">
            {renderGATab()}
          </TabsContent>

          <TabsContent value="wages" className="space-y-6">
            {renderWageDeterminationsTab()}
          </TabsContent>

          <TabsContent value="travel" className="space-y-6">
            {renderTravelCostsTab()}
          </TabsContent>

          <TabsContent value="taxes" className="space-y-6">
            {renderTaxesTab()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 