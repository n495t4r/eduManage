"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import UserBioTab from "./UserDetailTabs/UserBioTab"
import UserRolesTab from "./UserDetailTabs/UserRolesTab"
import UserPermissionsTab from "@/components/users/UserDetailTabs/UserPermissionsTab"
import UserStatusTab from "./UserDetailTabs/UserStatusTab"
import { usePermissions } from "@/Utils/permissions"
import { router } from "@inertiajs/react"
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

interface Role {
  id: number
  name: string
}

interface Permission {
  id: number
  name: string
}

interface UserDetailPanelProps {
  user: User
  roles: Role[]
  permissions: Permission[]
  onClose: () => void
  onUpdate: (user: User) => void
}

export default function UserDetailPanel({ user, roles, permissions, onClose, onUpdate }: UserDetailPanelProps) {
  const { hasPermission, hasAbility } = usePermissions()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("bio")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const canEditRoles = hasPermission("edit roles")
  const canEditPermissions = hasPermission("edit users")
  const canEditRolesAbility = hasAbility('update', 'user')

  const handleSaveRoles = async (selectedRoles: string[]) => {
    if (!canEditRolesAbility) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to edit roles.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await router.put(
        route("users.update-roles", user.id),
        {
          roles: selectedRoles,
        },
        {
          onSuccess: () => {
            toast({
              title: "Roles updated",
              description: "User roles have been updated successfully.",
            })

            // Update the user object with new roles
            onUpdate({
              ...user,
              roles: selectedRoles,
            })
          },
          onError: (errors) => {
            toast({
              title: "Error",
              description: "Failed to update roles. Please try again.",
              variant: "destructive",
            })
            console.error(errors)
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSavePermissions = async (selectedPermissions: string[]) => {
    if (!canEditPermissions) {
      toast({
        title: "Permission denied",
        description: "You don't have permission to edit permissions.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await router.put(
        route("users.update-permissions", user.id),
        {
          permissions: selectedPermissions,
        },
        {
          onSuccess: () => {
            toast({
              title: "Permissions updated",
              description: "User permissions have been updated successfully.",
            })

            // Update the user object with new permissions
            onUpdate({
              ...user,
              permissions: selectedPermissions,
            })
          },
          onError: (errors) => {
            toast({
              title: "Error",
              description: "Failed to update permissions. Please try again.",
              variant: "destructive",
            })
            console.error(errors)
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateStatus = async (isActive: boolean) => {
    setIsSubmitting(true)

    try {
      await router.patch(
        route("users.toggle-active", user.id),
        {},
        {
          onSuccess: () => {
            toast({
              title: `User ${isActive ? "activated" : "deactivated"}`,
              description: `${user.name} has been ${isActive ? "activated" : "deactivated"} successfully.`,
            })

            // Update the user object with new status
            onUpdate({
              ...user,
              is_active: isActive,
            })
          },
          onError: (errors) => {
            toast({
              title: "Error",
              description: "Failed to update user status. Please try again.",
              variant: "destructive",
            })
            console.error(errors)
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateBio = async (bioData: { name: string; email: string }) => {
    setIsSubmitting(true)

    try {
      await router.post(
        route("users.update", user.id),
        {
          ...bioData,
          _method: "PUT",
        },
        {
          onSuccess: () => {
            toast({
              title: "User updated",
              description: "User information has been updated successfully.",
            })

            // Update the user object with new bio data
            onUpdate({
              ...user,
              ...bioData,
            })
          },
          onError: (errors) => {
            toast({
              title: "Error",
              description: "Failed to update user information. Please try again.",
              variant: "destructive",
            })
            console.error(errors)
          },
        },
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="mt-6 overflow-hidden transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-5">
      <div className="flex items-center justify-between bg-muted p-4">
        <h3 className="text-lg font-medium">User Details: {user.name}</h3>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start border-b rounded-none px-4">
          <TabsTrigger value="bio">Bio</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="status">Status</TabsTrigger>
        </TabsList>

        <CardContent className="p-0">
          <TabsContent value="bio" className="m-0 p-4">
            <UserBioTab user={user} onSave={handleUpdateBio} isSubmitting={isSubmitting} />
          </TabsContent>

          <TabsContent value="roles" className="m-0 p-4">
            <UserRolesTab
              user={user}
              roles={roles}
              onSave={handleSaveRoles}
              isSubmitting={isSubmitting}
              canEdit={canEditRolesAbility}
            />
          </TabsContent>

          <TabsContent value="permissions" className="m-0 p-4">
            <UserPermissionsTab
              user={user}
              permissions={permissions}
              onSave={handleSavePermissions}
              isSubmitting={isSubmitting}
              canEdit={canEditPermissions}
            />
          </TabsContent>

          <TabsContent value="status" className="m-0 p-4">
            <UserStatusTab user={user} onUpdateStatus={handleUpdateStatus} isSubmitting={isSubmitting} />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

