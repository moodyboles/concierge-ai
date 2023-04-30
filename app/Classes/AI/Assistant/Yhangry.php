<?php 
namespace App\Classes\AI\Assistant;

use Illuminate\Support\Facades\Log;
use GuzzleHttp\Client as Client;

class Yhangry 
{
    protected $type;
    protected $diets;
    protected $headers;

    function __construct($data)
    {
        $this->type = $data['type'];
        $this->diets = $data['diets'];
        $this->headers = [
            'x-api-token' => config('yhangry.api_key'),
            'Content-Type' => 'application/json',
        ];
    }

    public function getSimilarMenus() 
    {
        if (!config('yhangry.api_key')) return;

        $client = new Client();
        $res = $client->request('GET', config('yhangry.api_url') . 'similar-menus', [
            'headers' => $this->headers,
            'query' => [
                'type' => $this->type,
                'dietary_requirements' => $this->diets,
            ]
        ]);

        $body = $res->getBody();

        if (!$body) return;

        $data = json_decode($body, true)['data'];

        Log::debug($data);

        return $data;
    }
}