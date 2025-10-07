import AppLayout from '@/layouts/app-layout';
import { Head, Form } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
} from '@/components/ui/card';
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import tickets from '@/routes/tickets';

export default function CreateTicket() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tickets', href: '/dashboard/tickets' },
        { title: 'Create', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Ticket" />

            <Card>
                <CardHeader>Create new ticket</CardHeader>
                <CardContent>
                    <Form
                        method="post"
                        action={tickets.store()}
                        resetOnSuccess={['title', 'body', 'priority']}
                        className="flex flex-col gap-6"
                    >
                        {({ processing, errors }) => (
                            <>
                                <div className="grid gap-4">
                                    <div>
                                        <Label htmlFor="title">Ticket title</Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Enter ticket title"
                                            required
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div>
                                        <Label htmlFor="body">Description</Label>
                                        <Textarea
                                            id="body"
                                            name="body"
                                            placeholder="Describe your issue briefly"
                                            required
                                        />
                                        <InputError message={errors.body} />
                                    </div>

                                    <div>
                                        <Label htmlFor="priority">Priority</Label>
                                        <Select name="priority" defaultValue="low">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">Low</SelectItem>
                                                <SelectItem value="medium">Medium</SelectItem>
                                                <SelectItem value="high">High</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.priority} />
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
                            </>
                        )}
                    </Form>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    We'll get back to you as soon as possible.
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
