import AppLayout from '@/layouts/app-layout';
import { Form, Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import tickets from '@/routes/tickets';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export default function CreateTicket() {
    const breadcrumbs = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Tickets', href: '/dashboard/tickets' },
        { title: 'Create', href: '#' },
    ];
    const [text, setText] = useState('');
    const [language, setLanguage] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [loading, setLoading] = useState(false);
    async function handleTranslate() {
        if (!text || !language) return toast.error("لطفا زبان مورد نظر را انتخاب کنید.");
        try {
            setLoading(true);
            const sourceLang = 'auto';
            const targetLang = language;
            const sourceText = text;

            const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(
                sourceText,
            )}`;

            const response = await fetch(url);
            const data = await response.json();
            const translated = data[0][0][0];
            setTranslatedText(translated);
            toast.success('ترجمه انجام شد ✅');
        } catch (error) {
            toast.error('خطا در ترجمه!');
        }finally {
            setLoading(false);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer position="top-center" autoClose={3000} />
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
                                        <Label htmlFor="title">
                                            Ticket title
                                        </Label>
                                        <Input
                                            id="title"
                                            name="title"
                                            placeholder="Enter ticket title"
                                            required
                                        />
                                        <InputError message={errors.title} />
                                    </div>

                                    <div>
                                        <Label htmlFor="body">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="body"
                                            name="body"
                                            value={translatedText}
                                            placeholder="Describe your issue briefly"
                                            required
                                        />
                                        <InputError message={errors.body} />
                                    </div>

                                    <div>
                                        <Label htmlFor="priority">
                                            Priority
                                        </Label>
                                        <Select
                                            name="priority"
                                            defaultValue="low"
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select priority" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="low">
                                                    Low
                                                </SelectItem>
                                                <SelectItem value="medium">
                                                    Medium
                                                </SelectItem>
                                                <SelectItem value="high">
                                                    High
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <InputError message={errors.priority} />
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
                            </>
                        )}
                    </Form>
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                    We'll get back to you as soon as possible.
                </CardFooter>
            </Card>
            <Card className={'mt-2'}>
                <CardHeader>ترجمه کن متن</CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className={`space-y-4`}>
                            <Textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Type your text here to and select a bove botton"
                            />
                            <Select
                                onValueChange={(value) => setLanguage(value)}
                            >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="انتخاب زبان" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="en">انگلیسی</SelectItem>
                                    <SelectItem value="fa">فارسی</SelectItem>
                                    <SelectItem value="ar">عربی</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={handleTranslate}
                                disabled={loading}
                            >
                                {loading ? "لطفا منتظر بمانید..." : "ترجمه کن"}
                            </Button>
                        </div>
                        <div>
                            {translatedText && (
                                <Textarea
                                    value={translatedText}
                                    readOnly
                                    placeholder="نتیجه ترجمه"
                                />
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </AppLayout>
    );
}
