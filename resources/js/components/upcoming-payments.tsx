"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard } from 'lucide-react'

const upcomingPayments = [
  {
    id: "1",
    description: "November Tuition",
    dueDate: "Nov 1, 2023",
    amount: 350.00,
    student: "Emma Johnson"
  },
  {
    id: "2",
    description: "November Tuition",
    dueDate: "Nov 1, 2023",
    amount: 350.00,
    student: "Michael Johnson"
  },
  {
    id: "3",
    description: "Science Lab Fee",
    dueDate: "Oct 15, 2023",
    amount: 50.00,
    student: "Emma Johnson"
  }
]

export function UpcomingPayments() {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([])
  
  const togglePayment = (id: string) => {
    setSelectedPayments(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    )
  }
  
  const totalAmount = upcomingPayments
    .filter(payment => selectedPayments.includes(payment.id))
    .reduce((sum, payment) => sum + payment.amount, 0)
  
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {upcomingPayments.map((payment) => (
          <div key={payment.id} className="flex items-center space-x-2 p-2 border rounded-md">
            <Checkbox 
              id={`payment-${payment.id}`} 
              checked={selectedPayments.includes(payment.id)}
              onCheckedChange={() => togglePayment(payment.id)}
            />
            <div className="flex-1">
              <div className="font-medium">{payment.description}</div>
              <div className="text-sm text-muted-foreground">
                Due: {payment.dueDate} • {payment.student}
              </div>
            </div>
            <div className="font-medium">${payment.amount.toFixed(2)}</div>
          </div>
        ))}
      </div>
      
      {selectedPayments.length > 0 && (
        <div className="border-t pt-4">
          <div className="flex justify-between mb-4">
            <div className="font-medium">Total</div>
            <div className="font-bold">${totalAmount.toFixed(2)}</div>
          </div>
          <Button className="w-full gap-2">
            <CreditCard className="h-4 w-4" />
            Pay Selected (${totalAmount.toFixed(2)})
          </Button>
        </div>
      )}
    </div>
  )
}
