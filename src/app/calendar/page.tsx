'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  Filter, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Star, 
  Users, 
  FileText, 
  Target, 
  Award, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ExternalLink, 
  Edit, 
  Trash2, 
  MoreHorizontal,
  DollarSign
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [activeTab, setActiveTab] = useState('calendar')

  const events = [
    {
      id: 1,
      title: 'RFP Submission Deadline',
      type: 'deadline',
      date: '2024-08-15',
      time: '17:00',
      priority: 'high',
      status: 'pending',
      description: 'Submit final proposal for VA IT Modernization project',
      rfpId: 'VA-2024-001',
      value: '$2.1M',
      attendees: ['Sarah Johnson', 'Michael Chen', 'David Thompson']
    },
    {
      id: 2,
      title: 'Subcontractor Meeting',
      type: 'meeting',
      date: '2024-08-12',
      time: '14:00',
      priority: 'medium',
      status: 'confirmed',
      description: 'Kickoff meeting with ACME Mechanical for HVAC project',
      rfpId: 'LA-2024-003',
      value: '$450K',
      attendees: ['Lisa Rodriguez', 'ACME Team']
    },
    {
      id: 3,
      title: 'Compliance Review',
      type: 'task',
      date: '2024-08-10',
      time: '10:00',
      priority: 'high',
      status: 'in-progress',
      description: 'Review and update SBA 8(a) certification documents',
      rfpId: null,
      value: null,
      attendees: ['Sarah Johnson', 'Legal Team']
    },
    {
      id: 4,
      title: 'Proposal Team Meeting',
      type: 'meeting',
      date: '2024-08-08',
      time: '09:00',
      priority: 'medium',
      status: 'confirmed',
      description: 'Weekly proposal status review and planning',
      rfpId: null,
      value: null,
      attendees: ['David Thompson', 'Proposal Team']
    },
    {
      id: 5,
      title: 'Contract Award Notification',
      type: 'deadline',
      date: '2024-08-20',
      time: '12:00',
      priority: 'high',
      status: 'pending',
      description: 'Expected notification for DOD Cybersecurity contract',
      rfpId: 'DOD-2024-002',
      value: '$1.8M',
      attendees: ['Sarah Johnson', 'Michael Chen']
    }
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'deadline': return <Clock className="h-4 w-4" />
      case 'meeting': return <Users className="h-4 w-4" />
      case 'task': return <FileText className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />
      case 'in-progress': return <AlertTriangle className="h-4 w-4 text-blue-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Calendar & Events</h1>
              <p className="text-gray-600 mt-2">Manage RFP deadlines, meetings, and company events</p>
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 border-0">
            <div className="flex items-center">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-blue-600">Total Events</p>
                <p className="text-2xl font-bold text-blue-900">{events.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-red-50 to-red-100 border-0">
            <div className="flex items-center">
              <div className="p-2 bg-red-600 rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-red-600">Deadlines</p>
                <p className="text-2xl font-bold text-red-900">{events.filter(e => e.type === 'deadline').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-green-50 to-green-100 border-0">
            <div className="flex items-center">
              <div className="p-2 bg-green-600 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-green-600">Meetings</p>
                <p className="text-2xl font-bold text-green-900">{events.filter(e => e.type === 'meeting').length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 border-0">
            <div className="flex items-center">
              <div className="p-2 bg-purple-600 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-purple-600">High Priority</p>
                <p className="text-2xl font-bold text-purple-900">{events.filter(e => e.priority === 'high').length}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-semibold">August 2024</h3>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
              
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
                
                {/* Calendar Days */}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                  const dayEvents = events.filter(event => {
                    const eventDate = new Date(event.date)
                    return eventDate.getDate() === day
                  })
                  
                  return (
                    <div key={day} className="min-h-[100px] p-2 border border-gray-200 hover:bg-gray-50">
                      <div className="text-sm font-medium text-gray-900 mb-1">{day}</div>
                      <div className="space-y-1">
                        {dayEvents.map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded bg-blue-100 text-blue-800 truncate cursor-pointer hover:bg-blue-200"
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <div className="space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className={`p-2 rounded-lg ${getPriorityColor(event.priority)}`}>
                          {getTypeIcon(event.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{event.title}</h4>
                            <Badge className={getPriorityColor(event.priority)}>
                              {event.priority}
                            </Badge>
                            {getStatusIcon(event.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {formatTime(event.time)}
                            </span>
                            {event.rfpId && (
                              <span className="flex items-center">
                                <FileText className="h-4 w-4 mr-1" />
                                {event.rfpId}
                              </span>
                            )}
                            {event.value && (
                              <span className="flex items-center">
                                <DollarSign className="h-4 w-4 mr-1" />
                                {event.value}
                              </span>
                            )}
                          </div>
                          {event.attendees && event.attendees.length > 0 && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">Attendees: </span>
                              <span className="text-xs text-gray-700">{event.attendees.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 