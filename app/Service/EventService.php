<?php
namespace App\Service;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class EventService 
{
    protected $eventId;

    public function setEventId($id)
    {
        $this->eventId = $id;
    }

    public function createEvent(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'type' => [
                    'required',
                    'in:' . implode(',', array_keys(config('event.options.types'))),
                ],
                'occasion' => [
                    'required',
                    'in:' . implode(',', array_keys(config('event.options.occasions'))),
                ],
                'cuisines' => [
                    'sometimes',
                    'array',
                ],
                'diets' => [
                    'sometimes',
                    'array',
                ],
            ]);

            if ($validator->fails()) {
                return ["error" => $validator->errors()->first()];
            }
            
            $event = Event::create([
                'user_id' => Auth::id(),
                'type' => $request->type ?? null,
                'occasion' => $request->occasion ?? null,
                'cuisines' => $request->cuisines && count($request->cuisines) > 0 
                    ? $request->cuisines
                    : null,
                'diets' => $request->diets && count($request->diets) > 0 
                    ? $request->diets
                    : null,
                'token_id' => $request->token_id ?? null,
            ]);

            $this->setEventId($event->id);
    
            return $event;

        } catch (\Exception $e) {
            Log::error('Error Creating Event: ' . $e->getMessage() );
            return false;
        }

    }

}