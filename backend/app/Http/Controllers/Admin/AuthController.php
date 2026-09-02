<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Events\UserRegistered;

class AuthController extends Controller
{
    public function createAccount(Request $request){
        try{
            $request->validate([
                'name'=>'required|string|max:50',
                'emailaddress'=>'required|email',
                'password'=>'required|min:5|confirmed',
                'image' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
            ],[
                'image'=>'File type must be png,jpeg,jpg or 3MB'
            ]);

            $imageName = null;
            if($request->hasFile('image')){
                $image = $request->image;
                $ext = $image->getClientOriginalExtension();
                $imageName = time(). "." . $ext;
                $image->move(public_path('uploads'),$imageName);
            };
            $date = date('M d, y');
            $user = User::create([
                'name'=>$request->name,
                'username'=>$request->username ?? null,
                'role'=>$request->role ?? 'user',
                'status'=>$request->status ?? null,
                'bio'=>$request->bio ?? null,
                'email'=>$request->emailaddress,
                'password'=>Hash::make($request->password),
                'image'=>$imageName ?? null,
                'join_date'=>$date,
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);

            UserRegistered::dispatch($user, $request->password, $request->boolean('instruction'));

            return response()->json([
                'status'=>200,
                'message'=>'Account created'
            ]);

        }catch(ValidationException $e){
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }


    public function loginAccount(Request $request){

        try{
            $request->validate([
                'email'=>'required|email',
                'password'=>'required'
            ]);

            $restricted_user = User::where('email',$request->email)->where('status','=','blocked')->first();
            if($restricted_user){
                return response()->json([
                    'status'=>401,
                    'message'=>"You can't login. Your account may be restriced or blocked"
                ],401);
            }
            $user = User::where('email',$request->email)->select('id','name','email','role','join_date','status','password')->first();

            if(!$user){
                return response()->json([
                    'message'=>"User doesn't exist"
                ],404);
            }

            if(!Hash::check($request->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'password'=>'Incorrect Password'
                ],401);
            }

            $user->makeHidden('password');
            User::where('email',$request->email)->update([
                'status'=>'active'
            ]);

            $token = $user->createToken('token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'message'=>'Login Successful',
                'user'=>$user,
                'token'=>$token
            ],200);
            

        }catch(ValidationException $e){
             return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }
    }


    public function searchUser(Request $request){
        $search_term = $request->query('query');
        if($search_term === 'all'){
            $search_user = User::paginate(10);
            return response()->json([
                'users'=>$search_user
            ]);
        }
        $search_user = User::where('name','LIKE','%'. $search_term . '%')->orWhere('email','LIKE','%'. $search_term . '%')->orWhere('role','LIKE','%'. $search_term . '%')->orWhere('status',$search_term )->latest()->paginate(10);
        return response()->json([
            'users'=>$search_user
        ]);
    }

    public function logoutAccount(Request $request){
        if($request->user()){
            $user = $request->user();
            User::where('id',$user->id)->update([
                'status'=>'inactive'
            ]);
            $user->currentAccessToken()->delete();
            return response()->json([
                'status'=>true,
                'message'=>'You logged out'
            ],200);
        }

        return response()->json([
            'status' => false,
            'message' => 'No authenticated user'
        ],401);

    }
}
