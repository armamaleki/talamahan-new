import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';
import ManagerSidebarLayout from '@/layouts/manager/manager-sidebar-layout';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}
export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => (
    <ManagerSidebarLayout breadcrumbs={breadcrumbs} {...props}>
        {children}
    </ManagerSidebarLayout>
);
