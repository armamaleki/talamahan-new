<?php

namespace App\Http\Controllers\Dashboard;

use App\Events\OrderCreatePurchase;
use App\Events\OrderCreateSale;
use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Trade\StoreTradeRequest;
use App\Models\Setting;
use App\Models\Trade;
use Carbon\Carbon;

class OrderController extends Controller
{
    public function __construct()
    {
        if (!isMarketOpen()) {
            return to_route('dashboard')->with('message', 'ساعت کاری بازار به اتمام رسیده است.');
        }
        return '';
    }

    public function store(StoreTradeRequest $request)
    {
        $data = $request->all();
        $setting = Setting::latest()->first();
        $start = Carbon::today()->setTimeFromTimeString($setting->open);
        $end = Carbon::today()->setTimeFromTimeString($setting->close);
        $portfolio = auth()->user()->portfolios()
            ->where('status', 'open')
            ->whereBetween('created_at', [$start, $end])
            ->latest()->first();
        if ($data['type'] == 'purchase') {
            $data['start'] = 47000 - 9;
            $data['type'] = 'purchase';
            $data['user_id'] = auth()->id();
            $data['portfolio_id'] = $portfolio->id;
            $data['status'] = 'open';
            $data['profit_limit'] = 'da';
            $data['loss_limit'] = 'da';
            $create = trade::create($data);
            event(new OrderCreatePurchase($create));
        }


        if ($data['type'] == 'sale') {
            $data['start'] = 47000 + 9;
            $data['type'] = 'sale';
            $data['user_id'] = auth()->id();
            $create = trade::create($data);
            event(new OrderCreateSale($create));
        }
        return back()->with('success', 'معامله شما ایجاد شد');
    }
}
