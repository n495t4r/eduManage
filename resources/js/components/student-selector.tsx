"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const students = [
  {
    id: "1",
    name: "Emma Johnson",
    grade: "10th Grade",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EJ"
  },
  {
    id: "2",
    name: "Michael Johnson",
    grade: "8th Grade",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MJ"
  }
]

export function StudentSelector() {
  const [selectedStudent, setSelectedStudent] = useState(students[0])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={selectedStudent.avatar} alt={selectedStudent.name} />
            <AvatarFallback>{selectedStudent.initials}</AvatarFallback>
          </Avatar>
          <span>{selectedStudent.name}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {students.map((student) => (
          <DropdownMenuItem 
            key={student.id} 
            onClick={() => setSelectedStudent(student)}
            className="flex items-center gap-2"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div>{student.name}</div>
              <div className="text-xs text-muted-foreground">{student.grade}</div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
