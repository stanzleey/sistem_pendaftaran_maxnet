<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\TermsAndConditions;
use Inertia\Inertia;

class TermsAndConditionsController extends Controller
{
    public function index()
    {
        // Mengambil semua data dari tabel terms_and_conditions
        $termsAndConditions = TermsAndConditions::all();

        // Mengirim data ke halaman utama dengan Inertia
        return Inertia::render('Admin/TermsConditions/Index', [
            'termsAndConditions' => $termsAndConditions,
            'flash' => session('success'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/TermsConditions/Create');
    }

    public function store(Request $request)
    {
        // Validasi data request
        $request->validate([
            'content' => 'required|string',
        ]);

        // Membuat entri baru untuk Terms and Conditions
        $termsAndConditions = TermsAndConditions::create([
            'content' => $request->content,
        ]);

        // Redirect ke halaman index dengan pesan sukses
        return redirect()->route('terms-and-conditions.index')->with([
            'success' => 'Terms and Conditions created successfully!',
            'newTerms' => $termsAndConditions
        ]);
    }

    public function show()
    {
        $termsAndConditions = TermsAndConditions::first();

        if (!$termsAndConditions) {
            return response()->json([
                'content' => 'Terms and Conditions not available.',
            ], 404);
        }

        return response()->json([
            'content' => $termsAndConditions->content,
        ]);
    }

    public function edit($id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);

        return Inertia::render('Admin/TermsConditions/Edit', [
            'termsAndConditions' => $termsAndConditions,
        ]);
    }

    public function update(Request $request, $id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);

        $validatedData = $request->validate([
            'content' => 'required|string',
        ]);

        $termsAndConditions->update($validatedData);

        $this->logActivity('updated', 'Terms and Conditions', $termsAndConditions->id);

        return redirect()->route('terms-and-conditions.index')->with('success', 'Terms and Conditions updated successfully.');
    }

    public function destroy($id)
    {
        $termsAndConditions = TermsAndConditions::findOrFail($id);
        $termsAndConditions->delete();

        return redirect()->route('terms-and-conditions.index')->with('success', 'Terms and Conditions deleted successfully.');
    }

    public function getContent()
    {
        // Mengambil konten Terms and Conditions dari database
        $termsAndConditions = TermsAndConditions::select('content')->first();

        return response()->json([
            'content' => $termsAndConditions ? $termsAndConditions->content : null,
        ]);
    }

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
