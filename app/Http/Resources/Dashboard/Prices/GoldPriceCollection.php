<?php

namespace App\Http\Resources\Dashboard\Prices;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class GoldPriceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'prices' => $this->collection->map(function ($price) {
                return [
//                    'id' => $price->id,
                    'time' => Carbon::create($price->time)->format('Y-m-d'),
                    'open' => (int)$price->open,
                    'high' => (int)$price->high,
                    'low' => (int)$price->low,
                    'close' => (int)$price->close,
                ];
            }),
        ];
    }
}
