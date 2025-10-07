<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('manager')->name('manager.')->middleware(['auth' , 'verified'])->group(function () {
    Route::get('/',function (){
        return Inertia::render('manager/index');
    })->name('index');
});
