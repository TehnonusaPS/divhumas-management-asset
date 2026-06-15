<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Super Admin
        $superAdmin = User::factory()->create([
            'name' => 'Super Admin User',
            'email' => 'superadmin@example.com',
            'password' => Hash::make('password'),
        ]);
        $superAdmin->assignRole('super-admin');

        // 2. Admin / Tata Usaha Aset
        $adminAsset = User::factory()->create([
            'name' => 'Tata Usaha Aset User',
            'email' => 'adminasset@example.com',
            'password' => Hash::make('password'),
        ]);
        $adminAsset->assignRole('admin-asset');

        // 3. Pegawai / Pemegang Aset
        $pegawai = User::factory()->create([
            'name' => 'Pegawai Pemegang Aset',
            'email' => 'pegawai@example.com',
            'password' => Hash::make('password'),
        ]);
        $pegawai->assignRole('pegawai');

        // 4. Teknisi / Tim Pemeliharaan
        $teknisi = User::factory()->create([
            'name' => 'Teknisi Pemeliharaan User',
            'email' => 'teknisi@example.com',
            'password' => Hash::make('password'),
        ]);
        $teknisi->assignRole('teknisi');

        // 5. Pimpinan / Auditor
        $pimpinan = User::factory()->create([
            'name' => 'Pimpinan Auditor User',
            'email' => 'pimpinan@example.com',
            'password' => Hash::make('password'),
        ]);
        $pimpinan->assignRole('pimpinan');

        // Create 10 random users and assign random roles
        $roles = ['super-admin', 'admin-asset', 'pegawai', 'teknisi', 'pimpinan'];
        User::factory(10)->create()->each(function ($user) use ($roles) {
            $user->assignRole($roles[array_rand($roles)]);
        });
    }
}
