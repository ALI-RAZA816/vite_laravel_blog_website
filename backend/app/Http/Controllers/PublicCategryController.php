<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class PublicCategryController extends Controller
{
    public function publicCategory(){
        $publicCat = Category::all();
        return response()->json([
            'allCategories'=>$publicCat
        ],200);
    }
}
