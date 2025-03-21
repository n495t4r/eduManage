import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseMaterialsList } from "@/components/materials/course-materials-list"
import { CourseMaterialsFilters } from "@/components/materials/course-materials-filters"
import { Plus } from "lucide-react"

export default function CourseMaterialsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Course Materials" text="Upload and manage learning resources for courses.">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Upload Material
        </Button>
      </DashboardHeader>

      <CourseMaterialsFilters />

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Materials</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <CourseMaterialsList type="all" />
        </TabsContent>

        <TabsContent value="documents">
          <CourseMaterialsList type="documents" />
        </TabsContent>

        <TabsContent value="videos">
          <CourseMaterialsList type="videos" />
        </TabsContent>

        <TabsContent value="quizzes">
          <CourseMaterialsList type="quizzes" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

