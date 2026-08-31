<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class MonthlyReport extends Model
{
    // protected $guarded = [];  
    protected $fillable = [
        'user_id',
        'month',
        'year',
        'total_post',
    ];

    // public function reports(){
    //     return $this->belongsTo(User::class);
    // }
}
