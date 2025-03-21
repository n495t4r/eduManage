"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface User {
  id: number
  name: string
  permissions?: string[]
}

interface Permission {
  id: number
  name: string
}

interface UserPermissionsTabProps {
  user: User
  permissions: Permission[]
  onSave: (selectedPermissions: string[]) => void
  isSubmitting: boolean
  canEdit: boolean
}

export default function UserPermissionsTab({
  user,
  permissions,
  onSave,
  isSubmitting,
  canEdit,
}: UserPermissionsTabProps) {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  // Initialize selected permissions from user
  useEffect(() => {
    setSelectedPermissions(user.permissions || [])
  }, [user.permissions])

  const handlePermissionToggle = (permissionName: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionName) ? prev.filter((p) => p !== permissionName) : [...prev, permissionName],
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(selectedPermissions)
  }

  // Filter permissions based on search query
  const filteredPermissions = permissions.filter((permission) =>
    permission.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group permissions by category (assuming permissions are named like "category.action")
  const groupedPermissions = filteredPermissions.reduce(
    (groups, permission) => {
      const parts = permission.name.split(".")
      const category = parts.length > 1 ? parts[0] : "other"

      if (!groups[category]) {
        groups[category] = []
      }

      groups[category].push(permission)
      return groups
    },
    {} as Record<string, Permission[]>,
  )

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Manage User Permissions</h3>

      {!canEdit && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You don't have permission to edit permissions.</AlertDescription>
        </Alert>
      )}

      <div className="relative mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search permissions..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
          <div key={category} className="space-y-2">
            <h4 className="text-sm font-medium uppercase text-muted-foreground mb-2 capitalize">{category}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryPermissions.map((permission) => (
                <div key={permission.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`permission-${permission.id}`}
                    checked={selectedPermissions.includes(permission.name)}
                    onCheckedChange={() => handlePermissionToggle(permission.name)}
                    disabled={!canEdit}
                  />
                  <Label htmlFor={`permission-${permission.id}`} className="text-sm">
                    {permission.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {Object.keys(groupedPermissions).length === 0 && (
          <div className="text-center py-4 text-muted-foreground">No permissions found matching your search.</div>
        )}

        {canEdit && filteredPermissions.length > 0 && (
          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? "Saving..." : "Save Permissions"}
          </Button>
        )}
      </form>
    </div>
  )
}

