<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Http\Resources\Dashboard\Tickets\TicketCollection;
use App\Http\Resources\Dashboard\Tickets\TicketResource;
use App\Models\Ticket;
use Illuminate\Http\Request;

use Inertia\Inertia;
use function Laravel\Prompts\error;

class TicketController extends Controller
{
    public function index()
    {
        $ticketsList = auth()->user()
            ->tickets()
            ->paginate(10);
        return Inertia::render('dashboard/ticket/index', [
            'ticketsList' => new TicketCollection($ticketsList),
        ]);
    }

    public function show(Ticket $ticket)
    {
        return Inertia::render('dashboard/ticket/show', [
            'ticket' => new TicketResource($ticket),
        ]);
    }

    public function create()
    {
        return Inertia::render('dashboard/ticket/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|min:3',
            'body' => 'required|string|min:5',
            'priority' => 'required|in:low,medium,high',
        ]);
        Ticket::create($validated);
        return to_route('tickets.index');
    }
}
