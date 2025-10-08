import { Head } from '@inertiajs/react';
import ManagerLayout from '@/layouts/manager-layout';
const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/user' },
    { title: 'Show', href: '#' },
];
export default function () {
    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="Users list" />
        </ManagerLayout>
    );
}
