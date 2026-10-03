<?php

namespace App\Http\Controllers\Admin;

use App\Events\ReplyMessage;
use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\Request;

class AdminMessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $totalMessages = Message::all();
        $messages = Message::latest()->paginate(5);
        if($messages->isEmpty()){
            return response()->json([
                'message' => 'No messages found'
            ],404);
        }

        return response()->json([
            'messages' => $messages,
            'totalMessages' => $totalMessages
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
        $message = Message::where('id',$id)->first();
        if(!$message){
            return response()->json([
                'message' => 'Message not found'
            ],404);
        }
        $message->update(['status' => 'read']);
        return response()->json([
            'message' => $message
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $message = Message::where('id',$id)->first();
        if(!$message){
            return response()->json([
                'message' => 'Message not found'
            ],404);
        }
        $message->delete();
        return response()->json([
            'message' => 'Message deleted successfully'
        ],200);
    }

    public function markAsRead(string $id)
    {
        $message = Message::where('id',$id)->first();
        if(!$message){
            return response()->json([
                'message' => 'Message not found'
            ],404);
        }

        $message->update(['status' => 'read']);
        return response()->json([
            'message' => 'Message marked as read successfully'
        ],200);
    }

    public function markAsUnread(string $id)
    {
        $message = Message::where('id',$id)->first();
        if(!$message){
            return response()->json([
                'message' => 'Message not found'
            ],404);
        }

        $message->update(['status' => 'unread']);
        return response()->json([
            'message' => 'Message marked as unread successfully'
        ],200);
    }

    public function sendReply(Request $request)
    {
        $request->validate([
            'id' => 'required|integer',
            'reply' => 'required'
        ],[
            'reply.required' => 'Reply message is required',
        ]);

        $message = Message::where('id',$request->id)->first();
        if(!$message){
            return response()->json([
                'message' => 'Message not found'
            ],404);
        }

        if($message->reply == 'replied'){
            return response()->json([
                'message' => 'Reply already sent'
            ],400);
        }

        $message->update(['reply' => 'replied']);
        ReplyMessage::dispatch($message->email, $request->reply);
        return response()->json([
            'message' => 'Reply sent successfully'
        ],200);
    }
}
