import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, FileText, MoreHorizontal, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ParentPaymentsTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Parent/Student</TableHead>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Issue Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parentPayments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={payment.parent.avatar} alt={payment.parent.name} />
                    <AvatarFallback>{payment.parent.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{payment.parent.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {payment.students.map((s) => s.name).join(", ")}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{payment.invoiceId}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">${payment.amount.toFixed(2)}</div>
              </TableCell>
              <TableCell>{payment.issueDate}</TableCell>
              <TableCell>{payment.dueDate}</TableCell>
              <TableCell>
                <PaymentStatusBadge status={payment.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <FileText className="h-4 w-4" />
                      Download Invoice
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Send className="h-4 w-4" />
                      Send Reminder
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

function PaymentStatusBadge({ status }: { status: string }) {
  if (status === "Paid") {
    return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800">Paid</Badge>
  }

  if (status === "Pending") {
    return (
      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800">
        Pending
      </Badge>
    )
  }

  if (status === "Overdue") {
    return (
      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800">
        Overdue
      </Badge>
    )
  }

  return <Badge variant="outline">{status}</Badge>
}

const parentPayments = [
  {
    id: 1,
    invoiceId: "INV-2023-001",
    parent: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DW",
    },
    students: [
      { name: "Emily Wilson", id: "S001" },
      { name: "Michael Wilson", id: "S002" },
    ],
    amount: 450.0,
    issueDate: "Oct 1, 2023",
    dueDate: "Oct 15, 2023",
    status: "Paid",
  },
  {
    id: 2,
    invoiceId: "INV-2023-002",
    parent: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SJ",
    },
    students: [{ name: "James Johnson", id: "S003" }],
    amount: 350.0,
    issueDate: "Oct 5, 2023",
    dueDate: "Oct 20, 2023",
    status: "Pending",
  },
  {
    id: 3,
    invoiceId: "INV-2023-003",
    parent: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB",
    },
    students: [{ name: "Laura Brown", id: "S004" }],
    amount: 280.0,
    issueDate: "Sep 20, 2023",
    dueDate: "Oct 5, 2023",
    status: "Overdue",
  },
  {
    id: 4,
    invoiceId: "INV-2023-004",
    parent: {
      name: "Jennifer Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
    students: [
      { name: "Daniel Davis", id: "S005" },
      { name: "Sophia Davis", id: "S006" },
    ],
    amount: 525.0,
    issueDate: "Oct 10, 2023",
    dueDate: "Oct 25, 2023",
    status: "Paid",
  },
  {
    id: 5,
    invoiceId: "INV-2023-005",
    parent: {
      name: "Michael Miller",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MM",
    },
    students: [{ name: "Emma Miller", id: "S007" }],
    amount: 300.0,
    issueDate: "Oct 12, 2023",
    dueDate: "Oct 27, 2023",
    status: "Pending",
  },
]

