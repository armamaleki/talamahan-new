<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    /** @use HasFactory<\Database\Factories\WalletFactory> */
    use HasFactory;

    protected $fillable = ['user_id', 'symbol', 'name', 'balance'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
