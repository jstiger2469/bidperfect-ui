'use client'
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Bot, Send, DollarSign, Shield, AlertTriangle, FileText, Loader2, ChevronRight, X, Brain, Zap, Lightbulb, Target, TrendingUp, CheckCircle, Clock, Star } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SpiritMessage {
  id: string
  type: 'assistant' | 'user'
  content: string
  timestamp: Date
  context?: string
  actions?: SpiritAction[]
}

interface SpiritAction {
  id: string
  label: string
  type: 'primary' | 'secondary' | 'warning'
  icon?: React.ReactNode
  onClick: () => void
}

export function SpiritPanel() {
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<SpiritMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: "I'm your Intelligence Hub! I can help with pricing analysis, gap detection, document generation, and strategic insights. What would you like to work on?",
      timestamp: new Date(),
      actions: [
        {
          id: 'pricing',
          label: 'Analyze Pricing',
          type: 'primary',
          icon: <DollarSign className="h-4 w-4" />,
          onClick: () => console.log('Pricing analysis')
        },
        {
          id: 'gaps',
          label: 'Check Readiness',
          type: 'secondary',
          icon: <Shield className="h-4 w-4" />,
          onClick: () => console.log('Readiness check')
        }
      ]
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    {
      id: 'wage-analysis',
      title: 'Wage Analysis',
      description: 'Analyze DBA wage rates and fringe benefits',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-green-500'
    },
    {
      id: 'gap-detection',
      title: 'Gap Detection',
      description: 'Identify missing requirements and credentials',
      icon: <AlertTriangle className="h-5 w-5" />,
      color: 'bg-orange-500'
    },
    {
      id: 'proposal-gen',
      title: 'Proposal Generator',
      description: 'Auto-generate pricing proposals',
      icon: <FileText className="h-5 w-5" />,
      color: 'bg-blue-500'
    },
    {
      id: 'margin-insights',
      title: 'Margin Insights',
      description: 'Get pricing recommendations',
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'bg-purple-500'
    }
  ]

  const handleSend = () => {
    if (!inputValue.trim()) return

    const userMessage: SpiritMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: SpiritMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I've analyzed your request. Based on the current RFP context, here are my recommendations...",
        timestamp: new Date(),
        actions: [
          {
            id: 'apply',
            label: 'Apply Changes',
            type: 'primary',
            icon: <CheckCircle className="h-4 w-4" />,
            onClick: () => console.log('Apply changes')
          }
        ]
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 2000)
  }

  if (isMinimized) {
    return (
      <motion.div 
        initial={{ scale: 0, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="fixed bottom-4 right-4 z-50"
      >
        <motion.div 
          animate={{ y: [0, -8, 0] }} 
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Button 
            onClick={() => setIsMinimized(false)} 
            className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Brain className="h-6 w-6 text-white" />
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ x: 400, opacity: 0 }} 
      animate={{ x: 0, opacity: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-96 bg-white/95 backdrop-blur-md border-l border-gray-200/50 flex flex-col shadow-2xl"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.4, delay: 0.2 }}
        className="p-4 border-b border-gray-200/50 bg-gradient-to-r from-blue-50 to-purple-50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Intelligence Hub</h3>
              <p className="text-sm text-gray-600">Powered by Spirit AI</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-gray-200/50">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-left"
            >
              <div className="flex items-center space-x-2">
                <div className={`p-1 rounded ${action.color}`}>
                  {action.icon}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-900">{action.title}</p>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'} rounded-lg p-3`}>
                <p className="text-sm">{message.content}</p>
                {message.actions && (
                  <div className="mt-2 space-y-1">
                    {message.actions.map((action) => (
                      <Button
                        key={action.id}
                        size="sm"
                        variant={action.type === 'primary' ? 'default' : 'outline'}
                        onClick={action.onClick}
                        className="w-full justify-start"
                      >
                        {action.icon}
                        <span className="ml-2">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200/50">
        <div className="flex space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
            placeholder="Ask me anything about pricing, compliance, or strategy..."
            className="min-h-[60px] resize-none"
            onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || isTyping}
            className="px-3"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  )
} 