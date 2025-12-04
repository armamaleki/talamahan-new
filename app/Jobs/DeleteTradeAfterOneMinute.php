<?php

namespace App\Jobs;

use App\Events\GoldTradeLobby;
use App\Events\TradeDeleted;
use App\Models\Trade;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Log;

class DeleteTradeAfterOneMinute implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public $trade;
    public function __construct( $tradeId)
    {
        $this->trade = Trade::find($tradeId);

    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        try {
            $this->trade->forceDelete();
            broadcast(new TradeDeleted($this->trade->id));
        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
