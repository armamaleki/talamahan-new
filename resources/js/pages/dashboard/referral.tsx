import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

export default function ({ ref }) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Referral',
            href: '#',
        },
    ];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <Card>
                <CardHeader>کد رفرال کد</CardHeader>
                <CardContent>
                    <div
                        className={`grid grid-cols-1 justify-items-center gap-4 border border-dashed p-4 md:grid-cols-2`}
                    >
                        <div className={'flex flex-col items-center'}>
                            <p>YourReferral</p>0
                        </div>
                        <div className={'flex flex-col items-center'}>
                            <p>Total Earning</p>$ 0.00
                        </div>
                    </div>
                </CardContent>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className={`col-span-1 `}>01</div>
                        <div className={`col-span-1 md:col-span-3 `}>01</div>

                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
