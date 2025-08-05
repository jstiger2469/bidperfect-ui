import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

// Core Interfaces
export interface TeamMember {
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
  avatar: string
  badges: string[]
}

export interface Subcontractor {
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
  status: 'selected' | 'evaluating' | 'rejected' | 'approved' | 'contracted'
  avatar: string
  logo: string
  bidStatus: 'submitted' | 'approved' | 'pending' | 'rejected'
  assignedWork: {
    scopeItems: string[]
    estimatedValue: number
    timeline: string
    requirements: string[]
  }
  pricing: {
    proposedAmount: number
    laborRates: Record<string, number>
    materials: number
    overhead: number
    profit: number
  }
  compliance: {
    insurance: boolean
    bonding: boolean
    certifications: string[]
    clearances: string[]
  }
  teamMembers: {
    name: string
    role: string
    avatar: string
    status: 'approved' | 'pending' | 'needs-review'
  }[]
}

export interface RoleRequirement {
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

export interface SpiritTeamAnalysis {
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

export interface RFP {
  id: string
  title: string
  agency: string
  office: string
  naics: string
  setAside: 'Full and Open' | 'Small Business' | '8(a)' | 'WOSB' | 'HUBZone' | 'VOSB' | 'SDVOSB'
  contractType: 'Firm Fixed Price' | 'Cost Plus Fixed Fee' | 'Time and Materials' | 'IDIQ' | 'BPA'
  estimatedValue: number
  basePeriod: number
  optionYears: number
  totalValue: number
  submissionDeadline: string
  status: 'draft' | 'in_progress' | 'submitted' | 'awarded' | 'lost'
  progress: number
  teamMembers: TeamMember[]
  subcontractors: Subcontractor[]
  roleRequirements: RoleRequirement[]
  spiritAnalysis: SpiritTeamAnalysis
  workflowProgress: number
  currentStep: number
  completedSteps: number[]
  teamAssemblyData: {
    showStepModal: boolean
    currentStepData: any
    aiSuggestions: any
    autoProcessing: boolean
    actionInProgress: boolean
    selectedAction: string | null
    showCandidateModal: boolean
    candidateType: 'safety-officer' | 'construction-manager' | null
    availableCandidates: any[]
    selectedCandidates: Record<string, any>
    satisfactionStates: Record<string, 'pending' | 'satisfied' | 'modifying'>
    showScenarioSimulator: boolean
    currentScenario: string | null
    scenarioResults: any
    isSimulating: boolean
    showScopeModal: boolean
    scopeData: any
    selectedSubcontractors: string[]
    scopeApproved: boolean
  }
}

// Mock Data Generator
const generateMockTeamMembers = (): TeamMember[] => [
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
    status: 'assigned',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
    badges: ['Project Manager', 'SECRET Clearance']
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
    status: 'assigned',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    badges: ['Security Lead']
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
    status: 'assigned',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    badges: ['PMP Certified', 'Agile Lead']
  },
  {
    id: '4',
    name: 'James Wilson',
    title: 'Proposal Writer',
    email: 'james.wilson@company.com',
    phone: '(555) 456-7890',
    location: 'Reston, VA',
    skills: ['Technical Writing', 'Federal Proposals', 'Compliance'],
    experience: 7,
    clearance: 'Public Trust',
    availability: 'available',
    rate: 85,
    matchScore: 89,
    status: 'assigned',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    badges: ['Technical Writer']
  }
]

const generateMockSubcontractors = (): Subcontractor[] => [
  {
    id: 'sub1',
    name: 'Gun HVAC',
    type: 'HVAC Contractor',
    specialties: ['HVAC Installation', 'System Maintenance', 'Controls'],
    pastPerformance: 4.8,
    priceCompetitiveness: 85,
    availability: 'high',
    certifications: ['NAICS 238220', 'Licensed HVAC'],
    location: 'Reston, VA',
    contact: {
      name: 'Paul Johnson',
      email: 'p.johnson@gunhvac.com',
      phone: '(555) 456-7890'
    },
    matchScore: 87,
    status: 'approved',
    bidStatus: 'approved',
    assignedWork: {
      scopeItems: ['HVAC System Removal', 'New HVAC Installation', 'Controls Integration'],
      estimatedValue: 450000,
      timeline: '8 weeks',
      requirements: ['OSHA 10 certification', 'HVAC license', 'EPA certification']
    },
    pricing: {
      proposedAmount: 450000,
      laborRates: { 'HVAC Technician': 85, 'Controls Specialist': 95, 'Helper': 45 },
      materials: 280000,
      overhead: 45000,
      profit: 80000
    },
    compliance: {
      insurance: true,
      bonding: true,
      certifications: ['OSHA 10', 'HVAC License', 'EPA 608'],
      clearances: ['Public Trust']
    },
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    logo: 'GUNN',
    teamMembers: [
      {
        name: 'Paul',
        role: 'HVAC Technician',
        avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=150&h=150&fit=crop&crop=face',
        status: 'approved'
      },
      {
        name: 'Thomas',
        role: 'Safety Officer',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        status: 'needs-review'
      }
    ]
  },
  {
    id: 'sub2',
    name: 'Bregman Electric',
    type: 'Electrical Contractor',
    specialties: ['Electrical Installation', 'Wiring', 'Controls'],
    pastPerformance: 4.6,
    priceCompetitiveness: 78,
    availability: 'medium',
    certifications: ['NAICS 238210', 'Licensed Electrician'],
    location: 'Bethesda, MD',
    contact: {
      name: 'Lisa Rodriguez',
      email: 'l.rodriguez@bregmanelectric.com',
      phone: '(555) 567-8901'
    },
    matchScore: 82,
    status: 'selected',
    bidStatus: 'submitted',
    assignedWork: {
      scopeItems: ['Electrical Integration', 'Panel Upgrades', 'Wiring Installation'],
      estimatedValue: 280000,
      timeline: '6 weeks',
      requirements: ['Electrical license', 'NEC knowledge', 'Safety training']
    },
    pricing: {
      proposedAmount: 280000,
      laborRates: { 'Electrician': 75, 'Journeyman': 65, 'Helper': 40 },
      materials: 180000,
      overhead: 28000,
      profit: 52000
    },
    compliance: {
      insurance: true,
      bonding: true,
      certifications: ['Electrical License', 'NEC Training'],
      clearances: ['Public Trust']
    },
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    logo: '⚡',
    teamMembers: [
      {
        name: 'Natalie',
        role: 'Electrician',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
        status: 'pending'
      },
      {
        name: 'Jacob',
        role: 'Journeyman',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        status: 'approved'
      }
    ]
  },
  {
    id: 'sub3',
    name: 'Carroll Plumbing',
    type: 'Plumbing Contractor',
    specialties: ['Plumbing Installation', 'Pipe Systems', 'Fixtures'],
    pastPerformance: 4.7,
    priceCompetitiveness: 82,
    availability: 'high',
    certifications: ['NAICS 238220', 'Licensed Plumber'],
    location: 'Arlington, VA',
    contact: {
      name: 'David Chen',
      email: 'd.chen@carrollplumbing.com',
      phone: '(555) 678-9012'
    },
    matchScore: 85,
    status: 'contracted',
    bidStatus: 'approved',
    assignedWork: {
      scopeItems: ['Plumbing Integration', 'Condensate Lines', 'Water Connections'],
      estimatedValue: 180000,
      timeline: '4 weeks',
      requirements: ['Plumbing license', 'Local code knowledge', 'Safety training']
    },
    pricing: {
      proposedAmount: 180000,
      laborRates: { 'Plumber': 70, 'Helper': 35 },
      materials: 120000,
      overhead: 18000,
      profit: 32000
    },
    compliance: {
      insurance: true,
      bonding: true,
      certifications: ['Plumbing License', 'Local Code Training'],
      clearances: ['Public Trust']
    },
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    logo: 'C',
    teamMembers: [
      {
        name: 'Matthew',
        role: 'Plumber',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        status: 'approved'
      },
      {
        name: 'Olivia',
        role: 'Plumbing Helper',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        status: 'approved'
      }
    ]
  }
]

const generateMockRoleRequirements = (): RoleRequirement[] => [
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
]

const generateMockSpiritAnalysis = (): SpiritTeamAnalysis => ({
  isProcessing: false,
  progress: 0,
  currentPhase: '',
  teamReadiness: 0,
  gaps: { critical: [], high: [], medium: [] },
  recommendations: { internal: [], subcontractor: [], strategic: [] },
  automatedActions: { completed: [], inProgress: [], pending: [] }
})

const generateMockTeamAssemblyData = () => ({
  showStepModal: false,
  currentStepData: null,
  aiSuggestions: null,
  autoProcessing: false,
  actionInProgress: false,
  selectedAction: null,
  showCandidateModal: false,
  candidateType: null as 'safety-officer' | 'construction-manager' | null,
  availableCandidates: [],
  selectedCandidates: {},
  satisfactionStates: {
    'safety-officer': 'pending' as const,
    'construction-manager': 'pending' as const
  },
  showScenarioSimulator: false,
  currentScenario: null,
  scenarioResults: null,
  isSimulating: false,
  showScopeModal: false,
  scopeData: null,
  selectedSubcontractors: [],
  scopeApproved: false
})

// RFP Data Generator
const generateRFPData = (id: string, title: string, agency: string): RFP => ({
  id,
  title,
  agency,
  office: `${agency} Office`,
  naics: '541330',
  setAside: 'Small Business',
  contractType: 'Firm Fixed Price',
  estimatedValue: Math.floor(Math.random() * 5000000) + 1000000,
  basePeriod: 12,
  optionYears: 4,
  totalValue: Math.floor(Math.random() * 10000000) + 5000000,
  submissionDeadline: new Date(Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'in_progress',
  progress: Math.floor(Math.random() * 100),
  teamMembers: generateMockTeamMembers(),
  subcontractors: generateMockSubcontractors(),
  roleRequirements: generateMockRoleRequirements(),
  spiritAnalysis: generateMockSpiritAnalysis(),
  workflowProgress: 25,
  currentStep: 1,
  completedSteps: [],
  teamAssemblyData: generateMockTeamAssemblyData()
})

// Store Interface
interface BidStore {
  // State
  rfps: RFP[]
  currentRFPId: string | null
  
  // Actions
  setCurrentRFP: (rfpId: string) => void
  addRFP: (rfp: RFP) => void
  updateRFP: (rfpId: string, updates: Partial<RFP>) => void
  deleteRFP: (rfpId: string) => void
  
  // Team Assembly Actions
  startTeamAnalysis: (rfpId: string) => Promise<void>
  updateTeamAssemblyData: (rfpId: string, updates: Partial<RFP['teamAssemblyData']>) => void
  completeStep: (rfpId: string, stepId: number) => void
  updateSpiritAnalysis: (rfpId: string, updates: Partial<SpiritTeamAnalysis>) => void
  updateTeamMembers: (rfpId: string, updates: Partial<TeamMember>[]) => void
  updateSubcontractors: (rfpId: string, updates: Partial<Subcontractor>[]) => void
  
  // CRUD Operations
  addTeamMember: (rfpId: string, member: TeamMember) => void
  updateTeamMember: (rfpId: string, memberId: string, updates: Partial<TeamMember>) => void
  removeTeamMember: (rfpId: string, memberId: string) => void
  
  addSubcontractor: (rfpId: string, subcontractor: Subcontractor) => void
  updateSubcontractor: (rfpId: string, subcontractorId: string, updates: Partial<Subcontractor>) => void
  removeSubcontractor: (rfpId: string, subcontractorId: string) => void
  
  // Getters
  getCurrentRFP: () => RFP | null
  getRFPById: (rfpId: string) => RFP | null
  getTeamMembers: (rfpId: string) => TeamMember[]
  getSubcontractors: (rfpId: string) => Subcontractor[]
  getSpiritAnalysis: (rfpId: string) => SpiritTeamAnalysis | null
}

// Store Implementation
export const useBidStore = create<BidStore>()(
  devtools(
    (set, get) => ({
      // Initial State
      rfps: [
        generateRFPData('rfp1', 'HVAC Replacement at MVA Westminster Branch', 'Department of Transportation'),
        generateRFPData('rfp2', 'Cloud Migration for VA Medical Center', 'Department of Veterans Affairs'),
        generateRFPData('rfp3', 'Cybersecurity Assessment for DHS', 'Department of Homeland Security'),
        generateRFPData('rfp4', 'IT Infrastructure Modernization', 'Department of Defense')
      ],
      currentRFPId: 'rfp1',

      // Actions
      setCurrentRFP: (rfpId: string) => set({ currentRFPId: rfpId }),

      addRFP: (rfp: RFP) => set((state) => ({ 
        rfps: [...state.rfps, rfp] 
      })),

      updateRFP: (rfpId: string, updates: Partial<RFP>) => set((state) => ({
        rfps: state.rfps.map(rfp => 
          rfp.id === rfpId ? { ...rfp, ...updates } : rfp
        )
      })),

      deleteRFP: (rfpId: string) => set((state) => ({
        rfps: state.rfps.filter(rfp => rfp.id !== rfpId),
        currentRFPId: state.currentRFPId === rfpId ? (state.rfps[0]?.id || null) : state.currentRFPId
      })),

      // Team Assembly Actions
      startTeamAnalysis: async (rfpId: string) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        // Update spirit analysis to processing
        get().updateSpiritAnalysis(rfpId, {
          isProcessing: true,
          progress: 0,
          currentPhase: 'Initializing team analysis...'
        })

        const phases = [
          'Analyzing team composition...',
          'Evaluating subcontractor capabilities...',
          'Identifying critical gaps...',
          'Generating recommendations...',
          'Finalizing analysis...'
        ]

        for (let i = 0; i < phases.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 1500))
          get().updateSpiritAnalysis(rfpId, {
            progress: ((i + 1) / phases.length) * 100,
            currentPhase: phases[i]
          })
        }

        // Final analysis results
        get().updateSpiritAnalysis(rfpId, {
          isProcessing: false,
          teamReadiness: 82,
          gaps: {
            critical: ['Safety Officer certification expired', 'Construction Manager role unfilled'],
            high: ['Backup personnel needed for critical roles'],
            medium: ['Team workload distribution optimization']
          },
          recommendations: {
            internal: ['Replace Thomas with qualified OSHA-certified personnel', 'Assign backup for Project Manager role'],
            subcontractor: ['Hire construction manager through subcontractor', 'Request updated certifications'],
            strategic: ['Optimize team composition for 89% readiness', 'Balance workload across team members']
          },
          automatedActions: {
            completed: ['Team composition analysis', 'Gap identification'],
            inProgress: ['Compliance verification'],
            pending: ['Team optimization', 'Final approval']
          }
        })
      },

      updateTeamAssemblyData: (rfpId: string, updates: Partial<RFP['teamAssemblyData']>) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        get().updateRFP(rfpId, {
          teamAssemblyData: {
            ...rfp.teamAssemblyData,
            ...updates
          }
        })
      },

      completeStep: (rfpId: string, stepId: number) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const completedSteps = [...rfp.completedSteps, stepId]
        const currentStep = stepId + 1
        const workflowProgress = ((currentStep) / 4) * 100

        get().updateRFP(rfpId, {
          completedSteps,
          currentStep,
          workflowProgress
        })
      },

      updateSpiritAnalysis: (rfpId: string, updates: Partial<SpiritTeamAnalysis>) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        get().updateRFP(rfpId, {
          spiritAnalysis: {
            ...rfp.spiritAnalysis,
            ...updates
          }
        })
      },

      updateTeamMembers: (rfpId: string, updates: Partial<TeamMember>[]) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedTeamMembers = rfp.teamMembers.map((member, index) => ({
          ...member,
          ...updates[index]
        }))

        get().updateRFP(rfpId, { teamMembers: updatedTeamMembers })
      },

      updateSubcontractors: (rfpId: string, updates: Partial<Subcontractor>[]) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedSubcontractors = rfp.subcontractors.map((sub, index) => ({
          ...sub,
          ...updates[index]
        }))

        get().updateRFP(rfpId, { subcontractors: updatedSubcontractors })
      },

      // CRUD Operations
      addTeamMember: (rfpId: string, member: TeamMember) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        get().updateRFP(rfpId, {
          teamMembers: [...rfp.teamMembers, member]
        })
      },

      updateTeamMember: (rfpId: string, memberId: string, updates: Partial<TeamMember>) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedTeamMembers = rfp.teamMembers.map(member =>
          member.id === memberId ? { ...member, ...updates } : member
        )

        get().updateRFP(rfpId, { teamMembers: updatedTeamMembers })
      },

      removeTeamMember: (rfpId: string, memberId: string) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedTeamMembers = rfp.teamMembers.filter(member => member.id !== memberId)
        get().updateRFP(rfpId, { teamMembers: updatedTeamMembers })
      },

      addSubcontractor: (rfpId: string, subcontractor: Subcontractor) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        get().updateRFP(rfpId, {
          subcontractors: [...rfp.subcontractors, subcontractor]
        })
      },

      updateSubcontractor: (rfpId: string, subcontractorId: string, updates: Partial<Subcontractor>) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedSubcontractors = rfp.subcontractors.map(sub =>
          sub.id === subcontractorId ? { ...sub, ...updates } : sub
        )

        get().updateRFP(rfpId, { subcontractors: updatedSubcontractors })
      },

      removeSubcontractor: (rfpId: string, subcontractorId: string) => {
        const rfp = get().getRFPById(rfpId)
        if (!rfp) return

        const updatedSubcontractors = rfp.subcontractors.filter(sub => sub.id !== subcontractorId)
        get().updateRFP(rfpId, { subcontractors: updatedSubcontractors })
      },

      // Getters
      getCurrentRFP: () => {
        const { rfps, currentRFPId } = get()
        return rfps.find(rfp => rfp.id === currentRFPId) || null
      },

      getRFPById: (rfpId: string) => {
        const { rfps } = get()
        return rfps.find(rfp => rfp.id === rfpId) || null
      },

      getTeamMembers: (rfpId: string) => {
        const rfp = get().getRFPById(rfpId)
        return rfp?.teamMembers || []
      },

      getSubcontractors: (rfpId: string) => {
        const rfp = get().getRFPById(rfpId)
        return rfp?.subcontractors || []
      },

      getSpiritAnalysis: (rfpId: string) => {
        const rfp = get().getRFPById(rfpId)
        return rfp?.spiritAnalysis || null
      }
    }),
    {
      name: 'bid-store'
    }
  )
) 