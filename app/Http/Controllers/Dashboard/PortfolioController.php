<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Portfolio\StorePortfolioRequest;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function store(StorePortfolioRequest $request)
    {
        //  TODO ساعت کاری بازار رو بزار
dd($request->all());
    }
}
