import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@/types';
import ManagerSidebarLayout from '@/layouts/manager/manager-sidebar-layout';
import { useEffect } from "react";
import { usePage } from "@inertiajs/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs, ...props }: AppLayoutProps) {
    const { props: pageProps } = usePage();

    useEffect(() => {
        if (pageProps.flash?.success) {
            toast.success(pageProps.flash.success, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }

        if (pageProps.flash?.error) {
            toast.error(pageProps.flash.error, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
    }, [pageProps.flash]);

    return (
        <>
            <ToastContainer />
            <ManagerSidebarLayout breadcrumbs={breadcrumbs} {...props}>
                {children}
            </ManagerSidebarLayout>
        </>
    );
}
