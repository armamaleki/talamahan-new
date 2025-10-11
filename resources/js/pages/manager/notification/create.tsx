import { Form, Head } from '@inertiajs/react';
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
                        className="flex flex-col gap-6">
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
                                    <CkEditor />
                                    <InputError message={errors.message} />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full mt-2"
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <>
                                            <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
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
