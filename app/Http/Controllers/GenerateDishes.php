<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Classes\AI\OpenAi\OpenAi;
use App\Service\EventService;

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
        return (new EventService)->createEvent($request);
    }

    public function generate(Request $request)
    {
        $this->store($request);
    }
}
