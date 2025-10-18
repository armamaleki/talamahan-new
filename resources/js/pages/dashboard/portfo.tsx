import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CandlestickSeries, createChart } from 'lightweight-charts';
import { useEffect, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Portfo', href: '#' },
];

export default function Portfo() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);

    const fakeData = [
        { time: '2025-10-06', open: 100, high: 110, low: 95, close: 105 },
        { time: '2025-10-07', open: 105, high: 115, low: 100, close: 110 },
        { time: '2025-10-08', open: 110, high: 120, low: 108, close: 115 },
        { time: '2025-10-09', open: 115, high: 118, low: 112, close: 114 },
        { time: '2025-10-10', open: 114, high: 125, low: 113, close: 122 },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        // create chart with proper crosshair mode

        const chart = createChart(containerRef.current, {
            width: containerRef.current.clientWidth,
            height: 420,
            layout: { backgroundColor: '#ffffff', textColor: '#333' },
            grid: {
                vertLines: { visible: false },
                horzLines: { color: '#eee' },
            },
            timeScale: { timeVisible: true, secondsVisible: false },
        });

        const candleSeries = chart.addSeries(CandlestickSeries);

        candleSeries.setData(fakeData);

        chartRef.current = chart;
        seriesRef.current = candleSeries;

        const ro = new ResizeObserver(() => {
            chart.applyOptions({ width: containerRef.current!.clientWidth });
        });
        ro.observe(containerRef.current);

        return () => {
            ro.disconnect();
            chart.remove();
            chartRef.current = null;
            seriesRef.current = null;
        };
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <h3 className="mb-3 text-lg font-medium">نمونه چارت (دیتا فیک)</h3>
            <Card className={'bg-gray-800'}>
                <CardContent>
                    <div
                        className={`grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-6`}
                    >
                        <div className="col-span-1 lg:col-span-2">
                            <div className={`p-2 text-center`}>
                                <p>قبل از انجام معامله باید پورتفو بسازید</p>
                                <button>ساخت پورتفو </button>
                            </div>
                            <div className={`grid grid-cols-6 gap-2`}>
                                <div
                                    className={`col-span-2 rounded-md border border-gray-600`}>
                                    <div className="text-center text-red-500 h-50 overflow-auto">
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
                                    <div className="w-full flex justify-center items-center p-2 bg-fuchsia-400">
                                        <p>۴۷٬۹۴۳</p>
                                        <p>:مظنه</p>
                                    </div>
                                    <div className="text-center text-green-500 h-50 overflow-auto">
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
                                    className={`col-span-4 rounded-md border border-gray-600 p-2`}>
                                    <Tabs defaultValue="account" className="w-[400px]">
                                        <TabsList>
                                            <TabsTrigger value="account">اوردر</TabsTrigger>
                                            <TabsTrigger value="password">لفظ</TabsTrigger>
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
                                <Tabs defaultValue="account" className="w-[400px]">
                                    <TabsList>
                                        <TabsTrigger value="account">لفط های من</TabsTrigger>
                                        <TabsTrigger value="password">معاملات باز</TabsTrigger>
                                        <TabsTrigger value="order">معاملات بسته شده</TabsTrigger>
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
                            <div
                                ref={containerRef}
                                style={{ width: '100%', height: 420 }}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
            کم ترین عدد پورتفو 2300
            بیشترین عدد پورتفو 23 ملیون


        </AppLayout>
    );
}
