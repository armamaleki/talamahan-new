<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Prices\GoldPriceCollection;
use App\Models\GoldPrice;
use App\Models\Wallet;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {
//        if(isMarketOpen()){
//            return 'open';
//        }else{
//            return 'closed';
//        }
//        TODO دقت کن که باید فقط معاملات امروز رو چک کنی (ساعت کاری بازار رو بپرس از پهلوان ____ اگه بگه  ;))
        $pricesList = GoldPrice::latest('time')->get()->reverse()->values();
        dd($pricesList);
        $AmountOfMoneyInTheWallet = auth()->user()->wallet->balance ?? 0;
        $portfolio = auth()->user()->portfolios()->where('status' , 'open')->latest()->first();
        return Inertia::render('dashboard/trade/index' , [
            'pricesList' => new GoldPriceCollection($pricesList),
            'AmountOfMoneyInTheWallet' => $AmountOfMoneyInTheWallet,
            'portfolioItem' => $portfolio,
        ]);
    }
}
