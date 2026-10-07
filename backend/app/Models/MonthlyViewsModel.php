<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MonthlyViewsModel extends Model
{
    protected $fillable = ['id','month','year','snap_views','monthly_views'];
    protected $table = 'last_months_views';
}
