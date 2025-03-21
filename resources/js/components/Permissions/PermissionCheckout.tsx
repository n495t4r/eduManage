import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface PermissionCheckboxProps {
  permission: string;
  checked: boolean;
  onChange: (permission: string, checked: boolean) => void;
}

export default function PermissionCheckbox({ permission, checked, onChange }: PermissionCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={`permission-${permission}`}
        checked={checked}
        onCheckedChange={(checked) => onChange(permission, !!checked)}
      />
      <Label
        htmlFor={`permission-${permission}`}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {permission}
      </Label>
    </div>
  );
}
