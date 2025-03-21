import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Overview } from "@/components/dashboard/overview"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];
export default function DashboardPage() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Dashboard" text="Welcome back to your dashboard." />

      <DashboardCards />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <Overview />
            </Card>
            <Card className="col-span-3">
              <RecentActivities />
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Analytics content coming soon
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="h-[400px] flex items-center justify-center text-muted-foreground">
            Reports content coming soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
    </div>
    </AppLayout>
  )
}

