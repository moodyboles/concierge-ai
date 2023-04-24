<?php 
namespace App\Classes\AI\Prompts;

use Illuminate\Support\Facades\Log;
use App\Classes\AI\OpenAi\Chat;

class EventPrompts extends Prompts
{
    private $event;

    function __construct($event)
    {
        parent::__construct();

        $this->event = $event;
    }

    public function getMessages() 
    {
        $chat = new Chat();
        $messages = [
            $chat->createMessage('system', $this->prompt('indentifier')),
            $chat->createMessage('user', $this->prompt('event')),
            $chat->createMessage('system', $this->prompt('generate')),
            $chat->createMessage('system', $this->prompt('format')),
        ];

        return $chat->validateMessages($messages);
    }

    public function getEventPrompt() 
    {
        $prompt = '';

        if ($this->event->type && $this->event->type != 'other') {
            $prompt .= 'Event Type: ' . formatValue($this->event->type) . '\n';
        }

        if ($this->event->occasion && $this->event->occasion != 'other') {
            $prompt .= 'Occasion: ' . formatValue($this->event->occasion) . '\n';
        }

        if ($this->event->cuisines) {
            $prompt .= 'Preferred Cuisines: ' . formatValue($this->event->cuisines) . '\n';
        }

        if ($this->event->diets) {
            $prompt .= 'Diets: ' . formatValue($this->event->diets) . '\n';
        }

        return $prompt;
    }

    public function getGeneratePrompt() 
    {
        return 'Based on the information the user provided, generate a list of dishes that would be appropriate for the event and diets provided. All dishes MUST be suitable for all diets provided.';
    }

    public function getFormatPrompt() 
    {
        return "Your response MUST be in a valid JSON format with the following structure:
        {
            \"response\": ,
            \"dishes\": { // array of dishes
                {
                    \"dishName\" : , // string
                    \"description\" : , // string of more details about the dish
                    \"course\" : , // string, example: appetizer, main, dessert, side, starter, canape, etc.
                },
            }
        }";
    }
}