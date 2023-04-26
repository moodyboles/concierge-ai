<?php 
namespace App\Classes\AI\Prompts;

use Illuminate\Support\Facades\Log;

class Prompts 
{
    function __construct()
    {
        //
    }

    public function prompt(string $string)
    {
        try {

            $payload = request()->all();
            $method = 'get' . ucfirst($string) . 'Prompt';
            
            if (method_exists($this, $method)) {

                return call_user_func([$this, $method], $payload);

            } else {

                Log::error('Prompt Method "' . $method . '" Not Found');
                abort(500, 'Prompt Method Not Found');

            }

        } catch (\Exception $exception) {

            Log::error($exception);
            Log::error('There was an error finding prompt method ' . $exception->getMessage());
            abort(500, 'There was an error finding prompt method');

        }
    }

    public function getIndentifierPrompt() 
    {
        return "You’re a helpful assistant that’s collecting information about a dining event to help the caterer to plan the menu based on the information shared.";
    }
}