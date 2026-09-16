<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $fillable = [
        'site_title', 'site_description', 'site_copyright',
        'site_logo', 'f_url', 't_url', 'i_url', 'l_url', 'site_maintence'
    ];
}
