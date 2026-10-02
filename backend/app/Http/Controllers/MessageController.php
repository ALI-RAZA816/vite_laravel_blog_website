<?php

namespace App\Http\Controllers;

use App\Events\RecieveMessage;
use App\Http\Requests\MessageRequest;
use App\Models\Message;
use App\Models\User;


class MessageController extends Controller
{
    public function sendMessage(MessageRequest $request)
    {
        $date = date('M d, y');
        Message::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'subject'=>$request->subject,
            'message'=>$request->message,
            'date'=>$date
        ]);

        $admins = User::where('role','admin')->pluck('email')->toArray();
        RecieveMessage::dispatch(
            $admins,
            $request->name,
            $request->email,
            $request->subject,
            $request->message
        );

        return response()->json([
            'message'=>'We recieved your message. We contact you shortly'
        ],200);

    }
}
