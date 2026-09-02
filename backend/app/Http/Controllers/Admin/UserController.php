<?php

namespace App\Http\Controllers\Admin;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $total = User::all();
        $users = User::select('id','name','email','role','join_date','status','image')->latest()->paginate(10);
        $editor = User::where('role','=','editor')->get();
        $this_week = User::whereDate('created_at','=',now())->get();
        $blocked = User::where('status','=','blocked')->get();
        return response()->json([
            'status'=>true,
            'total'=>$total,
            'users'=>$users,
            'editor'=>$editor,
            'this_week'=>$this_week,
            'blocked'=>$blocked
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
      
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
       
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::select('id','name','username','email','bio','image','role','status')->where('id',$id)->first();
        if(!$user){
            return response()->json([
                'status'=>401,
                'user'=>'Unauthorized'
            ],401);
        }

        return response()->json([
            'status'=>200,
            'user'=>$user
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
    public function update(Request $request, int $id)
    {
        $user = User::where("id",$id)->first();
        if(!$user){
            return response()->json([
                'status'=>401,
                'message'=>'Unauthorized'
            ],401);
        }

        $request->validate([
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
        ],[
            'image'=>'File type must be png,jpeg,jg or 3MB'
        ]);

        $imageName = $user->image;
        if($request->hasFile('image')){
            if($user->image){
                $path = public_path().'/uploads/';
                $old_image = $path.$user->image;
                if(file_exists($old_image)){
                    unlink($old_image);
                }
    
            }
            // Upload new image
            $image = $request->file('image');
            $ext = $image->getClientOriginalExtension();
            $imageName = time() . '.' . $ext;
            $image->move(public_path('uploads'), $imageName);
        }else{
            $imageName = $user->image;
        }
        User::where('id',$id)->update([
            'name'=>$request->name,
            'username'=>$request->username,
            'email'=>$request->email,
            'role'=>$request->role,
            'status'=>$request->status,
            'bio'=>$request->bio,
            'image'=>$imageName,
        ]);


        return response()->json([
            'status'=>200,
            'message'=>'User updated'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('id',$id)->find($id);
        if(!$user){
            return response()->json([
                'message'=>'User not found'
            ],404);
        }

        $path = public_path('/uploads/');
        if($user->image){
            $old_image = $path. $user->image;
            if(file_exists($old_image)){
                unlink($old_image);
            }
        }

        $user->delete();
        return response()->json([
            'message'=>'User deleted successfully'
        ],200);

    }
}
