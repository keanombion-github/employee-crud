<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\API\EmployeeController;

Route::prefix('api')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
});

Route::get('/', function () {
    return Inertia::render('EmployeeList');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
