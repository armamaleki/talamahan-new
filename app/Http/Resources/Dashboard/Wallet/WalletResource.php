<?php

namespace App\Http\Resources\Dashboard\Wallet;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WalletResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *

     */
    public function toArray(Request $request)
    {
        return [
            'symbol' => $this->symbol,
            'balance' => $this->balance,
        ];
    }
}
