import './bootstrap';
import '../css/app.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import necessary React and Inertia functions
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

// Get the app name from environment variables, or use a default value
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Create the Inertia app
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    // Resolve the page component dynamically using Laravel Vite Plugin
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    // Setup the root of the app
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    // Customize the progress bar color
    progress: {
        color: '#4B5563',
    },
});
