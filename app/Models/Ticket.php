<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Ticket extends Model
{
    /** @use HasFactory<\Database\Factories\TicketFactory> */
    use HasFactory;

    protected $fillable = [
        'title',
        'body',
        'status',
        'priority',
        'user_id',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }

    protected static function booted()
    {
        static::addGlobalScope('latest', function ($query) {
            $query->orderBy('created_at', 'desc');
        });
        static::creating(function ($productCategory) {
            if (auth()->check()) {
                $productCategory->user_id = auth()->id();
            }
        });
    }
}
