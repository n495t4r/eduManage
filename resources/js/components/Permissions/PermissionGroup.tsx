import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PermissionCheckbox from './PermissionCheckout';

interface PermissionGroupProps {
  module: string;
  permissions: string[];
  selectedPermissions: string[];
  onChange: (permission: string, checked: boolean) => void;
  onSelectAll: (module: string, checked: boolean) => void;
}

export default function PermissionGroup({
  module,
  permissions,
  selectedPermissions,
  onChange,
  onSelectAll
}: PermissionGroupProps) {
  const allSelected = permissions.every(p => selectedPermissions.includes(p));
  const someSelected = permissions.some(p => selectedPermissions.includes(p)) && !allSelected;

  return (
    <div className="space-y-4 border rounded-md p-4">
      <div className="flex items-center space-x-2">
        <Checkbox
          id={`module-${module}`}
          checked={allSelected}
          ref={(ref) => {
            if (ref) {
              // Handle indeterminate state
              (ref as HTMLInputElement).indeterminate = someSelected;
            }
          }}
          onCheckedChange={(checked) => onSelectAll(module, !!checked)}
        />
        <Label
          htmlFor={`module-${module}`}
          className="text-base font-semibold capitalize"
        >
          {module}
        </Label>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-6">
        {permissions.map(permission => (
          <PermissionCheckbox
            key={permission}
            permission={permission}
            checked={selectedPermissions.includes(permission)}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
