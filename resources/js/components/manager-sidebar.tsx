import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';
import { Link } from '@inertiajs/react';
import AppLogo from '@/components/app-logo';
import manager from '@/routes/manager';
import { NavMain } from '@/components/nav-main';
import type { NavItem } from '@/types';
import { Users, ShieldQuestion } from 'lucide-react';

import user from '@/routes/manager/user';
import role from '@/routes/manager/role';
const mainNavItems: NavItem[] = [
    {
        title: 'Users',
        href: user.index(),
        icon: Users,
    },
    {
        title: 'Role',
        href: role.index(),
        icon: ShieldQuestion,
    },

];


export default function ManagerSidebar() {
    return (
        <Sidebar collapsible="icon" variant={'floating'}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={manager.index()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarGroupLabel>Users</SidebarGroupLabel>
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
