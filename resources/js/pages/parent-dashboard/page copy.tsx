import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BellRing, BookOpen, Calendar, CreditCard, GraduationCap, LayoutDashboard, Settings, Users } from 'lucide-react'
import { StudentPerformanceChart } from "@/components/student-performance-chart"
import { UpcomingPayments } from "@/components/upcoming-payments"
import { StudentSelector } from "@/components/student-selector"
import { Head, Link } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"
import AppLayout from "@/layouts/app-layout"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Parent Dashboard',
        href: '/parent/dashboard',
    },
];

export default function ParentDashboardPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Parent Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        <div className="border-r w-full md:w-64 flex-shrink-0">
          <div className="flex h-16 items-center border-b px-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6" />
              <span className="text-xl font-bold">EduManage</span>
            </div>
          </div>
          <nav className="grid gap-1 p-4">
            <Button variant="ghost" className="justify-start gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Users className="h-4 w-4" />
              My Children
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <CreditCard className="h-4 w-4" />
              Payments
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </nav>
        </div>
        <div className="flex-1">
          <header className="flex h-16 items-center border-b px-6">
            <div className="ml-auto flex items-center gap-4">
              <Button variant="outline" size="icon">
                <BellRing className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <span className="hidden md:inline-block">Sarah Johnson</span>
                <span className="h-8 w-8 rounded-full bg-primary text-white grid place-items-center">SJ</span>
              </Button>
            </div>
          </header>
          <main className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Parent Dashboard</h1>
                <StudentSelector />
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">5</div>
                    <p className="text-xs text-muted-foreground">For Emma Johnson</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">95.2%</div>
                    <p className="text-xs text-muted-foreground">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Next Payment</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$350.00</div>
                    <p className="text-xs text-muted-foreground">Due Oct 15, 2023</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">3</div>
                    <p className="text-xs text-muted-foreground">Next: Math (Today, 3 PM)</p>
                  </CardContent>
                </Card>
              </div>
              
              <Tabs defaultValue="performance" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                </TabsList>
                <TabsContent value="performance" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                      <CardHeader>
                        <CardTitle>Performance Overview</CardTitle>
                        <CardDescription>Emma Johnson's academic performance</CardDescription>
                      </CardHeader>
                      <CardContent className="pl-2">
                        <StudentPerformanceChart />
                      </CardContent>
                    </Card>
                    <Card className="col-span-3">
                      <CardHeader>
                        <CardTitle>Recent Assessments</CardTitle>
                        <CardDescription>
                          Latest quiz and assignment results
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {recentAssessments.map((assessment) => (
                            <div key={assessment.id} className="flex items-center justify-between">
                              <div>
                                <div className="font-medium">{assessment.title}</div>
                                <div className="text-sm text-muted-foreground">{assessment.course}</div>
                              </div>
                              <Badge className={assessment.score >= 80 ? "bg-green-100 text-green-800" : assessment.score >= 60 ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                                {assessment.score}%
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Course Performance</CardTitle>
                      <CardDescription>Detailed performance by course</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {coursePerformance.map((course) => (
                          <div key={course.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium">{course.title}</div>
                              <Badge className={course.grade === "A" ? "bg-green-100 text-green-800" : course.grade === "B" ? "bg-blue-100 text-blue-800" : course.grade === "C" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}>
                                Grade: {course.grade}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm mb-4">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>Attendance: {course.attendance}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="h-4 w-4 text-muted-foreground" />
                                <span>Completed: {course.completed}/{course.total} lessons</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm font-medium mb-1">Assignments</div>
                                <div className="text-sm text-muted-foreground">
                                  Submitted: {course.assignments.submitted}/{course.assignments.total}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Average Score: {course.assignments.averageScore}%
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-medium mb-1">Quizzes</div>
                                <div className="text-sm text-muted-foreground">
                                  Completed: {course.quizzes.completed}/{course.quizzes.total}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  Average Score: {course.quizzes.averageScore}%
                                </div>
                              </div>
                            </div>
                            <div className="mt-4">
                              <Link href={`/courses/${course.id}/performance`}>
                                <Button variant="outline" size="sm">View Detailed Report</Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="schedule">
                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Classes</CardTitle>
                      <CardDescription>Emma Johnson's class schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingClasses.map((classItem) => (
                          <div key={classItem.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="w-16 text-center">
                              <div className="text-sm font-medium">{classItem.date}</div>
                              <div className="text-sm text-muted-foreground">{classItem.time}</div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <div className="font-medium">{classItem.title}</div>
                                <Badge className={classItem.badgeClass}>{classItem.type}</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mb-2">{classItem.description}</div>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src={classItem.teacher.avatar} alt={classItem.teacher.name} />
                                  <AvatarFallback>{classItem.teacher.initials}</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">{classItem.teacher.name}</div>
                              </div>
                            </div>
                            <div>
                              <Link href={classItem.virtualClassLink}>
                                <Button size="sm">Join Class</Button>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="payments">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                        <CardDescription>Recent payments for all children</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {paymentHistory.map((payment) => (
                            <div key={payment.id} className="flex items-center justify-between p-2 border-b last:border-0">
                              <div>
                                <div className="font-medium">{payment.description}</div>
                                <div className="text-sm text-muted-foreground">{payment.date} • {payment.student}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">${payment.amount.toFixed(2)}</div>
                                <Badge variant="outline" className={payment.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                                  {payment.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Payments</CardTitle>
                        <CardDescription>Scheduled payments for all children</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <UpcomingPayments />
                        <div className="mt-4">
                          <Link href="/payments">
                            <Button className="w-full">Make a Payment</Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
    </div>
    </AppLayout>
  )
}

const recentAssessments = [
  {
    id: "1",
    title: "Algebra Quiz",
    course: "Mathematics",
    score: 92
  },
  {
    id: "2",
    title: "Physics Lab Report",
    course: "Physics",
    score: 85
  },
  {
    id: "3",
    title: "Essay on Shakespeare",
    course: "English Literature",
    score: 78
  },
  {
    id: "4",
    title: "Programming Assignment",
    course: "Computer Science",
    score: 95
  }
]

const coursePerformance = [
  {
    id: "1",
    title: "Mathematics",
    grade: "A",
    attendance: 98,
    completed: 18,
    total: 24,
    assignments: {
      submitted: 8,
      total: 8,
      averageScore: 92
    },
    quizzes: {
      completed: 6,
      total: 6,
      averageScore: 90
    }
  },
  {
    id: "2",
    title: "Physics",
    grade: "B",
    attendance: 92,
    completed: 15,
    total: 24,
    assignments: {
      submitted: 7,
      total: 8,
      averageScore: 85
    },
    quizzes: {
      completed: 5,
      total: 6,
      averageScore: 82
    }
  },
  {
    id: "3",
    title: "English Literature",
    grade: "B",
    attendance: 90,
    completed: 16,
    total: 24,
    assignments: {
      submitted: 7,
      total: 8,
      averageScore: 78
    },
    quizzes: {
      completed: 6,
      total: 6,
      averageScore: 80
    }
  }
]

const upcomingClasses = [
  {
    id: "1",
    title: "Mathematics",
    description: "Algebra: Quadratic Equations",
    type: "Regular",
    date: "Today",
    time: "3:00 PM",
    teacher: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS"
    },
    virtualClassLink: "/virtual-class/math-101",
    badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
  },
  {
    id: "2",
    title: "Physics",
    description: "Newton's Laws of Motion",
    type: "Regular",
    date: "Tomorrow",
    time: "10:00 AM",
    teacher: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ"
    },
    virtualClassLink: "/virtual-class/physics-101",
    badgeClass: "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
  },
  {
    id: "3",
    title: "English Literature",
    description: "Shakespeare: Romeo and Juliet",
    type: "Regular",
    date: "Oct 12",
    time: "1:00 PM",
    teacher: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB"
    },
    virtualClassLink: "/virtual-class/english-101",
    badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800"
  }
]

const paymentHistory = [
  {
    id: "1",
    description: "October Tuition",
    date: "Oct 1, 2023",
    amount: 350.00,
    status: "Paid",
    student: "Emma Johnson"
  },
  {
    id: "2",
    description: "September Tuition",
    date: "Sep 1, 2023",
    amount: 350.00,
    status: "Paid",
    student: "Emma Johnson"
  },
  {
    id: "3",
    description: "October Tuition",
    date: "Oct 1, 2023",
    amount: 350.00,
    status: "Paid",
    student: "Michael Johnson"
  },
  {
    id: "4",
    description: "September Tuition",
    date: "Sep 1, 2023",
    amount: 350.00,
    status: "Paid",
    student: "Michael Johnson"
  }
]
