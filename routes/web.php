<?php

use App\Http\Controllers\Seller\DashboardController;
use App\Http\Controllers\SellerAuthController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/seller/register', [SellerAuthController::class, 'showRegisterForm'])->name('seller.register');
Route::post('/seller/register', [SellerAuthController::class, 'register'])->name('seller.register.post');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});
Route::middleware(['auth'])->group(function () {
    Route::get('/seller/dashboard', [DashboardController::class, 'index'])->name('seller.dashboard');
});
require __DIR__.'/settings.php';
