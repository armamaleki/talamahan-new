<?php

use App\Events\TestEvent;
use App\Events\Trade;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
require __DIR__ . '/dashboard.php';

Route::prefix('manager')
    ->name('manager.')
    ->middleware(['auth', 'verified', 'permission:show-admin-panel'])
    ->group(function () {
        require __DIR__ . '/manager/manager.php';
    });
