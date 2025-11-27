import { useEcho } from "@laravel/echo-react";
import { useEffect, useRef, useState } from "react";

export default function SalesTransaction({ sellersItems }) {
    const [data, setData] = useState(null);
    const listRef = useRef(null);

    const { channel } = useEcho("trades.purchase", "OrderCreateBuy");

    useEffect(() => {
        const ch = channel();
        if (!ch) return;
        ch.listen(".order.create.buy", (payload) => {
            setData(payload.trade.start); // اگر می‌خواهی sellersItems را هم بروز کنی، اینجا اضافه کن
        });
    }, [channel]);

    useEffect(() => {
        if (!listRef.current) return;
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [sellersItems]);

    return (
        <div
            ref={listRef}
            className="h-50 overflow-hidden text-center text-red-500"
        >
            {sellersItems.map((item, index) => (
                <p key={item.id ?? index}>{item.start}</p>
            ))}
        </div>
    );
}
