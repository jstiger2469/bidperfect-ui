'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  Users,
  Settings,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
  Shield as ShieldIcon,
  CheckCircle as CheckCircleIcon,
  AlertTriangle as AlertTriangleIcon,
  Clock as ClockIcon,
  FileText as FileTextIcon,
  Users as UsersIcon,
  Settings as SettingsIcon,
  Download as DownloadIcon,
  Plus as PlusIcon,
  Eye as EyeIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ComplianceRequirement {
  id: string;
  name: string;
  category: string;
  description: string;
  status: 'compliant' | 'non_compliant' | 'pending' | 'expired';
  dueDate: string;
  lastReview: string;
  nextReview: string;
  responsible: string;
  documents: string[];
  priority: 'low' | 'medium' | 'high' | 'critical';
}

interface Certification {
  id: string;
  name: string;
  issuingBody: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'expired' | 'pending_renewal';
  certificateNumber: string;
  scope: string;
  documents: string[];
}

interface Audit {
  id: string;
  title: string;
  type: 'internal' | 'external' | 'regulatory';
  auditor: string;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'failed';
  findings: number;
  criticalFindings: number;
  score: number;
}

// Mock data
const complianceRequirements: ComplianceRequirement[] = [
  {
    id: "comp-1",
    name: "SAM Registration",
    category: "Registration",
    description: "System for Award Management registration must be current",
    status: "compliant",
    dueDate: "2024-12-31",
    lastReview: "2024-01-15",
    nextReview: "2024-07-15",
    responsible: "Lisa Wang",
    documents: ["SAM_Registration_2024.pdf", "Entity_Registration.pdf"],
    priority: "critical"
  },
  {
    id: "comp-2",
    name: "ISO 9001:2015",
    category: "Quality Management",
    description: "Quality Management System certification",
    status: "compliant",
    dueDate: "2024-11-30",
    lastReview: "2024-02-01",
    nextReview: "2024-08-01",
    responsible: "Sarah Johnson",
    documents: ["ISO_9001_Certificate.pdf", "Quality_Manual.pdf"],
    priority: "high"
  },
  {
    id: "comp-3",
    name: "CMMI Level 3",
    category: "Process Maturity",
    description: "Capability Maturity Model Integration Level 3",
    status: "compliant",
    dueDate: "2025-03-15",
    lastReview: "2024-01-20",
    nextReview: "2024-07-20",
    responsible: "Michael Chen",
    documents: ["CMMI_Certificate.pdf", "Process_Documentation.pdf"],
    priority: "high"
  },
  {
    id: "comp-4",
    name: "ISO 27001",
    category: "Information Security",
    description: "Information Security Management System",
    status: "pending",
    dueDate: "2024-06-30",
    lastReview: "2024-03-01",
    nextReview: "2024-09-01",
    responsible: "Jennifer Rodriguez",
    documents: ["Security_Policy.pdf", "Risk_Assessment.pdf"],
    priority: "critical"
  },
  {
    id: "comp-5",
    name: "8(a) Business Development",
    category: "Business Development",
    description: "Small Business Administration 8(a) program certification",
    status: "compliant",
    dueDate: "2024-10-15",
    lastReview: "2024-02-15",
    nextReview: "2024-08-15",
    responsible: "David Thompson",
    documents: ["8a_Certificate.pdf", "Business_Plan.pdf"],
    priority: "medium"
  }
]

const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "ISO 9001:2015",
    issuingBody: "American Society for Quality",
    issueDate: "2022-01-15",
    expiryDate: "2024-11-30",
    status: "active",
    certificateNumber: "ISO-9001-2022-001",
    scope: "Software Development and IT Services",
    documents: ["ISO_9001_Certificate.pdf", "Quality_Manual.pdf"]
  },
  {
    id: "cert-2",
    name: "CMMI Level 3",
    issuingBody: "CMMI Institute",
    issueDate: "2023-03-15",
    expiryDate: "2025-03-15",
    status: "active",
    certificateNumber: "CMMI-L3-2023-002",
    scope: "Development and Services",
    documents: ["CMMI_Certificate.pdf", "Process_Documentation.pdf"]
  },
  {
    id: "cert-3",
    name: "8(a) Business Development",
    issuingBody: "Small Business Administration",
    issueDate: "2021-06-01",
    expiryDate: "2024-10-15",
    status: "active",
    certificateNumber: "8A-2021-003",
    scope: "All Business Activities",
    documents: ["8a_Certificate.pdf", "Business_Plan.pdf"]
  }
]

const audits: Audit[] = [
  {
    id: "audit-1",
    title: "Annual ISO 9001 Surveillance Audit",
    type: "external",
    auditor: "American Society for Quality",
    startDate: "2024-02-01",
    endDate: "2024-02-03",
    status: "completed",
    findings: 2,
    criticalFindings: 0,
    score: 95
  },
  {
    id: "audit-2",
    title: "CMMI Level 3 Appraisal",
    type: "external",
    auditor: "CMMI Institute",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    status: "completed",
    findings: 1,
    criticalFindings: 0,
    score: 98
  },
  {
    id: "audit-3",
    title: "Internal Security Assessment",
    type: "internal",
    auditor: "Jennifer Rodriguez",
    startDate: "2024-04-01",
    endDate: "2024-04-05",
    status: "in_progress",
    findings: 0,
    criticalFindings: 0,
    score: 0
  },
  {
    id: "audit-4",
    title: "ISO 27001 Certification Audit",
    type: "external",
    auditor: "BSI Group",
    startDate: "2024-06-15",
    endDate: "2024-06-17",
    status: "scheduled",
    findings: 0,
    criticalFindings: 0,
    score: 0
  }
]

function ComplianceCard({ requirement }: { requirement: ComplianceRequirement }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'status-ready'
      case 'non_compliant': return 'status-error'
      case 'expired': return 'status-error'
      case 'pending': return 'status-warning'
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

  const daysUntilDue = Math.ceil((new Date(requirement.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{requirement.name}</h3>
            <p className="text-sm text-gray-600">{requirement.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(requirement.status)}>
              {requirement.status.replace('_', ' ')}
            </Badge>
            <Badge className={getPriorityColor(requirement.priority)}>
              {requirement.priority}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(requirement.dueDate).toLocaleDateString()}
              {daysUntilDue > 0 && (
                <span className="text-sm text-gray-500 ml-2">({daysUntilDue} days)</span>
              )}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Responsible</p>
            <p className="font-semibold text-gray-900">{requirement.responsible}</p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600">Documents:</p>
          <div className="flex flex-wrap gap-1">
            {requirement.documents.map((doc, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {doc}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function CertificationCard({ certification }: { certification: Certification }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-ready'
      case 'expired': return 'status-error'
      case 'pending_renewal': return 'status-warning'
      default: return 'status-info'
    }
  }

  const daysUntilExpiry = Math.ceil((new Date(certification.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{certification.name}</h3>
            <p className="text-sm text-gray-600">{certification.issuingBody}</p>
          </div>
          <Badge className={getStatusColor(certification.status)}>
            {certification.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Issue Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(certification.issueDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Expiry Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(certification.expiryDate).toLocaleDateString()}
              {daysUntilExpiry > 0 && (
                <span className="text-sm text-gray-500 ml-2">({daysUntilExpiry} days)</span>
              )}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Certificate Number</p>
          <p className="font-semibold text-gray-900">{certification.certificateNumber}</p>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600">Scope</p>
          <p className="text-sm text-gray-900">{certification.scope}</p>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function AuditCard({ audit }: { audit: Audit }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-ready'
      case 'in_progress': return 'status-info'
      case 'scheduled': return 'status-warning'
      case 'failed': return 'status-error'
      default: return 'status-info'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-yellow-600'
    return 'text-red-600'
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
            <h3 className="font-semibold text-gray-900 mb-1">{audit.title}</h3>
            <p className="text-sm text-gray-600">{audit.auditor}</p>
          </div>
          <Badge className={getStatusColor(audit.status)}>
            {audit.status.replace('_', ' ')}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">Start Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(audit.startDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">End Date</p>
            <p className="font-semibold text-gray-900">
              {new Date(audit.endDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {audit.status === 'completed' && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-600">Score</p>
              <p className={`text-lg font-bold ${getScoreColor(audit.score)}`}>
                {audit.score}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Findings</p>
              <p className="font-semibold text-gray-900">{audit.findings}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="font-semibold text-gray-900">{audit.criticalFindings}</p>
            </div>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View Report
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function CompliancePage() {
  const [activeTab, setActiveTab] = useState('overview')

  const analytics = {
    totalRequirements: complianceRequirements.length,
    compliant: complianceRequirements.filter(r => r.status === 'compliant').length,
    nonCompliant: complianceRequirements.filter(r => r.status === 'non_compliant').length,
    pending: complianceRequirements.filter(r => r.status === 'pending').length,
    totalCertifications: certifications.length,
    activeCertifications: certifications.filter(c => c.status === 'active').length,
    totalAudits: audits.length,
    completedAudits: audits.filter(a => a.status === 'completed').length
  }

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Compliance Management
            </h1>
            <p className="text-gray-600 text-responsive-base">
              Track regulatory requirements, certifications, and audit compliance
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <SettingsIcon className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button className="btn-premium">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Requirement
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Requirements</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalRequirements}</p>
              </div>
              <ShieldIcon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Compliant</p>
                <p className="text-2xl font-bold text-green-600">{analytics.compliant}</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Non-Compliant</p>
                <p className="text-2xl font-bold text-red-600">{analytics.nonCompliant}</p>
              </div>
              <AlertTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending</p>
                <p className="text-2xl font-bold text-orange-600">{analytics.pending}</p>
              </div>
              <ClockIcon className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="requirements" className="flex-1">Requirements</TabsTrigger>
            <TabsTrigger value="certifications" className="flex-1">Certifications</TabsTrigger>
            <TabsTrigger value="audits" className="flex-1">Audits</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Summary */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Summary</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Overall Compliance Rate</span>
                    <span className="text-lg font-bold text-green-600">
                      {Math.round((analytics.compliant / analytics.totalRequirements) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(analytics.compliant / analytics.totalRequirements) * 100}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Compliant:</span>
                      <span className="font-semibold text-green-600 ml-2">{analytics.compliant}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Non-Compliant:</span>
                      <span className="font-semibold text-red-600 ml-2">{analytics.nonCompliant}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Pending:</span>
                      <span className="font-semibold text-orange-600 ml-2">{analytics.pending}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900">ISO 9001 Surveillance Audit</span>
                      <span className="text-xs text-gray-500">2 days ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Completed with 95% score</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900">CMMI Level 3 Appraisal</span>
                      <span className="text-xs text-gray-500">1 week ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Completed with 98% score</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-gray-900">SAM Registration Renewal</span>
                      <span className="text-xs text-gray-500">2 weeks ago</span>
                    </div>
                    <p className="text-sm text-gray-600">Successfully renewed</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {complianceRequirements.map((requirement) => (
                <ComplianceCard key={requirement.id} requirement={requirement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((certification) => (
                <CertificationCard key={certification.id} certification={certification} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="audits" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {audits.map((audit) => (
                <AuditCard key={audit.id} audit={audit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 