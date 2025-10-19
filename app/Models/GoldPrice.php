<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoldPrice extends Model
{
    /** @use HasFactory<\Database\Factories\GoldPriceFactory> */
    use HasFactory;

    protected $fillable = [
        'time',
        'open',
        'high',
        'low',
        'close',
    ];

//    protected static function booted()
//    {
//        static::addGlobalScope('latest', function ($query) {
//            $query->orderBy('created_at', 'asc');
//        });
//    }
}
