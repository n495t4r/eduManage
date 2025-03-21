import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, Eye, MoreHorizontal, Video, Plus } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"

interface VirtualClassesTableProps {
  status: "upcoming" | "live" | "past"
}

export function VirtualClassesTable({ status }: VirtualClassesTableProps) {
  // Filter classes based on status
  const filteredClasses = virtualClasses.filter((c) => {
    if (status === "upcoming") return c.status === "Scheduled"
    if (status === "live") return c.status === "Live"
    return c.status === "Completed"
  })

  if (filteredClasses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/20">
        <Video className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No classes found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          {status === "upcoming"
            ? "There are no upcoming virtual classes scheduled. Create a new class to get started."
            : status === "live"
              ? "There are no classes currently live. Check the schedule for upcoming classes."
              : "No past classes found. Classes will appear here after they have ended."}
        </p>
        {status === "upcoming" && (
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Create Class
          </Button>
        )}
      </div>
    )
  }

  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class Details</TableHead>
            <TableHead>Instructor</TableHead>
            <TableHead>Participants</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClasses.map((vclass) => (
            <TableRow key={vclass.id}>
              <TableCell>
                <div className="font-medium">{vclass.title}</div>
                <div className="text-sm text-muted-foreground">{vclass.course}</div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={vclass.instructor.avatar} alt={vclass.instructor.name} />
                    <AvatarFallback>{vclass.instructor.initials}</AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-medium">{vclass.instructor.name}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {vclass.participants.slice(0, 3).map((participant, i) => (
                      <Avatar key={i} className="h-7 w-7 border-2 border-background">
                        <AvatarImage src={participant.avatar} alt={participant.name} />
                        <AvatarFallback>{participant.initials}</AvatarFallback>
                      </Avatar>
                    ))}
                    {vclass.participants.length > 3 && (
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
                        +{vclass.participants.length - 3}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm">{vclass.date}</div>
                <div className="text-xs text-muted-foreground">{vclass.time}</div>
              </TableCell>
              <TableCell>
                <StatusBadge status={vclass.status} />
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
                    {vclass.status !== "Completed" && (
                      <DropdownMenuItem className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        {vclass.status === "Live" ? "Join Class" : "View Details"}
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="gap-2">
                      <Copy className="h-4 w-4" />
                      Copy Link
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2">
                      <Eye className="h-4 w-4" />
                      {vclass.status === "Completed" ? "View Recording" : "Preview"}
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

function StatusBadge({ status }: { status: string }) {
  if (status === "Live") {
    return (
      <Badge className="bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800 px-2 py-1 flex gap-1 items-center w-fit">
        <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse" />
        Live Now
      </Badge>
    )
  }

  if (status === "Scheduled") {
    return (
      <Badge
        variant="outline"
        className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800 px-2 py-1 w-fit"
      >
        Upcoming
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800 px-2 py-1 w-fit"
    >
      Completed
    </Badge>
  )
}

const virtualClasses = [
  {
    id: 1,
    title: "Introduction to Algebra",
    course: "Mathematics 101",
    instructor: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
    participants: [
      { name: "Student 1", avatar: "/placeholder.svg?height=32&width=32", initials: "S1" },
      { name: "Student 2", avatar: "/placeholder.svg?height=32&width=32", initials: "S2" },
      { name: "Student 3", avatar: "/placeholder.svg?height=32&width=32", initials: "S3" },
      { name: "Student 4", avatar: "/placeholder.svg?height=32&width=32", initials: "S4" },
      { name: "Student 5", avatar: "/placeholder.svg?height=32&width=32", initials: "S5" },
    ],
    date: "Oct 15, 2023",
    time: "10:00 AM - 11:30 AM",
    status: "Scheduled",
    link: "https://meeting.edu/abc123",
  },
  {
    id: 2,
    title: "Physics Fundamentals",
    course: "Physics 101",
    instructor: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
    participants: [
      { name: "Student 1", avatar: "/placeholder.svg?height=32&width=32", initials: "S1" },
      { name: "Student 2", avatar: "/placeholder.svg?height=32&width=32", initials: "S2" },
      { name: "Student 3", avatar: "/placeholder.svg?height=32&width=32", initials: "S3" },
    ],
    date: "Oct 15, 2023",
    time: "2:00 PM - 3:30 PM",
    status: "Live",
    link: "https://meeting.edu/def456",
  },
  {
    id: 3,
    title: "Literature Analysis",
    course: "English Literature",
    instructor: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB",
    },
    participants: [
      { name: "Student 1", avatar: "/placeholder.svg?height=32&width=32", initials: "S1" },
      { name: "Student 2", avatar: "/placeholder.svg?height=32&width=32", initials: "S2" },
      { name: "Student 3", avatar: "/placeholder.svg?height=32&width=32", initials: "S3" },
      { name: "Student 4", avatar: "/placeholder.svg?height=32&width=32", initials: "S4" },
    ],
    date: "Oct 14, 2023",
    time: "9:00 AM - 10:30 AM",
    status: "Completed",
    link: "https://meeting.edu/ghi789",
  },
]

