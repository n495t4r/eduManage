import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps } from '@inertiajs/core';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    permission?: string | string[];
    role?: string | string[];
    ability?: {
        action: 'viewAny' | 'view' | 'create' | 'update' | 'delete' | string;
        subject: string; // The model name, e.g., 'user', 'role', etc.
    };
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
    roles: string[];
    is_active?: boolean;
    permissions?: string[]
    avatar?: string
    initials?: string
}

export interface Auth {
    user: User | null;
}

export interface PermissionRegistry {
    modules: Record<string, string[]>;
    all: string[];
}

export interface PageProps {
    auth: Auth;
    permissions: PermissionRegistry;
    flash: {
        success: string | null;
        error: string | null;
    };
    [key: string]: unknown; // Add this line to include an index signature

}

export interface Role {
    id: number;
    name: string;
    permissions: Array<string | { id: number; name: string }>;
}

export interface Permission {
    id: number;
    name: string;
}
