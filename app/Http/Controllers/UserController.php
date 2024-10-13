<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/Users/Index', ['users' => $users]);
    }

    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);
    
        // Create the user and store the instance in $user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);
    
        // Now you can use the $user variable to log the activity
        $this->logActivity('created', 'User', $user->name);
    
        return redirect()->route('users.index')->with('success', 'User created successfully.');
    }    

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
        ]);
    }
    

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $id,
            'password' => 'nullable|string|min:8|confirmed',
        ]);
    
        $user = User::findOrFail($id);
        $user->name = $request->name;
        $user->email = $request->email;
    
        if ($request->password) {
            $user->password = Hash::make($request->password);
        }
    
        $user->save();

        $this->logActivity('updated', 'User', $user->name);
    
        return redirect()->route('users.index')->with('success', 'User updated successfully.');
    }
    

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        $this->logActivity('deleted', 'User', $user->name);

        return redirect()->route('users.index')->with('success', 'User deleted successfully.');
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
