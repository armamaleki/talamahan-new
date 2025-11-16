<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Requests\Dashboard\Trade\StoreTradeRequest;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function store(StoreTradeRequest $request)
    {
        $data = $request->all();
        dd($data);
    }
}
