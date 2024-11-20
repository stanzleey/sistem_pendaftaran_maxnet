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
        ]);

        // Log activity
        $this->logActivity('created', 'Customer', $customer->name);

        // Generate the detail URL for the new customer
        $customerDetailUrl = "http://127.0.0.1:8000/Admin/customers/{$customer->id}";

        // Format the Telegram message
        $telegramMessage = "New Customer Request:\n" .
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
}
