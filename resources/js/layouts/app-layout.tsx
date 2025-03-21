import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
// import AppLayoutTemplate from '@/layouts/app/app-header-layout';

import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
        <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="container mx-auto py-6">
                {children}
            </div>
            <Toaster />
        </div>
    </AppLayoutTemplate>
);
