<?php

namespace App\Http\Controllers\Dashboard;

use App\Events\OrderCreatePurchase;
use App\Events\OrderCreateSale;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Trade\StoreTradeRequest;
use App\Models\Trade;

class OrderController extends Controller
{
    public function store(StoreTradeRequest $request)
    {
        //@TODO ریل تایم کردن ارور ها ی سمت کاربر
        // اگر عدد وا
        $data = $request->all();
        if ($data['type'] == 'purchase') {
            $data['start'] = 47000 - 9 ;
            $data['type'] = 'sale';
            $data['user_id'] = auth()->id();
            $create = trade::create($data);
            event(new OrderCreatePurchase($create));
        }
        if ($data['type'] == 'sale') {
            $data['start'] = 47000 + 9 ;
            $data['type'] = 'sale';
            $data['user_id'] = auth()->id();
            $create = trade::create($data);
            event(new OrderCreateSale($create));
        }
        return back()->with('success', 'معامله شما ایجاد شد');
    }
}
