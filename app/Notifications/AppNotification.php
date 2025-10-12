<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AppNotification extends Notification implements ShouldQueue
{
    use Queueable;
    public $title;
    public $message;
    public $extraData;

    /**
     * Create a new notification instance.
     */
    public function __construct($title, $message, $extraData = [])
    {
        $this->title = $title;
        $this->message = $message;
        $this->extraData = $extraData;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail' , 'database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
//        return (new MailMessage)->markdown('mail.app-notification');
        return (new MailMessage)
            ->subject($this->title)
            ->line($this->message);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */

    public function toDatabase($notifiable)
    {
        \App\Models\AppNotification::create([
            'user_id' => $notifiable->id,
            'title' => $this->title,
            'message' => $this->message,
            'type' => 'database|email|broadcast',
            'data' => $this->extraData,
            'sent_at' => now(),
        ]);
        return [
            'title' => $this->title,
            'message' => $this->message,
            'data' => $this->extraData,
        ];
    }
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
