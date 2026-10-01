<?php

namespace App\Http\Controllers;

use App\Models\NewsLetter;
use App\Models\User;
use Illuminate\Http\Request;


class NewsLetterController extends Controller
{
    public function Subscribed(Request $request)
    {
        $request->validate([
            'newsletter'=>'required|email|unique:newsletters,email'
        ],[
            'newsletter.required'=>'Email is required',
            'newsletter.unique'=>'The email is aleady subscribed',
            'newsletter.email'=>'Email must be valid'
        ]);

        $user = User::where('email',$request->newsletter)->first();
        if(!$user){
            return response()->json([
                'message' => 'This email is not registered. Please sign up first.'
            ], 404);
        }

        NewsLetter::create([
            'user_id'=>$user->id,
            'email'=>$request->newsletter
        ]);

        return response()->json([
            'message'=>'Subscribed successfully'
        ]);
    }
}
