import { Form, Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import ManagerLayout from '@/layouts/manager-layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import notification from '@/routes/manager/notification';
import CkEditor from '@/components/ui/CkEditor';

const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/notification' },
    { title: 'Create', href: '' },
];
export default function storeNotification() {
    const { data, setData, post } = useForm({
        title: '',
        message: '',
    });

    // const handleSubmit = () => {
    //     console.log('dddddd');
    //     post(notification.store());
    // };

    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="create notification" />
            <Card>
                <CardHeader>Create new notification</CardHeader>
                <CardContent>
                    <Form
                        method="post"
                        action={notification.store()}
                        resetOnSuccess={['title']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter the title (required ,min:3 , max:250)"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div>
                                    <Label htmlFor="message">Message</Label>
                                    <CkEditor
                                        value={data.message}
                                        onChange={(value) =>
                                            setData('message', value)
                                        }
                                    />
                                    <InputError message={errors.message} />
                                </div>
                                <Button
                                    type="submit"
                                    className="mt-2 w-full"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        'Send'
                                    )}
                                </Button>
                            </div>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </ManagerLayout>
    );
}
