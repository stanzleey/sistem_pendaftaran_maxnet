<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class TelegramNotificationService
{
    protected $chatId;
    protected $botToken;

    public function __construct()
    {
        $this->chatId = env('TELEGRAM_CHAT_ID'); // Your Telegram chat ID
        $this->botToken = env('TELEGRAM_BOT_TOKEN'); // Your Telegram bot token
    }

    public function sendMessage($message)
    {
        $response = Http::post("https://api.telegram.org/bot{$this->botToken}/sendMessage", [
            'chat_id' => $this->chatId,
            'text' => $message,
            'parse_mode' => 'HTML',
        ]);
    
        // Tambahkan logging untuk debug
        if (!$response->successful()) {
            \Log::error('Telegram Notification Error: ', $response->json());
        }
    
        return $response->successful();
    }
    
}
