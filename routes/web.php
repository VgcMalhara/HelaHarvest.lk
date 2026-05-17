<?php

// Alias (as) පාවිච්චි කරලා වෙනස් නම් දෙමු
use App\Http\Controllers\Seller\DashboardController as SellerDashboard;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Buyer\BuyerDashboardController;
use App\Http\Controllers\Seller\ProductController;
use App\Http\Controllers\SellerAuthController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::get('/seller/register', [SellerAuthController::class, 'showRegisterForm'])->name('seller.register');
Route::post('/seller/register', [SellerAuthController::class, 'register'])->name('seller.register.post');

// Default User Dashboard
Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
});

// Seller Dashboard
Route::middleware(['auth', 'role:seller'])->prefix('seller')->name('seller.')->group(function () {
    Route::get('/dashboard', [SellerDashboard::class, 'index'])->name('dashboard');

    //products
    Route::resource('products', ProductController::class);
});

// Admin Dashboard
Route::middleware(['auth', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [AdminDashboard::class, 'index'])->name('dashboard');
});

Route::middleware(['auth', 'role:buyer'])->prefix('buyer')->name('buyer.')->group(function () {
    Route::get('/dashboard', [BuyerDashboardController::class, 'index'])->name('dashboard');
});

require __DIR__.'/settings.php';
