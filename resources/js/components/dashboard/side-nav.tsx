"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    BookOpen,
    Calendar,
    CreditCard,
    FileText,
    GraduationCap,
    Home,
    LayoutDashboard,
    School,
    Settings,
    Users,
    Video,
} from "lucide-react"
import { Head, Link, usePage } from "@inertiajs/react";
import { cn } from "@/lib/utils"

const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { name: "Users", href: "/dashboard/users", icon: <Users className="h-4 w-4" /> },
    { name: "Courses", href: "/dashboard/courses", icon: <BookOpen className="h-4 w-4" /> },
    { name: "Assignments", href: "/dashboard/assignments", icon: <FileText className="h-4 w-4" /> },
    { name: "Schedule", href: "/dashboard/calendar", icon: <Calendar className="h-4 w-4" /> },
    { name: "Virtual Classes", href: "/dashboard/virtual-classes", icon: <Video className="h-4 w-4" /> },
    { name: "Course Materials", href: "/dashboard/materials", icon: <School className="h-4 w-4" /> },
    { name: "Payments", href: "/dashboard/payments", icon: <CreditCard className="h-4 w-4" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
]

export function SideNav() {
    const { url } = usePage()
    const [collapsed, setCollapsed] = useState(false)

    return (
        <aside
            className={cn(
                "border-r w-full transition-all duration-300",
                collapsed ? "md:w-16" : "md:w-64",
                "flex-shrink-0 h-screen sticky top-0 overflow-y-auto",
            )}
        >
            <div className={cn("flex h-16 items-center border-b px-4", collapsed ? "justify-center" : "justify-between")}>
                <div className={cn("flex items-center gap-2", collapsed && "justify-center")}>
                    <GraduationCap className="h-6 w-6" />
                    {!collapsed && <span className="text-xl font-bold">EduManage</span>}
                </div>
                {!collapsed && (
                    <Button variant="ghost" size="icon" onClick={() => setCollapsed(true)} className="md:flex hidden">
                        <Home className="h-4 w-4" />
                    </Button>
                )}
                {collapsed && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setCollapsed(false)}
                        className="absolute right-2 top-4 md:flex hidden"
                    >
                        <Home className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <nav className="grid gap-1 p-4">
                {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant={url === `/${item.href}` ? "secondary" : "ghost"} // Ensure proper path matching
                            className={cn("w-full", collapsed ? "justify-center" : "justify-start gap-2")}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.name}</span>}
                        </Button>;

                    </Link>
                ))}
            </nav>
        </aside>
    )
}

