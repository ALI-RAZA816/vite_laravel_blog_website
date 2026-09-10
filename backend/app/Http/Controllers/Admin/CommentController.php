<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Comment;
use App\Models\Post;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allComments = Comment::all();
        $comments = Comment::with(['user','post'])->paginate(10);

        return response()->json([
            'comments' => $comments,
            'allComments' => $allComments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $comment = Comment::with(['user','post'])->where('id', $id)->first();
        if(!$comment){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        return response()->json([
            'comment'=>$comment
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
       
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $status = Comment::where('id', $id)->first();
        if(!$status){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        Comment::where('id',$id)->update([
            'status'=>$request->status
        ]);

        return response()->json([
            'message'=>'Status updated'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $status = Comment::where('id', $id)->first();
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


    public function searchComments(Request $request){
        $search_term = $request->query('query');
        if($search_term === 'all'){
            $search_comment = Comment::with(['user','post'])->paginate(10);
        }else{
            $search_comment = Comment::with(['user','post'])->where('status', $search_term )->latest()->paginate(10);

        }
        return response()->json([
            'searchComments'=>$search_comment
        ]);

    }

    public function fetchPostComments(int $id){
        $postComment = Comment::with(['user','post'])->where('post_id',$id)->get();
        if(!$postComment){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }
        return response()->json([
            'postComment'=>$postComment
        ],200);
    }

    public function updateComment (Request $request, int $id){
        $status = Comment::where('id', $id)->first();
        if(!$status){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        Comment::where('id',$id)->update([
            'comment'=>$request->comment
        ]);

        return response()->json([
            'message'=>'Comment updated'
        ],200);
    }
}
