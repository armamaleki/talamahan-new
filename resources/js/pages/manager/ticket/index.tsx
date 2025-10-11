import ManagerLayout from '@/layouts/manager-layout';
import { Head, Link } from '@inertiajs/react';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import ticket from '@/routes/manager/ticket';

const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Ticket', href: '/manager/user' },
];

interface Tickets {
    id: number;
    title: string;
    status: string;
    priority: string;
    email: string;
    created: string;
}
interface TicketPageProps {
    ticketsList: {
        data: Tickets[];
    };
}
export default function TicketList({ ticketsList }: TicketPageProps) {
    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="Users list" />
            <Card>
                <CardHeader>لیست تیکت های شما</CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Tickets list</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>title</TableHead>
                                <TableHead>status</TableHead>
                                <TableHead>priority</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>created</TableHead>
                                <TableHead>#</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {ticketsList.data.length > 0 ? (
                                ticketsList.data.map((ticketItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>
                                            {ticketItem?.title}
                                        </TableCell>
                                        <TableCell>
                                            {ticketItem?.status}
                                        </TableCell>
                                        <TableCell>
                                            {ticketItem?.priority}
                                        </TableCell>
                                        <TableCell>
                                            {ticketItem.email}
                                        </TableCell>
                                        <TableCell>
                                            {ticketItem.created}
                                        </TableCell>
                                        <TableCell>
                                            <Button size={'lg'} asChild>
                                                <Link
                                                    href={ticket.show(
                                                        ticketItem.id,
                                                    )}
                                                >
                                                    <Eye className={'size-6'} />
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
                <CardFooter>PAGINATE</CardFooter>
            </Card>
        </ManagerLayout>
    );
}
