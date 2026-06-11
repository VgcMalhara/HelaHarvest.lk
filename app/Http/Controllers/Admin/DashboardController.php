<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product; // Product Model එක (නම වෙනස් නම් ඒක දාන්න)
use App\Models\Order;   // Order Model එක (නම වෙනස් නම් ඒක දාන්න)
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Dashboard එකේ උඩින්ම පෙන්වන ප්‍රධාන කාඩ්ස් (Stats) ටික
        $stats = [
            'total_users'     => User::count(),
            'total_vendors'   => User::role('seller')->count(),
            // 'status' column එකක් තියෙනවා නම් Active ඒවා විතරක් ගන්න පුළුවන්, නැත්නම් කෙලින්ම count() කරන්න
            'active_listings' => Product::count(),
            // 'total_orders'    => Order::count(),
        ];

        // 2. Dashboard එකේ පල්ලෙහායින් පෙන්වන්න මෑතකදී ආපු Orders 5ක් (Order details + Customer name එක්ක)
        // $recentOrdersList = Order::with('user') // user relation එක හරහා customer නම ගන්න
        //     ->latest()
        //     ->take(5)
        //     ->get()
        //     ->map(function ($order) {
        //         return [
        //             'id' => $order->id,
        //             'customer_name' => $order->user ? $order->user->name : 'Guest Customer',
        //             'total_amount' => $order->total_price, // ඔයාගේ DB එකේ තියෙන column නම (e.g., total_amount)
        //             'status' => $order->status, // pending, completed, processing වගේ
        //             'date' => $order->created_at->toFormattedDateString(),
        //         ];
        //     });

        // 3. අලුතින්ම Register වුණු Sellers ලා 5 දෙනෙක් (විකුණුම්කරුවන්ගේ වර්ධනය බලාගන්න)
        $recentSellersList = User::role('seller')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($seller) {
                return [
                    'id' => $seller->id,
                    'name' => $seller->name,
                    'email' => $seller->email,
                    'joined_at' => $seller->created_at->toFormattedDateString(),
                ];
            });

        // Inertia එක හරහා Front-end (Admin/Dashboard.tsx) එකට ඩේටා ටික යවනවා
        return Inertia::render('Admin/Dashboard', [
            'stats'         => $stats,
            // 'recentOrders'  => $recentOrdersList,
            'recentSellers' => $recentSellersList,
        ]);
    }
}
