<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrivacyPolicy extends Model
{
    use HasFactory;

    // The attributes that are mass assignable
    protected $table = 'privacy_policies';
    protected $fillable = ['content'];
    // Optional: if you have a different table name, specify it
    // protected $table = 'privacy_policies';

    // Optional: if you need to format the date in a specific way
    // protected $dates = ['created_at', 'updated_at'];
}
