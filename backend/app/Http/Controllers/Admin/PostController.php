<?php

namespace App\Http\Controllers\Admin;

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
        //
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
        ]);

        $image = $request->file('image');
        $ext = $image->getClientOriginalExtension();
        $imageName = time(). '.' . $ext;
        $image->move(public_path('posts-images'),$imageName);
        Post::create([
            'title'=>$request->title,
            'description'=>$request->description,
            'category_id'=>$request->category,
            'published'=>$request->published,
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
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
