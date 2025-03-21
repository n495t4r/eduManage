"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock } from "lucide-react"
import { BreadcrumbItem } from "@/types"
import AppLayout from "@/layouts/app-layout"
import { Head } from "@inertiajs/react"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Teacher Dashboard',
        href: '/teacher-dashboard',
    },
];

export default function LeaveRequestPage() {
  const [leaveType, setLeaveType] = useState<string>("")
  const [date, setDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [submitted, setSubmitted] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this to your backend
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Leave Request" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
      <div className="container max-w-4xl py-8">
        <Card>
          <CardHeader>
            <CardTitle>Leave Request Submitted</CardTitle>
            <CardDescription>Your leave request has been submitted successfully.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="rounded-lg bg-muted p-6 flex flex-col items-center justify-center text-center">
              <div className="h-12 w-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mb-4">
                <CheckIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium mb-2">Request Received</h3>
              <p className="text-muted-foreground mb-6">
                Your leave request has been submitted and is pending approval from the administration. You will be
                notified once your request has been processed.
              </p>
              <div className="grid gap-2 mx-auto max-w-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Request ID:</span>
                  <span className="font-medium">LR-2023-156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                    Pending
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted on:</span>
                  <span className="font-medium">{format(new Date(), "PPP")}</span>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => setSubmitted(false)}>
              Submit Another Request
            </Button>
          </CardFooter>
        </Card>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Previous Leave Requests</h3>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex justify-between items-center p-4">
                    <div>
                      <div className="font-medium">Personal Leave</div>
                      <div className="text-sm text-muted-foreground">
                        Sep {10 + i} - Sep {12 + i}, 2023
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        i === 1
                          ? "bg-green-100 text-green-800"
                          : i === 2
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                      }
                    >
                      {i === 1 ? "Approved" : i === 2 ? "Denied" : "Pending"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Leave Request" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4"></div>
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Request Leave</CardTitle>
          <CardDescription>
            Submit a request for leave of absence. Please provide all required information.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select onValueChange={setLeaveType} required>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal Leave</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Duration</Label>
                <Select defaultValue="single">
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Day</SelectItem>
                    <SelectItem value="multiple">Multiple Days</SelectItem>
                    <SelectItem value="half">Half Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Leave</Label>
              <Textarea
                id="reason"
                placeholder="Please provide details about your leave request"
                className="min-h-[120px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="backup">Backup Arrangements</Label>
              <Textarea
                id="backup"
                placeholder="Describe any arrangements you've made for your classes during your absence"
                className="min-h-[80px]"
              />
            </div>

            <div className="rounded-lg border p-4 bg-muted/50">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium mb-1">Leave Policy Reminders</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                    <li>Requests should be submitted at least 7 days in advance for planned leave</li>
                    <li>Emergency/sick leave requests should be submitted as soon as possible</li>
                    <li>All leaves are subject to approval by administration</li>
                    <li>Please ensure your classes are covered during your absence</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button">
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </CardFooter>
        </form>
      </Card>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Previous Leave Requests</h3>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex justify-between items-center p-4">
                  <div>
                    <div className="font-medium">Personal Leave</div>
                    <div className="text-sm text-muted-foreground">
                      Sep {10 + i} - Sep {12 + i}, 2023
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      i === 1
                        ? "bg-green-100 text-green-800"
                        : i === 2
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {i === 1 ? "Approved" : i === 2 ? "Denied" : "Pending"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
    </AppLayout>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

