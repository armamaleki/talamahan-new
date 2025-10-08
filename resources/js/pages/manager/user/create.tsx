import { Form, Head } from '@inertiajs/react';
import ManagerLayout from '@/layouts/manager-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import user from '@/routes/manager/user';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';

const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/user' },
    { title: 'Create', href: '' },
];
export default function() {
    return(
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="create user" />
            <Card>
                <CardHeader>Create new User</CardHeader>
                <CardContent>
                    <Form
                        method="post"
                        action={user.store()}
                        resetOnSuccess={['title', 'body', 'priority']}
                        className="flex flex-col gap-6">
                        {({ processing, errors }) => (
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">name</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="Enter the name (required ,min:3 , max:250)"
                                        required
                                    />
                                    <InputError message={errors.name} />
                                </div>
                                email
                                password
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
    )
}
