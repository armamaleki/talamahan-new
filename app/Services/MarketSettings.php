<?php

namespace App\Services;

use App\Models\Setting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class MarketSettings
{
    protected static function getSettings()
    {
        return Cache::rememberForever('settings.record', function () {
            return Setting::first(); // چون فقط یه رکورد داریم
        });
    }
    public static function open()
    {
        return optional(self::getSettings())->open;
    }

    public static function close()
    {
        return optional(self::getSettings())->close;
    }

    public static function isMarketOpen(): bool
    {
        $open = Carbon::parse(self::open());
        $close = Carbon::parse(self::close());
//        dd($open->format('Y-m-d H:i:s'));
        $now = Carbon::now();
        return $now->between($open, $close);
    }
    public static function clearSettingCache()
    {
        Cache::forget('settings.record');
    }
}
