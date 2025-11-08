import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, privacyPolicy, referral, trade, training } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    BookOpen,
    Folder,
    LayoutGrid,
    Mail,
    ShieldCheck,
    GraduationCap,
    BellElectric,
    ChartCandlestick,
    Wallet,
    UsersRound,
} from 'lucide-react';
import AppLogo from './app-logo';
import tickets from '@/routes/tickets';
import notifications from '@/routes/notifications';
import wallets from '@/routes/wallets';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import i18n from 'i18next';


export function AppSidebar() {
    const { t } = useTranslation()


    const mainNavItems: NavItem[] = [
        {
            title: t('Dashboard'),
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: t('Ticket'),
            href: tickets.index(),
            icon: Mail,
        },
        {
            title: t('Privacy policy'),
            href: privacyPolicy(),
            icon: ShieldCheck,
        },
        {
            title: t('Training'),
            href: training(),
            icon: GraduationCap,
        },
        {
            title: t('Notifications'),
            href: notifications.index(),
            icon: BellElectric,
        },
        {
            title: t('Wallet'),
            href: wallets.index(),
            icon: Wallet,
        },
        {
            title: t('Referral'),
            href: referral(),
            icon: UsersRound,
        },
        {
            title: t('Trade'),
            href: trade(),
            icon: ChartCandlestick,
        },
    ];

    const footerNavItems: NavItem[] = [
        {
            title: t('Repository'),
            href: '#',
            icon: Folder,
        },
        {
            title: t('Documentation'),
            href: '#',
            icon: BookOpen,
        },
    ];
    const [side , setSide]=useState('left')
    useEffect(() => {
        const lang = i18n.language;
        if (lang === 'ar') {
            document.documentElement.dir = 'rtl';
            setSide('right');
        } else {
            document.documentElement.dir = 'ltr';
            setSide('left');
        }
    }, [i18n.language]);
    return (
        <Sidebar side={side} collapsible="icon" variant="floating">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
