<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $setting = Setting::first();
        if($setting){
            return response()->json([
                'setting'=>$setting
            ],200);
        }
        return response()->json([
            'setting'=>$setting
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
        //
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
    public function update(Request $request)
    {
        $setting = Setting::first();
        $imageName = $setting?->site_logo;
        if($request->hasFile('site_logo')){
            if($setting?->site_logo){
                $path = public_path('posts-images');
                $previousImage = $path . '/'. $setting->site_logo;
                if(file_exists($previousImage)){
                    unlink($previousImage);
                }
            }

            $image = $request->file('site_logo');
            $ext = $image->getClientOriginalExtension();
            $imageName = time(). '.' . $ext;
            $image->move(public_path('posts-images'), $imageName);
        }else{
            $imageName = $setting?->site_logo;
        }

        Setting::updateOrCreate([
            'id'=>1
        ],[
            'site_title'=>$request->site_title,
            'site_description'=>$request->site_desc,
            'site_copyright'=>$request->site_copyright,
            'site_logo'=>$imageName ?? null,
            'f_url'=>$request->f_url ?? null,
            't_url'=>$request->t_url ?? null,
            'i_url'=>$request->i_url ?? null,
            'l_url'=>$request->l_url ?? null,
            'site_maintence'=>$request->maintence ?? false,
        ]);

        return response()->json([
            'message'=>'Changes saved'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy()
    {
        $setting = Setting::first();
        if(!$setting){
            return response()->json([
                'message'=>'not found'
            ],404);
        }

        $path = public_path('/posts-images/');
        if($setting->site_logo){
            $old_image = $path. $setting->site_logo;
            if(file_exists($old_image)){
                unlink($old_image);
            }
        }

        $setting->update([
            'site_logo'=>null
        ]);
        return response()->json([
            'message'=>'Logo deleted successfully'
        ],200);
    }
}
