<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;


class PublicCommentController extends Controller
{
    public function addComment(Request $request)
    {
        $date = date('M d, y');
        $post_title = Post::where('id',$request->post_id)->select('title')->first();

        Comment::create([
            'user_id'=>Auth::id(),
            'post_id'=>$request->post_id,
            'comment'=>$request->comment,
            'on_post'=>$post_title->title,
            'date'=>$date,
        ]);

        return response()->json([
            'message'=>'Comment added'
        ],200);

    }

    public function showComment(Request $request, string $id)
    {
        $user = $request->user();
        if($user->role === 'admin') {
            $comment = Comment::with(['user','post'])->where('id', $id)->first();
        } else {
            $comment = Comment::with(['user','post'])->where('id', $id)->where('user_id', $user->id)->first();
        }

        if(!$comment){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        return response()->json([
            'comment'=>$comment
        ],200);
    }

    public function updateComment (Request $request, int $id){
        $status = Comment::where('id', $id)->first();
        if(!$status){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        $status->update([
            'comment'=>$request->comment
        ]);

        return response()->json([
            'message'=>'Comment updated'
        ],200);
    }

    public function deleteComment(Request $request, int $id)
    {
        $user = $request->user();
        if($user->role === 'admin') {
            $status = Comment::where('id', $id)->first();
        } else {
            $status = Comment::where('id', $id)->where('user_id', $user->id)->first();
        }
        if(!$status){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }
        $status->delete();
        return response()->json([
            'message'=>'Comment deleted'
        ],200);
    }

}
