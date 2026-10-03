<?php

namespace App\Listeners;

use App\Events\ReplyMessage;
use App\Mail\ReplyUserMail;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Mail;


class ReplyUser implements ShouldQueue
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
    public function handle(ReplyMessage $event): void
    {
        Mail::to($event->email)->send(new ReplyUserMail($event->reply));
    }
}
