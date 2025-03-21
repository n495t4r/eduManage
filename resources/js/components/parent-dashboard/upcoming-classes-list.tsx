import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Clock, Video } from "lucide-react"

export function UpcomingClassesList() {
  const upcomingClasses = [
    {
      id: 1,
      subject: "Mathematics",
      topic: "Algebra: Quadratic Equations",
      time: "Today, 2:00 PM - 3:30 PM",
      teacher: {
        name: "John Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
    },
    {
      id: 2,
      subject: "English Literature",
      topic: "Analysis of Shakespeare's Hamlet",
      time: "Tomorrow, 10:00 AM - 11:30 AM",
      teacher: {
        name: "Robert Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RB",
      },
    },
    {
      id: 3,
      subject: "Science",
      topic: "Introduction to Chemical Reactions",
      time: "Oct 18, 1:00 PM - 2:30 PM",
      teacher: {
        name: "Jennifer Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
    },
  ]

  return (
    <div className="space-y-4">
      {upcomingClasses.map((class_) => (
        <div key={class_.id} className="flex flex-col space-y-2 border-b pb-4 last:border-0 last:pb-0">
          <div className="font-medium">{class_.subject}</div>
          <div className="text-sm text-muted-foreground">{class_.topic}</div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>{class_.time}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarImage src={class_.teacher.avatar} alt={class_.teacher.name} />
                <AvatarFallback>{class_.teacher.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">{class_.teacher.name}</div>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Video className="h-3.5 w-3.5" />
              Join
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

