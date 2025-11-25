<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Trade\StoreTradeRequest;
use App\Models\Trade;

class OrderController extends Controller
{
    public function store(StoreTradeRequest $request)
    {
        $data = $request->all();
        $data['start'] = $data['amount'] * 1000;
        $data['end'] = $data['amount'] * 1000;
        $data['type'] = 'sale';
        $data['user_id'] = auth()->id();
        $create = trade::create($data);
        if ($create->type == 'purchase') {

        }
        if ($create->type == 'sale') {

        }
        return back()->with('success', 'معامله شما ایجاد شد');
    }
}
