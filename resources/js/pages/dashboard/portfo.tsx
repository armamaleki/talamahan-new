import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import { createChart, CandlestickSeries } from 'lightweight-charts';

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
            grid: { vertLines: { visible: false }, horzLines: { color: '#eee' } },
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
            <div ref={containerRef} style={{ width: '100%', height: 420 }} />
        </AppLayout>
    );
}
