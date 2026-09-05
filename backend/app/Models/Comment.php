<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $guarded = [];
    
    function user(){
        return $this->belongsTo(User::class);
    }

    function post(){
        return $this->belongsTo(Post::class);
    }
}
