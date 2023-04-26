<?php 
namespace App\Classes\AI\OpenAi;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class Chat extends OpenAi
{
    protected $availableRoles = ['user', 'system', 'assistant'];

    function __construct()
    {
        parent::__construct();
    }

    public function chat($messages) 
    {
        return $this->client->chat()->create([
            'model' => $this->model,
            'messages' => $messages,
        ]);
    }

    public function createMessage($role = 'user', $message) 
    {
        $validator = Validator::make(["role" => $role], [
            'role' => 'required|in:' . implode(',', $this->availableRoles),
        ]);

        if ($validator->fails()) {
            Log::error('Invalid role "' . $role . '"');
            return;   
        }

        return [
            'role' => $role, 
            'content' => $message,
        ];
    }

    public function validateMessages($messages) 
    {
        $validMessages = [];

        foreach ($messages as $message) {
            if (
                isset($message) &&
                isset($message['role']) &&
                isset($message['content']) &&
                in_array($message['role'], $this->availableRoles) &&
                !empty($message['content'])
            ) {
                $validMessages[] = $message;   
            }
        }

        return $validMessages;
    }
    
}