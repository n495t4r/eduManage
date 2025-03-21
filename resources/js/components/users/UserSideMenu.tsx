import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link, usePage } from "@inertiajs/react"
import { usePermissions } from "@/Utils/permissions"
import { UserCog, Shield, Key, Activity } from "lucide-react"

interface User {
  id: number
  name: string
  email: string
  is_active: boolean
  roles: string[]
  avatar?: string
  initials?: string
}

interface UserSideMenuProps {
  user: User
}

export default function UserSideMenu({ user }: UserSideMenuProps) {
  const { hasPermission } = usePermissions()
//   const { route } = usePage().props

  const menuItems = [
    {
      label: "Edit Profile",
      icon: UserCog,
      href: route("users.edit", user.id),
      permission: "edit users",
    },
    {
      label: "Manage Roles",
      icon: Shield,
      href: route("users.roles", user.id),
      permission: "edit roles",
    },
    {
      label: "Manage Permissions",
      icon: Key,
      href: route("users.permissions", user.id),
      permission: "edit permissions",
    },
    {
      label: "Activity Log",
      icon: Activity,
      href: route("users.activity", user.id),
      permission: "view activity",
    },
  ]

  const filteredMenuItems = menuItems.filter((item) => !item.permission || hasPermission(item.permission))

  if (filteredMenuItems.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">User Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium text-sm">{user.name}</div>
            <Badge variant={user.is_active ? "success" : "destructive"} className="text-xs mt-1">
              {user.is_active ? "Active" : "Inactive"}
            </Badge>
          </div>
        </div>

        <div className="space-y-1">
          {filteredMenuItems.map((item, index) => (
            <Button key={index} variant="ghost" size="sm" className="w-full justify-start" asChild>
              <Link href={item.href}>
                <item.icon className="mr-2 h-4 w-4" />
                {item.label}
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

