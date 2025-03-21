import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/Users',
    },
];

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, MoreHorizontal, Plus, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function UsersPage() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

                <div className="container mx-auto py-6">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold">Users</h1>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add User
                        </Button>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search users..." className="pl-8" />
                        </div>
                        <Button variant="outline" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filter
                        </Button>
                    </div>

                    <Tabs defaultValue="all" className="mb-6">
                        <TabsList>
                            <TabsTrigger value="all">All Users</TabsTrigger>
                            <TabsTrigger value="students">Students</TabsTrigger>
                            <TabsTrigger value="teachers">Teachers</TabsTrigger>
                            <TabsTrigger value="admins">Administrators</TabsTrigger>
                        </TabsList>
                    </Tabs>

                    <Card>
                        <CardHeader>
                            <CardTitle>Users</CardTitle>
                            <CardDescription>Manage your users and their roles.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Email</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-9 w-9">
                                                        <AvatarImage src={user.avatar} alt={user.name} />
                                                        <AvatarFallback>{user.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="font-medium">{user.name}</div>
                                                        <div className="text-sm text-muted-foreground">{user.id}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        user.role === "Admin" ? "destructive" : user.role === "Teacher" ? "default" : "secondary"
                                                    }
                                                >
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={user.status === "Active" ? "outline" : "secondary"}
                                                    className="bg-green-100 text-green-800 hover:bg-green-100 hover:text-green-800"
                                                >
                                                    {user.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{user.joined}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">Actions</span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                                                        <DropdownMenuItem>Edit User</DropdownMenuItem>
                                                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">Deactivate</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    )
}

const users = [
    {
        id: "USR001",
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Student",
        status: "Active",
        joined: "Jan 10, 2023",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
    },
    {
        id: "USR002",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Teacher",
        status: "Active",
        joined: "Mar 15, 2022",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
    },
    {
        id: "USR003",
        name: "Robert Johnson",
        email: "robert.johnson@example.com",
        role: "Admin",
        status: "Active",
        joined: "Nov 5, 2021",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "RJ",
    },
    {
        id: "USR004",
        name: "Emily Davis",
        email: "emily.davis@example.com",
        role: "Student",
        status: "Active",
        joined: "Feb 22, 2023",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
    },
    {
        id: "USR005",
        name: "Michael Wilson",
        email: "michael.wilson@example.com",
        role: "Teacher",
        status: "Active",
        joined: "Jul 8, 2022",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MW",
    },
]

