import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PurchaseTransaction from '@/pages/dashboard/trade/purchase-transaction';
import SalesTransaction from '@/pages/dashboard/trade/sales-transaction';
import {
    validateAmount,
    validateFee,
    validateSl,
    validateTp,
} from '@/pages/dashboard/trade/validator';
import order from '@/routes/order';
import { useForm } from '@inertiajs/react';
import { useEchoPresence } from '@laravel/echo-react';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function OrderContainer({
    price_limit,
    purchasesItems,
    sellersItems,
}) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            amount: '',
            fee: '',
            tp: '',
            sl: '',
            type: '',
            realMoney: false,
        });
    const newErrors: Record<string, string> = {};
    const [localErrors, setLocalErrors] = useState({});
    const [price, setPrice] = useState(0);
    const [realMoney, setRealMoney] = useState(false);
    const maxFee = Number(price_limit) || 10;
    const [rangeLimit, setRangeLimit] = useState(0);
    const handleChange = (name: string, value: string) => {
        setData(name, value);
        let error = '';
        if (name === 'amount') error = validateAmount(value);
        if (name === 'fee')
            error = validateFee(value, maxFee, realMoney, price);
        if (name === 'tp') error = validateTp(value);
        if (name === 'sl') error = validateSl(value);
        setLocalErrors((prev) => ({ ...prev, [name]: error }));
    };
    const handleSubmit = (type: 'buy' | 'sell') => (e: React.FormEvent) => {
        e.preventDefault();
        if (!price) return;
        data.type = type;
        data.realMoney = realMoney
        clearErrors();
        setLocalErrors({});
        const errors = {
            amount: validateAmount(data.amount),
            fee: validateFee(data.fee, maxFee, realMoney, price),
            tp: validateTp(data.tp),
            sl: validateSl(data.sl),
        };
        const hasError = Object.values(errors).some((err) => err !== null && err !== '');
        if (hasError) {
            setLocalErrors(errors);
            return;
        }
        post(order.store(), {
            preserveScroll: false,
            onSuccess: () => {
                toast.success('پورتفو با موفقیت ساخته شد 🎉');
                reset();
                setLocalErrors({});
            },
            onError: () => {
                toast.error('خطا داری');
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
                <div className={`col-span-2 rounded-md border border-gray-600`}>
                    <SalesTransaction sellersItems={sellersItems} />
                    <div className="flex w-full items-center justify-center bg-fuchsia-400 p-2">
                        <p>{price.toLocaleString('fa-IR')}</p>
                        <p>:مظنه</p>
                    </div>
                    <PurchaseTransaction purchasesItems={purchasesItems} />
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
                                <div className="flex items-center gap-3">
                                    <Checkbox
                                        checked={realMoney}
                                        onCheckedChange={(value) =>
                                            setRealMoney(value)
                                        }
                                        id="money"
                                    />
                                    <Label htmlFor="money">
                                        در صورت فعال بودن باید قیمت واقعی
                                        بزاری{' '}
                                    </Label>
                                </div>
                                <Slider
                                    value={[rangeLimit]}
                                    min={-price_limit}
                                    max={price_limit}
                                    step={1}
                                    onValueChange={(value) => {
                                        setRangeLimit(value[0]);
                                    }}
                                />
                                <div className={'space-y-4'}>
                                    <Input
                                        name="amount"
                                        type="text"
                                        placeholder={'max:12'}
                                        value={data.amount}
                                        onChange={(e) =>
                                            handleChange(
                                                'amount',
                                                e.target.value,
                                            )
                                        }
                                    />
                                    <InputError
                                        message={
                                            errors.amount || localErrors.amount
                                        }
                                    />
                                    <Input
                                        name="fee"
                                        type="text"
                                        placeholder={`for example ${realMoney ? price : '10'} max: ${price_limit}`}
                                        value={data.fee}
                                        onChange={(e) =>
                                            handleChange('fee', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.fee || localErrors.fee}
                                    />
                                    <Input
                                        name="tp"
                                        type="text"
                                        placeholder="Profit limit"
                                        value={data.tp}
                                        onChange={(e) =>
                                            handleChange('tp', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.tp || localErrors.tp}
                                    />
                                    <Input
                                        name="sl"
                                        type="text"
                                        placeholder="Limit of loss"
                                        value={data.sl}
                                        onChange={(e) =>
                                            handleChange('sl', e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.sl || localErrors.sl}
                                    />
                                    <ButtonGroup>
                                        <Button
                                            onClick={handleSubmit('purchase')}
                                            disabled={processing}
                                            className={'w-full bg-green-500'}
                                            type={'button'}
                                        >
                                            خرید
                                        </Button>
                                        <Button
                                            className={'bg-red-500'}
                                            onClick={handleSubmit('sale')}
                                            disabled={processing}
                                            type={'button'}
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
