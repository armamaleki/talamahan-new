<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function index()
    {
//        قوانین ورود به صفحه ترید
//     TODO اینو از پهلوان بگیر
        return Inertia::render('dashboard/trade/index');
    }
}
