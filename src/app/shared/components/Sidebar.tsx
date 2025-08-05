'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building2, 
  Calendar, 
  FileText, 
  Users, 
  DollarSign, 
  Target, 
  TrendingUp, 
  Zap, 
  ChevronRight, 
  Eye, 
  AlertTriangle, 
  CheckCircle,
  Home,
  FolderOpen,
  Settings,
  BarChart3,
  ClipboardList,
  Award,
  Shield,
  Brain
} from 'lucide-react'
import { motion } from 'framer-motion'

export function Sidebar() {
  const pathname = usePathname()
  const [activeModule, setActiveModule] = useState('dashboard')

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      href: '/', 
      description: 'Mission control overview' 
    },
    { 
      id: 'company', 
      label: 'Company Profile', 
      icon: Building2, 
      href: '/company', 
      description: 'Organization & staff management' 
    },
    { 
      id: 'calendar', 
      label: 'Calendar & Events', 
      icon: Calendar, 
      href: '/calendar', 
      description: 'RFP deadlines & task management' 
    },
    { 
      id: 'rfps', 
      label: 'RFP Pipeline', 
      icon: FolderOpen, 
      href: '/rfps', 
      description: 'Manage opportunities' 
    },
    { 
      id: 'subcontractors', 
      label: 'Subcontractors', 
      icon: Users, 
      href: '/subcontractors', 
      description: 'Team assembly & management' 
    },
    { 
      id: 'pricing', 
      label: 'Pricing & Intelligence', 
      icon: DollarSign, 
      href: '/pricing', 
      description: 'Cost modeling & analysis' 
    },
    { 
      id: 'proposal-builder', 
      label: 'Proposal Builder', 
      icon: FileText, 
      href: '/proposal-builder', 
      description: 'AI-powered proposal creation' 
    },
    { 
      id: 'documents', 
      label: 'Document Library', 
      icon: ClipboardList, 
      href: '/documents', 
      description: 'Central document repository' 
    },
    { 
      id: 'contract-admin', 
      label: 'Contract Admin', 
      icon: Award, 
      href: '/contract-admin', 
      description: 'Post-award management' 
    },
    { 
      id: 'compliance', 
      label: 'Compliance', 
      icon: Shield, 
      href: '/compliance', 
      description: 'Regulatory compliance tracking' 
    },
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: BarChart3, 
      href: '/analytics', 
      description: 'Performance & insights' 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      href: '/settings', 
      description: 'System configuration' 
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ready': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-4 w-4" />
      case 'warning': return <AlertTriangle className="h-4 w-4" />
      case 'error': return <AlertTriangle className="h-4 w-4" />
      case 'info': return <Eye className="h-4 w-4" />
      default: return <Eye className="h-4 w-4" />
    }
  }

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-80 bg-white border-r border-gray-200 flex flex-col h-full"
    >
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BidPerfect</h1>
            <p className="text-sm text-gray-600">Intelligence Hub</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          
          return (
            <motion.div
              key={item.id}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link href={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 px-4 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => setActiveModule(item.id)}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{item.label}</div>
                    <div className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                      {item.description}
                    </div>
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-2 w-2 rounded-full bg-white"
                    />
                  )}
                </Button>
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Quick Stats */}
      <div className="p-4 border-t border-gray-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Active RFPs</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              12
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Pipeline Value</span>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              $3.2M
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Win Rate</span>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              94%
            </Badge>
          </div>
        </div>
      </div>

      {/* Spirit Status */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Spirit AI</p>
            <p className="text-xs text-gray-600">Ready to assist</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 