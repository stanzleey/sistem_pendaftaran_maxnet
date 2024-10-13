<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\TelegramNotificationService;

class AppServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->singleton(TelegramNotificationService::class, function ($app) {
            return new TelegramNotificationService();
        });
    }

    public function boot()
    {
        //
    }
}
