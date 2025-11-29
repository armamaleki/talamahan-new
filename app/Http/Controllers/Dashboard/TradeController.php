<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Trade\SettingResource;
use App\Models\Setting;
use App\Models\Trade;
use Carbon\Carbon;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {

        //@TODO چک کنه ببینه پورتفو داره یا نه
        if (!isMarketOpen()) {
            return to_route('dashboard')->with('message', 'ساعت کاری بازار به اتمام رسیده است.');
        }
        $setting = Setting::latest()->first();
        $start = Carbon::today()->setTimeFromTimeString($setting->open);
        $end = Carbon::today()->setTimeFromTimeString($setting->close);
        $AmountOfMoneyInTheWallet = auth()->user()->wallet->balance ?? 0;
        $portfolio = auth()->user()->portfolios()->where('status', 'open')->latest()->first();
        $sellers = Trade::whereBetween('created_at', [$start, $end])
            ->where('type', 'sale')
            ->select('id', 'start')
            ->latest()
            ->get();
        $purchases = Trade::whereBetween('created_at', [$start, $end])
            ->where('type', 'purchase')
            ->select('id', 'start')
            ->latest()
            ->get();
        return Inertia::render('dashboard/trade/index', [
            'AmountOfMoneyInTheWallet' => $AmountOfMoneyInTheWallet,
            'portfolioItem' => $portfolio,
            'settingItem' => new SettingResource($setting),
            'purchasesItems' => $purchases,
            'sellersItems' => $sellers,

        ]);
    }
}
