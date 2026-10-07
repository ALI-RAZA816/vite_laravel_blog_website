<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['id','user_id','post_id','comment','on_post','status','date'];
    
    function user(){
        return $this->belongsTo(User::class);
    }

    function post(){
        return $this->belongsTo(Post::class);
    }
}
