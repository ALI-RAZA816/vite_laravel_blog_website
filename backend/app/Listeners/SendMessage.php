<?php

namespace App\Listeners;

use App\Events\RecieveMessage;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;


class SendMessage implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(RecieveMessage $event): void
    {
        foreach($event->useremail as $email){
            Mail::to($email)->send(new \App\Mail\sendMessageMail($event->name, $event->email, $event->subject, $event->message));
        }
    }
}
