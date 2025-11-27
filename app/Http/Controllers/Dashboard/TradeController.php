<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Prices\GoldPriceCollection;
use App\Http\Resources\Dashboard\Trade\SettingResource;
use App\Models\GoldPrice;
use App\Models\Setting;
use App\Models\Trade;
use App\Models\Wallet;
use Carbon\Carbon;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {
        if(!isMarketOpen()){
            return to_route('dashboard')->with('message' , 'ساعت کاری بازار به اتمام رسیده است.');
        }
        $setting = Setting::latest()->first();
        $start = Carbon::today()->setTimeFromTimeString($setting->open);
        $end   = Carbon::today()->setTimeFromTimeString($setting->close);
        $AmountOfMoneyInTheWallet = auth()->user()->wallet->balance ?? 0;
        $portfolio = auth()->user()->portfolios()->where('status' , 'open')->latest()->first();
        $sellers = Trade::where('type', 'sale')
            ->select('id', 'start')
            ->whereBetween('created_at', [$start, $end])
            ->latest()
            ->get();
        $purchases = Trade::where('type', 'purchase')
            ->select('id', 'start')
            ->whereBetween('created_at', [$start, $end])
            ->latest()
            ->get();
        return Inertia::render('dashboard/trade/index' , [
            'AmountOfMoneyInTheWallet' => $AmountOfMoneyInTheWallet,
            'portfolioItem' => $portfolio,
            'settingItem' => new SettingResource($setting),
            'purchasesItems' => $purchases,
            'sellersItems' => $sellers,

        ]);
    }
}
