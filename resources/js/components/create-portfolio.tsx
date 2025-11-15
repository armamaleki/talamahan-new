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

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import portfolios from '@/routes/portfolios';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function CreatePortfolio({ walletBalance }) {
    const [result, setResult] = useState(''); // تعداد یونیت‌ها
    const [localErrors, setLocalErrors] = useState({}); // ارورهای سمت کلاینت
    const [open, setOpen] = useState(false);
    const newErrors: Record<string, string> = {};

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
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
        if (!data.amount) newErrors.amount = 'مبلغ الزامیه';
        else if (data.amount < 2300000)
            newErrors.amount = 'کمتر از ۲٬۳۰۰٬۰۰۰ نمیتونی انتخاب کنی';
        else if (data.amount > 23000000)
            newErrors.amount = 'بیشتر از ۲۳٬۰۰۰٬۰۰۰ نمیتونی انتخاب کنی';
        if (walletBalance < data.amount) newErrors.amount = 'موجودی کیف پولت کافی نیست';

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }
        post(portfolios.store(data) , {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('پورتفو با موفقیت ساخته شد 🎉');
                reset();
                setResult('');
                setLocalErrors({});
                setOpen(false);
            },
            onError: (errors) => {
                if (errors.balance) toast.error(errors.balance);
                if (errors.portfolio) toast.error(errors.portfolio);
                if (errors.wallet) toast.error(errors.wallet);
                setLocalErrors(errors);
            },
        });
    };

    return (
        <div className="space-y-2 rounded-md border border-gray-600 p-2 text-center">
            <ToastContainer />
            <p>قبل از انجام معامله باید پورتفو بسازید</p>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        className="w-full"
                        onClick={() => setOpen(true)} >
                        ساخت پورتفو
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>بازکردن پورتفو</AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            برای ساخت پورتفو اینارو پرکنید
                        </AlertDialogDescription>

                        <form className="space-y-2" onSubmit={handleSubmit}>
                            یونیت 100
                            <br/>
                            نوع پورتفو crose
                            <br/>
                            <br/>
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
                                variant={'success'}
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
                        <AlertDialogCancel onClick={() => setOpen(false)} >Cancel</AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
