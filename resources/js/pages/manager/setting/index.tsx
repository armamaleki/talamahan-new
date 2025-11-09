import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ManagerLayout from '@/layouts/manager-layout';
import { FormEvent, useState } from 'react';
import TimePicker from 'react-time-picker';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';

export default function Setting({ settingItem }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        openHour: settingItem?.openHour || '',
    });

    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();
        setLocalErrors({});

        const newErrors: Record<string, string> = {};

        // === اعتبارسنجی ساده سمت کلاینت ===
        if (!data.openHour) {
            newErrors.openHour = 'وارد کردن ساعت باز شدن الزامی است';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }

        // === اگر اعتبارسنجی اوکی بود، ارسال با Inertia ===
        // post(route('manager.setting.store'), {
        //     onSuccess: () => {
        //         console.log('Saved successfully!');
        //     },
        //     onError: (err) => {
        //         console.log('Server validation errors:', err);
        //     },
        // });
    };

    return (
        <ManagerLayout>
            <Head title="تنظیمات سایت" />
            <Card>
                <CardHeader>تنظیمات ساعت کاری سایت</CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-3">
                            <Label htmlFor="openHour">ساعت باز شدن فروشگاه</Label>
                            <div className="col-span-1 md:col-span-3">
                                <TimePicker
                                    onChange={(value) => setData('openHour', value)}
                                    value={data.openHour}

                                />
                                <InputError message={errors.openHour || localErrors.openHour} />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={processing}
                        >
                            {processing ? 'در حال ذخیره...' : 'ذخیره'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </ManagerLayout>
    );
}
