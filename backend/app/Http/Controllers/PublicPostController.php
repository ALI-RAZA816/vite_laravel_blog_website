<?php

namespace App\Http\Controllers;

use App\Models\MonthlyViewsModel;
use App\Models\Post;
use App\Models\PostView;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class PublicPostController extends Controller
{
    public function publicPosts(){
        $publicPost = Post::with(['category','author'])->paginate(40);
        $popularPost = Post::with(['category','author'])->orderBy('views_counter','desc')->limit(5)->get();
        return response()->json([
            'allPost'=>$publicPost,
            'popularPost'=>$popularPost,
        ],200);
    }

    public function singleView(Request $request, int $id){
        $post = Post::with('category')->with('author')->where('id',$id)->first();
        if(!$post){
            return response()->json([
                'messate'=>'Not found'
            ],404);
        }
        $token = $request->bearerToken();
        $user = $token ? PersonalAccessToken::findToken($token)?->tokenable : null;
        if($user){
            $viewed = PostView::where('user_id',$user->id)->where('post_id',$post->id)->exists();
            if(!$viewed){
                PostView::create([
                    'user_id'=>$user->id,
                    'post_id'=>$post->id
                ]);
                $post->increment('views_counter');
                $totalViews = Post::sum('views_counter');
                $previousMonth = now()->subMonth();
                $previousViews = MonthlyViewsModel::where('month', $previousMonth->month)->where('year', $previousMonth->year)->sum('snap_views') ?? 0;
                MonthlyViewsModel::updateOrCreate([
                    'month'=>now()->month,
                    'year'=>now()->year,
                ],[
                    'snap_views'=>$totalViews,
                    'monthly_views'=>$totalViews - $previousViews
                ]);
            }
        }
        return response()->json([
            'post'=>$post
        ],200);
    }
}
