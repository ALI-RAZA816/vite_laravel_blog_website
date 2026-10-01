<?php

namespace App\Listeners;

use App\Events\SubscribedUser;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class NotifySubscribedUser implements ShouldQueue
{
    /**
     * Create the event listener.
     */
     use InteractsWithQueue;
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(SubscribedUser $event): void
    {
        foreach($event->email as $email){
            Mail::to($email)->send(new \App\Mail\publishedNewsMail($email));
        }
    }
}
