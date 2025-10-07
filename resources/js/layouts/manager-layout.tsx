import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';
import ManagerSidebarLayout from '@/layouts/manager/manager-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
export default function ManagerLayout({
    children,
}: AppLayoutProps) {
    return (
        <ManagerSidebarLayout >
            {children}
        </ManagerSidebarLayout>
    );
}
