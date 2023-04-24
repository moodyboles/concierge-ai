<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use App\Classes\AI\OpenAi\OpenAi;

class GenerateDishes extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('GenerateDishes/GenerateDishes', [
            'types' => config('event.options.types'),
            'occasions' => config('event.options.occasions'),
            'cuisines' => config('event.options.cuisines'),
            'diets' => config('event.options.diets'),
        ]);
    }

    public function store(Request $request)
    {
        $event = Event::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'occasion' => $request->occasion,
            'cuisines' => $request->cuisines,
            'diets' => $request->diets,
        ]);

        return $event;
    }

    public function generate(Request $request)
    {
        $this->store($request);
    }
}
