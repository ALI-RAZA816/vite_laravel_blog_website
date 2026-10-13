<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class CategoryFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => fake()->unique()->word(),
            'slug' => fake()->unique()->slug(),
            'description' => fake()->unique()->sentence(),
            'icon' => 'globe',
            'post_count' => fake()->numberBetween(0, 100),
        ];
    }
}