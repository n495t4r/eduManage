import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Eye, FileText, MoreHorizontal, Wallet } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function TeacherPayoutsTable() {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Teacher</TableHead>
            <TableHead>Payout ID</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teacherPayouts.map((payout) => (
            <TableRow key={payout.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={payout.teacher.avatar} alt={payout.teacher.name} />
                    <AvatarFallback>{payout.teacher.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{payout.teacher.name}</div>
                    <div className="text-sm text-muted-foreground">{payout.teacher.department}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="font-medium">{payout.payoutId}</div>
              </TableCell>
              <TableCell>
                <div className="font-medium">${payout.amount.toFixed(2)}</div>
              </TableCell>
              <TableCell>{payout.hours}</TableCell>
              <TableCell>{payout.period}</TableCell>
              <TableCell>
                <PayoutStatusBadge status={payout.status} />
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
                      Download Statement
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Wallet className="h-4 w-4" />
                      Process Payout
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

function PayoutStatusBadge({ status }: { status: string }) {
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

  if (status === "Processing") {
    return (
      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
        Processing
      </Badge>
    )
  }

  return <Badge variant="outline">{status}</Badge>
}

const teacherPayouts = [
  {
    id: 1,
    payoutId: "PAY-2023-001",
    teacher: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      department: "Mathematics",
    },
    amount: 2400.0,
    hours: 48,
    period: "Sep 15 - Sep 30, 2023",
    status: "Paid",
  },
  {
    id: 2,
    payoutId: "PAY-2023-002",
    teacher: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
      department: "Physics",
    },
    amount: 1850.0,
    hours: 37,
    period: "Sep 15 - Sep 30, 2023",
    status: "Paid",
  },
  {
    id: 3,
    payoutId: "PAY-2023-003",
    teacher: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB",
      department: "English",
    },
    amount: 2100.0,
    hours: 42,
    period: "Oct 1 - Oct 15, 2023",
    status: "Processing",
  },
  {
    id: 4,
    payoutId: "PAY-2023-004",
    teacher: {
      name: "Jennifer Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
      department: "Biology",
    },
    amount: 1750.0,
    hours: 35,
    period: "Oct 1 - Oct 15, 2023",
    status: "Pending",
  },
  {
    id: 5,
    payoutId: "PAY-2023-005",
    teacher: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
      department: "Chemistry",
    },
    amount: 1600.0,
    hours: 32,
    period: "Oct 1 - Oct 15, 2023",
    status: "Pending",
  },
]

