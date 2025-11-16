import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import order from '@/routes/order';
import { useForm } from '@inertiajs/react';
import { useEchoPresence } from '@laravel/echo-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderContainer(price_limit: object) {
    const { data, setData, post, processing, errors, reset } = useForm({
        amount: '',
        fee: '',
        tp: '',
        sl: '',
        type: '',
    });
    const newErrors: Record<string, string> = {};
    const [localErrors, setLocalErrors] = useState({});
    const [price, setPrice] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setLocalErrors((prev) => ({
            ...prev,
            [name]: '',
        }));
    };
    const handleSubmit = (type) => (e) => {
        e.preventDefault();
        if (!price) return;
        // if (!type) return;@ TODO اعتبار سنجی اینو انجام بده
        setLocalErrors({});
        if (!data.amount) {
            newErrors.amount = 'حجم الزامیه';
        } else if (isNaN(data.amount)) {
            newErrors.amount = 'فقط عدد وارد کنید';
        } else if (Number(data.amount) < 1 || Number(data.amount) > 10) {
            newErrors.amount = 'حجم باید بین 1 تا 10 باشه';
        }

        const maxFee = Number(price_limit) || 10;
        const feeValue = Number(data.fee);

        if (!feeValue) {
            newErrors.fee = 'قیمت الزامیه';
        } else if (isNaN(feeValue)) {
            newErrors.fee = 'فقط عدد وارد کنید';
        } else if (feeValue > maxFee) {
            newErrors.fee = `نباید بیشتراز ${maxFee} باشد`;
        } else if (feeValue <= 0) {
            newErrors.fee = `قیمت باید بزرگتر از ${price} باشه`;
        }

        // if (!data.tp) {
        //     newErrors.tp = 'حد سود الزامیست';
        // } else if (isNaN(data.tp)) {
        //     newErrors.tp = 'فقط عدد وارد کنید';
        // } else {
        //     const tpValue = Number(data.tp);
        //     const maxTP = Number(data.fee) + 90;
        //
        //     if (tpValue > maxTP) {
        //         newErrors.tp = `حد سود نباید بیشتر از ${maxTP} باشد`;
        //     }
        // }
        //
        // if (!data.sl) {
        //     newErrors.sl = 'حد ضرر الزامیست';
        // } else if (isNaN(data.sl)) {
        //     newErrors.sl = 'فقط عدد وارد کنید';
        // } else {
        //     const slValue = Number(data.sl);
        //     const minSL = Number(data.fee) - 90;
        //
        //     if (slValue < minSL) {
        //         newErrors.sl = `حد ضرر نباید کمتر از ${minSL} باشد`;
        //     }
        // }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }
        setData({
            ...data,
            type: type,
        });
        post(order.store(data), {
            preserveScroll: true,
            onSuccess: () => {
                toast.success('پورتفو با موفقیت ساخته شد 🎉');
                reset();
                setLocalErrors({});
            },
            onError: () => {
                toast.error('خطا داری ');
                setLocalErrors(errors);
            },
        });
    };
    const { channel } = useEchoPresence('gold-price-channel');

    useEffect(() => {
        const ch = channel();
        if (!ch) return;

        ch.listen('.gold-price.fake', (data) => {
            setPrice(data.price);
        });
    }, []);
    const [value, setValue] = useState(50); // 50 یعنی وسط = 0
    const mappedValue = ((value - 50) / 50) * 10;
    return (
        <>
            <div
                className={
                    'flex w-full flex-col items-center justify-center gap-3'
                }
            >
                {/* عدد فعلی در وسط */}
                <div className="text-center text-xl font-semibold select-none">
                    {mappedValue.toFixed(1)}
                </div>

                {/* برچسب‌های -10 و +10 در دو انتها */}
                <div className="flex w-[60%] justify-between text-sm text-gray-500">
                    <span>-10</span>
                    <span>0</span>
                    <span>+10</span>
                </div>

                <Slider
                    value={[value]}
                    min={0}
                    max={100}
                    step={1}
                    onValueChange={(v) => setValue(v[0])}
                    className="w-[60%]"
                />
            </div>

            {/*@TODO ورودی داشته باشه رنج باشه وسط باشه تیک داشته باشه که وقتی فعال شد
            ورودی ها عوض بشن بشن عدد واقعی سایت
            غیر فعال بود عدد 1 و1 1 باشه

            */}
            <ToastContainer />
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
                        <p>{price.toLocaleString('fa-IR')}</p>
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
                                <div className={'space-y-4'}>
                                    <Input
                                        name="amount"
                                        type="text"
                                        placeholder="max:10"
                                        value={data.amount}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={
                                            errors.amount || localErrors.amount
                                        }
                                    />
                                    <Input
                                        name="fee"
                                        type="text"
                                        placeholder={`max: ${price_limit.price_limit}`}
                                        value={data.fee}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.fee || localErrors.fee}
                                    />
                                    <Input
                                        name="tp"
                                        type="text"
                                        placeholder="Profit limit"
                                        value={data.tp}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.tp || localErrors.tp}
                                    />
                                    <Input
                                        name="sl"
                                        type="text"
                                        placeholder="Limit of loss"
                                        value={data.sl}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.sl || localErrors.sl}
                                    />
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
                                </div>
                            </Card>
                        </TabsContent>
                        <TabsContent value="password">
                            Change your password here.
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
}
