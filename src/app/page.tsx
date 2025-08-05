'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Calendar,
  Building2,
  Shield,
  FileText,
  DollarSign,
  Edit3,
  Search,
  Users,
  TrendingUp,
  Award,
  Settings,
  BarChart3,
  ClipboardList,
  FolderOpen,
  Target,
  Zap,
  Globe,
  Briefcase,
  PieChart,
  Lightbulb,
  Brain,
  ArrowRight,
  Database
} from 'lucide-react'

const navigationCards = [
  {
    title: 'RFPs',
    description: 'Browse and manage Request for Proposals',
    icon: Search,
    href: '/rfps',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    title: 'Calendar & Events',
    description: 'Manage deadlines, meetings, and company events',
    icon: Calendar,
    href: '/calendar',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600'
  },
  {
    title: 'Company Profile',
    description: 'Manage company information and capabilities',
    icon: Building2,
    href: '/company',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    title: 'Compliance',
    description: 'Track certifications and regulatory requirements',
    icon: Shield,
    href: '/compliance',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600'
  },
  {
    title: 'Documents',
    description: 'Centralized document management system',
    icon: FileText,
    href: '/documents',
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600'
  },
  {
    title: 'Pricing',
    description: 'Cost analysis and pricing strategies',
    icon: DollarSign,
    href: '/pricing',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50',
    iconColor: 'text-yellow-600'
  },
  {
    title: 'Proposal Builder',
    description: 'AI-powered proposal creation and management',
    icon: Edit3,
    href: '/proposal-builder',
    color: 'from-teal-500 to-blue-500',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600'
  },
  {
    title: 'Subcontractors',
    description: 'Manage subcontractor relationships and teams',
    icon: Users,
    href: '/subcontractors',
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-50',
    iconColor: 'text-pink-600'
  },
  {
    title: 'Scenario Modeling',
    description: 'Financial modeling and what-if analysis',
    icon: TrendingUp,
    href: '/scenario-modeling',
    color: 'from-emerald-500 to-green-500',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600'
  },
  {
    title: 'Contract Admin',
    description: 'Post-award contract management',
    icon: Award,
    href: '/contract-admin',
    color: 'from-violet-500 to-purple-500',
    bgColor: 'bg-violet-50',
    iconColor: 'text-violet-600'
  }
]

const quickActions = [
  {
    title: 'Create New RFP Response',
    description: 'Start a new proposal',
    icon: Edit3,
    action: () => console.log('Create RFP Response')
  },
  {
    title: 'Upload Documents',
    description: 'Add new files to the system',
    icon: FileText,
    action: () => console.log('Upload Documents')
  },
  {
    title: 'Generate Report',
    description: 'Create performance analytics',
    icon: BarChart3,
    action: () => console.log('Generate Report')
  },
  {
    title: 'Team Meeting',
    description: 'Schedule a team discussion',
    icon: Users,
    action: () => console.log('Team Meeting')
  }
]

const stats = [
  { label: 'Active RFPs', value: '12', change: '+3', changeType: 'positive' },
  { label: 'Win Rate', value: '68%', change: '+5%', changeType: 'positive' },
  { label: 'Total Value', value: '$2.4M', change: '+12%', changeType: 'positive' },
  { label: 'Team Members', value: '24', change: '+2', changeType: 'positive' }
]

export default function HomePage() {
  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-8 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-responsive-4xl font-bold text-gradient-primary">
            BidPerfect
          </h1>
          <p className="text-responsive-lg text-gray-600 max-w-3xl mx-auto">
            AI-powered procurement and proposal management platform
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </div>
            <span>•</span>
            <span>Last updated: 2 minutes ago</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            >
              <div className="card-premium p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
                <div className={`text-xs mt-1 ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change} from last month
                </div>
        </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-responsive-xl font-semibold text-gray-900">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -2 }}
                className="card-premium p-4 cursor-pointer hover:shadow-lg transition-all duration-300"
                onClick={action.action}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <action.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-600">{action.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-responsive-xl font-semibold text-gray-900">Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group"
              >
                <Link href={card.href}>
                  <div className={`
                    card-premium p-6 h-full cursor-pointer transition-all duration-300
                    group-hover:shadow-xl group-hover:border-gray-300
                  `}>
                    <div className="flex items-start space-x-4">
                      <div className={`
                        p-3 rounded-xl ${card.bgColor} ${card.iconColor}
                        group-hover:scale-110 transition-transform duration-300
                      `}>
                        <card.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {card.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-sm text-gray-500 group-hover:text-blue-600 transition-colors">
                      <span>Open</span>
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Intelligent Modules */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-responsive-xl font-semibold text-gray-900">Intelligent Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href="/intelligent-procurement/solicitation-review">
                <div className="card-premium p-6 h-full cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">Solicitation Review</h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        AI Powered
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Reverse engineering method for strategic solicitation analysis</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Strategic Analysis</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href="/intelligent-procurement/invoice-builder">
                <div className="card-premium p-6 h-full cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <DollarSign className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Invoice Builder</h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        AI Powered
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">FAR-compliant invoice generation with multi-jurisdiction support</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Compliance Ready</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="group"
            >
              <Link href="/intelligent-procurement">
                <div className="card-premium p-6 h-full cursor-pointer transition-all duration-300 group-hover:shadow-xl group-hover:border-gray-300">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl group-hover:scale-110 transition-transform duration-300">
                      <Database className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Multi-Jurisdiction</h3>
                      <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        AI Powered
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Unified access to federal, state, parish, and municipal portals</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Portal Access</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-responsive-xl font-semibold text-gray-900">Recent Activity</h2>
          <div className="card-premium p-6">
            <div className="space-y-4">
              {[
                { action: 'RFP Response Submitted', item: 'VA IT Modernization', time: '2 hours ago', type: 'success' },
                { action: 'Document Uploaded', item: 'Past Performance Matrix', time: '4 hours ago', type: 'info' },
                { action: 'Team Meeting Scheduled', item: 'DoD Proposal Review', time: '6 hours ago', type: 'warning' },
                { action: 'Contract Awarded', item: 'HHS Data Analytics', time: '1 day ago', type: 'success' }
              ].map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className={`
                    w-2 h-2 rounded-full ${
                      activity.type === 'success' ? 'bg-green-500' :
                      activity.type === 'warning' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }
                  `}></div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{activity.action}</div>
                    <div className="text-sm text-gray-600">{activity.item}</div>
                  </div>
                  <div className="text-sm text-gray-500">{activity.time}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}


