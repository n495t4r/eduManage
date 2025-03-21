import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ParentDashboardHeader() {
  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Parent Dashboard</h2>
        <p className="text-muted-foreground">Monitor your children's academic progress and activities</p>
      </div>
      <div className="flex items-center space-x-2">
        <Select defaultValue="oct-2023">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="oct-2023">October 2023</SelectItem>
            <SelectItem value="sep-2023">September 2023</SelectItem>
            <SelectItem value="aug-2023">August 2023</SelectItem>
          </SelectContent>
        </Select>
        <Button>Export</Button>
      </div>
    </div>
  )
}

