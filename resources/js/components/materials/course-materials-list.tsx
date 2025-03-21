import type React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Eye, FileText, Film, MoreHorizontal, PenSquare, Trash } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"

interface CourseMaterialsListProps {
  type: "all" | "documents" | "videos" | "quizzes"
}

export function CourseMaterialsList({ type }: CourseMaterialsListProps) {
  // Filter materials based on type
  const filteredMaterials = materials.filter((material) => {
    if (type === "all") return true
    return material.type === type
  })

  if (filteredMaterials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 border rounded-lg bg-muted/20">
        <FileText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">No materials found</h3>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          There are no {type === "all" ? "" : type} materials available. Upload new materials to get started.
        </p>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Upload Material
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredMaterials.map((material) => (
        <Card key={material.id} className="overflow-hidden">
          <CardHeader className="pb-2 flex flex-row justify-between items-start">
            <div>
              <MaterialTypeIcon type={material.type} className="mb-2" />
              <CardTitle className="text-lg">{material.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="-mt-2">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Actions</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <Eye className="h-4 w-4" />
                  View
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <PenSquare className="h-4 w-4" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive gap-2">
                  <Trash className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">{material.course}</div>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800">
                {material.type}
              </Badge>
              {material.attributes.map((attr, index) => (
                <Badge key={index} variant="outline">
                  {attr}
                </Badge>
              ))}
            </div>
            <div className="text-sm">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span>Added on {material.dateAdded}</span>
              </div>
              {material.duration && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{material.duration}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={material.addedBy.avatar} alt={material.addedBy.name} />
                <AvatarFallback>{material.addedBy.initials}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <div className="font-medium">{material.addedBy.name}</div>
                <div className="text-xs text-muted-foreground">Instructor</div>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-3">
                {/* Non-downloadable policy for teachers */}
                <div className="flex items-center gap-1.5">
                  <Checkbox id={`download-${material.id}`} checked={false} disabled={true} />
                  <label htmlFor={`download-${material.id}`} className="text-xs text-muted-foreground">
                    Download locked
                  </label>
                </div>
                <Button size="sm" variant="outline" className="gap-1.5">
                  <Eye className="h-3.5 w-3.5" />
                  <span>View</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function MaterialTypeIcon({ type, className }: { type: string; className?: string }) {
  if (type === "documents") {
    return <FileText className={`h-8 w-8 text-blue-500 ${className || ""}`} />
  }

  if (type === "videos") {
    return <Film className={`h-8 w-8 text-red-500 ${className || ""}`} />
  }

  if (type === "quizzes") {
    return <PenSquare className={`h-8 w-8 text-green-500 ${className || ""}`} />
  }

  return <FileText className={`h-8 w-8 text-blue-500 ${className || ""}`} />
}

// This needs to be imported at the top
function Plus(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}

const materials = [
  {
    id: 1,
    title: "Algebra Fundamentals",
    course: "Mathematics 101",
    type: "documents",
    attributes: ["Required", "Chapter 1"],
    dateAdded: "Oct 10, 2023",
    addedBy: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
  },
  {
    id: 2,
    title: "Introduction to Physics",
    course: "Physics 101",
    type: "videos",
    attributes: ["Required", "Week 1"],
    dateAdded: "Oct 12, 2023",
    duration: "45 minutes",
    addedBy: {
      name: "Maria Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MJ",
    },
  },
  {
    id: 3,
    title: "Literary Analysis Quiz",
    course: "English Literature",
    type: "quizzes",
    attributes: ["Graded", "Chapter 3"],
    dateAdded: "Oct 15, 2023",
    duration: "30 minutes",
    addedBy: {
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "RB",
    },
  },
  {
    id: 4,
    title: "Cell Biology Slides",
    course: "Biology Fundamentals",
    type: "documents",
    attributes: ["Supplementary"],
    dateAdded: "Oct 14, 2023",
    addedBy: {
      name: "Jennifer Davis",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JD",
    },
  },
  {
    id: 5,
    title: "Chemistry Lab Tutorial",
    course: "Chemistry 101",
    type: "videos",
    attributes: ["Required", "Lab 2"],
    dateAdded: "Oct 13, 2023",
    duration: "38 minutes",
    addedBy: {
      name: "Michael Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MW",
    },
  },
  {
    id: 6,
    title: "Midterm Practice Quiz",
    course: "Mathematics 101",
    type: "quizzes",
    attributes: ["Practice", "Midterm"],
    dateAdded: "Oct 16, 2023",
    duration: "45 minutes",
    addedBy: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JS",
    },
  },
]

