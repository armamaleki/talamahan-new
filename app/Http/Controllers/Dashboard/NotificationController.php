<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = auth()->user()->notifications()->paginate(10);
        return Inertia::render('dashboard/notifications/index', [
            'notificationsList' => $notifications,
        ]);
    }
}
