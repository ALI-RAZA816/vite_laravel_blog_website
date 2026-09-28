<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $allCat = Category::all();
        $categories = Category::latest()->paginate(12);
        return response()->json([
            'category'=>$categories,
            'allCat'=>$allCat
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
    public function store(StoreCategoryRequest $request)
    {

        Category::create([
            'name'=>$request->cat_name,
            'slug'=>$request->slug,
            'description'=>$request->description,
            'icon'=>$request->icon_name
        ]);

        return response()->json([
            'message'=>'Category added successfully',
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
    public function update(UpdateCategoryRequest $request, string $id)
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
        $category = Category::where('id', $id)->first();
        if(!$category){
            return response()->json([
                'message'=>'Category not found'
            ]);
        }

        $category->delete();
        return response()->json([
            'message'=>'Category deleted successfully'
        ]);
    }
}
