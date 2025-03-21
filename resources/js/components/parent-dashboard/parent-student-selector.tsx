import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export function ParentStudentSelector() {
  const students = [
    {
      id: 1,
      name: "Emily Wilson",
      grade: "Grade 10",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      active: true,
    },
    {
      id: 2,
      name: "Michael Wilson",
      grade: "Grade 8",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MW",
      active: false,
    },
  ]

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="text-sm font-medium mr-2">Select Student:</div>
          {students.map((student) => (
            <Button key={student.id} variant={student.active ? "default" : "outline"} className="gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback>{student.initials}</AvatarFallback>
              </Avatar>
              <span>{student.name}</span>
              {student.active && (
                <Badge variant="outline" className="ml-1 bg-primary/10 text-primary border-primary/20">
                  Active
                </Badge>
              )}
            </Button>
          ))}
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Navigate</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

