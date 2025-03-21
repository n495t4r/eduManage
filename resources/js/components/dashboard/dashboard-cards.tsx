import type React from "react"
import { BookOpen, Calendar, CreditCard, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function DashboardCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <DashboardCard
        title="Total Students"
        value="1,248"
        description="+12% from last month"
        icon={<Users className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Active Courses"
        value="42"
        description="+2 new this week"
        icon={<BookOpen className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Attendance Rate"
        value="92.5%"
        description="+1.2% from last week"
        icon={<Calendar className="h-4 w-4 text-muted-foreground" />}
      />
      <DashboardCard
        title="Monthly Revenue"
        value="$12,450"
        description="+8% from last month"
        icon={<CreditCard className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  )
}

interface DashboardCardProps {
  title: string
  value: string
  description: string
  icon: React.ReactNode
}

function DashboardCard({ title, value, description, icon }: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

