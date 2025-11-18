<?php

namespace App\Events;

use App\Models\Trade;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class TradeCreated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $trade;

    /**
     * Create a new event instance.
     */


    public function __construct(Trade $trade)
    {
        $this->trade = $trade;
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [new PrivateChannel("trades.{$this->trade->type}")];

    }

    public function broadcastAs(): string
    {
        return 'trade.created';
    }

    public function broadcastWith(): array
    {
        return [
            'id' => $this->trade->id,
            'side' => $this->trade->type,
            'start' => $this->trade->start,
        ];
    }
}
