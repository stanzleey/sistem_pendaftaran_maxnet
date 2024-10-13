<?php

namespace App\Http\Controllers;

use App\Models\Service;
use App\Models\Site;
use App\Models\Customer;
use App\Models\Message;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Mengambil total data dari setiap model
        $totalServices = Service::count();
        $totalSites = Site::count();
        $totalCustomers = Customer::count();
        $totalMessages = Message::count();
        $totalUsers = User::count();
    
        // Mengambil aktivitas terbaru dari session
        $recentActivities = session('recent_activities', []);
    
        // Mengirimkan data ke komponen Dashboard
        return Inertia::render('Dashboard', [
            'totalServices' => $totalServices,
            'totalSites' => $totalSites,
            'totalCustomers' => $totalCustomers,
            'totalMessages' => $totalMessages,
            'totalUsers' => $totalUsers,
            'recentActivities' => $recentActivities,
        ]);
    }
    

    private function logActivity($description)
    {
        // Ambil aktivitas terbaru dari session
        $activities = session('recent_activities', []);

        // Tambahkan aktivitas baru
        $activities[] = [
            'user' => Auth::user() ? Auth::user()->name : 'System',
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
