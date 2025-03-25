import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Calendar, CreditCard, FileText, Folder, LayoutDashboard,Shield,Users2, Video } from 'lucide-react';
import AppLogo from './app-logo';
import { useNavigation } from '@/Utils/navigation';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
        role: ['admin', 'super-admin'],
    },
    {
        title: 'Parent Dashboard', url: '/parent_dashboard', icon: LayoutDashboard, role: ['parent'],
    },
    { title: 'Teacher Dashboard', url: '/teacher_dashboard', icon: LayoutDashboard, role: ['teacher'] },
    { title: 'Student Dashboard', url: '/student_dashboard', icon: LayoutDashboard, role: ['student'] },

    { title: 'Users', url: '/users', icon: Users2,
        ability: {subject: 'user', action: 'viewAny'}

    },
    { title: 'Roles', url: '/roles', icon: Shield, permission: 'view roles' },
    { title: 'Courses', url: '/courses', icon: BookOpen,},
    { title: 'Assignment',url: '/assignment', icon: FileText,},
    { title: 'Calender', url: '/calender', icon: Calendar,},
    { title: 'Assign Courses', url: '/assign_courses', icon: BookOpen },
    { title: 'Payments', url: '/payments', icon: CreditCard },
    { title: 'Classes', url: '/classes', icon: Video },
];


const footerNavItems: NavItem[] = [

    { title: 'Resources', url: '/materials', icon: Folder},

    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar() {

    const { filterNavItems } = useNavigation();

  const filteredMainNavItems = filterNavItems(mainNavItems);
  const filteredFooterNavItems = filterNavItems(footerNavItems);

    return (
        <Sidebar collapsible="icon" variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={filteredMainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={filteredFooterNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
