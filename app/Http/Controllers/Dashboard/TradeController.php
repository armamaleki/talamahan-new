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
//        قوانین ورود به صفحه ترید
//     TODO اینو از پهلوان بگیر
//        TODO ساعت کاری بازار رو درست کن
        $pricesList = GoldPrice::latest('time')->get()->reverse()->values();
        $AmountOfMoneyInTheWallet = auth()->user()->wallet->balance ?? 0;
//        dd($AmountOfMoneyInTheWallet);
        return Inertia::render('dashboard/trade/index' , [
            'pricesList' => new GoldPriceCollection($pricesList),
            'AmountOfMoneyInTheWallet' => $AmountOfMoneyInTheWallet,
        ]);
    }
}
