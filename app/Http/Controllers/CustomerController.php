<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Services\TelegramNotificationService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    protected $telegramNotificationService;

    public function __construct(TelegramNotificationService $telegramNotificationService)
    {
        $this->telegramNotificationService = $telegramNotificationService;
    }

    public function index()
    {
        $customers = Customer::all();
        return Inertia::render('Admin/Customers/Index', ['customers' => $customers]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:customers,email',
            'ktp_address' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
            'installation_address' => 'required|string|max:255',
            'location_maps' => 'nullable|string|max:255',
            'service_name' => 'required|exists:services,service_name',
            'service_price' => 'required|exists:services,service_price',
        ]);

        // Create a new customer instance
        $customer = Customer::create([
            'name' => $request->name,
            'email' => $request->email,
            'ktp_address' => $request->ktp_address,
            'phone_number' => $request->phone_number,
            'installation_address' => $request->installation_address,
            'location_maps' => $request->location_maps,
            'service_name' => $request->service_name,
            'service_price' => $request->service_price,
        ]);

        // Log activity
        $this->logActivity('created', 'Customer', $customer->name);

        // Generate the detail URL for the new customer
        $customerDetailUrl = "http://127.0.0.1:8000/Admin/customers/{$customer->id}";

        // Format the Telegram message
        $telegramMessage = "Pelanggan Baru:\n".
                           "{$customer->name}\n" .
                           "{$customer->installation_address}\n" .
                           "{$customer->service_name}\n" .
                           "{$customer->phone_number}\n" .
                           "{$customer->location_maps}\n\n" .
                           "{$customerDetailUrl}";

        // Send the notification to Telegram
        $this->telegramNotificationService->sendMessage($telegramMessage);

        return redirect()->route('customers')->with('success', 'Customer created successfully.');
    }

    public function destroy(Customer $customer)
    {
        $customer->delete();

        $this->logActivity('deleted', 'Customer', $customer->name);

        return redirect()->route('customers.index')->with('success', 'Customer deleted successfully.');
    }

    public function show($id)
    {
        $customer = Customer::findOrFail($id);

        $this->logActivity('view', 'Customer', $customer->name);

        return Inertia::render('Admin/Customers/View', [
            'customer' => $customer,
        ]);
    }

    private function logActivity($action, $modelName, $modelIdentifier)
    {
        $user = Auth::user() ? Auth::user()->name : 'System';
        $description = "$user $action a $modelName (Name: $modelIdentifier)";

        // Get recent activities from session
        $activities = session('recent_activities', []);

        // Add new activity
        $activities[] = [
            'user' => $user,
            'description' => $description,
            'timestamp' => now()->toDateTimeString(),
        ];

        // Limit the number of activities stored, e.g., only the 10 most recent
        if (count($activities) > 10) {
            array_shift($activities); // Remove the oldest one
        }

        // Save back to session
        session(['recent_activities' => $activities]);
    }
    // app/Http/Controllers/CustomerController.php
public function uploadPaymentProof(Request $request, $id)
{
    $request->validate([
        'payment_proof' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        function ($attribute,$value, $fail){
          $image= getimagesize($value);
          if ($image[0]<300 || $image[1] <300 ){
            $fail('Resolusi gambar terlalu kecil. Minimal 300x300 piksel.');
          }  
        }
    ]);

    $customer = Customer::findOrFail($id);

    if ($request->hasFile('payment_proof')) {
        $image = $request->file('payment_proof');
        $imageName = time().'.'.$image->extension();
        $image->storeAs('public/payment_proofs', $imageName);
        
        $customer->update([
            'payment_proof' => $imageName,
            'payment_status' => 'pending_verification'
        ]);

        // Kirim notifikasi ke Telegram
        $telegramMessage = "Bukti Pembayaran Baru:\n".
                         "Pelanggan: {$customer->name}\n" .
                         "Paket: {$customer->service_name}\n" .
                         "Jumlah: Rp " . number_format($customer->service_price + 250000, 0, ',', '.') . "\n\n" .
                         "Detail: http://127.0.0.1:8000/Admin/customers/{$customer->id}";

        $this->telegramNotificationService->sendMessage($telegramMessage);

        return redirect()->back()->with('success', 'Bukti pembayaran berhasil diupload!');
    }

    return redirect()->back()->with('error', 'Gagal mengupload bukti pembayaran.');
}
}
