<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Trade extends Model
{
    /** @use HasFactory<\Database\Factories\TradeFactory> */
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'portfolio_id',
        'user_id',
        'type',
        'start',
        'end',
        'fee',
        'profit_limit',
        'loss_limit',
        'status',
        'start_id',
        'end_id',
    ];
}
