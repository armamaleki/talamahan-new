import { useEffect, useState } from 'react';
import { useEchoPresence } from '@laravel/echo-react';

type PurchaseItem = {
    id?: string | number;
    fee?: number;
    [key: string]: unknown;
};

export default function PurchaseTransaction({
    purchasesItems = [],
}: {
    purchasesItems?: PurchaseItem[];
}) {
    const [orders, setOrders] = useState<PurchaseItem[]>(purchasesItems);
    const { channel, stopListening, leaveChannel } = useEchoPresence(
        'gold-trade-lobby',
        'GoldTradeLobby',
    );
    useEffect(() => {
        setOrders(purchasesItems);
    }, [purchasesItems]);

    useEffect(() => {
        const ch = channel();
        if (!ch) return;
        ch.listenForWhisper('purchase', (payload) => {
            setOrders((prev) => {
                if (!payload) return prev;
                return [
                    {
                        id: payload.payload.id,
                        fee: payload.payload.fee,
                    },
                    ...prev,
                ];
            });
        });
        ch.listen('.trade.deleted', (event)=>{
            setOrders((prev) => prev.filter((item) => item.id != event.tradeId));
        });
        return () => {
            ch.stopListeningForWhisper?.('purchase');
            ch.stopListening('.trade.deleted');
            stopListening();
            leaveChannel();
        };
    }, [channel, stopListening, leaveChannel]);

    return (
        <div className="flex h-50 flex-col-reverse overflow-hidden text-center text-red-500">
            {orders.length ? (
                orders.map((item, i) => <p key={item?.id}>{item?.fee}--{item?.id}</p>)
            ) : (
                <p>معامله‌ای نیست</p>
            )}
        </div>
    );
}
