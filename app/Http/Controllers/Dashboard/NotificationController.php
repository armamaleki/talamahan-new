<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Notification\NotificationCollection;
use App\Models\AppNotification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index()
    {
        $notifications = AppNotification::where('user_id', auth()->id())
            ->latest()
            ->paginate(10);
        return Inertia::render('dashboard/notifications/index', [
            'notificationsList' => new NotificationCollection($notifications),
        ]);
    }
}
