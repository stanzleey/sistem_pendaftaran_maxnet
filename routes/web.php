<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ServicesController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PrivacyPolicyController;
use App\Http\Controllers\TermsAndConditionsController;
use App\Models\Service;
use App\Http\Controllers\Auth;
use App\Models\PrivacyPolicy;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Public routes
Route::get('/', function () {
    return Inertia::render('Home/Home');
})->name('home');

Route::get('/tentang', function () {
    return Inertia::render('Home/Tentang');
})->name('tentang');

Route::get('/locations/packages', function () {
    return Inertia::render('Packages/Packages');
})->name('packages');

Route::get('/packages', function () {
    return Inertia::render('Home/Paket');
})->name('paket');


Route::get('/locations', function () {
    return Inertia::render('Locations/Locations');
})->name('locations');

Route::get('/customers', function () {
    return Inertia::render('Customers/Customers');
})->name('customers');

Route::get('/contact', function () {
    return Inertia::render('Contact/Contact', [
        'success' => session('success'),
    ]);
})->name('contact');

Route::get('/privacy-policy', function () {
    // $privacyPolicies = PrivacyPolicy::all(); // Fetch all policies
    return Inertia::render('PrivacyPolicy/PrivacyPolicy', [
    ]);
})->name('privacy-policy');

Route::get('/api/privacy-policy', function () {
    $privacyPolicies = PrivacyPolicy::all(); // Fetch all policies
    return response()->json($privacyPolicies);
});

Route::get('/terms-and-conditions', function () {
    // $privacyPolicies = PrivacyPolicy::all(); // Fetch all policies
    return Inertia::render('TermsConditions/TermsConditions', [
    ]);
})->name('terms-and-conditions');

Route::get('/customers/thankyou', function () {
    return Inertia::render('Customers/Thankyou', [
    ]);
})->name('thankyou');

// API route for fetching visible services
Route::get('/api/services', function () {
    return Service::select('service_name', 'service_speed', 'service_price')
                  ->where('is_visible', 1)
                  ->get();
})->name('api.services');

Route::get('/api/site-id', [SiteController::class, 'getLatestSiteId']);

Route::post('/admin/customers', [CustomerController::class, 'store']);
Route::post('/messages', [MessageController::class, 'store']);

Route::post('/privacy-policy', [PrivacyPolicyController::class, 'store']);
Route::get('/admin/privacy-policy', [PrivacyPolicyController::class, 'index'])->name('privacy-policy.index');
Route::get('/privacy-policy/content', [PrivacyPolicyController::class, 'getContent']);
Route::put('/privacy-policy/{id}', [PrivacyPolicyController::class, 'update'])->name('privacy-policy.update');
Route::delete('/privacy-policy/{id}', [PrivacyPolicyController::class, 'destroy'])->name('privacy-policy.destroy');

Route::post('/terms-and-conditions', [TermsAndConditionsController::class, 'store']);
// Route::get('/Admin/terms-and-conditions', [TermsAndConditionsController::class, 'index'])->name('terms-and-conditions.index');
Route::get('/terms-and-conditions/content', [TermsAndConditionsController::class, 'getContent']);
Route::put('/terms-and-conditions/{id}', [TermsAndConditionsController::class, 'update'])->name('terms-and-conditions.update');
Route::delete('/terms-and-conditions/{id}', [TermsAndConditionsController::class, 'destroy'])->name('terms-and-conditions.destroy');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('Admin')->group(function () {
        Route::resource('services', ServicesController::class);
        Route::resource('sites', SiteController::class);
        Route::resource('customers', CustomerController::class)->only(['index', 'destroy','show', 'store']);
        Route::resource('messages', MessageController::class);
        Route::resource('users', UserController::class)->only(['index', 'edit', 'update', 'destroy','create','store']);
        Route::resource('privacy-policy', PrivacyPolicyController::class);
        Route::resource('terms-and-conditions', TermsAndConditionsController::class);
    });

 
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});


require __DIR__.'/auth.php';
