<?php 
namespace App\Classes\AI\OpenAi;

use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client;


class OpenAi  
{
    protected $client;
    protected $model;

    function __construct($model = 'gpt-3.5-turbo')
    {
        $this->client = \OpenAi::client(config('openai.api_key'));
        $this->model = $model;
    }

}