<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * සියලුම සෙලර්ස්ලාගේ නිශ්පාදන ලැයිස්තුව පෙන්වීම
     */
    public function index()
    {
        // Product එක අයිති Seller ගේ විස්තරත් (User relation එක) එක්කම ගන්නවා
        $products = Product::with('seller')->latest()->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products
        ]);
    }

    public function show(Product $product)
    {
        // Seller relation එකත් එක්කම තනි product එකක් ගන්නවා
        $product->load('seller');

        return Inertia::render('Admin/Products/Show', [
            'product' => $product
        ]);
    }

    /**
     * නීති විරෝධී හෝ වැරදි නිශ්පාදනයක් Admin විසින් ඉවත් කිරීම
     */
    public function destroy(Product $product)
    {
        // Image එක තියෙනවා නම් storage එකෙන් අයින් කරන්න
        if ($product->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product removed by Admin successfully!');
    }
}
