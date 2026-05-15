<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Seller/Dashboard', [
            'stats' => [
                'totalSales' => 12500,
                'activeOrders' => 8,
                'visitors' => 145,
            ],
            'sellerName' => auth()->user() ? auth()->user()->name : 'Chiran',
        ]);
    }
}
