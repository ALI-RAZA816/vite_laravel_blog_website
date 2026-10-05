<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConfirmPasswordRequest;
use App\Http\Requests\EmailRequest;
use App\Http\Requests\OtpRequest;
use App\Models\ResetPassword;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class ResetPasswordController extends Controller
{
    public function fetchRecord(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Not found'], 404);
        }
        $otp = ResetPassword::where('user_id',$user->id)->first();
        if(!$otp){
            return response()->json([
                'message'=>"Not found"
            ],404);
        };
        return response()->json([
            'user'=>$otp
        ]);
    }


    public function getResetLink(EmailRequest $request){

        $user = User::where('email', $request->email)->first();
        if(!$user){
            return response()->json([
                'message'=>"We could not find an account with this email"
            ],404);
        };

        
        try {
            $otp_token = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);
    
            ResetPassword::updateOrCreate(
                [
                    'user_id'=>$user->id
                ],[
                'token'=>Hash::make($otp_token),
                'expires_at'=>now()->addMinutes(2)
            ]);

            Mail::to($request->email)->send(new \App\Mail\resetpasswordmail($otp_token, $user->name));
            ResetPassword::where('user_id',$user->id)->update(['send_link'=>true]);
            session(['user_id'=>$user->id]);
            return response()->json([
                'message'=>'We sent you secure link successfully',
            ],200);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to send OTP email. Please try again.',
            ], 500);
        }


    }

    public function verifyOtp(OtpRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        $otp = ResetPassword::select('otp_verified','send_link')->where('user_id',$user->id)->first();
        if(!$otp){
            return response()->json([
                'message'=>"OTP not found. Please request a new OTP"
            ],404);
        };

        if (now()->greaterThan($otp->expires_at)) {
            // $otp->update(['token'=>null]);
            return response()->json([
                'message' => 'OTP code expired'
            ], 410);
        }

        if (!Hash::check($request->code, $otp->token)) {
            return response()->json([
                'message' => 'Invalid OTP code'
            ], 401);
        }

        $otp->update(['otp_verified'=>true]);
        return response()->json([
            'message' => 'OTP verified successfully'
        ]);

    }

    public function changePassword(ConfirmPasswordRequest $request)
    {
        $user = User::where('email', $request->email)->first();
        $previous = ResetPassword::where('user_id',$user->id)->first();
        if(!$user){
            return response()->json([
                'message'=>"We could not find an account with this email"
            ],404);
        };

        $user->update([
            'password'=>Hash::make($request->password)
        ]);
        $previous->delete();

        return response()->json([
            'message'=>'Your reset password successfully'
        ],200);
    }
}
