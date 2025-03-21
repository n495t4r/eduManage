import { NavItem } from '@/types';
import { usePermissions } from '@/Utils/permissions';

export function useNavigation() {
    const { hasPermission, hasRole, hasAbility } = usePermissions();

    const filterNavItems = (items: NavItem[]): NavItem[] => {
        return items.filter(item => {
            // Check permissions
            if (item.permission) {
                if (!hasPermission(item.permission)) {
                    return false;
                }
            }

            // Check roles if needed
            if (item.role) {
                if (!hasRole(item.role)) {
                    return false;
                }
            }

            // Check ability if specified
            if (item.ability) {
                if (!hasAbility(item.ability.action, item.ability.subject)) {
                    return false;
                }
            }

            return true;
        });
    };

    return {
        filterNavItems
    };
}
