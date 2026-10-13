<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class StorePostTest extends TestCase
{
    use RefreshDatabase;

    public function test_store_post()
    {
        Storage::fake('public');

        $user = User::factory()->create([
            'email' => 'alirazamujahid102@gmail.com',
            'password' => Hash::make('alliance'),
            'role' => 'admin',
        ]);

        $category = Category::factory()->create();

        $response = $this->actingAs($user)
            ->withHeaders(['Accept' => 'application/json'])
            ->post('/api/posts', [
                'title' => 'Testing Title',
                'description' => 'Testing Description',
                'category' => $category->id,
                'published' => 'published',
                'date' => '12 Oct, 26',
                'tags' =>  json_encode(['laravel', 'react', 'php']),              
                'image' => UploadedFile::fake()->image('Capture.png'),
            ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Post published successfully',
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => 'Testing Title',
        ]);

        $post = Post::where('title', 'Testing Title')->first();
        $this->assertNotNull($post);
        $this->assertEquals($user->id, $post->author_id); 
    }

    public function test_update_post()
    {
        $user = User::factory()->create([
            'email' => 'alirazamujahid102@gmail.com',
            'password' => Hash::make('alliance'),
            'role' => 'admin',
        ]);
        $oldCategory = Category::factory()->create(['name'=>'Old Category']);
        $newCategory = Category::factory()->create(['name'=>'New Category']);

        $post = Post::factory()->create([
            'title' => 'Original Title',
            'description' => 'Original Description',
            'author_id' => $user->id,
            'category_id' => $oldCategory->id,
            'published' => 'draft',
            'tags' => json_encode(['old-tag']),
            'image' => 'old-image.png',
        ]);

        $response = $this->actingAs($user)
            ->withHeaders(['Accept' => 'application/json'])
            ->putJson("/api/posts/{$post->id}", [
                'title' => 'Updated Title',
                'description' => 'Updated Description',
                'category' => $newCategory->id,              // category change
                'published' => 'published',
                'tags' => json_encode(['laravel', 'updated']), // naye tags
                'image' => UploadedFile::fake()->image('new-image.png'),
        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'message' => 'Post updated successfully',
        ]);

        $this->assertDatabaseHas('posts', [
            'id' => $post->id,
            'title' => 'Updated Title',
            'description' => 'Updated Description',
            'category_id' => $newCategory->id,
            'published' => 'published',
        ]);

        $updatedPost = Post::find($post->id);
        $this->assertEquals('Updated Title', $updatedPost->title);
        $this->assertEquals($newCategory->id, $updatedPost->category_id);
        $this->assertEquals($user->id, $updatedPost->author_id);
    }
}