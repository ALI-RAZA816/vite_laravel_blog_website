<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json([
            'category'=>$categories
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
            'cat_name'=>'required',
            'slug'=>['required', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/'],
            'description'=>'nullable|max:100',
            'icon_name'=>'required'
        ],[
            'cat_name'=>"The category name is required",
            'slug'=>"The slug_name is incorrect",
            'icon_name'=>"The icon_name is required",
        ]);

        Category::create([
            'name'=>$request->cat_name,
            'slug'=>$request->slug,
            'description'=>$request->description,
            'icon'=>$request->icon_name
        ]);

        return response()->json([
            'message'=>'Category added',
        ],200);    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = Category::where('id',$id)->first();

        if(!$category){
            return response()->json([
                'message'=>'Category not found'
            ],404);
        }

        return response()->json([
            'category'=>$category
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
        $category = Category::where('id',$id)->first();
        if(!$category){
            return response()->json([
                'message'=>'Category not found'
            ],404);
        }
        
        Category::where('id',$request->id)->update([
            'name'=>$request->cat_name,
            'slug'=>$request->slug,
            'description'=>$request->description,
            'icon'=>$request->icon
        ]);

        return response()->json([
            'message'=>'Category Updated'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
