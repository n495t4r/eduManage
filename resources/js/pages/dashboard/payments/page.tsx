import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PaymentsFilters } from "@/components/payments/payments-filters"
import { ParentPaymentsTable } from "@/components/payments/parent-payments-table"
import { TeacherPayoutsTable } from "@/components/payments/teacher-payouts-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Download, Wallet } from "lucide-react"

export default function PaymentsPage() {
  return (
    <div className="flex flex-col gap-6">
      <DashboardHeader heading="Financial Management" text="Manage payments from parents and payouts to teachers.">
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,565.00</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,850.00</div>
            <p className="text-xs text-muted-foreground">12 invoices pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teacher Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$16,240.00</div>
            <p className="text-xs text-muted-foreground">Processed this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,580.00</div>
            <p className="text-xs text-muted-foreground">8 payouts pending</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="parent-payments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parent-payments">Parent Payments</TabsTrigger>
          <TabsTrigger value="teacher-payouts">Teacher Payouts</TabsTrigger>
          <TabsTrigger value="payment-settings">Payment Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="parent-payments">
          <div className="space-y-4">
            <PaymentsFilters />
            <ParentPaymentsTable />
          </div>
        </TabsContent>

        <TabsContent value="teacher-payouts">
          <div className="space-y-4">
            <PaymentsFilters />
            <TeacherPayoutsTable />
          </div>
        </TabsContent>

        <TabsContent value="payment-settings">
          <Card>
            <CardHeader>
              <CardTitle>Payment Settings</CardTitle>
              <CardDescription>Configure payment methods and payout schedules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Online Payment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-8 w-8 text-primary" />
                          <div>
                            <div className="font-medium">Credit/Debit Cards</div>
                            <div className="text-sm text-muted-foreground">Visa, Mastercard, Amex</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Bank Transfer</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Wallet className="h-8 w-8 text-primary" />
                          <div>
                            <div className="font-medium">Bank Transfers</div>
                            <div className="text-sm text-muted-foreground">Direct bank payments</div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Payout Settings</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Payout Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Bi-weekly payouts</div>
                          <div className="text-sm text-muted-foreground">Every 1st and 15th of the month</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Default Payout Method</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-sm text-muted-foreground">Direct deposit to teacher account</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Change
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

