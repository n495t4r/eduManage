"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface User {
  id: number
  name: string
  roles: string[]
}

interface Role {
  id: number
  name: string
}

interface UserRolesTabProps {
  user: User
  roles: Role[]
  onSave: (selectedRoles: string[]) => void
  isSubmitting: boolean
  canEdit: boolean
}

export default function UserRolesTab({ user, roles, onSave, isSubmitting, canEdit }: UserRolesTabProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])

  // Initialize selected roles from user
  useEffect(() => {
    setSelectedRoles(user.roles || [])
  }, [user.roles])

  const handleRoleToggle = (roleName: string) => {
    setSelectedRoles((prev) => (prev.includes(roleName) ? prev.filter((r) => r !== roleName) : [...prev, roleName]))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(selectedRoles)
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Manage User Roles</h3>

      {!canEdit && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>You don't have permission to edit roles.</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center space-x-2">
              <Checkbox
                id={`role-${role.id}`}
                checked={selectedRoles.includes(role.name)}
                onCheckedChange={() => handleRoleToggle(role.name)}
                disabled={!canEdit}
              />
              <Label htmlFor={`role-${role.id}`} className="capitalize">
                {role.name}
              </Label>
            </div>
          ))}
        </div>

        {canEdit && (
          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? "Saving..." : "Save Roles"}
          </Button>
        )}
      </form>
    </div>
  )
}

