<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\User;

class DashboardController extends Controller
{
    public function DashboardAnalysis()
    {
        $views = Post::sum('views_counter');
        $totalUser = User::all();
        $allComments = Comment::all();
        $total = Post::with('category')->with('author')->get();

        return response()->json([
            'total'=>$total,
            'views'=>$views,
            'totalUser'=>$totalUser,
            'allComments' => $allComments,

        ],200);
    }
}
