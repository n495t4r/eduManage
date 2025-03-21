import type React from "react"
import { SideNav } from "@/components/dashboard/side-nav"
import { TopNav } from "@/components/dashboard/top-nav"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-col md:flex-row">
        <SideNav />
        <div className="flex-1">
          <TopNav />
          <main className="p-6">{children}</main>
        </div>
      </div>
    </div>
  )
}

