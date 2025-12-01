<?php

namespace App\Jobs;

use App\Models\Trade;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
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
        }catch (\Exception $e){
            Log::error($e->getMessage());
        }
    }
}
