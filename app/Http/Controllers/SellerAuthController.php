<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\SellerProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SellerAuthController extends Controller
{
    /**
     *
     */
    public function showRegisterForm()
    {
        return inertia('auth/SellerRegister');
    }

    /**
     *
     */
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|confirmed',
            'shop_name' => 'required|string|max:255|unique:seller_profiles,shop_name',
            'district' => 'required|string',
            'city' => 'required|string',
            'profile_image' => 'nullable|image|mimes:jpg,jpeg,png|max:2048', // Max 2MB
        ]);

        DB::beginTransaction();

        try {
            //
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            // 4.
            $user->assignRole('seller');

            // 5.
            $imagePath = null;
            if ($request->hasFile('profile_image')) {

                $imagePath = $request->file('profile_image')->store('sellers', 'public');
            }

            $user->sellerProfile()->create([
                'shop_name' => $request->shop_name,
                'slug' => Str::slug($request->shop_name),
                'profile_image' => $imagePath,
                'district' => $request->district,
                'city' => $request->city,
                'status' => 'pending',
            ]);

            DB::commit();

            // 7. Auto Login කිරීම
            Auth::login($user);

            return redirect()->route('seller.dashboard')->with('success', 'HelaHarvest වෙත සාදරයෙන් පිළිගනිමු!');

        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => 'යම් දෝෂයක් සිදු විය. කරුණාකර නැවත උත්සාහ කරන්න.']);
        }
    }
}
