<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Http\Controllers\Controller;
use App\Service\EventService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Service\GenerateService;

class DishesApiController extends Controller
{
    public function get(Request $request)
    {
        if ($request->bearerToken()) {

            $token_id = $request->user()->currentAccessToken()->id;
            $request->token_id = $token_id;

            $event = (new EventService)->createEvent($request);

            if (isset($event->id)) {
                $event_id = $event->id;
                $request->event_id = $event_id;
            }

        } else {
            $event_id = $request->event_id;
        }


        $validator = Validator::make(["event_id" => $event_id], [
            'event_id' => [
                'required',
                'exists:events,id,user_id,' . Auth::id(),
            ],
        ]);

        if ($validator->fails()) return $this->unauthorized();

        $event = Event::find($request->event_id);

        if (!$event) return $this->unauthorized();

        $generateService = new GenerateService($event);
        return $generateService->generateDishesFromEvent();
    }

    public function unauthorized() 
    {
        return response()->json(['error' => 'Unauthorized'], 401);
    }

}
