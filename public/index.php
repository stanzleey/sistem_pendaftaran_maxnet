<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

// Check If The Application Is Under Maintenance
if (file_exists($maintenance = __DIR__.'/../storage/framework/maintenance.php')) {
    require $maintenance; // Load the maintenance file if the app is in maintenance mode
}

// Register The Auto Loader
require __DIR__.'/../vendor/autoload.php'; // Ensure the autoload file is correctly included

// Run The Application
$app = require_once __DIR__.'/../bootstrap/app.php'; // Boot the Laravel application

$kernel = $app->make(Kernel::class); // Get the HTTP kernel

// Handle the incoming request and send the response
$response = $kernel->handle(
    $request = Request::capture()
);

// Send the response to the client
$response->send();

// Terminate the application (clean up resources)
$kernel->terminate($request, $response);
