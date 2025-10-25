import { Form, Head } from '@inertiajs/react';
import ManagerLayout from '@/layouts/manager-layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import notification from '@/routes/manager/notification';
import { Button } from '@/components/ui/button';
import { LoaderCircle } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import InputError from '@/components/input-error';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs = [
    { title: 'Manager', href: '/manager' },
    { title: 'Users', href: '/manager/notification' },
    { title: 'Create', href: '' },
];
export default function liveNotification() {
    return (
        <ManagerLayout breadcrumbs={breadcrumbs}>
            <Head title="live notification in trade page" />
            <Card>
                <CardHeader>Create new notification</CardHeader>
                <CardContent>
                    <Form
                        method="post"
                        action={notification.liveNotification.store()}
                        resetOnSuccess
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors  }) => (
                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="title">title</Label>
                                    <Input
                                        id="title"
                                        name="title"
                                        placeholder="Enter the title (required|string|min:3|max:255)"
                                        required
                                    />
                                    <InputError message={errors.title} />
                                </div>
                                <div>
                                    <Label htmlFor="Icon">Icon</Label>
                                    <Select name={'icon'}>
                                        <SelectTrigger className="">
                                            <SelectValue placeholder="Select a icon" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>icons</SelectLabel>
                                                <SelectItem value="success">success</SelectItem>
                                                <SelectItem value="error">error</SelectItem>
                                                <SelectItem value="warning">warning</SelectItem>
                                                <SelectItem value="info">info</SelectItem>
                                                <SelectItem value="question">question</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.icon} />
                                </div>
                                <div>
                                    <Label htmlFor="message">message</Label>
                                    <Textarea
                                        placeholder={'enter a message (required|string|min:3|max:500)'}
                                        name={'message'}/>
                                    <InputError message={errors.message} />
                                </div>
                                <div>
                                    <Label htmlFor="footer">footer</Label>
                                    <Textarea
                                        placeholder={'enter a message (required|string|min:3|max:500) you can add some link or btn'}
                                        name={'footer'}/>
                                    <InputError message={errors.footer} />
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
