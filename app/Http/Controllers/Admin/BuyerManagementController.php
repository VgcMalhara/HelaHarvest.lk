<?php

// app/Http/Controllers/Admin/BuyerManagementController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class BuyerManagementController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Buyers/Index', [
            'buyers' => User::role('buyer')->latest()->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Buyers/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'status' => 'active',
        ]);

        $user->assignRole('buyer');

        return redirect()->route('admin.buyers.index')->with('success', 'Buyer created successfully.');
    }

    public function edit(User $buyer)
    {
        return Inertia::render('Admin/Buyers/Edit', ['buyer' => $buyer]);
    }

    public function update(Request $request, User $buyer)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $buyer->id,
            'status' => 'required|string',
        ]);

        $buyer->update($request->only('name', 'email', 'status'));

        if ($request->password) {
            $buyer->update(['password' => Hash::make($request->password)]);
        }

        return redirect()->route('admin.buyers.index')->with('success', 'Buyer updated successfully.');
    }

    public function destroy(User $buyer)
    {
        $buyer->delete();
        return back()->with('success', 'Buyer deleted successfully.');
    }

    public function updateStatus(Request $request, User $buyer)
    {
        $buyer->update(['status' => $request->status]);
        return back();
    }
}
