import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Assignment',
    href: '/assignment',
  },
];

export default function AssignmentsPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Assignments" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="container mx-auto py-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Assignments</h1>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Assignment
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search assignments..." className="pl-8" />
            </div>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All Assignments</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
              <TabsTrigger value="graded">Graded</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle>{assignment.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Assignment</DropdownMenuItem>
                        <DropdownMenuItem>Download Submissions</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{assignment.course}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center gap-4 mb-4">
                    <Badge
                      variant={
                        assignment.status === "Pending"
                          ? "outline"
                          : assignment.status === "Submitted"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {assignment.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>Due {assignment.dueDate}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Submission Progress</span>
                      <span>{assignment.submissionRate}%</span>
                    </div>
                    <Progress value={assignment.submissionRate} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={assignment.instructor.avatar} alt={assignment.instructor.name} />
                      <AvatarFallback>{assignment.instructor.initials}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{assignment.instructor.name}</p>
                      <p className="text-muted-foreground">Instructor</p>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

const assignments = [
  {
    id: "1",
    title: "Mathematics Problem Set",
    course: "Introduction to Mathematics",
    status: "Pending",
    dueDate: "Oct 15",
    submissionRate: 65,
    instructor: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
  },
  {
    id: "2",
    title: "Physics Lab Report",
    course: "Advanced Physics",
    status: "Submitted",
    dueDate: "Oct 10",
    submissionRate: 90,
    instructor: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
  },
  {
    id: "3",
    title: "Programming Assignment",
    course: "Introduction to Computer Science",
    status: "Graded",
    dueDate: "Oct 5",
    submissionRate: 100,
    instructor: {
      name: "David Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "DL",
    },
  },
  {
    id: "4",
    title: "Historical Essay",
    course: "World History",
    status: "Pending",
    dueDate: "Oct 20",
    submissionRate: 30,
    instructor: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
  },
  {
    id: "5",
    title: "Literature Analysis",
    course: "English Literature",
    status: "Submitted",
    dueDate: "Oct 12",
    submissionRate: 85,
    instructor: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB",
    },
  },
  {
    id: "6",
    title: "Biology Lab Report",
    course: "Biology Fundamentals",
    status: "Graded",
    dueDate: "Oct 3",
    submissionRate: 100,
    instructor: {
      name: "Jennifer Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
]

