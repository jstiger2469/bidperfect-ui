'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/app/shared/components/Sidebar'
import { SpiritPanel } from '@/app/shared/spirit/SpiritPanel'
import { Button } from '@/components/ui/button'
import { Menu, X, Bot, Bell, Search, ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

interface ResponsiveLayoutProps {
  children: React.ReactNode
}

export function ResponsiveLayout({ children }: ResponsiveLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [spiritOpen, setSpiritOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsClient(true)
    const checkIfMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setSidebarOpen(false)
      }
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex min-h-screen pt-16 lg:pt-20">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex-1 min-w-0">
            <main className="w-full">
              {children}
            </main>
          </div>
          <div className="hidden xl:block">
            <SpiritPanel />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      {isMobile && (
        <motion.header 
          initial={{ y: -20, opacity: 0.95 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 relative z-50"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">BidPerfect</h1>
                <p className="text-xs text-gray-600">Procurement Lifecycle</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSpiritOpen(true)}
                className="p-2"
              >
                <Bot className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Bell className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.header>
      )}

      {/* Desktop Header */}
      {!isMobile && (
        <motion.header 
          initial={{ y: -20, opacity: 0.95 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="hidden lg:block bg-white border-b border-gray-200 px-6 py-4 relative z-40"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div>
                <h1 className="text-xl font-bold text-gray-900">BidPerfect</h1>
                <p className="text-sm text-gray-600">AI-Powered Procurement Platform</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search RFPs, subcontractors..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-medium">JS</span>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </motion.header>
      )}

      <div className="flex min-h-screen pt-16 lg:pt-20">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="w-80 h-full bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Navigation</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <Sidebar />
            </motion.div>
          </motion.div>
        )}

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <main className="w-full">
            {children}
          </main>
        </div>

        {/* Desktop Spirit Panel */}
        <div className="hidden xl:block">
          <SpiritPanel />
        </div>

        {/* Mobile Spirit Panel Overlay */}
        {isMobile && spiritOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={() => setSpiritOpen(false)}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <SpiritPanel />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  )
} 