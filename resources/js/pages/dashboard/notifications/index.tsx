import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Notifications',
        href: '#',
    },
];

interface Notification{
    id:number;
    title:string;
    message:string;
}
interface NotificationPageProps {
    notificationsList: {
        data: Notification[];
    };
}
export default function ({ notificationsList }: NotificationPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card>
                <CardContent className={`space-y-4`}>
                {notificationsList.data.length > 0 ? (
                    notificationsList.data.map((notic, index) => (
                        <Alert
                            key={index}
                            variant="default">
                            <Terminal />
                            <AlertTitle>{notic.title}</AlertTitle>
                            <AlertDescription>
                                {notic.message}
                            </AlertDescription>
                        </Alert>
                    ))
                ) : (
                    <>Null</>
                )}
                </CardContent>
                حتما باید رنگ نوتیف و ایکونش رو هم مشخص کنی

            </Card>
        </AppLayout>
    );
}
