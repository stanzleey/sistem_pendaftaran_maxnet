<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Site;
use Illuminate\Support\Facades\Auth; // Make sure to import Auth

class SiteController extends Controller
{
    public function index()
    {
        $sites = Site::all();
        return Inertia::render('Admin/Sites/Index', [
            'sites' => $sites,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Sites/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'site_id' => 'required|unique:sites,site_id',
            'site_name' => 'required',
            'site_parent' => 'required',
            'site_picture' => 'nullable', // Make site_picture not required
            'site_type_id' => 'required',
            'site_location_maps' => 'required',
            'site_address' => 'required',
            'site_port_capacity' => 'required|integer',
        ]);

        // Generate the site ID
        $request->merge(['site_id' => $this->generateSiteId()]);

        // Log activity for creating a site
        $this->logActivity('created', 'Site', $request->site_name);

        Site::create($request->all());

        return redirect()->route('sites.index')->with('success', 'Site created successfully.');
    }

    public function edit(Site $site)
    {
        return Inertia::render('Admin/Sites/Edit', [
            'site' => $site
        ]);
    }

    public function update(Request $request, Site $site)
    {
        $request->validate([
            'site_id' => 'required',
            'site_name' => 'required',
            'site_parent' => 'required',
            'site_picture' => 'nullable', // Make site_picture not required
            'site_type_id' => 'required',
            'site_location_maps' => 'required',
            'site_address' => 'required',
            'site_port_capacity' => 'required|integer',
        ]);
    
        // Prepare data for update
        $data = $request->all();
    
        // Only include site_picture if it was provided
        if (empty($data['site_picture'])) {
            unset($data['site_picture']);
        }
    
        // Log activity for updating a site
        $this->logActivity('updated', 'Site', $site->site_name);
    
        // Update the site with the prepared data
        $site->update($data);
    
        return redirect()->route('sites.index')->with('success', 'Site updated successfully.');
    }
    
    public function destroy(Site $site)
    {
        // Log activity for deleting a site
        $this->logActivity('deleted', 'Site', $site->site_name);
        
        $site->delete();

        return redirect()->route('sites.index');
    }

    public function show($id)
    {
        // Fetch site details from database
        $site = Site::findOrFail($id);

        // Parse coordinates from site_location_maps
        list($lat, $lng) = explode(',', $site->site_location_maps);

        // Pass site data to Inertia React component
        return Inertia::render('SiteDetails', [
            'site' => [
                'name' => $site->site_name,
                'address' => $site->site_address,
                'lat' => floatval($lat),
                'lng' => floatval($lng),
            ],
        ]);
    }

    public function getSites()
    {
        $sites = Site::all();
        return response()->json($sites);
    }

    // Function to generate site_id automatically
    private function generateSiteId()
    {
        $year = date('y'); // Get last two digits of the current year
        $month = date('m'); // Get the current month
        $latest = Site::whereYear('created_at', date('Y'))->whereMonth('created_at', date('m'))->count();
        $order = str_pad($latest + 1, 4, '0', STR_PAD_LEFT); // Create a sequential order padded to 4 digits

        return "{$year}{$month}{$order}"; // Format: '24100001'
    }

    private function logActivity($action, $modelName, $modelIdentifier)
    {
        $user = Auth::user() ? Auth::user()->name : 'System';
        $description = "$user $action a $modelName (Name: $modelIdentifier)"; // Use the name for description

        // Get recent activities from session
        $activities = session('recent_activities', []);

        // Add new activity
        $activities[] = [
            'user' => $user,
            'description' => $description,
            'timestamp' => now()->toDateTimeString(),
        ];

        // Limit the number of stored activities
        if (count($activities) > 10) {
            array_shift($activities); // Remove the oldest
        }

        // Save back to session
        session(['recent_activities' => $activities]);
    }
}
