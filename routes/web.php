<?php

use App\Http\Controllers\ConflictOfInterestController;
use App\Http\Controllers\DashboardController;
use App\Models\Category;
use App\Models\ConflictOfInterest;
use App\Models\Department;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Beranda', [
        'canLogin' => Route::has('login'),
        'departments' => Department::all(),
        'categories' => Category::all(),
        'totalCOI' => ConflictOfInterest::count()
    ]);
})->name('home');

Route::get('/dashboard/{date?}{start_date?}{end_date?}', [DashboardController::class, "index"])->middleware(['auth'])->name('dashboard');

Route::resource('benturan-kepentingan', ConflictOfInterestController::class);

require __DIR__ . '/auth.php';
