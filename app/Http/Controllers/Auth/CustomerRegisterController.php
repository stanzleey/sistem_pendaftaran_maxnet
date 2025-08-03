<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\CustomerLogin;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Response;
use Inertia\Inertia;

class CustomerRegisterController extends Controller
{
    /**
     * Menampilkan form registrasi customer
     */
    public function showRegistrationForm(): Response
    {
        return Inertia::render('Auth/CustomerRegister');
    }

    /**
     * Memproses registrasi customer baru
     */
    public function register(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:customers',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'postal_code' => 'required|string|max:10',
        ]);

        $customer = CustomerLogin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'address' => $request->address,
            'city' => $request->city,
            'postal_code' => $request->postal_code,
        ]);
        
        event(new Registered($customer));

        // Redirect ke halaman login dengan pesan sukses
        return redirect()->route('customer.login')
            ->with('success', 'Registrasi berhasil! Silakan login dengan akun Anda.');
    }
}