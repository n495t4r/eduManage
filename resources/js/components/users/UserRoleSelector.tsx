"use client"

import type React from "react"
import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Role {
  id: number
  name: string
}

interface UserRoleSelectorProps {
  roles: Role[]
  selectedRoles: string[]
  onChange: (roles: string[]) => void
  disabled?: boolean
}

export default function UserRoleSelector({ roles, selectedRoles, onChange, disabled = false }: UserRoleSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (roleName: string) => {
    const newSelectedRoles = selectedRoles.includes(roleName)
      ? selectedRoles.filter((r) => r !== roleName)
      : [...selectedRoles, roleName]

    onChange(newSelectedRoles)
  }

  const handleRemove = (roleName: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onChange(selectedRoles.filter((r) => r !== roleName))
  }

  return (
    <div className="space-y-2">
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            <span className="truncate">
              {selectedRoles.length > 0
                ? `${selectedRoles.length} role${selectedRoles.length > 1 ? "s" : ""} selected`
                : "Select roles..."}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search roles..." />
            <CommandList>
              <CommandEmpty>No roles found.</CommandEmpty>
              <CommandGroup>
                {roles.map((role) => (
                  <CommandItem key={role.id} value={role.name} onSelect={() => handleSelect(role.name)}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedRoles.includes(role.name) ? "opacity-100" : "opacity-0")}
                    />
                    {role.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedRoles.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-2">
          {selectedRoles.map((role) => (
            <Badge key={role} variant="secondary" className="capitalize">
              {role}
              {!disabled && (
                <button
                  className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onClick={(e) => handleRemove(role, e)}
                >
                  ×
                </button>
              )}
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

