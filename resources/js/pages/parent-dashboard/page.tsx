import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MessageSquare,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Head } from "@inertiajs/react"
import { ParentDashboardHeader } from "@/components/parent-dashboard/parent-dashboard-header"
import { ParentStudentSelector } from "@/components/parent-dashboard/parent-student-selector"
import { ParentDashboardCards } from "@/components/parent-dashboard/parent-dashboard-cards"
import { StudentPerformanceChart } from "@/components/parent-dashboard/student-performance-chart"
import { UpcomingClassesList } from "@/components/parent-dashboard/upcoming-classes-list"
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">

          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <MessageSquare className="h-5 w-5" />
              <span className="sr-only">Messages</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="David Wilson" />
                <AvatarFallback>DW</AvatarFallback>
              </Avatar>
              <span className="hidden md:inline-block">David Wilson</span>
            </Button>
          </div>
        </div>
      </header>

      {/* <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 py-6"> */}
 <div className="flex flex-col gap-6">
        <main className="flex flex-col gap-6">
          <ParentDashboardHeader />

          <ParentStudentSelector />

          <ParentDashboardCards />

          <Tabs defaultValue="performance" className="space-y-4">
            <TabsList>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="performance" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                  <CardHeader>
                    <CardTitle>Performance Overview</CardTitle>
                    <CardDescription>Emily's academic performance across subjects</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <StudentPerformanceChart />
                  </CardContent>
                </Card>
                <Card className="col-span-3">
                  <CardHeader>
                    <CardTitle>Upcoming Classes</CardTitle>
                    <CardDescription>Next scheduled classes for Emily</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpcomingClassesList />
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Detailed breakdown of Emily's performance by course</CardDescription>
                </CardHeader>
                <CardContent>
                  {courses.map((course) => (
                    <div key={course.id} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-lg">{course.name}</div>
                        <Badge
                          className={
                            course.grade >= 90
                              ? "bg-green-100 text-green-800"
                              : course.grade >= 75
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          Grade: {course.grade}%
                        </Badge>
                      </div>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Overall Progress</span>
                            <span>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                          <Card>
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Assignments</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <div className="text-2xl font-bold">
                                {course.assignments.completed}/{course.assignments.total}
                              </div>
                              <p className="text-xs text-muted-foreground">Completed</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Quizzes</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <div className="text-2xl font-bold">{course.quizzes.score}%</div>
                              <p className="text-xs text-muted-foreground">Average Score</p>
                            </CardContent>
                          </Card>
                          <Card>
                            <CardHeader className="p-3">
                              <CardTitle className="text-sm">Attendance</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0">
                              <div className="text-2xl font-bold">{course.attendance}%</div>
                              <p className="text-xs text-muted-foreground">Present Rate</p>
                            </CardContent>
                          </Card>
                        </div>
                        <div className="text-sm">
                          <div className="font-medium mb-1">Teacher's Comment:</div>
                          <div className="text-muted-foreground">{course.teacherComment}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendance">
              <Card>
                <CardHeader>
                  <CardTitle>Attendance Records</CardTitle>
                  <CardDescription>Emily's attendance history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">Attendance records content coming soon</div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment History</CardTitle>
                  <CardDescription>Recent payments and upcoming fees</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12 text-muted-foreground">Payment history content coming soon</div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
    </div>
    </AppLayout>
  )
}

function Bell(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  )
}

const courses = [
  {
    id: 1,
    name: "Mathematics 101",
    grade: 92,
    progress: 85,
    assignments: { completed: 12, total: 15 },
    quizzes: { score: 94 },
    attendance: 98,
    teacherComment:
      "Emily is doing exceptionally well in mathematics. She demonstrates strong analytical skills and consistently performs above average in problem-solving exercises.",
  },
  {
    id: 2,
    name: "English Literature",
    grade: 88,
    progress: 78,
    assignments: { completed: 8, total: 12 },
    quizzes: { score: 85 },
    attendance: 92,
    teacherComment:
      "Emily shows good comprehension of literary concepts and contributes thoughtfully to class discussions. Her writing skills are developing well, though she could benefit from more detailed analysis in her essays.",
  },
  {
    id: 3,
    name: "Science",
    grade: 76,
    progress: 65,
    assignments: { completed: 7, total: 10 },
    quizzes: { score: 72 },
    attendance: 85,
    teacherComment:
      "Emily is making steady progress in science. She would benefit from additional practice with laboratory concepts and scientific terminology. More consistent attendance would also help improve her understanding of complex topics.",
  },
]

