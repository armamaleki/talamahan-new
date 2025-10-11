<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Http\Resources\Manager\Ticket\ShowTicketResource;
use App\Http\Resources\Manager\Ticket\TicketCollection;
use App\Http\Resources\Manager\Ticket\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketController extends Controller
{
    public function index(Request $request)
    {
        $ticketsList = Ticket::paginate(10);
        return Inertia::render('manager/ticket/index', [
            'ticketsList' => new TicketCollection($ticketsList),
        ]);
    }

    public function show(Ticket $ticket)
    {
        return Inertia::render('manager/ticket/show', [
            'ticketItem' => new ShowTicketResource($ticket),
        ]);
    }
}
