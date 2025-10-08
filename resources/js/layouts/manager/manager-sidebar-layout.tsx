import { AppShell } from '@/components/app-shell';
import ManagerSidebar from '@/components/manager-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { BreadcrumbItem } from '@/types';
import type { PropsWithChildren } from 'react';
import { AppContent } from '@/components/app-content';
import { ManagerSidebarHeader } from '@/components/manager-sidebar-header';

export default function ManagerSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <SidebarProvider>
                <ManagerSidebar />
                <AppContent variant="sidebar" className="overflow-x-hidden">
                    <ManagerSidebarHeader breadcrumbs={breadcrumbs} />
                    {children}
                </AppContent>
            </SidebarProvider>
        </AppShell>
    );
}
