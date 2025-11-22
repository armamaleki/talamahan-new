<?php
use Illuminate\Support\Facades\Broadcast;
use App\Models\User;
Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return (int)$user->id === (int)$id;
});

//Broadcast::channel('test', function () {
//    return true;
//});

//Broadcast::channel('test', function (User $user) {
//    return ['name' => $user->name];
//});

Broadcast::channel('gold-trade-lobby', function ($user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
    ] ;
});

Broadcast::channel('chart-price-channel', function () {
    return auth()->check();
});


Broadcast::channel('trades.purchase', function () {
    return auth()->check();
});

Broadcast::channel('trades.sale', function () {
    return auth()->check();
});

Broadcast::channel('gold-price-channel', function ($user) {
    return ['id' => $user->id, 'name' => $user->name];
});
