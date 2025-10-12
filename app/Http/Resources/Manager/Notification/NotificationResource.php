<?php

namespace App\Http\Resources\Manager\Notification;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'user'=>$this->user->name,
            'title'=>$this->title,
            'type'=>$this->type,
            'is_read'=>$this->is_read,
            'sent_at'=>Carbon::create($this->sent_at)->ago(),
            'created'=>Carbon::create($this->created_at)->ago(),
            'data'=>$this->data,
        ];
    }
}
