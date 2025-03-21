import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, BookOpen, UserPlus, UserMinus } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CourseAssignmentPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Course Assignment" text="Assign/Reassign courses to teachers and students.">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Assignment
        </Button>
      </DashboardHeader>

      <Tabs defaultValue="courses" className="space-y-6">
        <TabsList>
          <TabsTrigger value="courses">Course to Teacher</TabsTrigger>
          <TabsTrigger value="students">Student to Teacher</TabsTrigger>
        </TabsList>

        <TabsContent value="courses">
          <CourseTeacherAssignment />
        </TabsContent>

        <TabsContent value="students">
          <StudentTeacherAssignment />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function CourseTeacherAssignment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course to Teacher Assignment</CardTitle>
        <CardDescription>Assign teachers to specific courses or reassign courses between teachers.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by course or teacher..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Current Teacher</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {courseAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{assignment.course}</div>
                      <div className="text-sm text-muted-foreground">{assignment.courseCode}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {assignment.teacher ? (
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={assignment.teacher.avatar} alt={assignment.teacher.name} />
                        <AvatarFallback>{assignment.teacher.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{assignment.teacher.name}</div>
                        <div className="text-xs text-muted-foreground">{assignment.teacher.department}</div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-muted-foreground">Unassigned</div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarFallback className="text-xs">S{i}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <span className="ml-1 text-sm text-muted-foreground">{assignment.studentCount} students</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={assignment.teacher ? "outline" : "secondary"}
                    className={
                      assignment.teacher
                        ? "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800"
                    }
                  >
                    {assignment.teacher ? "Assigned" : "Unassigned"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <UserPlus className="h-3.5 w-3.5" />
                      {assignment.teacher ? "Reassign" : "Assign"}
                    </Button>
                    {assignment.teacher && (
                      <Button variant="outline" size="sm" className="gap-1 h-8 text-destructive hover:text-destructive">
                        <UserMinus className="h-3.5 w-3.5" />
                        Remove
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

function StudentTeacherAssignment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student to Teacher Assignment</CardTitle>
        <CardDescription>Assign students to teachers or manage existing assignments.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search by student or teacher..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="grade7">Grade 7</SelectItem>
                <SelectItem value="grade8">Grade 8</SelectItem>
                <SelectItem value="grade9">Grade 9</SelectItem>
                <SelectItem value="grade10">Grade 10</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="unassigned">Unassigned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Grade/Level</TableHead>
              <TableHead>Assigned Teachers</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {studentAssignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={assignment.avatar} alt={assignment.name} />
                      <AvatarFallback>{assignment.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{assignment.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {assignment.id}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{assignment.grade}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <div className="flex -space-x-2">
                      {assignment.teachers.slice(0, 3).map((teacher, i) => (
                        <Avatar key={i} className="h-6 w-6 border-2 border-background">
                          <AvatarImage src={teacher.avatar} alt={teacher.name} />
                          <AvatarFallback>{teacher.initials}</AvatarFallback>
                        </Avatar>
                      ))}
                      {assignment.teachers.length > 3 && (
                        <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs border-2 border-background">
                          +{assignment.teachers.length - 3}
                        </div>
                      )}
                    </div>
                    <span className="ml-1 text-sm text-muted-foreground">{assignment.teachers.length} teachers</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {assignment.subjects.slice(0, 3).map((subject, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {assignment.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{assignment.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      <UserPlus className="h-3.5 w-3.5" />
                      Assign Teacher
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1 h-8">
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

const courseAssignments = [
  {
    id: "COURSE001",
    course: "Introduction to Mathematics",
    courseCode: "MATH101",
    teacher: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
      department: "Mathematics",
    },
    studentCount: 24,
  },
  {
    id: "COURSE002",
    course: "Advanced Physics",
    courseCode: "PHYS201",
    teacher: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
      department: "Physics",
    },
    studentCount: 18,
  },
  {
    id: "COURSE003",
    course: "English Literature",
    courseCode: "ENG101",
    teacher: null,
    studentCount: 0,
  },
  {
    id: "COURSE004",
    course: "World History",
    courseCode: "HIST101",
    teacher: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
      department: "History",
    },
    studentCount: 22,
  },
  {
    id: "COURSE005",
    course: "Biology Fundamentals",
    courseCode: "BIO101",
    teacher: {
      name: "Jennifer Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
      department: "Biology",
    },
    studentCount: 26,
  },
]

const studentAssignments = [
  {
    id: "STU001",
    name: "Emily Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EW",
    grade: "Grade 10",
    teachers: [
      { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "JS" },
      { name: "Maria Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "MJ" },
      { name: "Robert Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "RB" },
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32", initials: "SW" },
    ],
    subjects: ["Mathematics", "Physics", "English", "History", "Biology"],
  },
  {
    id: "STU002",
    name: "Michael Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MW",
    grade: "Grade 8",
    teachers: [
      { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "JS" },
      { name: "Robert Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "RB" },
      { name: "Jennifer Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
    ],
    subjects: ["Mathematics", "English", "Biology", "Art"],
  },
  {
    id: "STU003",
    name: "James Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JJ",
    grade: "Grade 9",
    teachers: [
      { name: "Maria Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "MJ" },
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32", initials: "SW" },
    ],
    subjects: ["Physics", "History"],
  },
  {
    id: "STU004",
    name: "Sophia Davis",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SD",
    grade: "Grade 7",
    teachers: [
      { name: "Jennifer Davis", avatar: "/placeholder.svg?height=32&width=32", initials: "JD" },
      { name: "John Smith", avatar: "/placeholder.svg?height=32&width=32", initials: "JS" },
    ],
    subjects: ["Biology", "Mathematics"],
  },
  {
    id: "STU005",
    name: "Daniel Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "DB",
    grade: "Grade 10",
    teachers: [
      { name: "Robert Brown", avatar: "/placeholder.svg?height=32&width=32", initials: "RB" },
      { name: "Maria Johnson", avatar: "/placeholder.svg?height=32&width=32", initials: "MJ" },
      { name: "Sarah Williams", avatar: "/placeholder.svg?height=32&width=32", initials: "SW" },
    ],
    subjects: ["English", "Physics", "History", "Chemistry"],
  },
]

