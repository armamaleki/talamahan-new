import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import tickets from '@/routes/tickets';
import { Head, Link } from '@inertiajs/react';
import { Eye, MessageSquarePlus } from 'lucide-react';

interface Ticket {
    id: number;
    title: string;
    status: string;
    created: string;
    priority: string;
}

interface TicketsPageProps {
    ticketsList: {
        data: Ticket[];
        current_page: number;
        last_page: number;
        next_page_url?: string;
        prev_page_url?: string;
    };
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Tickets', href: '/dashboard/tickets' },
];

export default function TicketsPage({ ticketsList }: TicketsPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tickets" />
            <Card>
                <CardHeader>
                    <Button
                        className={'w-fit'}
                        size={'lg'} asChild>
                        <Link
                            href={tickets.create()}>
                            <MessageSquarePlus />
                            Create a new ticket
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>لیست تیکت‌های شما</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created at</TableHead>
                                <TableHead>priority</TableHead>
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {ticketsList.data.length > 0 ? (
                                ticketsList.data.map((ticket, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell className="font-medium">
                                            {ticket.title}
                                        </TableCell>
                                        <TableCell>{ticket.status}</TableCell>
                                        <TableCell>{ticket.created}</TableCell>
                                        <TableCell>{ticket.priority}</TableCell>
                                        <TableCell>
                                            <Button size={'lg'} asChild>
                                                <Link
                                                    href={tickets.show(
                                                        ticket.id,
                                                    )}
                                                >
                                                    <Eye />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-4 text-center"
                                    >
                                        Null
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter>
                    فوتر کارت
                </CardFooter>
            </Card>

            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </AppLayout>
    );
}
