<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\PostView;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class PublicPostController extends Controller
{
    public function publicPosts(){
        $publicPost = Post::with(['category','author'])->get();
        return response()->json([
            'allPost'=>$publicPost
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
            }
        }
        return response()->json([
            'post'=>$post
        ],200);
    }
}
