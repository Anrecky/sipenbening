<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'canLogin' => Route::has('login'),
    ]);
})->name('home');

Route::get('/dashboard/{date?}{start_date?}{end_date?}', [DashboardController::class, "index"])->middleware(['auth'])->name('dashboard');

require __DIR__ . '/auth.php';
