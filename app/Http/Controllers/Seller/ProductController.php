<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller; // මේක අනිවාර්යයි
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the products.
     */
    public function index()
    {
        $products = Product::where('user_id', auth()->id())->latest()->get();
        return Inertia::render('Seller/Products/Index', ['products' => $products]);
    }

    /**
     * Show the form for creating a new product.
     */
    public function create()
    {
        return Inertia::render('Seller/Products/Create');
    }

    /**
     * Store a newly created product in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'unit' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('products', 'public');
        }

        Product::create([
            'user_id' => auth()->id(),
            'name' => $request->name,
            'slug' => Str::slug($request->name) . '-' . time(),
            'category' => $request->category,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'unit' => $request->unit,
            'image' => $imagePath,
        ]);

        return redirect()->route('seller.products.index')->with('success', 'Product listed successfully!');
    }

    /**
     * Show the form for editing the specified product.
     */
    public function edit(Product $product)
    {
        // තමන්ගේ නෙවෙයි නම් block කරන්න
        if ($product->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Seller/Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified product in storage.
     */
    public function update(Request $request, Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'unit' => 'required|string',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $data = $request->only(['name', 'category', 'description', 'price', 'stock', 'unit']);

        if ($request->hasFile('image')) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $data['slug'] = Str::slug($request->name) . '-' . time();
        $product->update($data);

        return redirect()->route('seller.products.index')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product from storage.
     */
    public function destroy(Product $product)
    {
        if ($product->user_id !== auth()->id()) {
            abort(403);
        }

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully!');
    }
}
