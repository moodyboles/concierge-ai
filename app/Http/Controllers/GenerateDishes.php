<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Log;

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

    public function generate(Request $request)
    {
        return true;
    }
}
