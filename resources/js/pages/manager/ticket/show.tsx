import ManagerSidebarLayout from '@/layouts/manager/manager-sidebar-layout';
const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/user' },
    { title: 'Show ticket', href: '#' },
];

interface TicketItem {
    id: number;
    title: string;
    status: string;
    priority: string;
    email: string;
    created: string;
    body: string;
}

interface TicketPageProps {
    data: TicketItem;
}

export default function ShowTicket({ ticketItem }: TicketPageProps) {
    return (
        <ManagerSidebarLayout breadcrumbs={breadcrumbs}>
            {ticketItem.data.title}
            <br />
            {ticketItem.data.body}
        </ManagerSidebarLayout>
    );
}
