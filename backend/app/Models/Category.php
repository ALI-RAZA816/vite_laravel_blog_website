<?php

namespace App\Models;

use App\Models\Post;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $guarded = [];
    
    public function posts(){
        return $this->hasMany(Post::class);
    }

    protected static function booted(): void
    {
        static::deleted(function($category){
            $category->posts->each->delete();
        }); 
    }
}
