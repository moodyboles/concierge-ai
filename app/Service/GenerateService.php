<?php
namespace App\Service;

use App\Models\Event;
use App\Models\Menu;
use Illuminate\Support\Facades\Log;

use App\Classes\AI\OpenAi\Chat;
use App\Classes\AI\Prompts\EventPrompts;

class GenerateService 
{
    protected $event;

    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    public function generateDishesFromEvent() 
    {
        $eventPrompt = new EventPrompts($this->event);
        // return [$eventPrompt->getMessages()];
        
        $chat = new Chat();
        $response = $chat->chat($eventPrompt->getMessages());

        $response = $chat->formatResponse($response);

        $menu = Menu::create([
            'event_id' => $this->event->id,
            'response' => $response['response'],
            'dishes' => $response['dishes'],
        ]);

        Log::debug([$this->event->id, $response]);

        return [$response];
    }

}