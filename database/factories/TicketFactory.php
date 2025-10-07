<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ticket>
 */
class TicketFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(6),
            'body' => $this->faker->paragraph(4),
            'status' => $this->faker->randomElement(['open', 'checked', 'closed']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'user_id' => User::inRandomOrder()->first()?->id ?? User::factory(),
        ];
    }
}
