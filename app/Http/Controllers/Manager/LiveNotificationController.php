<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\Notification\StoreLiveNotificationRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LiveNotificationController extends Controller
{
    public function index()
    {
        return Inertia::render('manager/notification/live-notification');
    }

    public function store(StoreLiveNotificationRequest $request)
    {
        event(new \App\Events\GoldTradeLobby($request->all()));
    }
}
