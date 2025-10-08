import ManagerLayout from '@/layouts/manager-layout';
import { Head, Link} from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
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
import user from '@/routes/manager/user';
const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/user' },
];
interface Users {
    id: number;
    name:string;
    email:string;
    created:string;
}
interface UsersPageProps {
    usersList: {
        data: Users[];
    };
}

export default function App({usersList}: UsersPageProps) {
    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="Users list" />
            <Card>
                <CardHeader>
                    <Button
                        className={'w-fit'}
                        size={'lg'} asChild>
                        <Link
                            href={user.create()}>
                            <Plus />
                            Create a new user
                        </Link>
                    </Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableCaption>Users list</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">#</TableHead>
                                <TableHead>name</TableHead>
                                <TableHead>email</TableHead>
                                <TableHead>created</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {usersList.data.length > 0 ? (
                                usersList.data.map((userItem, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{userItem?.name}</TableCell>
                                        <TableCell>{userItem.email}</TableCell>
                                        <TableCell>{userItem.created}</TableCell>
                                        <TableCell>
                                            <Button size={'lg'} asChild>
                                                <Link href={user.show(userItem.id)}>
                                                    <Eye className={'size-6'}/>
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
                    PAGINATE
                </CardFooter>
            </Card>
        </ManagerLayout>
    );
}
