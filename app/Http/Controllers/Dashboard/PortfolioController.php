<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Portfolio\StorePortfolioRequest;
use App\Models\Portfolio;

class PortfolioController extends Controller
{
    public function store(StorePortfolioRequest $request)
    {
        //  TODO ساعت کاری بازار رو بزار همین طور قوانین باز شدن پورتفو
        $walletBalance = auth()->user()->wallet->balance;
        if ($request->amount >= $walletBalance ){
//            TODO چک کردن بیشترین واحد مجاز سایت
            $amount = en_number($request->amount);
            $portfolios = auth()->user()->portfolios;

            $allClosed = $portfolios->every(function ($portfolio) {
                return $portfolio->status === 'close';
            });

            if ($allClosed) {
                dd($allClosed);
                auth()->user()->portfolios->create([
                    'amount' => $amount,
                    'status' => 'open',
//                    'lever'=>$request->lever, // TODO این لوورو رو از کاربر میگیهر داستان چیه پهلوان
                    'result'=>0,
                    'type'=>'cross',
                ]);
            }else {
                return back()->withErrors(['portfolio' => 'تا زمانی که تمام پورتفوهای قبلی بسته نشدن، امکان ایجاد پورتفوی جدید وجود ندارد.']);
            }
        }else {
            return back()->withErrors(['balance' => 'موجودی کیف پول کافی نیست.']);
        }
    }
}
