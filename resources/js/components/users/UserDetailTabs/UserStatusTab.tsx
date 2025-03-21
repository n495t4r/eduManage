"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, XCircle } from "lucide-react"
import { usePermissions } from "@/Utils/permissions"

interface User {
  id: number
  name: string
  is_active: boolean
}

interface UserStatusTabProps {
  user: User
  onUpdateStatus: (isActive: boolean) => void
  isSubmitting: boolean
}

export default function UserStatusTab({ user, onUpdateStatus, isSubmitting }: UserStatusTabProps) {
  const { hasPermission } = usePermissions()
  const canEdit = hasPermission("edit users")

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">User Status</h3>

      <div className="bg-muted p-4 rounded-md mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium mb-1">Current Status</p>
            <Badge variant={user.is_active ? "success" : "destructive"} className="text-xs">
              {user.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>

          <div className="text-4xl">
            {user.is_active ? (
              <CheckCircle className="text-green-500 h-10 w-10" />
            ) : (
              <XCircle className="text-red-500 h-10 w-10" />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-card border rounded-md p-4">
          <h4 className="font-medium mb-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
            Status Information
          </h4>
          <p className="text-sm text-muted-foreground">
            {user.is_active
              ? "This user is currently active and can log in to the system."
              : "This user is currently inactive and cannot log in to the system."}
          </p>
        </div>

        {canEdit && (
          <div className="flex justify-end space-x-4">
            {user.is_active ? (
              <Button variant="destructive" onClick={() => onUpdateStatus(false)} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Deactivate User"}
              </Button>
            ) : (
              <Button variant="default" onClick={() => onUpdateStatus(true)} disabled={isSubmitting}>
                {isSubmitting ? "Processing..." : "Activate User"}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

