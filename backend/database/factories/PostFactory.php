<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'author_id' => User::factory(),           // auto user banao
            'category_id' => Category::factory(),     // auto category banao
            'published' => 'draft',
            'tags' => json_encode(['default']),
            'image' => 'default.png',
            'date' => now()->format('M d, y'),
            'views_counter' => 0,
        ];
    }
}