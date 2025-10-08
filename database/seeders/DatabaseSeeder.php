<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         User::factory(1000)->create();
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
