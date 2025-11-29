import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

export default function PurchaseTransaction({purchasesItems}) {
    const [data ,setData] = useState()
    const { channel } = useEcho('trade-purchase');
    useEffect(() => {
        const ch = channel();
        if (!ch) return;
        ch.listen('.trade-purchase-create', (payload) => {
            console.log('dsdsdsd');
            setData(payload)
        });
    }, []);
    return (
        <div className="h-50 flex flex-col-reverse overflow-hidden text-center text-red-500">
            <p>{data?.order}</p>
        </div>
    );
}
