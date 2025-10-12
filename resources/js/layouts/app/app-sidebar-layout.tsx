import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';


export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {


    // useEffect(() => {
    //     if (!window.Echo) return;
    //
    //     const channel = window.Echo.channel('test-channel')
    //         .listen('Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', (e) => {
    //             console.log('🔔 نوتیف جدید (تست):', e);
    //         });
    //
    //     // Cleanup هنگام unmount
    //     return () => {
    //         window.Echo.leave('test-channel');
    //     };
    // }, []);

    // return () => {
    //     window.Echo.leave('test-channel');
    // };



    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
