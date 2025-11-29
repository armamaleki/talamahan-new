import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

export default function SalesTransaction({ sellersItems }) {
    const [data, setData] = useState(null);
    const { channel } = useEcho('trade-sale', 'OrderCreateSale');
    useEffect(() => {
        const ch = channel();
        if (!ch) return;
        ch.listen('.trade-sale-create', (payload) => {
            setData(47000 - 10);
        });
    }, [channel]);
    return (
        <div className="h-50 overflow-hidden text-center text-green-500">
            {sellersItems.map((item, index) => (
                <p key={item.id ?? index}>{item.start}</p>
            ))}
        </div>
    );
}
