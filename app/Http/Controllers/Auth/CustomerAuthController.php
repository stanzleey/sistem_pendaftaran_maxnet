<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerAuthController extends Controller
{
    /**
     * Menampilkan form login customer
     */
    public function showLoginForm()
    {
        return inertia('Auth/CustomerLogin');
    }

    /**
     * Memproses login customer
     */
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::guard('customer')->attempt($credentials, $request->remember)) {
        $request->session()->regenerate();
        return redirect()->route('home'); // Redirect to home after login
    }

    return back()->withErrors([
        'email' => 'Email atau password salah',
    ])->onlyInput('email');
}

    /**
     * Logout customer
     */
    public function logout(Request $request)
    {
        Auth::guard('customer')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/');
    }
}