import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
} from '@/components/ui/sidebar';
import { NavUser } from '@/components/nav-user';

export default function ManagerSidebar() {
    return (
        <Sidebar  collapsible="icon" variant={'floating'}>

            <SidebarMenu>
                <SidebarHeader>

                    <SidebarMenu>

                    </SidebarMenu>

                </SidebarHeader>

                <SidebarContent>

                </SidebarContent>

                <SidebarFooter>
                    <NavUser />
                </SidebarFooter>
            </SidebarMenu>
        </Sidebar>
    );
}
