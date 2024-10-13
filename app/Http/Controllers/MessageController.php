<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Message;
use Inertia\Inertia;
use App\Services\TelegramNotificationService;

class MessageController extends Controller
{
    protected $telegramNotificationService;

    public function __construct(TelegramNotificationService $telegramNotificationService)
    {
        $this->telegramNotificationService = $telegramNotificationService;
    }

    // Function to store a message in the database
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'message' => 'required|string',
        ]);

        // Save the message
        $message = Message::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
        ]);

        // Log activity
        $this->logActivity('created', 'Message', $message->name); // Use $message->name

        // Send Telegram notification
        $this->telegramNotificationService->sendMessage("New message received: <b>{$message->name}</b> (Email: {$message->email})");

        return redirect()->route('contact')->with('success', 'Message sent successfully.');
    }

    // Function to fetch all messages and display them on the admin page
    public function index()
    {
        $messages = Message::all();
        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
            'flash' => session()->get('flash') // Ensure flash is available
        ]);
    }

    // Function to show message based on ID
    public function show($id)
    {
        $message = Message::findOrFail($id);

        $this->logActivity('view', 'Message', $message->name); 

        return Inertia::render('Admin/Messages/View', [
            'message' => $message,
        ]);
    }

    // Function to delete a message
    public function destroy($id)
    {
        // Find the message by ID
        $message = Message::findOrFail($id); // Store the message instance in a variable

        // Delete the message
        $message->delete();

        // Log activity
        $this->logActivity('deleted', 'Message', $message->name); // Use $message->name

        return redirect()->route('messages.index')->with('success', 'Message deleted successfully.');
    }

    // Function to log activity
    private function logActivity($action, $modelName, $modelIdentifier)
    {
        $user = Auth::user() ? Auth::user()->name : 'System';
        $description = "$user $action a $modelName (Name: $modelIdentifier)"; // Use name for description

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
