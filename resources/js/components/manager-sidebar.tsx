import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
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
import { Users } from 'lucide-react';
import user from '@/routes/manager/user';
const mainNavItems: NavItem[] = [
    {
        title: 'Users',
        href: user.index(),
        icon: Users,
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
