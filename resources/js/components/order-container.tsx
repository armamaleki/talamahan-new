import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function OrderContainer() {
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
                className={`col-span-4 w-fit rounded-md border border-gray-600 p-2`}
            >
                <Tabs defaultValue="order" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="order">اوردر</TabsTrigger>
                        <TabsTrigger value="password">لفظ</TabsTrigger>
                    </TabsList>
                    <TabsContent value="order">
                        <Card className={'p-2 space-y-4'}>
                            <form className={'space-y-4'}>
                               <Input type={'text'} placeholder={'حجم'} ></Input>
                               <Input type={'text'} placeholder={'قیمت '} ></Input>
                               <Input type={'text'} placeholder={'حد سود'} ></Input>
                               <Input type={'text'} placeholder={'حد زرر'} ></Input>
                                {/*<ButtonGroup>*/}
                                    <Button>Button 1</Button>
                                    <Button>Button 2</Button>
                                {/*</ButtonGroup>*/}
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
