<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\PermissionRegistrar;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // Create Permissions
        $permissions = [
            'manage users',
            'manage assets',
            'read assets',
            'scan qr',
            'submit complaints',
            'view schedules',
            'manage tickets',
            'log maintenance',
            'view statistics',
            'download reports',
            'view audit trails',
            'view cost analysis',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Create Roles and assign existing permissions

        // 1. Super Admin (mengelola crud pengguna)
        $superAdminRole = Role::firstOrCreate(['name' => 'super-admin']);
        $superAdminRole->syncPermissions(Permission::all());

        // 2. Admin / Tata Usaha Aset (crud data aset)
        $adminAssetRole = Role::firstOrCreate(['name' => 'admin-asset']);
        $adminAssetRole->syncPermissions([
            'manage assets',
            'read assets',
            'scan qr',
            'view schedules',
            'manage tickets',
        ]);

        // 3. Pegawai / Pemegang aset (read aset, memindai qr code, mengajukan laporan & pengaduan kerusakan aset)
        $pegawaiRole = Role::firstOrCreate(['name' => 'pegawai']);
        $pegawaiRole->syncPermissions([
            'read assets',
            'scan qr',
            'submit complaints',
        ]);

        // 4. Teknisi / Tim pemeliharaan (melihat jadwal perawatan berkala, menerima & response tiket kerusakan, mencatat biaya & detail pemeliharaan aset)
        $teknisiRole = Role::firstOrCreate(['name' => 'teknisi']);
        $teknisiRole->syncPermissions([
            'view schedules',
            'manage tickets',
            'log maintenance',
            'read assets',
        ]);

        // 5. Pimpinan / Auditor (melihat dashboard statistik & grafik nilai aset, menggunduh laporan resmi format ko surar instansi, memantau audit trail perubahan data kritis, melihat rekan nilai kapitalis dan analisis biaya pemeliharaan)
        $pimpinanRole = Role::firstOrCreate(['name' => 'pimpinan']);
        $pimpinanRole->syncPermissions([
            'view statistics',
            'download reports',
            'view audit trails',
            'view cost analysis',
            'read assets',
        ]);
    }
}
