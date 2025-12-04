<?php
use Illuminate\Support\Facades\Broadcast;
Broadcast::channel('gold-trade-lobby', function ($user) {
    return [
        'id' => $user->id,
        'name' => $user->name,
    ] ;
});

Broadcast::channel('chart-price-channel', function () {
    return auth()->check();
});


Broadcast::channel('trade-purchase', function () {
    return auth()->check();
});

Broadcast::channel('trade-sale', function () {
    return auth()->check();
});

Broadcast::channel('gold-price-channel', function ($user) {
    return ['id' => $user->id, 'name' => $user->name];
});
