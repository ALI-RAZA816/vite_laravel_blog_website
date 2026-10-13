<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'username' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'password' => Hash::make('Password123!'),
            'role' => 'user',
            'status' => 'active',
            'bio' => fake()->sentence(),
            'image' => 'default.png',
            'join_date' => now()->format('d M, y'),
        ];
    }
}