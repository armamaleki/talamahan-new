<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//         User::factory(1000)->create();
        $this->call([
            PermissionTableAndSuperUserSeeder::class,
        ]);
//         Ticket::factory(100)->create();

//        User::firstOrCreate(
//            ['email' => 'test@example.com'],
//            [
//                'name' => 'Test User',
//                'password' => Hash::make('password'),
//                'email_verified_at' => now(),
//            ]
//        );
    }
}
