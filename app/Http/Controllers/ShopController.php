<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{
    // 1. ප්‍රධාන ෂොප් පේජ් එක (Marketplace)
    public function index()
    {
        // Product එකත් එක්ක ඒක අයිති user (farmer) ගේ විස්තරත් එකපාර ගන්නවා (Eager Loading)
        $products = Product::with('seller')->latest()->get();

        return Inertia::render('Shop/Index', [
            'products' => $products
        ]);
    }

    // 2. එක ප්‍රොඩක්ට් එකක විස්තර විතරක් පෙන්වන පේජ් එක (Single Product View)
    public function show($id)
    {
        $product = Product::with('seller')->findOrFail($id);

        return Inertia::render('Shop/Show', [
            'product' => $product
        ]);
    }
}
