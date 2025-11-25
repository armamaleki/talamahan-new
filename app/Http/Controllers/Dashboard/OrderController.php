<?php

namespace App\Http\Controllers\Dashboard;

use App\Events\TradeCreated;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Trade\StoreTradeRequest;
use App\Models\Trade;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(StoreTradeRequest $request)
    {
        dd($request->all());
        $data = $request->all();
        $data['start'] = $data['amount'] * 1000;
        $data['end'] = $data['amount'] * 1000;
        $data['type'] = 'buy';
        $data['user_id'] = auth()->id();
        $create = trade::create($data);
        event(new TradeCreated($create));
        return back()->with('success' , 'معامله شما ایجاد شد');
    }
}
