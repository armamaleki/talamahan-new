<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Prices\GoldPriceCollection;
use App\Http\Resources\Dashboard\Trade\SettingResource;
use App\Models\GoldPrice;
use App\Models\Setting;
use App\Models\Wallet;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {
        if(!isMarketOpen()){
            return to_route('dashboard')->with('message' , 'ساعت کاری بازار به اتمام رسیده است.');
        }
        $AmountOfMoneyInTheWallet = auth()->user()->wallet->balance ?? 0;
        $portfolio = auth()->user()->portfolios()->where('status' , 'open')->latest()->first();
        $setting = Setting::first();
        return Inertia::render('dashboard/trade/index' , [
            'AmountOfMoneyInTheWallet' => $AmountOfMoneyInTheWallet,
            'portfolioItem' => $portfolio,
            'settingItem' => new SettingResource($setting)
        ]);
    }
}
