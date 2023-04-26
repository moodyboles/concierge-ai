<?php 

if (!function_exists('formatValue')) 
{
    function formatValue($value) 
    {
        if (is_array($value)) {
            
            $value = array_map(function($item) {
                return formatText($item);
            }, $value);

            return implode(', ', $value);

        } else {
            return formatText($value);
        }
    }
}

if (!function_exists('formatText')) 
{
    function formatText($text) 
    {
        $text = str_replace("_", ' ', $text);
        $text = str_replace("-", ' ', $text);
        $text = str_replace("'", '', $text);
        $text = str_replace('"', '', $text);
        $text = ucwords($text);
        return $text;
    }
}