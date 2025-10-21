<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard/dashboard');
    })->name('dashboard');


    Route::prefix('/tickets')->name('tickets.')->group(function () {
        Route::get('/', [\App\Http\Controllers\Dashboard\TicketController::class, 'index'])->name('index');
        Route::get('/create', [\App\Http\Controllers\Dashboard\TicketController::class, 'create'])->name('create');
        Route::post('/store', [\App\Http\Controllers\Dashboard\TicketController::class, 'store'])->name('store');
        Route::get('/{ticket}', [\App\Http\Controllers\Dashboard\TicketController::class, 'show'])->name('show');
    });

    Route::get('notifications', [\App\Http\Controllers\Dashboard\NotificationController::class, 'index'])->name('notifications.index');

    Route::get('/privacy-policy' , function (){
        return Inertia::render('dashboard/privacy-policy');
    })->name('privacy-policy');

    Route::get('/training' , function (){
        return Inertia::render('dashboard/training');
    })->name('training');



    Route::get('/trade' ,[\App\Http\Controllers\Dashboard\TradeController::class , 'index'])->name('trade');

    Route::prefix('wallets')->name('wallets.')->group(function () {
        Route::get('/' ,[\App\Http\Controllers\Dashboard\WalletController::class , 'index'])->name('index');
    });

});
