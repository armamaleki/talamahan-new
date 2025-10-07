import type { PropsWithChildren } from 'react';
import type { BreadcrumbItem } from '@/types';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import ManagerSidebar from '@/components/manager-sidebar';

export default function ManagerSidebarLayout({ children }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <SidebarProvider>
            <div className="flex">
                <ManagerSidebar />
                <SidebarTrigger />
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}
