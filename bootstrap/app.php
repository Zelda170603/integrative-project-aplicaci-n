<?php

use App\Http\Middleware\Administrador;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\Fabricante;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->validateCsrfTokens(
            ['/*']
        );
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            "web" => HandleInertiaRequests::class,
            "fabricante" => Fabricante::class,
            "administrador" => Administrador::class
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
