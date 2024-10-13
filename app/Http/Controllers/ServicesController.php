<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ServicesController extends Controller
{
    // Display the list of services
    public function index()
    {
        $services = Service::all();
        return Inertia::render('Admin/Services/Index',  ['services' => $services]);
    }

    // Show the create form
    public function create()
    {
        return Inertia::render('Admin/Services/Create');
    }

    // Store a new service
    public function store(Request $request)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'service_speed' => 'required|integer',
            'service_description' => 'required|string|max:255',
            'service_price' => 'required|string|max:255',
            'service_discount' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ]);

        // Generate random `serv_id` code for the new service
        $validated['serv_id'] = $this->generateServiceId();

        Service::create($validated);

        $this->logActivity('created', 'Service', $validated['service_name']);

        return redirect()->route('services.index')->with('success', 'Service created successfully.');
    }

    // Show the edit form for a specific service
    public function edit(Service $service)
    {
        return Inertia::render('Admin/Services/Edit', ['service' => $service]);
    }

    // Update an existing service
    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'service_name' => 'required|string|max:255',
            'service_speed' => 'required|integer',
            'service_description' => 'required|string|max:255',
            'service_price' => 'required|string|max:255',
            'service_discount' => 'required|string|max:255',
            'is_visible' => 'boolean',
        ]);

        $service->update($validated);

        $this->logActivity('updated', 'Service', $service->service_name);

        return redirect()->route('services.index')->with('success', 'Service updated successfully.');
    }

    // Delete a service
    public function destroy($id)
    {
        $service = Service::findOrFail($id);
        $service->delete();

        $this->logActivity('deleted', 'Service', $service->service_name);

        return redirect()->route('services.index')->with('success', 'Service deleted successfully.');
    }
    

    // Show all services (API example)
    public function showServices()
    {
        $services = Service::all();
        return response()->json($services);
    }

    // Helper function to generate a random service ID
    private function generateServiceId()
    {
        return strtoupper(bin2hex(random_bytes(5))); // Generates a random 10-character alphanumeric string
    }

    private function logActivity($action, $modelName, $modelIdentifier)
    {
        $user = Auth::user() ? Auth::user()->name : 'System';
        $description = "$user $action a $modelName (Name: $modelIdentifier)"; // Menggunakan nama untuk deskripsi

        // Ambil aktivitas terbaru dari session
        $activities = session('recent_activities', []);

        // Tambahkan aktivitas baru
        $activities[] = [
            'user' => $user,    
            'description' => $description,
            'timestamp' => now()->toDateTimeString(),
        ];

        // Batasi jumlah aktivitas yang disimpan, misalnya hanya 10 terbaru
        if (count($activities) > 10) {
            array_shift($activities); // Menghapus yang paling lama
        }

        // Simpan kembali ke session
        session(['recent_activities' => $activities]);
    }
}
