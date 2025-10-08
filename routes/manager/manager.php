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
