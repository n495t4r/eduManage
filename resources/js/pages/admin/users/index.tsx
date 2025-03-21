"use client"

import type React from "react"
import { useState } from "react"
import { Link, useForm, router, Head } from "@inertiajs/react"
import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, Plus } from "lucide-react"
import Can from "@/components/Permissions/Can"
import { usePermissions } from "@/Utils/permissions"
import type { BreadcrumbItem } from "@/types"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import PageHeader from "@/components/PageHeader"
import UserDetailPanel from "@/components/users/UserDetailPanel"
import { useToast } from "@/hooks/use-toast"

interface User {
  id: number
  name: string
  email: string
  is_active: boolean
  roles: string[]
  permissions?: string[]
  avatar?: string
  initials?: string
}

interface UsersIndexProps {
  users: {
    data: User[]
    meta: {
      current_page: number
      from: number
      last_page: number
      links: Array<{
        url: string | null
        label: string
        active: boolean
      }>
      path: string
      per_page: number
      to: number
      total: number
    }
  }
  filters: {
    search: string
  }
  roles: Array<{
    id: number
    name: string
  }>
  permissions: Array<{
    id: number
    name: string
  }>
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Users Management",
    href: "/users",
  },
]

export default function UsersIndex({ users, filters, roles, permissions }: UsersIndexProps) {
  const { can } = usePermissions()
  const { toast } = useToast()
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [activeTab, setActiveTab] = useState("all")

  const { data, setData, get, processing } = useForm({
    search: filters.search || "",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    get(route("users.index"), {
      preserveState: true,
    })
  }

  const handleUserSelection = (userId: number) => {
    // If we're selecting a single user, find and set the selected user
    const user = users.data.find((u) => u.id === userId)

    if (selectedUsers.includes(userId)) {
      // If already selected, deselect
      setSelectedUsers((prev) => prev.filter((id) => id !== userId))
      if (selectedUser?.id === userId) {
        setSelectedUser(null)
      }
    } else {
      // If selecting, add to selection and set as the active user
      setSelectedUsers((prev) => [...prev, userId])
      if (user) {
        setSelectedUser(user)
      }
    }
  }

  const handleRowClick = (user: User) => {
    setSelectedUser((prev) => (prev?.id === user.id ? null : user))

    // If the user wasn't already selected, add them to the selection
    if (!selectedUsers.includes(user.id)) {
      setSelectedUsers((prev) => [...prev, user.id])
    }
  }

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([])
      setSelectedUser(null)
    } else {
      setSelectedUsers(users.data.map((user) => user.id))
    }
    setIsAllSelected(!isAllSelected)
  }

  const handleDeleteUser = (userId: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      router.delete(route("users.destroy", userId), {
        onSuccess: () => {
          toast({
            title: "User deleted",
            description: "The user has been deleted successfully.",
          })

          // If the deleted user was selected, clear the selection
          if (selectedUser?.id === userId) {
            setSelectedUser(null)
          }

          // Remove from selected users array
          setSelectedUsers((prev) => prev.filter((id) => id !== userId))
        },
      })
    }
  }

  const handleToggleActive = (user: User) => {
    if (confirm(`Are you sure you want to ${user.is_active ? "deactivate" : "activate"} this user?`)) {
      router.patch(
        route("users.toggle-active", user.id),
        {},
        {
          onSuccess: () => {
            toast({
              title: `User ${user.is_active ? "deactivated" : "activated"}`,
              description: `${user.name} has been ${user.is_active ? "deactivated" : "activated"} successfully.`,
            })

            // Update the selected user if it's the one being toggled
            if (selectedUser?.id === user.id) {
              setSelectedUser({
                ...selectedUser,
                is_active: !user.is_active,
              })
            }
          },
        },
      )
    }
  }

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    // Here you would typically filter users based on the selected tab
    // For now, we'll just update the state
  }

  const handleUserUpdate = (updatedUser: User) => {
    // Update the selected user in the state
    setSelectedUser(updatedUser)

    // Update the user in the users array
    const updatedUsers = users.data.map((user) => (user.id === updatedUser.id ? updatedUser : user))

    // We can't directly modify the users prop, but we can show a toast
    // to indicate success. In a real app, you might want to refetch the data
    toast({
      title: "User updated",
      description: "The user has been updated successfully.",
    })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Users Management" />

      <PageHeader
        title="Users"
        showFilter={true}
        actionButton={{
          label: "New User",
          icon: <Plus className="mr-2 h-4 w-4" />,
          href: route("users.create"),
          permission: "create users",
        }}
        search={{
          value: data.search,
          onChange: (e) => setData("search", e.target.value),
          onSubmit: handleSearch,
          placeholder: "Search users...",
          processing: processing,
        }}
      />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="teachers">Teachers</TabsTrigger>
          <TabsTrigger value="admins">Administrators</TabsTrigger>
        </TabsList>
      </Tabs>

      <Card>
        <CardHeader>
          <CardDescription>Manage your users and their roles.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleSelectAll} />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.data.map((user) => (
                <TableRow
                  key={user.id}
                  className={selectedUser?.id === user.id ? "bg-muted/50" : ""}
                  onClick={() => handleRowClick(user)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => handleUserSelection(user.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {user.roles && user.roles.length > 0 ? (
                        user.roles.map((role, index) => (
                          <Badge key={index} variant="outline" className="capitalize">
                            {role}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground text-sm">No roles</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.is_active ? "success" : "destructive"}>
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={route("users.show", user.id)}>View</Link>
                        </DropdownMenuItem>

                        <Can permission="edit users">
                          <DropdownMenuItem asChild>
                            <Link href={route("users.edit", user.id)}>Edit</Link>
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={() => handleToggleActive(user)}>
                            {user.is_active ? "Deactivate" : "Activate"}
                          </DropdownMenuItem>
                        </Can>

                        <Can permission="delete users">
                          <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-red-600">
                            Delete
                          </DropdownMenuItem>
                        </Can>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {users.data.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          {users.meta && users.meta.last_page > 1 && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Showing {users.meta.from} to {users.meta.to} of {users.meta.total} users
              </div>
              <div className="flex items-center space-x-2">
                {users.meta.links.map((link, i) => {
                  if (link.url === null) {
                    return (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm text-muted-foreground"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                      />
                    )
                  }

                  return (
                    <Link
                      key={i}
                      href={link.url}
                      className={`px-3 py-1 text-sm rounded ${
                        link.active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  )
                })}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Detail Panel */}
      {selectedUser && (
        <UserDetailPanel
          user={selectedUser}
          roles={roles}
          permissions={permissions}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleUserUpdate}
        />
      )}
    </AppLayout>
  )
}
