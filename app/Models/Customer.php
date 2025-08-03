<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'ktp_address',
        'phone_number',
        'installation_address',
        'location_maps',
        'service_name',
        'service_price',
        'payment_proof', // tambahkan ini
        'payment_status' // tambahkan ini
    ];
    public function payments()
{
    return $this->hasMany(Payment::class);
}
}
