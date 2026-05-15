<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);
        $customerRole = Role::firstOrCreate(['name' => 'customer']);

        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@helaharvest.com',
            'password' => Hash::make('password123'),
            'email_verified_at' => now(),
        ]);

        $admin->assignRole($adminRole);

        $this->command->info('Admin user created and assigned to admin role successfully!');
    }
}
