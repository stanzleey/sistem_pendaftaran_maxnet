<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\PrivacyPolicy;
use Inertia\Inertia;

class PrivacyPolicyController extends Controller
{
    public function index()
    {
        // Mengambil semua data dari tabel privacy_policies
        $privacyPolicies = PrivacyPolicy::all();

        // Mengirim data ke halaman utama dengan Inertia
        return Inertia::render('Admin/PrivacyPolicy/Index', [
            'privacyPolicies' => $privacyPolicies,
            'flash' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/PrivacyPolicy/Create');
    }

public function store(Request $request)
{
    // Validate the incoming request data
    $request->validate([
        'content' => 'required|string',
    ]);

    // Create a new privacy policy entry with the provided content
    $privacyPolicy = PrivacyPolicy::create([
        'content' => $request->content,
    ]);

    // Return response with data to be used in Inertia frontend
    return redirect()->route('privacy-policy.index')->with([
        'success' => 'Privacy Policy created successfully!',
        'newPolicy' => $privacyPolicy
    ]);
    
}

    public function show()
    {
        $privacyPolicy = PrivacyPolicy::first();

        if (!$privacyPolicy) {
            return response()->json([
                'content' => 'Privacy policy not available.',
            ], 404);
        }

        return response()->json([
            'content' => $privacyPolicy->content,
        ]);
    }
    public function edit($id)
    {
        $privacyPolicy = PrivacyPolicy::findOrFail($id);
    
        return Inertia::render('Admin/PrivacyPolicy/Edit', [
            'privacyPolicy' => $privacyPolicy,
        ]);
    }

    public function update(Request $request, $id)
    {
        $privacyPolicy = PrivacyPolicy::findOrFail($id);
    
        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);
    
        $privacyPolicy->update($validatedData);

        $this->logActivity('updated', 'Privacy Policy', $privacyPolicy->id);
        return redirect()->route('privacy-policy.index', $id)->with('success', 'Privacy Policy updated successfully.');
    }
    

    public function destroy($id)
    {
        $privacyPolicy = PrivacyPolicy::findOrFail($id);
        $privacyPolicy->delete();
    
        return redirect()->route('privacy-policy.index')->with('success', 'Policy deleted successfully.');
    }
    

    public function getContent()
    {
        // Mengambil konten privacy policy dari database
        $privacyPolicy = PrivacyPolicy::select('content')->first();

        return response()->json([
            'content' => $privacyPolicy ? $privacyPolicy->content : null,
        ]);
    }
    // public function show()
    // {
    //     $privacyPolicy = PrivacyPolicy::first();
    
    //     return Inertia::render('PrivacyPolicy/Show', [
    //         'content' => $privacyPolicy ? $privacyPolicy->content : 'Privacy policy not available.',
    //     ]);
    // }

    private function logActivity($action, $modelName, $modelIdentifier)
    {
        $user = Auth::user() ? Auth::user()->name : 'System';
        $description = "$user $action a $modelName (ID: $modelIdentifier)";

        $activities = session('recent_activities', []);

        $activities[] = [
            'user' => $user,
            'description' => $description,
            'timestamp' => now()->toDateTimeString(),
        ];

        if (count($activities) > 10) {
            array_shift($activities);
        }

        session(['recent_activities' => $activities]);
    }
}
