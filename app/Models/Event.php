<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'occasion',
        'cuisines',
        'diets',
        'token_id',
    ];

    protected $casts = [
        'cuisines' => 'array',
        'diets' => 'array',
    ];

    protected $appends = [
        'formatted_type',
        'formatted_occasion',
        'formatted_cuisines',
        'formatted_diets',
    ];


    /**
     * Relationships
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function token()
    {
        return $this->belongsTo(Token::class);
    }
    

    /**
     * Attributes
     */
    public function getFormattedTypeAttribute()
    {
        return formatValue($this->type);
    }

    public function getFormattedOccasionAttribute()
    {
        return formatValue($this->occasion);
    }

    public function getFormattedCuisinesAttribute()
    {
        return formatValue($this->cuisines);
    }

    public function getFormattedDietsAttribute()
    {
        return formatValue($this->diets);
    }

}
