<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Requests\Manager\Notification\StoreNotificationRequest;
use App\Http\Resources\Manager\Notification\NotificationCollection;
use App\Models\AppNotification;
use App\Models\User;
use http\Env\Request;
use App\Notifications\AppNotification as Notification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    public function index(Request $request)
    {
        $notifications = AppNotification::paginate(10);
        return Inertia::render('manager/notification/index', [
            'notifications' => new NotificationCollection($notifications),
        ]);
    }

    public function create()
    {
        return Inertia::render('manager/notification/create');
    }

    public function store(StoreNotificationRequest $request)
    {
        $title = $request->input('title');
        $message = $request->input('message');
//        $extra = $request->input('data', []);
        $users = User::all();
        foreach (array_chunk($users->all(), 20) as $key => $userGroup) {
            foreach ($users as $user) {
                $user->notify(
                    (new Notification($title, $message))
                        ->delay(now()->addSeconds($key * 60))
                );
            }
        }

        return to_route('manager.notification.index')->with('success', 'User created successfully.');

    }
}
