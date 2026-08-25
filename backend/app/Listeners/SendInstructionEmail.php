<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\UserRegistered;
use Illuminate\Support\Facades\Mail;
use App\Mail\instructionMail;

class SendInstructionEmail implements ShouldQueue
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
    public function handle(UserRegistered $event): void
    {
        if($event->Instruction === true && $event->user->role != 'user' ){
            Mail::to($event->user->email)->send(new instructionMail($event->user->name,
            $event->user->email, $event->plainPassword));
        }
    }
}
