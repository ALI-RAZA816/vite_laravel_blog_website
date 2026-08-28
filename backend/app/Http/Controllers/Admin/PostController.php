<?php

namespace App\Http\Controllers\Admin;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('category')->with('author')->get();
        return response()->json([
            'posts'=>$posts
        ],200);
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
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'category'=>'required',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:3072',
        ],[
            'image'=>'File type must be png,jpeg,jg & 3MB'
        ]);
        $date = date('M d, y');
        $image = $request->file('image');
        $ext = $image->getClientOriginalExtension();
        $imageName = time(). '.' . $ext;
        $image->move(public_path('posts-images'),$imageName);
        Post::create([
            'title'=>$request->title,
            'description'=>$request->description,
            'category_id'=>$request->category,
            'published'=>$request->published,
            'date'=>$date,
            'author_id'=>Auth::id(),
            'tags'=>$request->tags,
            'image'=>$imageName
        ]);

        return response()->json([
            'message'=>'Post published successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::where('id',$id)->first();
        if(!$post){
            return response()->json([
                'messate'=>'Not found'
            ],404);
        }
        return response()->json([
            'post'=>$post
        ],200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'title'=>'required',
            'description'=>'required',
            'category'=>'required',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:3072',
        ],[
            'image'=>'File type must be png,jpeg,jg & 3MB'
        ]);

        $post = Post::where('id',$id)->first();
        if(!$post){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        $imageName = $post->image;
        if($request->hasFile('image')){
            if($post->image){
                $path = public_path('posts-images');
                $previousImage = $path . '/'. $post->image;
                if(file_exists($previousImage)){
                    unlink($previousImage);
                }
            }

            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();
            $imageName = time(). '.' . $ext;
            $image->move(public_path('posts-images'), $imageName);
        }else{
            $imageName = $post->image;
        }

        Post::where('id',$id)->update([
            'title'=>$request->title,
            'description'=>$request->description,
            'image'=>$imageName,
            'category_id'=>$request->category,
            'tags'=>$request->tags,
        ]);

        return response()->json([
            'message' => 'Post updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $post = Post::where('id',$id)->first();
        if(!$post){
            return response()->json([
                'message'=>'Not found'
            ],404);
        }

        $path = public_path('posts-images');
        $previousImage = $path . '/' . $post->image;
        if($post->image && $previousImage){
            if(file_exists($previousImage)){
                unlink($previousImage);
            }
        }

        $post->delete();
        return response()->json([
            'message' => 'Post deleted successfully'
        ], 200);
    }
}
