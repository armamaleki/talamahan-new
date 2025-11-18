import { useEchoPresence } from '@laravel/echo-react';
import { useEffect } from 'react';

export default function OrderItems({realPrice}:any) {
    const { channel } = useEchoPresence('trades.buy');
    const buyChannel = useEchoPresence('trades.buy');

    // const { channelSell } = useEchoPresence('trades.sell');

    useEffect(() => {
        if (!buyChannel) return;
        const handler = (data: any) => console.log(data);
        buyChannel.listen('.trade.created', handler);
        return () => buyChannel.stopListening('.trade.created', handler);
    }, [buyChannel]);


    // useEffect(() => {
    //     const ch = channelSell();
    //     if (!ch) return;
    //
    //     ch.listen('.trade.created', (data) => {
    //         console.log(data);
    //
    //     });
    // }, []);



    return (
        <div className={`col-span-2 rounded-md border border-gray-600`}>
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
                <p>{realPrice.toLocaleString('fa-IR')}</p>
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
    );
}
