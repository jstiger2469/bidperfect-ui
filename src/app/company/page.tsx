'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Building2, 
  Users, 
  Calendar, 
  FileText, 
  Award, 
  Shield, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Edit, 
  Settings, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Star, 
  Target, 
  BarChart3, 
  PieChart, 
  Activity, 
  DollarSign, 
  Briefcase, 
  GraduationCap 
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CompanyProfile() {
  const [activeTab, setActiveTab] = useState('overview')

  const companyInfo = {
    name: 'BidPerfect Solutions',
    industry: 'Government Contracting',
    founded: '2018',
    employees: 45,
    location: 'Lafayette, LA',
    website: 'www.bidperfect.com',
    phone: '(337) 555-0123',
    email: 'info@bidperfect.com',
    certifications: ['SBA 8(a)', 'DBE', 'WBE', 'HUBZone'],
    naicsCodes: ['236220', '541330', '541511', '541512'],
    pastPerformance: {
      totalContracts: 127,
      totalValue: '$12.4M',
      averageRating: 4.8,
      onTimeDelivery: 98,
      costPerformance: 96
    }
  }

  const staff = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      email: 'sarah@bidperfect.com',
      phone: '(337) 555-0101',
      avatar: '/avatars/sarah.jpg',
      skills: ['Strategic Planning', 'Business Development', 'Government Relations'],
      performance: 95,
      status: 'active'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      email: 'michael@bidperfect.com',
      phone: '(337) 555-0102',
      avatar: '/avatars/michael.jpg',
      skills: ['Software Architecture', 'AI/ML', 'System Integration'],
      performance: 92,
      status: 'active'
    },
    {
      id: 3,
      name: 'Lisa Rodriguez',
      role: 'Director of Operations',
      email: 'lisa@bidperfect.com',
      phone: '(337) 555-0103',
      avatar: '/avatars/lisa.jpg',
      skills: ['Project Management', 'Process Optimization', 'Team Leadership'],
      performance: 88,
      status: 'active'
    },
    {
      id: 4,
      name: 'David Thompson',
      role: 'Senior Proposal Manager',
      email: 'david@bidperfect.com',
      phone: '(337) 555-0104',
      avatar: '/avatars/david.jpg',
      skills: ['Proposal Writing', 'Compliance', 'Technical Writing'],
      performance: 91,
      status: 'active'
    }
  ]

  const certifications = [
    {
      name: 'SBA 8(a) Business Development',
      status: 'active',
      expiryDate: '2026-03-15',
      value: 'Up to $4M per contract',
      description: 'Small Business Administration 8(a) certification for disadvantaged businesses'
    },
    {
      name: 'Disadvantaged Business Enterprise (DBE)',
      status: 'active',
      expiryDate: '2025-08-22',
      value: 'Federal and state contracting',
      description: 'Certification for businesses owned by socially and economically disadvantaged individuals'
    },
    {
      name: 'Women-Owned Business Enterprise (WBE)',
      status: 'active',
      expiryDate: '2025-11-30',
      value: 'Federal contracting preference',
      description: 'Certification for businesses owned by women'
    },
    {
      name: 'HUBZone',
      status: 'pending',
      expiryDate: '2024-12-01',
      value: 'Federal contracting preference',
      description: 'Historically Underutilized Business Zone certification'
    }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Company Profile</h1>
              <p className="text-gray-600 mt-2">Manage your organization's information and capabilities</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </motion.div>

        {/* Company Overview Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{companyInfo.name}</h2>
                    <p className="text-gray-600">{companyInfo.industry}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{companyInfo.employees}</div>
                    <div className="text-sm text-gray-600">Employees</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{companyInfo.pastPerformance.totalContracts}</div>
                    <div className="text-sm text-gray-600">Contracts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{companyInfo.pastPerformance.totalValue}</div>
                    <div className="text-sm text-gray-600">Total Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{companyInfo.pastPerformance.averageRating}</div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{companyInfo.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{companyInfo.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{companyInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{companyInfo.website}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-blue-600" />
                  Certifications
                </h3>
                <div className="space-y-3">
                  {companyInfo.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-green-800">{cert}</span>
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-purple-600" />
                  NAICS Codes
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {companyInfo.naicsCodes.map((code, index) => (
                    <div key={index} className="p-2 bg-purple-50 rounded text-center">
                      <span className="font-mono text-sm text-purple-800">{code}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Team Members</h3>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((member) => (
                <motion.div
                  key={member.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Performance</span>
                            <span className="font-medium text-green-600">{member.performance}%</span>
                          </div>
                          <Progress value={member.performance} className="mt-1" />
                        </div>
                        <div className="mt-3 flex flex-wrap gap-1">
                          {member.skills.slice(0, 2).map((skill, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="certifications" className="space-y-6">
            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-semibold text-gray-900">{cert.name}</h4>
                          <Badge 
                            variant={cert.status === 'active' ? 'default' : 'secondary'}
                            className={cert.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                          >
                            {cert.status === 'active' ? 'Active' : 'Pending'}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{cert.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Value: {cert.value}</span>
                          <span>Expires: {cert.expiryDate}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>On-Time Delivery</span>
                      <span className="font-medium">{companyInfo.pastPerformance.onTimeDelivery}%</span>
                    </div>
                    <Progress value={companyInfo.pastPerformance.onTimeDelivery} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Cost Performance</span>
                      <span className="font-medium">{companyInfo.pastPerformance.costPerformance}%</span>
                    </div>
                    <Progress value={companyInfo.pastPerformance.costPerformance} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Customer Satisfaction</span>
                      <span className="font-medium">{companyInfo.pastPerformance.averageRating}/5.0</span>
                    </div>
                    <Progress value={(companyInfo.pastPerformance.averageRating / 5) * 100} className="h-2" />
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm font-medium text-green-800">Contract Awarded</p>
                      <p className="text-xs text-green-600">VA IT Modernization - $2.1M</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Proposal Submitted</p>
                      <p className="text-xs text-blue-600">DOD Cybersecurity Services</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                    <Clock className="h-5 w-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-medium text-orange-800">Deadline Approaching</p>
                      <p className="text-xs text-orange-600">GSA Schedule Renewal - 15 days</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 