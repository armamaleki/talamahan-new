import { useEffect, useRef } from 'react';
import { CandlestickSeries, createChart } from 'lightweight-charts';
import { useEcho } from "@laravel/echo-react";


export default function TradingViewChart() {
    // console.log(pricesList.data.prices);
    useEcho(
        `chart-price-channel`,
        "ChartPrice",
        (price) => {
            console.log(price);
        },
    );
    const containerRef = useRef<HTMLDivElement | null>(null);
    const chartRef = useRef<any>(null);
    const seriesRef = useRef<any>(null);

    const fakeData = [
        { time: '2025-10-06', open: 100, high: 110, low: 95, close: 105 },
        { time: '2025-10-07', open: 105, high: 115, low: 100, close: 110 },
        { time: '2025-10-08', open: 110, high: 120, low: 108, close: 115 },
        { time: '2025-10-09', open: 115, high: 118, low: 112, close: 114 },
        { time: '2025-10-10', open: 114, high: 125, low: 113, close: 122 },
        { time: '2025-10-11', open: 114, high: 125, low: 113, close: 122 },
        { time: '2025-10-12', open: 114, high: 125, low: 113, close: 122 },
    ];

    useEffect(() => {
        if (!containerRef.current) return;

        const chart = createChart(containerRef.current, {
            width: containerRef.current.clientWidth,
            height: 800,
            // layout: { backgroundColor: '#ffffff', textColor: '#333', fontSize: 12 },
            grid: { vertLines: { visible: false }, horzLines: { color: '#eee' } },
            timeScale: { timeVisible: true, secondsVisible: false },
            crosshair: {
                mode: 1,
                vertLine: { color: '#000', width: 1, style: 1 },
                horzLine: { color: '#000', width: 1, style: 1 },
            },
            rightPriceScale: { borderColor: '#ccc', scaleMargins: { top: 0.1, bottom: 0.1 } },
            leftPriceScale: { visible: false },
        });
        chart.timeScale().fitContent();

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
    return(
        <div
            ref={containerRef}
        />
    );
}
