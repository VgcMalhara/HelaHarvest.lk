<?php

// Alias (as) පාවිච්චි කරලා වෙනස් නම් දෙමු

use App\Http\Controllers\Admin\BuyerManagementController;
use App\Http\Controllers\Seller\DashboardController as SellerDashboard;
use App\Http\Controllers\Admin\DashboardController as AdminDashboard;
use App\Http\Controllers\Admin\ProductController as AdminProductController;
use App\Http\Controllers\Admin\SellerManagementController;
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

    Route::get('/sellers', [SellerManagementController::class, 'index'])->name('sellers.index');
    Route::get('/sellers/create', [SellerManagementController::class, 'create'])->name('sellers.create'); // Create Page View Route
    Route::post('/sellers', [SellerManagementController::class, 'store'])->name('sellers.store'); // Create Data Save Route
    Route::get('/sellers/{id}/edit', [SellerManagementController::class, 'edit'])->name('sellers.edit');
    Route::put('/sellers/{id}', [SellerManagementController::class, 'update'])->name('sellers.update');
    Route::patch('/sellers/{id}/status', [SellerManagementController::class, 'updateStatus'])->name('sellers.updateStatus');
    Route::delete('/sellers/{id}', [SellerManagementController::class, 'destroy'])->name('sellers.destroy');

    Route::resource('/buyers', BuyerManagementController::class);
    Route::patch('/buyers/{buyer}/status', [BuyerManagementController::class, 'updateStatus'])->name('buyers.updateStatus');

    Route::get('/products', [AdminProductController::class, 'index'])->name('products.index');
    Route::delete('/products/{product}', [AdminProductController::class, 'destroy'])->name('products.destroy');
    Route::get('/products/{product}', [AdminProductController::class, 'show'])->name('products.show');
});

Route::middleware(['auth', 'role:buyer'])->prefix('buyers')->name('buyers.')->group(function () {
    Route::get('/dashboard', [BuyerDashboardController::class, 'index'])->name('dashboard');

});

require __DIR__.'/settings.php';
