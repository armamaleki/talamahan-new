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
});
