<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = ['id','title','description','image','category_id','author_id','views_counter','date','tags','published','draft'];

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
