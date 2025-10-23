<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Portfolio\StorePortfolioRequest;

class PortfolioController extends Controller
{
    public function store(StorePortfolioRequest $request)
    {
        //  TODO ساعت کاری بازار رو بزار همین طور قوانین باز شدن پورتفو
        $amount = (int)(float)str_replace(',', '', $request->amount);
        $walletBalance = (int)(float)auth()->user()->wallet->balance;
//        $walletBalance = (int)(float) 10000;
        if (!$walletBalance) {
            return back()->withErrors(['wallet' => 'کیف پول یافت نشد یا موجودی صفر است.']);
        }

        if ($amount <= $walletBalance) {
//            TODO چک کردن بیشترین واحد مجاز سایت
            $portfolios = auth()->user()->portfolios;
            $allClosed = $portfolios->every(function ($portfolio) {
                return $portfolio->status === 'close';
            });

            if ($allClosed) {
                auth()->user()->portfolios()->create([
                    'amount' => $request->amount,
                    'status' => 'open',
//                    'lever'=>$request->lever, // TODO این لوورو رو از کاربر میگیهر داستان چیه پهلوان
                    'type' => 'cross',
                ]);

                return back();
            } else {
                return back()->withErrors(['portfolio' => 'تا زمانی که تمام پورتفوهای قبلی بسته نشدن، امکان ایجاد پورتفوی جدید وجود ندارد.']);
            }
        } else {
            return back()->withErrors(['balance' => 'موجودی کیف پول کافی نیست.']);
        }
    }
}
