<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $primaryKey = 'serv_id';
    public $incrementing = false; // Because serv_id is not auto-incrementing
    protected $keyType = 'string';
    
    protected $fillable = [
        'serv_id', 'service_name', 'service_speed', 'service_description', 
        'service_price', 'service_discount', 'is_visible'
    ];
}