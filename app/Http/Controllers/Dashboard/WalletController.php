<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Wallet\WalletResource;
use Inertia\Inertia;

class WalletController extends Controller
{
    public function index()
    {
        $wallet = auth()->user()->wallet;
        return Inertia::render('dashboard/wallet/index', [
            'walletItem' => new WalletResource($wallet),
        ]);
    }
}
