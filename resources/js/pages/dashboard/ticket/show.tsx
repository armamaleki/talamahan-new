import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

interface TicketData {
    id: number;
    title: string;
    status: string;
    created: string;
}

interface TicketPageProps {
    ticket: {
        data: TicketData;
    };
}
const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tickets', href: '/dashboard/tickets' },
    { title: 'Show', href: '#' },
];
export default function TicketPage({ ticket }: TicketPageProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={ticket?.data?.title ?? 'Ticket'} />
            <Card>
                <CardHeader>
                    <CardTitle>{ticket?.data?.title}</CardTitle>
                    <CardDescription>{ticket?.data?.status}</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Created at: {ticket?.data?.created}</p>
                </CardContent>
                <CardFooter>
                    <p>ID: {ticket?.data?.id}</p>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
