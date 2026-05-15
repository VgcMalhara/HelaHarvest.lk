<?php

namespace App\Http\Controllers\Buyer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BuyerDashboardController extends Controller
{
    /**
     * Display the buyer dashboard.
     */
    public function index(Request $request): Response
    {
        // මෙතන දැනට Mock data තියෙන්නේ. පස්සේ Database එකට සම්බන්ධ කරන්න.
        return Inertia::render('Buyer/Dashboard', [
            'status' => session('status'),
            // උදාහරණයක් විදිහට orders count එක යවන හැටි:
            'stats' => [
                'active_orders' => 3,
                'wishlist_count' => 12,
                'total_savings' => 1250,
            ],
            // දැනට එන ගමන් තියෙන ඇණවුම්
            'recent_shipments' => [
                [
                    'id' => 'HH-7821',
                    'item_name' => 'Organic Veggie Pack',
                    'vendor' => 'Green Farms SL',
                    'status' => 'In Transit',
                    'delivery_status' => 'Near Ja-Ela Center',
                    'expected_date' => 'Today',
                ]
            ]
        ]);
    }
}
