import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';

export default function OrderContainer() {

    const { data, setData, post, processing, errors } = useForm({
        amount: '',
        fee: '',
        tp: '',
        sl: '',
        type: '', // مثلاً buy یا sell
    });
    const newErrors: Record<string, string> = {};

    const handleSubmit = (type) => (e) => {
        e.preventDefault();
        if (!data.amount) newErrors.amount = 'مبلغ الزامیه';
        console.log(data.amount);
        setData('type', type);
        // post(route('orders.store'));
    };
    return (
        <>
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
                className={`col-span-4 w-fit rounded-md border border-gray-600 p-2`}>
                <Tabs defaultValue="order" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="order">اوردر</TabsTrigger>
                        <TabsTrigger value="password">لفظ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="order">
                        <Card className={'p-2 space-y-4'}>
                            <form
                                className={'space-y-4'}>
                               <Input
                                   name="amount"
                                   type="text"
                                   placeholder="حجم"
                                   value={data.amount}
                                   onChange={(e) => setData('amount', e.target.value)}/>
                                <InputError
                                    message={errors.amount}
                                />
                               <Input
                                   name="fee"
                                   type="text"
                                   placeholder="قیمت"
                                   value={data.fee}
                                   onChange={(e) => setData('fee', e.target.value)}
                               />
                               <Input
                                   name="tp"
                                   type="text"
                                   placeholder="حد سود"
                                   value={data.tp}
                                   onChange={(e) => setData('tp', e.target.value)}
                               />
                               <Input
                                   name="sl"
                                   type="text"
                                   placeholder="حد ضرر"
                                   value={data.sl}
                                   onChange={(e) => setData('sl', e.target.value)}
                               />
                                <ButtonGroup>
                                    <Button
                                        onClick={handleSubmit('buy')}
                                        disabled={processing}
                                        className={'bg-green-500 w-full'}
                                        type={'submit'}>خرید</Button>
                                    <Button
                                        className={'bg-red-500'}
                                        onClick={handleSubmit('sell')}
                                        disabled={processing}
                                        type={'submit'}>فروش</Button>
                                </ButtonGroup>
                            </form>
                        </Card>
                    </TabsContent>
                    <TabsContent value="password">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
