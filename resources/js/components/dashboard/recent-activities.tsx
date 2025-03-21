import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookOpen, FileText, MessageSquare, UserPlus } from "lucide-react"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const activities = [
  {
    id: 1,
    type: "assignment",
    title: "New Assignment Submitted",
    description: "John Doe submitted Math Assignment #3",
    time: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: 2,
    type: "course",
    title: "New Course Added",
    description: "Advanced Biology course has been added",
    time: "5 hours ago",
    icon: <BookOpen className="h-4 w-4" />,
    user: {
      name: "Admin",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AD",
    },
  },
  {
    id: 3,
    type: "message",
    title: "New Message",
    description: "Sarah Williams sent you a message",
    time: "Yesterday",
    icon: <MessageSquare className="h-4 w-4" />,
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SW",
    },
  },
  {
    id: 4,
    type: "user",
    title: "New User Registered",
    description: "Michael Brown joined as a student",
    time: "2 days ago",
    icon: <UserPlus className="h-4 w-4" />,
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MB",
    },
  },
]

export function RecentActivities() {
  return (
    <>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>You have 12 new notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold">{activity.title}</div>
                  <div className="rounded-full bg-muted p-1">{activity.icon}</div>
                </div>
                <div className="text-sm text-muted-foreground">{activity.description}</div>
                <div className="text-xs text-muted-foreground">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </>
  )
}

