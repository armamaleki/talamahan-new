import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ManagerLayout from '@/layouts/manager-layout';
import { FormEvent, useState } from 'react';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import manager from '@/routes/manager';
import { toast, ToastContainer } from 'react-toastify';


export default function Setting({ settingItem }) {
    const { data, setData, post, processing, errors, clearErrors } = useForm({
        openHour: settingItem?.open || '',
        closeHour: settingItem?.close || '',
        commission: settingItem?.commission || '',
        site_name: settingItem?.site_name || '',
        site_email: settingItem?.site_email || '',
        site_phone: settingItem?.site_phone || '',
        site_address: settingItem?.site_address || '',
        site_instagram: settingItem?.site_instagram || '',
        site_youtube: settingItem?.site_youtube || '',
        site_linkedin: settingItem?.site_linkedin || '',
        site_twitter: settingItem?.site_twitter || '',
        site_facebook: settingItem?.site_facebook || '',
    });

    const [localErrors, setLocalErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        clearErrors();
        setLocalErrors({});

        const newErrors: Record<string, string> = {};

        if (!data.openHour) {
            newErrors.openHour = 'وارد کردن ساعت باز شدن الزامی است';
        }

        if (!data.closeHour) {
            newErrors.closeHour = 'وارد کردن ساعت بسته شدن الزامی است';
        }
        if (data.commission === undefined || data.commission === null || data.commission === '') {
            newErrors.commission = 'وارد کردن کمیسیون الزامی است';
        } else if (isNaN(data.commission)) {
            newErrors.commission = 'کمیسیون باید عدد باشد';
        } else if (Number(data.commission) < 0) {
            newErrors.commission = 'کمیسیون نمی‌تواند کمتر از صفر باشد';
        } else if (Number(data.commission) > 100000) {
            newErrors.commission = 'کمیسیون نمی‌تواند بیشتر از 100000 تومان باشد';
        }

        if (Object.keys(newErrors).length > 0) {
            setLocalErrors(newErrors);
            return;
        }
        // @ts-ignore
        post(manager.setting.update(), {
            onSuccess: () => {
                toast.success('تنظیمات با موفقیت ذخیره شد');
            },
            onError: (err) => {
                toast.error('خطا در ذخیره اطلاعات' , err);
            },
        });
    };

    return (
        <ManagerLayout>
            <ToastContainer position="top-center" autoClose={3000} />
            <Head title="تنظیمات سایت" />
            <Card>
                <CardHeader>تنظیمات ساعت کاری سایت</CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="openHour">ساعت باز شدن سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="openHour"
                                    id="openHour"
                                    value={data.openHour}
                                    onChange={(e) =>
                                        setData('openHour', e.target.value)
                                    }
                                    type="time"
                                    placeholder="اجباری {از 0 تا 100000 تومن}"
                                />
                                <InputError
                                    message={
                                        errors.openHour || localErrors.openHour
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="closeHour">ساعت بسته شدن سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="closeHour"
                                    id="closeHour"
                                    value={data.closeHour}
                                    onChange={(e) =>
                                        setData('closeHour', e.target.value)
                                    }
                                    type="time"
                                    placeholder="اجباری {از 0 تا 100000 تومن}"
                                />
                                <InputError
                                    message={
                                        errors.closeHour || localErrors.closeHour
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="commission">کمیسیون سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="commission"
                                    id="commission"
                                    value={data.commission}
                                    onChange={(e) =>
                                        setData('commission', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اجباری {از 0 تا 100000 تومن}"
                                />
                                <InputError
                                    message={
                                        errors.commission || localErrors.commission
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_name">اسم سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_name"
                                    id="site_name"
                                    value={data.site_name}
                                    onChange={(e) =>
                                        setData('site_name', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_name || localErrors.site_name
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_email">ایمیل سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_email"
                                    id="site_email"
                                    value={data.site_email}
                                    onChange={(e) =>
                                        setData('site_email', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_email || localErrors.site_email
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_phone">تلفن سایت</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_phone"
                                    id="site_phone"
                                    value={data.site_phone}
                                    onChange={(e) =>
                                        setData('site_phone', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_phone || localErrors.site_phone
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_address">آدرس </Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_address"
                                    id="site_address"
                                    value={data.site_address}
                                    onChange={(e) =>
                                        setData('site_address', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_address || localErrors.site_address
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_facebook">آدرس فیس بوک </Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_facebook"
                                    id="site_facebook"
                                    value={data.site_facebook}
                                    onChange={(e) =>
                                        setData('site_facebook', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_facebook || localErrors.site_facebook
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_instagram">آدرس اینستاگرام</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_instagram"
                                    id="site_instagram"
                                    value={data.site_instagram}
                                    onChange={(e) =>
                                        setData('site_instagram', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_instagram || localErrors.site_instagram
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_youtube">آدرس site_youtube</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_youtube"
                                    id="site_youtube"
                                    value={data.site_youtube}
                                    onChange={(e) =>
                                        setData('site_youtube', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_youtube || localErrors.site_youtube
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_youtube">آدرس site_youtube</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_youtube"
                                    id="site_youtube"
                                    value={data.site_youtube}
                                    onChange={(e) =>
                                        setData('site_youtube', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_youtube || localErrors.site_youtube
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_linkedin">آدرس site_linkedin</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_linkedin"
                                    id="site_linkedin"
                                    value={data.site_linkedin}
                                    onChange={(e) =>
                                        setData('site_linkedin', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_linkedin || localErrors.site_linkedin
                                    }
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-4">
                            <Label htmlFor="site_twitter">آدرس site_twitter</Label>
                            <div className="col-span-1 md:col-span-3">
                                <Input
                                    name="site_twitter"
                                    id="site_twitter"
                                    value={data.site_twitter}
                                    onChange={(e) =>
                                        setData('site_twitter', e.target.value)
                                    }
                                    type="text"
                                    placeholder="اختیاری"
                                />
                                <InputError
                                    message={
                                        errors.site_twitter || localErrors.site_twitter
                                    }
                                />
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
