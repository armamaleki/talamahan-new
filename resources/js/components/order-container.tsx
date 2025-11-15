import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import { useState } from 'react';

export default function OrderContainer() {
    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        fee: '',
        tp: '',
        sl: '',
        type: '',
    });
    const newErrors: Record<string, string> = {};
    const [localErrors, setLocalErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        switch (name) {
            case 'amount':
                if (!value || isNaN(value)) {
                    newErrors.amount = 'مقدار باید عدد باشد';
                } else if (value < 1 || value > 12) {
                    newErrors.amount = 'مقدار باید بین ۱ تا ۱۲ باشد';
                } else {
                    delete newErrors.amount;
                    // @ts-ignore
                    setData((prev) => ({
                        ...prev,
                        amount: value,
                        fee: 2300,
                        tp: 23000,
                        sl: 23000,
                    }));
                }
                break;

            case 'fee':
                if (!value) {
                    newErrors.fee = 'قیمت الزامی است';
                } else if (isNaN(value)) {
                    newErrors.fee = 'قیمت باید عدد باشد';
                } else {
                    delete newErrors.fee;
                    // @ts-ignore
                    setData((prev) => ({
                        ...prev,
                        amount: 1,
                        fee: value,
                        tp: 23000,
                        sl: 23000,
                    }));
                }

                break;

            case 'tp':
                if (value && value <= 0) {
                    newErrors.tp = 'حد سود باید بیشتر از صفر باشد';
                } else {
                    delete newErrors.tp;
                    // @ts-ignore
                    setData((prev) => ({
                        ...prev,
                        amount: 1,
                        fee: 2300,
                        tp: value,
                        sl: 23000,
                    }));
                }
                break;

            case 'sl':
                if (value && value <= 0) {
                    newErrors.sl = 'حد ضرر باید بیشتر از صفر باشد';
                } else {
                    delete newErrors.sl;
                    // @ts-ignore
                    setData((prev) => ({
                        ...prev,
                        amount: 1,
                        fee: 2300,
                        tp: 23000,
                        sl: value,
                    }));
                }
                break;

            default:
                setData(name, value);
                break;
        }

        Object.assign(errors, newErrors);
    };


    const handleSubmit = (type) => (e) => {
        e.preventDefault();
        setLocalErrors({});
        if (!data.amount) {
            newErrors.amount = 'مبلغ الزامیه';
        }
        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        setData({
            ...data,
            type: type, // مثلاً 'buy' یا 'sell'
        });
        console.log('ddd');

        // post(route('orders.store'), {
        //     onSuccess: () => {
                // reset(); // تابع از useForm برای ریست کردن فیلدها
            // },
            // onError: (errors) => {

                // setErrors(errors);
            // },
        // });
    };
    return (
        <div className={`grid grid-cols-6 gap-2`}>
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
                    <p>۴۷٬۹۴۳</p>
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
            <div
                className={`col-span-4 w-full rounded-md border border-gray-600 p-2`}
            >
                <Tabs defaultValue="order" className="">
                    <TabsList>
                        <TabsTrigger value="order">اوردر</TabsTrigger>
                        <TabsTrigger value="password">لفظ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="order">
                        <Card className={'space-y-4 p-2'}>
                            <form className={'space-y-4'}>
                                <Input
                                    name="amount"
                                    type="number"
                                    placeholder="حجم {واحد از 1 تا 10 واحد}"
                                    value={data.amount}
                                    onChange={handleChange}
                                />
                                <InputError message={errors.amount || localErrors.amount} />
                                <Input
                                    name="fee"
                                    type="text"
                                    placeholder="قیمت فروش یا خرید "
                                    value={data.fee}
                                    onChange={handleChange}
                                />
                                <InputError message={errors.fee} />
                                <Input
                                    name="tp"
                                    type="number"
                                    placeholder="حد سود"
                                    value={data.tp}
                                    onChange={handleChange} />
                                <InputError message={errors.tp} />
                                <Input
                                    name="sl"
                                    type="number"
                                    placeholder="حد ضرر"
                                    value={data.sl}
                                    onChange={handleChange}
                                />
                                <InputError message={errors.sl} />
                                <ButtonGroup>
                                    <Button
                                        onClick={handleSubmit('buy')}
                                        disabled={processing}
                                        className={'w-full bg-green-500'}
                                        type={'submit'}
                                    >
                                        خرید
                                    </Button>
                                    <Button
                                        className={'bg-red-500'}
                                        onClick={handleSubmit('sell')}
                                        disabled={processing}
                                        type={'submit'}
                                    >
                                        فروش
                                    </Button>
                                </ButtonGroup>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
