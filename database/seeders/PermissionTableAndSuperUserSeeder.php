<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;



class PermissionTableAndSuperUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $permissions = [
            'show-admin-panel',

            'role-list',
            'role-create',
            'role-edit',
            'role-delete',

            'user-list',
            'user-create',
            'user-edit',
            'user-delete',

        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        $user = User::create([
            'name' => 'arma',
            'email' => 'arma.malekii@gmail.com',
            'password' => bcrypt('Amra#1375')
        ]);
        Wallet::create([
            'user_id' => $user->id,
            'balance' => 0, // موجودی اولیه صفر
        ]);
        $adminRole = Role::create(['name' => 'Admin']);
        $userRole = Role::create(['name' => 'User']);
        $permissions = Permission::pluck('id','id')->all();
        $adminRole->syncPermissions($permissions);
        $user->assignRole([$adminRole->id]);
    }
}
