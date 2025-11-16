<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Portfolio\StorePortfolioRequest;
use Illuminate\Support\Facades\DB;

class PortfolioController extends Controller
{
    public function store(StorePortfolioRequest $request)
    {
        $data = $request->validated([
            'amount' => 'required|numeric|min:2300000|max:23000000',
        ]);
        $amount = (int)(float)str_replace(',', '', $request->get('amount'));
        if (!isMarketOpen()) {
            return back()->withErrors(['balance' => 'بازار بسته است.']);
            // @TODO تعطیلات بازار رو هم چک کن تعطیلات رسمی به میلادی
        }
        $portfolios = auth()->user()
            ->portfolios()
            ->whereDate('created_at', today())
            ->where('status', 'open')
            ->get();

        if ($portfolios->isNotEmpty()) {
            return back()->withErrors(['portfolio' => 'شما یک پورتفو باز دارید!!']);
        }

        $wallet = auth()->user()->wallet;

        if ($wallet->balance <= 0) {
            return back()->withErrors(['wallet' => 'کیف پول شما خالیست.']);
        }
        if ($wallet->balance <= $amount) {
            return back()->withErrors(['wallet' => 'موجودی کیف پول شما برای این تراکنش کافی نیست!']);
        }
        //@TODO کاربر برداشت وجه داره یا نه
        DB::transaction(function () use ($amount, $wallet, $request) {
            auth()->user()->portfolios()->create([
                'amount' => $request->amount,
                'status' => 'open',
            ]);
            $wallet->balance -= $amount;
            $wallet->save();
        });
        return back()->withErrors(['portfolio' => 'پورتفو شما با موفیت ایجاد شد!']);
    }
}
