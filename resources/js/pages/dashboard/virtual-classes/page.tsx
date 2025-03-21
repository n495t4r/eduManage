import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { VirtualClassesTable } from "@/components/virtual-classes/virtual-classes-table"
import { VirtualClassesFilters } from "@/components/virtual-classes/virtual-classes-filters"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"

export default function VirtualClassesPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Virtual Classes" text="Manage your virtual class sessions.">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Class
        </Button>
      </DashboardHeader>

      <VirtualClassesFilters />

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="live">Live Now</TabsTrigger>
          <TabsTrigger value="past">Past Classes</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          <VirtualClassesTable status="upcoming" />
        </TabsContent>

        <TabsContent value="live">
          <VirtualClassesTable status="live" />
        </TabsContent>

        <TabsContent value="past">
          <VirtualClassesTable status="past" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

