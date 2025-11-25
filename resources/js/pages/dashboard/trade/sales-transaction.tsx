import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

export default function SalesTransaction() {
    const [data, setDate] = useState();
    const { channel } = useEcho('trades.purchase', 'OrderCreateBuy');
    useEffect(() => {
        const ch = channel();
        if (!ch) return;
        ch.listen('.order.create.buy', (data) => {
            setDate(data.trade.start)
        });
    }, []);

    return (
        <div className="h-50 overflow-hidden text-center text-red-500">
            <p>{data}</p>
        </div>
    );
}
