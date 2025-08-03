<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function register(Request $request)
{
    $request->validate([...]); // validasi yang sudah ada

    $customer = Customer::create([...]); // create customer seperti sebelumnya

    // Create payment record
    $payment = $customer->payments()->create([
        'service_id' => Service::where('service_name', $request->service_name)->first()->id,
        'invoice_number' => 'INV-'.date('Ymd').'-'.strtoupper(Str::random(6)),
        'amount' => $request->service_price,
        'customer_data' => json_encode($request->all()),
        'status' => 'pending'
    ]);

    event(new Registered($customer));

    return Inertia::render('Auth/CustomerInvoice', [
        'invoiceData' => [
            ...$request->all(),
            'invoice_number' => $payment->invoice_number,
            'date' => now()->format('d F Y'),
            'payment' => $payment
        ]
    ]);
}

