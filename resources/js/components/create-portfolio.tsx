import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import InputError from '@/components/input-error';
import { useState } from 'react';

export default function CreatePortfolio({ walletBalance }) {
    const [result, setResult] = useState(''); // تعداد یونیت‌ها
    const [localErrors, setLocalErrors] = useState({}); // ارورهای سمت کلاینت
    const newErrors: Record<string, string> = {};

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        type: '',
        unite: '',
    });

    const handlePriceChange = (e) => {
        let value = Number(e.target.value.replace(/[^0-9]/g, ''));
        const maxAmount = 23000000;
        const unitPrice = 2300000;

        if (value > maxAmount) value = maxAmount;

        setData('amount', value);

        let units = Math.floor(value / unitPrice);
        setResult(units);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalErrors({});

        if (!data.type) newErrors.type = 'نوع الزامیه';
        if (!data.unite) newErrors.unite = 'یونیت الزامیه';
        if (!data.amount) newErrors.amount = 'مبلغ الزامیه';
        else if (data.amount < 2300000)
            newErrors.amount = 'کمتر از ۲٬۳۰۰٬۰۰۰ نمیتونی انتخاب کنی';
        else if (data.amount > 23000000)
            newErrors.amount = 'بیشتر از ۲۳٬۰۰۰٬۰۰۰ نمیتونی انتخاب کنی';

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        // post(route('manager.portfolio.store'), { onSuccess: () => reset() })
        console.log('ارسال داده:', data);
    };

    return (
        <div className="space-y-2 rounded-md border border-gray-600 p-2 text-center">
            <p>قبل از انجام معامله باید پورتفو بسازید</p>
            <AlertDialog>
                <AlertDialogTrigger>
                    <p className="rounded-md bg-red-400 p-2">ساخت پورتفو</p>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>بازکردن پورتفو</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            برای ساخت پورتفو اینارو پرکنید
                        </AlertDialogDescription>

                        <form className="space-y-2" onSubmit={handleSubmit}>
                            {/* نوع پورتفو */}
                            <Select
                                value={data.type}
                                onValueChange={(value) =>
                                    setData('type', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Portfo Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="cross">Cross</SelectItem>
                                    <SelectItem value="isolated">
                                        Isolated
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.type || localErrors.type}
                            />

                            {/* تعداد یونیت */}
                            <Select
                                value={data.unite}
                                onValueChange={(value) =>
                                    setData('unite', value)
                                }
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Unite" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError
                                message={errors.unite || localErrors.unite}
                            />

                            {/* مبلغ */}
                            <Input
                                type="text"
                                value={data.amount}
                                inputMode="numeric"
                                pattern="\d*"
                                onChange={handlePriceChange}
                                placeholder="وجه تضمین"
                            />
                            <InputError
                                message={errors.amount || localErrors.amount}
                            />

                            <Button
                                type="submit"
                                className="relative w-full"
                                disabled={processing}
                            >
                                {processing ? 'در حال ذخیره...' : 'ذخیره'}
                            </Button>
                        </form>

                        <p>تعداد واحد: {result}</p>
                        <p>موجودی کیف پول شما {walletBalance} تومان</p>
                    </AlertDialogHeader>

                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
