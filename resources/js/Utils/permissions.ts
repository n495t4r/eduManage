import { usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

export function useAuth() {
  const { auth } = usePage<PageProps>().props;

  return {
    user: auth.user,
    isLoggedIn: !!auth.user,
    roles: auth.user?.roles || [],
    permissions: auth.user?.permissions || [],
  };
}

export function usePermissions() {
  const { permissions, abilities } = usePage<PageProps & { abilities: Record<string, boolean> }>().props;
  const { user, roles, permissions: userPermissions } = useAuth();

  const hasRole = (role: string | string[]): boolean => {
    if (!user) return false;

    const rolesToCheck = Array.isArray(role) ? role : [role];
    return rolesToCheck.some(r => roles.includes(r));
  };

  const hasPermission = (permission: string | string[]): boolean => {
    if (!user) return false;

    const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
    return permissionsToCheck.some(p => userPermissions.includes(p));
  };

  const hasAllPermissions = (permissionsToCheck: string[]): boolean => {
    if (!user) return false;

    return permissionsToCheck.every(p => userPermissions.includes(p));
  };

  /**
   * Check if the user has the ability to perform an action on a subject
   * @param action The policy action (viewAny, view, create, update, delete, etc.)
   * @param subject The model name in lowercase (user, role, permission, etc.)
   * @returns boolean indicating if the user has the ability
   */
  const hasAbility = (action: string, subject: string): boolean => {
    if (!user) return false

    // If abilities aren't shared from the server, fall back to checking permissions
    if (!abilities) {
      // Convert policy method names to permission strings
      const permissionMap: Record<string, string> = {
        viewAny: `view ${subject}s`,
        view: `view ${subject}s`,
        create: `create ${subject}s`,
        update: `edit ${subject}s`,
        delete: `delete ${subject}s`,
      }

      const permission = permissionMap[action] || `${action} ${subject}s`
      return hasPermission(permission)
    }

    // Check the ability from the shared abilities object
    const abilityKey = `${subject}:${action}`
    return abilities[abilityKey] === true
  }

  const can = (permission: string | string[]): boolean => {
    return hasPermission(permission);
  };

  const cannot = (permission: string | string[]): boolean => {
    return !hasPermission(permission);
  };

 /**
   * Policy-based version of can
   * @param action The policy action (viewAny, view, create, update, delete, etc.)
   * @param subject The model name in lowercase (user, role, permission, etc.)
   */
 const canAbility = (action: string, subject: string): boolean => {
    return hasAbility(action, subject)
  }

  /**
   * Policy-based version of cannot
   * @param action The policy action (viewAny, view, create, update, delete, etc.)
   * @param subject The model name in lowercase (user, role, permission, etc.)
   */
  const cannotAbility = (action: string, subject: string): boolean => {
    return !hasAbility(action, subject)
  }

  return {
    hasRole,
    hasPermission,
    hasAllPermissions,
    hasAbility,
    can,
    cannot,
    canAbility,
    cannotAbility,
    availablePermissions: permissions,
  }
}
