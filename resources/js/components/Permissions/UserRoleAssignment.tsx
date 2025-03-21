import React from 'react';
import { useForm } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Role, User } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';

interface UserRoleAssignmentProps {
  user: User;
  roles: Role[];
}

export default function UserRoleAssignment({ user, roles }: UserRoleAssignmentProps) {
  const { data, setData, put, processing } = useForm({
    roles: user.roles,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('users.update-roles', user.id));
  };

  const handleRoleChange = (role: string) => {
    // Toggle role selection
    const updatedRoles = data.roles.includes(role)
      ? data.roles.filter(r => r !== role)
      : [...data.roles, role];

    setData('roles', updatedRoles);
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Assign Roles to {user.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Assigned Roles</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {roles.map(role => (
                <div key={role.id} className="flex items-center space-x-2">
                   <Checkbox
                    id={`role-${role.id}`}
                    checked={data.roles.includes(role.name)}
                    onCheckedChange={() => handleRoleChange(role.name)}
                  />
                  <Label htmlFor={`role-${role.id}`}>{role.name}</Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={processing}>
            Save Role Assignments
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
