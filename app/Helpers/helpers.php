<?php

if (!function_exists('isMarketOpen')) {
    function isMarketOpen(): bool
    {
        return \App\Services\MarketSettings::isMarketOpen();
    }

}

if (!function_exists('clearSettingCache')) {
    function clearSettingCache(): void
    {
        \App\Services\MarketSettings::clearSettingCache();
    }

}
