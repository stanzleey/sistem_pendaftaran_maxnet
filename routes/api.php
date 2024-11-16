<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\LocationController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\TermsAndConditionsController;
// use App\Http\Controllers\CustomerController;
// use App\Http\Controllers\MessageController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Mendapatkan data pengguna yang diautentikasi menggunakan Sanctum
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::get('/sites', [SiteController::class, 'index']);
Route::get('/sites', [SiteController::class, 'getSites']);
Route::get('/services', [ServicesController::class, 'showServices']);
Route::get('/api/site-id', [SiteController::class, 'getLatestSiteId']);
Route::get('/privacy-policy', [PrivacyPolicyController::class, 'getContent']);
Route::get('/terms-and-conditions', [TermsAndConditionsController::class, 'getContent']);
// Route::post('/messages', [MessageController::class, 'store']);
// Route::post('/register-package', [CustomerController::class, 'store']);


// API untuk mendapatkan lokasi dari database (dapat diakses tanpa autentikasi)
// Route::get('/locations', [SiteController::class, 'getLocations']);

// // API untuk mendapatkan detail lokasi spesifik berdasarkan ID (contoh)
// Route::get('/locations/{id}', [SiteController::class, 'getLocationById']);

// // Jika Anda memiliki data lain yang perlu dikirimkan ke Leaflet, seperti provider
// Route::get('/providers', [SiteController::class, 'getProviders']);
