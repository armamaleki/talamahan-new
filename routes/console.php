<?php

use Carbon\Carbon;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('fake:gold', function () {
//    $price = \App\Models\GoldPrice::create([
//        'time' => Carbon::create()->now()->format('Y-m-d'),
//        'open' => rand(10000000, 11000000),
//        'high' => rand(10000000, 11000000),
//        'low' => rand(10000000, 11000000),
//        'close' => rand(10000000, 11000000),
//    ]);
    event(\App\Events\ChartPrice::broadcast());
})->everyFiveSeconds();



