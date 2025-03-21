"use client"

import type React from "react"
import { useForm } from "@inertiajs/react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { usePermissions } from "@/Utils/permissions"

interface User {
  id: number
  name: string
  email: string
  avatar?: string
  initials?: string
}

interface UserBioTabProps {
  user: User
  onSave: (data: { name: string; email: string }) => void
  isSubmitting: boolean
}

export default function UserBioTab({ user, onSave, isSubmitting }: UserBioTabProps) {
  const { hasPermission } = usePermissions()
  const canEdit = hasPermission("edit users")

  const { data, setData, errors } = useForm({
    name: user.name,
    email: user.email,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canEdit) {
      onSave(data)
    }
  }

  return (
    <div>
      <div className="flex items-center space-x-4 mb-6">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-lg">{user.initials}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-medium">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={data.name} onChange={(e) => setData("name", e.target.value)} disabled={!canEdit} />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.email}
            onChange={(e) => setData("email", e.target.value)}
            disabled={!canEdit}
          />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>

        {canEdit && (
          <Button type="submit" disabled={isSubmitting} className="mt-4">
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        )}
      </form>
    </div>
  )
}

