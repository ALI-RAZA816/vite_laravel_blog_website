<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Category;

class Post extends Model
{
    protected $guarded = [];

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function author(){
        return $this->belongsTo(User::class,'author_id');
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    protected static function booted(): void
    {
        static::deleted(function($post){
            $post->comments()->delete();
        });
    }
}
