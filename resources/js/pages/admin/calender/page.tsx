"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Clock, Filter, Plus } from "lucide-react"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"
import { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Schedule',
    href: '/schedule',
  },
];
export default function CalendarPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
          <Head title="Schedule" />
          <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Calendar</h1>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Event
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              <div className="mt-6 space-y-2">
                <div className="text-sm font-medium">Upcoming Events</div>
                <div className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="flex items-center gap-2 text-sm">
                      <div className={`w-3 h-3 rounded-full ${event.dotColor}`}></div>
                      <div>{event.date}</div>
                      <div className="font-medium">{event.title}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-2/3">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-1">
                <CardTitle>Events</CardTitle>
                <CardDescription>
                  {date
                    ? date.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    : "Select a date"}
                </CardDescription>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="gap-2">
                  <Filter className="h-4 w-4" />
                  Filter
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="day">
                <TabsList className="mb-4">
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
                <TabsContent value="day" className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex gap-4 p-4 border rounded-lg">
                      <div className="w-16 text-center">
                        <div className="text-sm text-muted-foreground">{event.startTime}</div>
                        <div className="h-full border-l border-dashed mx-auto my-1"></div>
                        <div className="text-sm text-muted-foreground">{event.endTime}</div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge className={event.badgeClass}>{event.type}</Badge>
                          <div className="text-sm text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {event.duration}
                          </div>
                        </div>
                        <h3 className="font-medium">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                        {event.location && <div className="mt-2 text-sm">{event.location}</div>}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                <TabsContent value="week">
                  <div className="text-center py-8 text-muted-foreground">Week view will be implemented here</div>
                </TabsContent>
                <TabsContent value="month">
                  <div className="text-center py-8 text-muted-foreground">Month view will be implemented here</div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </div>
    </AppLayout>
  )
}

const upcomingEvents = [
  {
    id: "1",
    title: "Math Exam",
    date: "Oct 15",
    dotColor: "bg-red-500",
  },
  {
    id: "2",
    title: "Science Fair",
    date: "Oct 20",
    dotColor: "bg-blue-500",
  },
  {
    id: "3",
    title: "Parent-Teacher Meeting",
    date: "Oct 25",
    dotColor: "bg-green-500",
  },
  {
    id: "4",
    title: "Sports Day",
    date: "Nov 5",
    dotColor: "bg-yellow-500",
  },
]

const events = [
  {
    id: "1",
    title: "Mathematics Class",
    description: "Introduction to Calculus",
    type: "Class",
    startTime: "09:00",
    endTime: "10:30",
    duration: "1h 30m",
    location: "Room 101",
    badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800",
  },
  {
    id: "2",
    title: "Physics Lab",
    description: "Experiment on Newton's Laws",
    type: "Lab",
    startTime: "11:00",
    endTime: "12:30",
    duration: "1h 30m",
    location: "Science Lab",
    badgeClass: "bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800",
  },
  {
    id: "3",
    title: "Lunch Break",
    description: "",
    type: "Break",
    startTime: "12:30",
    endTime: "13:30",
    duration: "1h",
    location: "Cafeteria",
    badgeClass: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 hover:text-yellow-800",
  },
  {
    id: "4",
    title: "Computer Science",
    description: "Programming in Python",
    type: "Class",
    startTime: "14:00",
    endTime: "15:30",
    duration: "1h 30m",
    location: "Room 105",
    badgeClass: "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800",
  },
  {
    id: "5",
    title: "Basketball Practice",
    description: "Team training session",
    type: "Activity",
    startTime: "16:00",
    endTime: "17:30",
    duration: "1h 30m",
    location: "Sports Hall",
    badgeClass: "bg-purple-100 text-purple-800 hover:bg-purple-100 hover:text-purple-800",
  },
]

