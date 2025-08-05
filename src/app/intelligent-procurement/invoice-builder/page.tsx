'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  FileText,
  DollarSign,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Upload,
  ArrowLeft,
  Brain,
  Building2,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Edit,
  Plus,
  Eye,
  Trash2,
  Save,
  Send,
  FileText as FileTextIcon,
  DollarSign as DollarSignIcon,
  Calendar as CalendarIcon,
  AlertTriangle as AlertTriangleIcon,
  CheckCircle as CheckCircleIcon,
  Clock as ClockIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  ArrowLeft as ArrowLeftIcon,
  Brain as BrainIcon,
  Building2 as Building2Icon,
  MapPin as MapPinIcon,
  Phone as PhoneIcon,
  Mail as MailIcon,
  ExternalLink as ExternalLinkIcon,
  Edit as EditIcon,
  Plus as PlusIcon,
  Eye as EyeIcon,
  Trash2 as Trash2Icon,
  Save as SaveIcon,
  Send as SendIcon
} from 'lucide-react'
import { motion } from 'framer-motion'

interface InvoiceLineItem {
  id: string;
  clin: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  extendedPrice: number;
  periodOfPerformance?: string;
}

interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  contractNumber: string;
  taskOrder?: string;
  purchaseOrder?: string;
  contractorName: string;
  contractorAddress: string;
  contractorPhone: string;
  contractorEmail: string;
  contractorEIN: string;
  contractorUEI: string;
  governmentPOC: string;
  governmentEmail: string;
  governmentPhone: string;
  bankName: string;
  bankRouting: string;
  bankAccount: string;
  bankAccountType: 'checking' | 'savings';
  paymentTerms: string;
  jurisdiction: 'federal' | 'state' | 'parish' | 'municipal';
  portal: string;
  lineItems: InvoiceLineItem[];
  attachments: string[];
}

interface SpiritValidation {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  field: string;
  message: string;
  action?: string;
  actionText?: string;
}

// Mock data for invoice builder
const mockInvoiceData: InvoiceData = {
  invoiceNumber: "INV-2024-001",
  invoiceDate: "2024-04-01",
  contractNumber: "36C10B23D0001",
  taskOrder: "TO-001",
  contractorName: "TechSolutions Inc.",
  contractorAddress: "123 Business Ave, New Orleans, LA 70112",
  contractorPhone: "(504) 555-0123",
  contractorEmail: "billing@techsolutions.com",
  contractorEIN: "12-3456789",
  contractorUEI: "ABC123DEF456",
  governmentPOC: "John Smith, Contracting Officer",
  governmentEmail: "john.smith@va.gov",
  governmentPhone: "(202) 555-0100",
  bankName: "First National Bank",
  bankRouting: "021000021",
  bankAccount: "1234567890",
  bankAccountType: "checking",
  paymentTerms: "Net 30",
  jurisdiction: "federal",
  portal: "WAWF",
  lineItems: [
    {
      id: "line-1",
      clin: "CLIN 0001",
      description: "IT Infrastructure Modernization Services",
      quantity: 160,
      unit: "Hours",
      unitPrice: 125.00,
      extendedPrice: 20000.00,
      periodOfPerformance: "March 1-31, 2024"
    },
    {
      id: "line-2",
      clin: "CLIN 0002",
      description: "System Integration and Testing",
      quantity: 80,
      unit: "Hours",
      unitPrice: 150.00,
      extendedPrice: 12000.00,
      periodOfPerformance: "March 1-31, 2024"
    }
  ],
  attachments: [
    "Timecards_March_2024.pdf",
    "Delivery_Confirmation.pdf",
    "Inspection_Report.pdf"
  ]
}

const mockValidations: SpiritValidation[] = [
  {
    id: "val-1",
    type: "success",
    field: "Invoice Number",
    message: "Unique invoice number confirmed"
  },
  {
    id: "val-2",
    type: "warning",
    field: "CLIN Alignment",
    message: "Line item descriptions should match CLIN descriptions more closely",
    action: "review_clins",
    actionText: "Review CLINs"
  },
  {
    id: "val-3",
    type: "error",
    field: "Banking Information",
    message: "Bank routing number format appears incorrect",
    action: "fix_banking",
    actionText: "Fix Banking Info"
  },
  {
    id: "val-4",
    type: "info",
    field: "Payment Terms",
    message: "Net 30 terms confirmed for this contract"
  }
]

function SpiritPanel({ validation }: { validation: SpiritValidation }) {
  const getTypeStyles = () => {
    switch (validation.type) {
      case 'error': return 'border-red-200 bg-red-50'
      case 'warning': return 'border-orange-200 bg-orange-50'
      case 'success': return 'border-green-200 bg-green-50'
      case 'info': return 'border-blue-200 bg-blue-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getTypeIcon = () => {
    switch (validation.type) {
      case 'error': return <AlertTriangleIcon className="h-4 w-4 text-red-600" />
      case 'warning': return <AlertTriangleIcon className="h-4 w-4 text-orange-600" />
      case 'success': return <CheckCircleIcon className="h-4 w-4 text-green-600" />
      case 'info': return <ClockIcon className="h-4 w-4 text-blue-600" />
      default: return <ClockIcon className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className={`card-premium p-4 ${getTypeStyles()}`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <BrainIcon className="h-4 w-4 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-semibold text-gray-900">Spirit AI</span>
              <span className="text-xs text-gray-500">Validation</span>
              {getTypeIcon()}
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{validation.field}</h4>
            <p className="text-sm text-gray-700 mb-3">{validation.message}</p>
            {validation.action && validation.actionText && (
              <Button 
                onClick={() => console.log(validation.action)} 
                size="sm" 
                className="btn-premium"
              >
                {validation.actionText}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

function LineItemCard({ item, onEdit, onDelete }: { 
  item: InvoiceLineItem; 
  onEdit: (item: InvoiceLineItem) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant="outline" className="text-xs">{item.clin}</Badge>
              <span className="text-sm text-gray-500">{item.unit}</span>
            </div>
            <h4 className="font-medium text-gray-900 mb-1">{item.description}</h4>
            {item.periodOfPerformance && (
              <p className="text-xs text-gray-600">Period: {item.periodOfPerformance}</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-blue-600">${item.extendedPrice.toLocaleString()}</div>
            <div className="text-xs text-gray-500">${item.unitPrice}/unit</div>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span>Quantity: {item.quantity}</span>
          <span>Extended: ${item.extendedPrice.toLocaleString()}</span>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
            <EditIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
            <Trash2Icon className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

function AttachmentCard({ attachment }: { attachment: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="card-premium p-3">
        <div className="flex items-center space-x-3">
          <FileTextIcon className="h-5 w-5 text-blue-600" />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{attachment}</p>
            <p className="text-xs text-gray-500">PDF Document</p>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm">
              <EyeIcon className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default function InvoiceBuilderPage() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>(mockInvoiceData)
  const [activeTab, setActiveTab] = useState('details')

  const totalAmount = invoiceData.lineItems.reduce((sum, item) => sum + item.extendedPrice, 0)

  const handleEditLineItem = (item: InvoiceLineItem) => {
    console.log('Edit line item:', item)
  }

  const handleDeleteLineItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }))
  }

  const handleAddLineItem = () => {
    const newItem: InvoiceLineItem = {
      id: `line-${Date.now()}`,
      clin: "CLIN 0003",
      description: "New Service",
      quantity: 1,
      unit: "Each",
      unitPrice: 0,
      extendedPrice: 0
    }
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [...prev.lineItems, newItem]
    }))
  }

  return (
    <div className="gradient-bg-primary min-h-screen">
      <div className="container-responsive py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Button variant="outline" size="sm" className="btn-ghost-premium">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
            <h1 className="text-responsive-3xl font-bold text-gradient-primary mb-2">
              Intelligent Invoice Builder
            </h1>
            <p className="text-gray-600 text-responsive-base">
              FAR-compliant invoice generation with multi-jurisdiction support
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="btn-ghost-premium">
              <SaveIcon className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button className="btn-premium">
              <SendIcon className="h-4 w-4 mr-2" />
              Submit Invoice
            </Button>
          </div>
        </div>

        {/* Spirit AI Validation */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Spirit AI Validation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockValidations.map((validation) => (
              <SpiritPanel key={validation.id} validation={validation} />
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="details" className="flex-1">Invoice Details</TabsTrigger>
            <TabsTrigger value="line-items" className="flex-1">Line Items</TabsTrigger>
            <TabsTrigger value="attachments" className="flex-1">Attachments</TabsTrigger>
            <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Contractor Information */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
                    <Input 
                      value={invoiceData.contractorName}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorName: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <Input 
                      value={invoiceData.contractorAddress}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorAddress: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                      <Input 
                        value={invoiceData.contractorPhone}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorPhone: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input 
                        value={invoiceData.contractorEmail}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorEmail: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EIN</label>
                      <Input 
                        value={invoiceData.contractorEIN}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorEIN: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">UEI</label>
                      <Input 
                        value={invoiceData.contractorUEI}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, contractorUEI: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              </Card>

              {/* Contract Information */}
              <Card className="card-premium p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contract Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Number</label>
                      <Input 
                        value={invoiceData.invoiceNumber}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Invoice Date</label>
                      <Input 
                        type="date"
                        value={invoiceData.invoiceDate}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, invoiceDate: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contract Number</label>
                    <Input 
                      value={invoiceData.contractNumber}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, contractNumber: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Task Order</label>
                      <Input 
                        value={invoiceData.taskOrder || ''}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, taskOrder: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Order</label>
                      <Input 
                        value={invoiceData.purchaseOrder || ''}
                        onChange={(e) => setInvoiceData(prev => ({ ...prev, purchaseOrder: e.target.value }))}
                        className="w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                    <Input 
                      value={invoiceData.paymentTerms}
                      onChange={(e) => setInvoiceData(prev => ({ ...prev, paymentTerms: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
              </Card>
            </div>

            {/* Banking Information */}
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Banking Information (EFT)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                  <Input 
                    value={invoiceData.bankName}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, bankName: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <Input 
                    value={invoiceData.bankRouting}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, bankRouting: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                  <Input 
                    value={invoiceData.bankAccount}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, bankAccount: e.target.value }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Account Type</label>
                  <select
                    value={invoiceData.bankAccountType}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, bankAccountType: e.target.value as 'checking' | 'savings' }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="checking">Checking</option>
                    <option value="savings">Savings</option>
                  </select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="line-items" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Line Items</h3>
              <Button onClick={handleAddLineItem} className="btn-premium">
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Line Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {invoiceData.lineItems.map((item) => (
                <LineItemCard 
                  key={item.id} 
                  item={item} 
                  onEdit={handleEditLineItem}
                  onDelete={handleDeleteLineItem}
                />
              ))}
            </div>

            <Card className="card-premium p-6">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-gray-900">Total Amount</h4>
                <div className="text-2xl font-bold text-blue-600">${totalAmount.toLocaleString()}</div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="attachments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Required Attachments</h3>
              <Button className="btn-premium">
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {invoiceData.attachments.map((attachment, index) => (
                <AttachmentCard key={index} attachment={attachment} />
              ))}
            </div>

            <Card className="card-premium p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Required Documents Checklist</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Timecards or labor breakdowns</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Delivery confirmation or signed service log</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-gray-700">Progress or inspection report</span>
                </div>
                <div className="flex items-center space-x-3">
                  <AlertTriangleIcon className="h-5 w-5 text-orange-600" />
                  <span className="text-sm text-gray-700">Copy of original purchase order</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card className="card-premium p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Preview</h3>
              
              {/* Invoice Header */}
              <div className="border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{invoiceData.contractorName}</h2>
                    <p className="text-gray-600">{invoiceData.contractorAddress}</p>
                    <p className="text-gray-600">{invoiceData.contractorPhone} | {invoiceData.contractorEmail}</p>
                  </div>
                  <div className="text-right">
                    <h1 className="text-3xl font-bold text-blue-600">INVOICE</h1>
                    <p className="text-gray-600">#{invoiceData.invoiceNumber}</p>
                    <p className="text-gray-600">{new Date(invoiceData.invoiceDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Contract Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Contract Information</h4>
                  <p className="text-sm text-gray-600">Contract: {invoiceData.contractNumber}</p>
                  {invoiceData.taskOrder && <p className="text-sm text-gray-600">Task Order: {invoiceData.taskOrder}</p>}
                  {invoiceData.purchaseOrder && <p className="text-sm text-gray-600">PO: {invoiceData.purchaseOrder}</p>}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Government POC</h4>
                  <p className="text-sm text-gray-600">{invoiceData.governmentPOC}</p>
                  <p className="text-sm text-gray-600">{invoiceData.governmentEmail}</p>
                  <p className="text-sm text-gray-600">{invoiceData.governmentPhone}</p>
                </div>
              </div>

              {/* Line Items Table */}
              <div className="mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-2 text-left">CLIN</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Qty</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Unit</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Unit Price</th>
                      <th className="border border-gray-300 px-4 py-2 text-right">Extended</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.lineItems.map((item) => (
                      <tr key={item.id}>
                        <td className="border border-gray-300 px-4 py-2">{item.clin}</td>
                        <td className="border border-gray-300 px-4 py-2">{item.description}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{item.quantity}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">{item.unit}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">${item.unitPrice.toLocaleString()}</td>
                        <td className="border border-gray-300 px-4 py-2 text-right">${item.extendedPrice.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-900">Total Amount: ${totalAmount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">Payment Terms: {invoiceData.paymentTerms}</div>
                </div>
              </div>
            </Card>

            <div className="flex items-center justify-center space-x-4">
              <Button variant="outline" className="btn-ghost-premium">
                <DownloadIcon className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button className="btn-premium">
                <SendIcon className="h-4 w-4 mr-2" />
                Submit to {invoiceData.portal}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
} 