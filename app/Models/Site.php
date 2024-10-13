<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Site extends Model
{
    use HasFactory; // Make sure to use HasFactory if you're using factories

    // Specify the table if it's different from the default 'sites'
    protected $table = 'sites';

    // Specify your custom primary key
    protected $primaryKey = 'site_id';

    // If your primary key is not an auto-incrementing integer, set this to false
    public $incrementing = false;

    // If your primary key is not an integer, specify the key type
    protected $keyType = 'string'; // Keep this as 'string' since site_id is a custom format

    // Allow all attributes to be mass assignable
    protected $guarded = []; // Leave this empty or specify fields you want to guard

    // Optionally, define any casts or accessors/mutators here
}
