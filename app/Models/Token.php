<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;
use Illuminate\Database\Eloquent\SoftDeletes;
 
class Token extends SanctumPersonalAccessToken
{
    use SoftDeletes;
    
    protected $table = 'personal_access_tokens';
    protected $appends = ['token_hint'];

    public function getTokenHintAttribute()
    {
        return substr($this->token, 0, 3) . '****' . substr($this->token, -4);
    }
}