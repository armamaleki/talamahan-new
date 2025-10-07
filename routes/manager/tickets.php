<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::prefix('tickets')->name('tickets.')->middleware(['auth' , 'verified'])->group(function () {
    Route::get('/',function (){
        return Inertia::render('manager/tickets');
    })->name('index');
});
