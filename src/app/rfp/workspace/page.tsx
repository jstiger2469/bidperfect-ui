'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  Users,
  MessageSquare,
  Calendar,
  Target,
  DollarSign,
  Upload,
  Download,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Eye,
  Share,
  Lock,
  CheckCircle,
  Clock,
  AlertTriangle,
  MoreHorizontal,
  FileText as FileTextIcon,
  Users as UsersIcon,
  MessageSquare as MessageSquareIcon,
  Calendar as CalendarIcon,
  Target as TargetIcon,
  DollarSign as DollarSignIcon,
  Upload as UploadIcon,
  Download as DownloadIcon,
  Edit as EditIcon,
  Trash2 as Trash2Icon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  Eye as EyeIcon,
  Share as ShareIcon,
  Lock as LockIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  AlertTriangle as AlertTriangleIcon,
  MoreHorizontal as MoreHorizontalIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface RFPWorkspace {
  id: string;
  title: string;
  agency: string;
  dueDate: string;
  value: number;
  status: 'draft' | 'in_progress' | 'review' | 'submitted';
  priority: 'low' | 'medium' | 'high' | 'critical';
  teamMembers: string[];
  documents: Document[];
  tasks: Task[];
  comments: Comment[];
  progress: {
    technical: number;
    pastPerformance: number;
    price: number;
    overall: number;
  };
}

interface Document {
  id: string;
  name: string;
  type: 'rfp' | 'amendment' | 'technical' | 'past_performance' | 'price' | 'other';
  size: string;
  uploadedBy: string;
  uploadedDate: string;
  status: 'draft' | 'review' | 'approved' | 'final';
  version: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  category: 'technical' | 'past_performance' | 'price' | 'management';
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  documentId?: string;
  taskId?: string;
}

// Mock data
const workspace: RFPWorkspace = {
  id: "rfp-workspace-001",
  title: "VA IT Modernization Services",
  agency: "Department of Veterans Affairs",
  dueDate: "2024-04-15T17:00:00",
  value: 2500000,
  status: "in_progress",
  priority: "critical",
  teamMembers: ["Sarah Johnson", "Michael Chen", "Jennifer Rodriguez", "David Thompson"],
  documents: [
    {
      id: "doc-1",
      name: "RFP_Solicitation_VA_IT_Modernization.pdf",
      type: "rfp",
      size: "2.4 MB",
      uploadedBy: "System",
      uploadedDate: "2024-03-01",
      status: "final",
      version: "1.0"
    },
    {
      id: "doc-2",
      name: "Amendment_001_Technical_Requirements.pdf",
      type: "amendment",
      size: "1.8 MB",
      uploadedBy: "System",
      uploadedDate: "2024-03-15",
      status: "final",
      version: "1.1"
    },
    {
      id: "doc-3",
      name: "Technical_Approach_Draft.docx",
      type: "technical",
      size: "856 KB",
      uploadedBy: "Sarah Johnson",
      uploadedDate: "2024-03-20",
      status: "review",
      version: "2.1"
    },
    {
      id: "doc-4",
      name: "Past_Performance_Summary.docx",
      type: "past_performance",
      size: "1.2 MB",
      uploadedBy: "Jennifer Rodriguez",
      uploadedDate: "2024-03-18",
      status: "approved",
      version: "1.0"
    },
    {
      id: "doc-5",
      name: "Price_Worksheet.xlsx",
      type: "price",
      size: "2.1 MB",
      uploadedBy: "Michael Chen",
      uploadedDate: "2024-03-22",
      status: "draft",
      version: "1.3"
    }
  ],
  tasks: [
    {
      id: "task-1",
      title: "Complete Technical Approach Section",
      description: "Finalize the technical approach narrative for Section L",
      assignee: "Sarah Johnson",
      dueDate: "2024-04-05",
      priority: "critical",
      status: "in_progress",
      category: "technical"
    },
    {
      id: "task-2",
      title: "Review Past Performance References",
      description: "Verify and update all past performance references",
      assignee: "Jennifer Rodriguez",
      dueDate: "2024-04-03",
      priority: "high",
      status: "completed",
      category: "past_performance"
    },
    {
      id: "task-3",
      title: "Finalize Price Structure",
      description: "Complete pricing analysis and finalize cost structure",
      assignee: "Michael Chen",
      dueDate: "2024-04-08",
      priority: "critical",
      status: "pending",
      category: "price"
    },
    {
      id: "task-4",
      title: "Management Plan Development",
      description: "Develop comprehensive project management plan",
      assignee: "David Thompson",
      dueDate: "2024-04-06",
      priority: "high",
      status: "in_progress",
      category: "management"
    }
  ],
  comments: [
    {
      id: "comment-1",
      author: "Sarah Johnson",
      content: "Technical approach draft is ready for review. Please provide feedback on the cloud migration strategy.",
      timestamp: "2024-03-20T14:30:00",
      documentId: "doc-3"
    },
    {
      id: "comment-2",
      author: "Michael Chen",
      content: "Price worksheet updated with latest labor rates. Need to review subcontractor costs.",
      timestamp: "2024-03-22T09:15:00",
      documentId: "doc-5"
    },
    {
      id: "comment-3",
      author: "Jennifer Rodriguez",
      content: "Past performance references verified. All projects are within the 3-year window.",
      timestamp: "2024-03-18T16:45:00",
      documentId: "doc-4"
    }
  ],
  progress: {
    technical: 75,
    pastPerformance: 100,
    price: 60,
    overall: 78
  }
}

function DocumentCard({ document }: { document: Document }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'rfp': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'amendment': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'technical': return 'text-green-600 bg-green-50 border-green-200'
      case 'past_performance': return 'text-purple-600 bg-purple-50 border-purple-200'
      case 'price': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'final': return 'status-ready'
      case 'approved': return 'status-ready'
      case 'review': return 'status-warning'
      case 'draft': return 'status-info'
      default: return 'status-info'
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
          <div className="flex items-center space-x-3">
            <FileTextIcon className="h-8 w-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-gray-900 line-clamp-1">{document.name}</h3>
              <p className="text-sm text-gray-600">{document.size} • v{document.version}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(document.status)}>
              {document.status}
            </Badge>
            <Button variant="ghost" size="sm">
              <MoreHorizontalIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Badge className={getTypeColor(document.type)}>
              {document.type.replace('_', ' ')}
            </Badge>
            <span className="text-sm text-gray-600">by {document.uploadedBy}</span>
          </div>
          <span className="text-sm text-gray-500">{document.uploadedDate}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EyeIcon className="h-4 w-4 mr-2" />
            View
          </Button>
          <Button variant="outline" size="sm">
            <DownloadIcon className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function TaskCard({ task }: { task: Task }) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200'
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200'
      case 'medium': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'low': return 'text-gray-600 bg-gray-50 border-gray-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'status-ready'
      case 'in_progress': return 'status-info'
      case 'overdue': return 'status-error'
      case 'pending': return 'status-warning'
      default: return 'status-info'
    }
  }

  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'completed'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={`
        card-premium p-4 cursor-pointer transition-all duration-300
        ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}
      `}>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
            <p className="text-sm text-gray-600">{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(task.status)}>
              {task.status.replace('_', ' ')}
            </Badge>
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <UsersIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">{task.assignee}</span>
          </div>
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <EditIcon className="h-4 w-4 mr-2" />
            Update
          </Button>
          <Button variant="outline" size="sm">
            <EyeIcon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function ProgressCard({ title, percentage, color }: { title: string; percentage: number; color: string }) {
  return (
    <Card className="card-premium p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="text-lg font-bold" style={{ color }}>{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
    </Card>
  )
}

export default function RFPWorkspacePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredTasks = workspace.tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredDocuments = workspace.documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const daysUntilDue = Math.ceil((new Date(workspace.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              {workspace.title}
            </h1>
            <p className="text-gray-600 text-responsive-base">
              {workspace.agency} • Due in {daysUntilDue} days
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <ShareIcon className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button className="btn-premium">
              <UploadIcon className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Contract Value</p>
                <p className="text-2xl font-bold text-gray-900">${(workspace.value / 1000000).toFixed(1)}M</p>
              </div>
              <DollarSignIcon className="h-8 w-8 text-green-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Team Members</p>
                <p className="text-2xl font-bold text-blue-600">{workspace.teamMembers.length}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Documents</p>
                <p className="text-2xl font-bold text-purple-600">{workspace.documents.length}</p>
              </div>
              <FileTextIcon className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
          
          <Card className="card-premium p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Overall Progress</p>
                <p className="text-2xl font-bold text-orange-600">{workspace.progress.overall}%</p>
              </div>
              <TargetIcon className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ProgressCard title="Technical" percentage={workspace.progress.technical} color="#3B82F6" />
          <ProgressCard title="Past Performance" percentage={workspace.progress.pastPerformance} color="#10B981" />
          <ProgressCard title="Price" percentage={workspace.progress.price} color="#EF4444" />
          <ProgressCard title="Overall" percentage={workspace.progress.overall} color="#F59E0B" />
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="documents" className="flex-1">Documents</TabsTrigger>
            <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
            <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
            <TabsTrigger value="comments" className="flex-1">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activity */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {workspace.comments.slice(0, 5).map((comment) => (
                    <div key={comment.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{comment.content}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Team Members */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                <div className="space-y-3">
                  {workspace.teamMembers.map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {member.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <span className="font-medium text-gray-900">{member}</span>
                      </div>
                      <Badge className="status-ready">Active</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-premium p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredDocuments.map((document) => (
                <DocumentCard key={document.id} document={document} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-6">
            {/* Search and Filters */}
            <Card className="card-premium p-4">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search tasks..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </Card>

            {/* Tasks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="team" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Collaboration</h3>
              <p className="text-gray-600">Team collaboration tools and communication features coming soon...</p>
            </Card>
          </TabsContent>

          <TabsContent value="comments" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Comments & Discussions</h3>
              <div className="space-y-4">
                {workspace.comments.map((comment) => (
                  <div key={comment.id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{comment.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 