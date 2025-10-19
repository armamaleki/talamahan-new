import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEchoPresence } from '@laravel/echo-react';
import TradingViewChart from '@/components/trading-view-chart';
import CreatePortfolio from '@/components/create-portfolio';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Index', href: '#' },
];

export default function TradePage({ pricesList , AmountOfMoneyInTheWallet }) {
    const [users, setUsers] = useState([]);
    const [onlineUsers, setOnlineUsers] = useState(0);
    const { channel, listen, stopListening, leaveChannel } = useEchoPresence(
        'gold-trade-lobby',
        'GoldTradeLobby',
    );
    useEffect(() => {
        const ch = channel();

        if (!ch) return;

        ch.here((members) => {
            console.log('اعضای فعلی:', members);
            // setUsers(members);
            setOnlineUsers(members.length);
        });

        ch.joining((user) => {
            // console.log("کاربر جدید:", user);
            setUsers((prev) => [...prev, user]);

            setOnlineUsers((prev) => prev + 1);
        });

        ch.leaving((user) => {
            // console.log("کاربر خارج شد:", user);
            setUsers((prev) => prev.filter((u) => u.id !== user.id));

            setOnlineUsers((prev) => Math.max(prev - 1, 0));
        });
        listen();

        return () => {
            stopListening();
            leaveChannel();
        };
    }, []);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Trade" />
            <div className="mb-3 flex items-start gap-2 text-lg font-medium">
                <span className="relative flex size-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
                </span>
                <span className={`text-2xl`}>Online users {onlineUsers}</span>
            </div>
            <ul>
                {users.map((u) => (
                    <li key={u.id}>{u.name}</li>
                ))}
            </ul>
            <Card className={'bg-gray-800'}>
                <CardContent>
                    <div
                        className={`grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-6`}
                    >
                        <div className="col-span-1 lg:col-span-2 space-y-1" >
                            <CreatePortfolio ammount={AmountOfMoneyInTheWallet} />
                            <div className={`grid grid-cols-6 gap-2`}>
                                <div
                                    className={`col-span-2 rounded-md border border-gray-600`}
                                >
                                    <div className="h-50 overflow-auto text-center text-red-500">
                                        <p>۴۷٬۹۲۹ - ۱</p>
                                        <p>۴۷٬۹۳۵ - ۲</p>
                                        <p>۴۷٬۹۴۱ - ۱</p>
                                        <p>۴۷٬۹۴۵ - ۲</p>
                                        <p>۴۷٬۹۵۰ - ۱</p>
                                        <p>۴۷٬۹۵۳ - ۲</p>
                                        <p>۴۷٬۹۶۰ - ۱</p>
                                        <p>۴۷٬۹۸۵ - ۱</p>
                                        <p>۴۷٬۹۹۷ - ۱</p>
                                        <p>۴۷٬۹۹۹ - ۱</p>
                                        <p>۴۸٬۰۱۰ - ۲</p>
                                        <p>۴۸٬۰۱۹ - ۱</p>
                                        <p>۴۸٬۰۳۵ - ۱</p>
                                        <p>۴۸٬۰۴۷ - ۱</p>
                                    </div>
                                    <div className="flex w-full items-center justify-center bg-fuchsia-400 p-2">
                                        <p>۴۷٬۹۴۳</p>
                                        <p>:مظنه</p>
                                    </div>
                                    <div className="h-50 overflow-auto text-center text-green-500">
                                        <p>۴۷٬۹۲۹ - ۱</p>
                                        <p>۴۷٬۹۳۵ - ۲</p>
                                        <p>۴۷٬۹۴۱ - ۱</p>
                                        <p>۴۷٬۹۴۵ - ۲</p>
                                        <p>۴۷٬۹۵۰ - ۱</p>
                                        <p>۴۷٬۹۵۳ - ۲</p>
                                        <p>۴۷٬۹۶۰ - ۱</p>
                                        <p>۴۷٬۹۸۵ - ۱</p>
                                        <p>۴۷٬۹۹۷ - ۱</p>
                                        <p>۴۷٬۹۹۹ - ۱</p>
                                        <p>۴۸٬۰۱۰ - ۲</p>
                                        <p>۴۸٬۰۱۹ - ۱</p>
                                        <p>۴۸٬۰۳۵ - ۱</p>
                                        <p>۴۸٬۰۴۷ - ۱</p>
                                    </div>
                                </div>
                                <div
                                    className={`col-span-4 rounded-md border border-gray-600 p-2`}
                                >
                                    <Tabs
                                        defaultValue="account"
                                        className="w-[400px]"
                                    >
                                        <TabsList>
                                            <TabsTrigger value="account">
                                                اوردر
                                            </TabsTrigger>
                                            <TabsTrigger value="password">
                                                لفظ
                                            </TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="account">
                                            Make changes to your account here.
                                        </TabsContent>
                                        <TabsContent value="password">
                                            Change your password here.
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </div>
                            <div>
                                <Tabs
                                    defaultValue="account"
                                    className="w-[400px]"
                                >
                                    <TabsList>
                                        <TabsTrigger value="account">
                                            لفط های من
                                        </TabsTrigger>
                                        <TabsTrigger value="password">
                                            معاملات باز
                                        </TabsTrigger>
                                        <TabsTrigger value="order">
                                            معاملات بسته شده
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="account">
                                        Make changes to your account here.
                                    </TabsContent>
                                    <TabsContent value="password">
                                        Change your password here.
                                    </TabsContent>
                                    <TabsContent value="order">
                                        Change your password here.
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                        <div
                            className={`col-span-1 space-y-2 md:col-span-2 lg:col-span-4`}
                        >
                            <div
                                className={`flex w-full flex-col flex-wrap items-center rounded-md bg-gray-900 shadow shadow-gray-50`}
                            >
                                <div
                                    className={`flex items-center divide-x divide-gray-200 p-2`}
                                >
                                    <div className={`flex items-center p-2`}>
                                        <p>0تومن</p>
                                        <p>انس جهانی</p>
                                    </div>
                                    <div className={`flex items-center p-2`}>
                                        <p>0تومن</p>
                                        <p>انس جهانی</p>
                                    </div>
                                    <div className={`flex items-center p-2`}>
                                        <p>0تومن</p>
                                        <p>انس جهانی</p>
                                    </div>
                                </div>
                            </div>
                            <TradingViewChart pricesList={pricesList} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            کم ترین عدد پورتفو 2300 بیشترین عدد پورتفو 23 ملیون
        </AppLayout>
    );
}
