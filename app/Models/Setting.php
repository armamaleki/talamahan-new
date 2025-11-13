<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'open',
        'close',
        'commission',
        'user_id',
        'site_name',
        'site_email',
        'site_phone',
        'site_address',
        'site_instagram',
        'site_youtube',
        'site_linkedin',
        'site_twitter',
        'site_facebook',
    ];
}
