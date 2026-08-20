<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;

class AuthController extends Controller
{
    public function createAccount(Request $request){
         try{
            $request->validate([
                'name'=>'required|string|max:50',
                'emailaddress'=>'required|email',
                'password'=>'required|min:5|confirmed',
            ]);

            User::create([
                'name'=>$request->name,
                'email'=>$request->emailaddress,
                'password'=>Hash::make($request->password),
                'created_at'=>now(),
                'updated_at'=>now(),
            ]);


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

    public function logoutAccount(Request $request){
        if($request->user()){
            $user = $request->user();
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
