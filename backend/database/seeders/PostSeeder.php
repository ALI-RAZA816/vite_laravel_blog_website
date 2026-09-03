<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\Post;
use App\Models\Category;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(path:'database/json/posts.json');
        $posts = collect(json_decode($json));

        $posts->each(function($post){
            Post::create([
                'title'=>$post->title,
                'image'=>$post->image,
                'date'=>$post->date,
                'description'=>$post->description,
                'category_id'=>$post->category_id,
                'author_id'=>$post->author_id,
                'tags'=>json_encode($post->tags),
                'published'=>$post->published,
            ]);
        });

        $allposts = Post::all();
        $allposts->each(function ($post) {
            Category::where('id', $post->category_id)
                ->increment('post_count');
        });
    }
}
