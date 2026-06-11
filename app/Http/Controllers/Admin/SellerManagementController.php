<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\SellerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Inertia\Inertia;

class SellerManagementController extends Controller
{
    /**
     * 1. All Sellers List (Spatie Way + Seller Profile)
     */
    public function index()
    {
        // Spatie වල role එක අනුව ෆිල්ටර් කරලා, profile එකත් එක්කම ගන්නවා
        $sellers = User::role('seller')
            ->with('sellerProfile')
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Admin/Sellers/Index', [
            'sellers' => $sellers
        ]);
    }

    /**
     * Show the form for creating a new seller.
     */
    public function create()
    {
        return Inertia::render('Admin/Sellers/Create');
    }

    /**
     * 2. Store New Seller
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'shop_name' => 'required|string|max:255|unique:seller_profiles,shop_name',
            'district' => 'required|string',
            'city' => 'required|string',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ]);

        DB::beginTransaction();

        try {
            // User කෙනෙක් ක්‍රියේට් කිරීම
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'status' => 'active',
            ]);

            // Spatie රෝල් එක අසයින් කිරීම
            $user->assignRole('seller');

            // ඉමේජ් එක storage එකට සේව් කිරීම
            $imagePath = null;
            if ($request->hasFile('profile_image')) {
                $imagePath = $request->file('profile_image')->store('sellers', 'public');
            }

            // සෙලර් ප්‍රොෆයිල් එක සෑදීම
            $user->sellerProfile()->create([
                'shop_name' => $request->shop_name,
                'slug' => Str::slug($request->shop_name),
                'profile_image' => $imagePath,
                'district' => $request->district,
                'city' => $request->city,
                'status' => 'active',
            ]);

            DB::commit();

            return redirect()
                ->route('admin.sellers.index')
                ->with('success', 'Seller account and profile created successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'යම් දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.']);
        }
    }

    /**
     * Show the form for editing the specified seller.
     */
    public function edit($id)
    {
        // සෙලර් සහ ප්‍රොෆයිල් විස්තර දෙකම එකතු කරගෙන Edit Form එකට යවනවා
        $seller = User::role('seller')->with('sellerProfile')->findOrFail($id);

        return Inertia::render('Admin/Sellers/Edit', [
            'seller' => $seller
        ]);
    }

    /**
     * 3. Update Existing Seller Details
     */
    public function update(Request $request, $id)
    {
        $seller = User::role('seller')->with('sellerProfile')->findOrFail($id);

        // වැලිඩේෂන් (Email සහ Shop Name එක චෙක් කරද්දී මේ සෙලර්ගේ පරණ විස්තර ignore කරනවා)
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
            'shop_name' => 'required|string|max:255|unique:seller_profiles,shop_name,' . $seller->sellerProfile->id,
            'district' => 'required|string',
            'city' => 'required|string',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'password' => 'nullable|string|min:8',
        ]);

        DB::beginTransaction();

        try {
            // Main User Profile Update
            $userData = [
                'name' => $request->name,
                'email' => $request->email,
            ];

            // පාස්වර්ඩ් එකක් ටයිප් කරලා තිබුණොත් විතරක් අප්ඩේට් කරනවා
            if ($request->filled('password')) {
                $userData['password'] = Hash::make($request->password);
            }

            $seller->update($userData);

            // ඉමේජ් එකක් අලුතින් දාලා නැත්නම් පරණ එකම තියාගන්නවා
            $imagePath = $seller->sellerProfile->profile_image;

            if ($request->hasFile('profile_image')) {
                $imagePath = $request->file('profile_image')->store('sellers', 'public');
            }

            // Seller Profile Update
            $seller->sellerProfile->update([
                'shop_name' => $request->shop_name,
                'slug' => Str::slug($request->shop_name),
                'profile_image' => $imagePath,
                'district' => $request->district,
                'city' => $request->city,
            ]);

            DB::commit();

            return redirect()
                ->route('admin.sellers.index')
                ->with('success', 'Seller updated successfully!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'යම් දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.']);
        }
    }

    /**
     * Update status (Active, Pending, Suspended)
     */
    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|in:pending,active,suspended']);

        User::role('seller')->findOrFail($id)->update([
            'status' => $request->status
        ]);

        return redirect()->back();
    }

    /**
     * Delete Seller Account
     */
    public function destroy($id)
    {
        User::role('seller')->findOrFail($id)->delete();
        return redirect()->back();
    }
}
