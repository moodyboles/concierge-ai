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
        $prompt = 'Event Type: ' . $this->formatValue($this->event->type) . '\n';
        $prompt .= 'Occasion: ' . $this->formatValue($this->event->occasion) . '\n';
        $prompt .= 'Preferred Cuisines: ' . $this->formatValue($this->event->cuisines) . '\n';
        $prompt .= 'Diets: ' . $this->formatValue($this->event->diets) . '\n';

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