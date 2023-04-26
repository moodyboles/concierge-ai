<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Events/Events', [
            'events' => Auth::user()->events()->with([
                'token' => function ($query) {
                    $query->select('id', 'name');
                },
            ])->orderBy('created_at', 'desc')->get(),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::where('id', $id)
            ->where('user_id', Auth::id())
            ->with([
                'token' => function ($query) {
                    $query->select('id', 'name');
                },
            ])
            ->firstOrFail();
        
        return Inertia::render('Events/EventDetails/EventDetails', [
            'event' => $event,
        ]);
    }

}
