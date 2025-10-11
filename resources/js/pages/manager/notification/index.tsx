import ManagerLayout from '@/layouts/manager-layout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Plus } from 'lucide-react';
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
export default function NotificationLists() {

    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="Role list" />
            <Card>
                <CardHeader>
                    <Button
                        className={'w-fit'}
                        size={'lg'} asChild>
                        <Link
                            href={notification.create()}>
                            <Plus />
                            Create a new notification
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>notification list</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>name</TableHead>
                                <TableHead>created</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/*{roleList.data.length > 0 ? (*/}
                            {/*    roleList.data.map((roleItem, index) => (*/}
                            {/*        <TableRow key={index}>*/}
                            {/*            <TableCell>{index + 1}</TableCell>*/}
                            {/*            <TableCell>{roleItem?.name}</TableCell>*/}
                            {/*            <TableCell>{roleItem?.created}</TableCell>*/}
                            {/*            <TableCell>*/}
                            {/*                <Button size={'lg'} asChild>*/}
                            {/*                    <Link href={role.show(roleItem.id)}>*/}
                            {/*                        <Eye className={'size-6'}/>*/}
                            {/*                    </Link>*/}
                            {/*                </Button>*/}
                            {/*            </TableCell>*/}
                            {/*        </TableRow>*/}
                            {/*    ))*/}
                            {/*) : (*/}
                            {/*    <TableRow>*/}
                            {/*        <TableCell*/}
                            {/*            colSpan={5}*/}
                            {/*            className="py-4 text-center"*/}
                            {/*        >*/}
                            {/*            Null*/}
                            {/*        </TableCell>*/}
                            {/*    </TableRow>*/}
                            {/*)}*/}

                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </ManagerLayout>
    );
}
