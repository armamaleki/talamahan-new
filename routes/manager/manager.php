<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('manager/index');
})->name('index');


Route::prefix('user')->name('user.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Manager\UserController::class, 'index'])->name('index');
    Route::get('/create', [\App\Http\Controllers\Manager\UserController::class, 'create'])->name('create');
    Route::post('/store', [\App\Http\Controllers\Manager\UserController::class, 'store'])->name('store');
    Route::get('/{user}', [\App\Http\Controllers\Manager\UserController::class, 'show'])->name('show');
    Route::get('/{user}/edit', [\App\Http\Controllers\Manager\UserController::class, 'edit'])->name('edit');
    Route::put('/{user}', [\App\Http\Controllers\Manager\UserController::class, 'update'])->name('update');
    Route::delete('/{user}', [\App\Http\Controllers\Manager\UserController::class, 'destroy'])->name('destroy');
});

Route::prefix('role')->name('role.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Manager\RoleController::class, 'index'])->name('index');
    Route::get('/create', [\App\Http\Controllers\Manager\RoleController::class, 'create'])->name('create');
    Route::post('/store', [\App\Http\Controllers\Manager\RoleController::class, 'store'])->name('store');
    Route::get('/{role}', [\App\Http\Controllers\Manager\RoleController::class, 'show'])->name('show');
    Route::get('/{role}/edit', [\App\Http\Controllers\Manager\RoleController::class, 'edit'])->name('edit');
    Route::put('/{role}', [\App\Http\Controllers\Manager\RoleController::class, 'update'])->name('update');
    Route::delete('/{role}', [\App\Http\Controllers\Manager\RoleController::class, 'destroy'])->name('destroy');
});


Route::prefix('ticket')->as('ticket.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Manager\TicketController::class, 'index'])->name('index');
    Route::get('/show/{ticket}', [\App\Http\Controllers\Manager\TicketController::class, 'show'])->name('show');
});

Route::prefix('notification')->as('notification.')->group(function () {
   Route::get('/', [\App\Http\Controllers\Manager\NotificationController::class, 'index'])->name('index');
   Route::get('/create', [\App\Http\Controllers\Manager\NotificationController::class, 'create'])->name('create');
   Route::post('/store', [\App\Http\Controllers\Manager\NotificationController::class, 'store'])->name('store');
   Route::get('live-notification', [\App\Http\Controllers\Manager\LiveNotificationController::class, 'index'])->name('live-notification');
   Route::post('live-notification/store', [\App\Http\Controllers\Manager\LiveNotificationController::class, 'store'])->name('live-notification.store');
});


Route::prefix('setting')->as('setting.')->group(function () {
    Route::get('/', [\App\Http\Controllers\Manager\SettingController::class, 'index'])->name('index');
    Route::post('/update', [\App\Http\Controllers\Manager\SettingController::class, 'update'])->name('update');
});
