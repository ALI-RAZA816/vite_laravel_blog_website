<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ResetPassword extends Model
{
    protected $fillable = ['id','user_id','token','send_link','otp_verified','expires_at','created_at','updated_at'];
}
