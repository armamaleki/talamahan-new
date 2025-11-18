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
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from '@/components/ui/label';
import OrderItems from '@/components/order-items';


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
    const [realMoney , setRealMoney] = useState(false)
    const maxFee = Number(price_limit.price_limit) || 10;
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

    const handleSubmit = (orderType: 'buy' | 'sell') => (e: React.FormEvent) => {
        e.preventDefault();
        if (!price) return;
        setLocalErrors({});
        if (!data.amount) {
            newErrors.amount = 'حجم الزامیه';
        } else if (isNaN(data.amount)) {
            newErrors.amount = 'فقط عدد وارد کنید';
        } else if (Number(data.amount) < 1 || Number(data.amount) > 10) {
            newErrors.amount = 'حجم باید بین 1 تا 10 باشه';
        }

        let computedMaxFee = maxFee;
        let computedMinFee = -maxFee;
        if (realMoney) {
            computedMaxFee = maxFee + price;
        }
        if (realMoney) {
            computedMinFee = price-maxFee ;
        }
        if (!data.fee) {
            newErrors.fee = 'قیمت الزامیه';
        } else if (isNaN(data.fee)) {
            newErrors.fee = 'فقط عدد وارد کنید';
        } else if (Number(data.fee) > computedMaxFee) {
            newErrors.fee = `نباید بیشتر از ${computedMaxFee} باشد`;
        }else if (Number(data.fee) < computedMinFee) {
            newErrors.fee = `نباید کم تر از ${computedMinFee} باشد`;
        }


        if (isNaN(data.tp)) {
            newErrors.tp = 'فقط عدد وارد کنید';
        }
        else if (isNaN(data.sl)) {
            newErrors.sl = 'فقط عدد وارد کنید';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }
        setData({
            ...data,
            type: orderType,
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
    return (
        <>
            <ToastContainer />
            <div className={`grid grid-cols-6 gap-2`}>
                <OrderItems realPrice={price}/>
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
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={realMoney}
                                        onCheckedChange={(value) => setRealMoney(value)}
                                        id="money" />
                                    <Label htmlFor="money">در صورت فعال بودن باید قیمت واقعی بزاری </Label>
                                </div>
                                <Slider
                                    value={[10]}
                                    min={-maxFee}
                                    max={maxFee}
                                    step={1}
                                    onValueChange={()=>{}}
                                />
                                <div className={'space-y-4'}>
                                    <Input
                                        name="amount"
                                        type="text"
                                        placeholder={'max:12'}
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
                                        placeholder={`for example ${realMoney ? '20450' : '10'} max: ${price_limit.price_limit}`}
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
