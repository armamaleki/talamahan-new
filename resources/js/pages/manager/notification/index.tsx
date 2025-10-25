import ManagerLayout from '@/layouts/manager-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import notification from '@/routes/manager/notification';

const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/user' },
    { title: 'Create', href: '' },
];
interface NotificationItems {
    id:string;
    user:string;
    title:string;
    type:string;
    is_read:string;
    sent_at:string;
    created:string;
    data:string;
}
interface NotificationPageProps {
    notificationsList: {
        data: NotificationItems[];
    };
}
export default function NotificationLists({
    notificationsList,
}: NotificationPageProps) {
    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="Role list" />
            <Card>
                <CardHeader>
                    <Button className={'w-fit'} size={'lg'} asChild>
                        <Link href={notification.create()}>
                            <Plus />
                            Create a new notification
                        </Link>
                    </Button>
                    <Button className={'w-fit'} size={'lg'} asChild>
                        <Link href={notification.liveNotification()}>
                            <Plus />
                            Create a new live notification
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>notification list</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>user</TableHead>
                                <TableHead>title</TableHead>
                                <TableHead>type</TableHead>
                                <TableHead>is_read</TableHead>
                                <TableHead>sent_at</TableHead>
                                <TableHead>created</TableHead>
                                <TableHead>data</TableHead>
                                <TableHead>action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notificationsList.data.length > 0 ? (
                                notificationsList.data.map((noticItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{noticItem?.user}</TableCell>
                                        <TableCell>{noticItem?.title}</TableCell>
                                        <TableCell>{noticItem?.type}</TableCell>
                                        <TableCell>{noticItem?.is_read}</TableCell>
                                        <TableCell>{noticItem?.sent_at}</TableCell>
                                        <TableCell>{noticItem?.created}</TableCell>
                                        <TableCell>{noticItem?.data}</TableCell>
                                        <TableCell>
                                            {/*<Button size={'lg'} asChild>*/}
                                            {/*    <Link href={role.show(roleItem.id)}>*/}
                                            {/*        <Eye className={'size-6'}/>*/}
                                            {/*    </Link>*/}
                                            {/*</Button>*/}
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
            </Card>
        </ManagerLayout>
    );
}
