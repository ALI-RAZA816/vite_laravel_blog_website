<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $allComments = Comment::all();
        $total_comment = Comment::count();
        $this_month = Comment::whereMonth('created_at',now()->month)->count();
        $average = $total_comment > 0 ? round(($this_month / $total_comment) * 100, 2) : 0;
        if($user->role === 'admin'){
            $comments = Comment::with(['user','post'])->paginate(10);
        }else{
            $comments = Comment::with(['user','post'])->where('user_id', $user->id)->paginate(10);
        }

        return response()->json([
            'comments' => $comments,
            'allComments' => $allComments,
            'average'=>$average
        ]);
    }

    public function publicComments(){
        
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
       //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, string $id)
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
        $user = $request->user();
        if($user->role === 'admin') {
            $status = Comment::where('id', $id)->first();
        } else {
            $status = Comment::where('id', $id)->where('user_id', $user->id)->first();
        }
        // $status = Comment::where('id', $id)->first();
        if(!$status){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        $status->update([
            'status'=>$request->status
        ]);

        return response()->json([
            'message'=>'Status updated'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
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
}
