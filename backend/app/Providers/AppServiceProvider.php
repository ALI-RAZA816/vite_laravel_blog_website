<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request) {
            $email = (string) $request->input('email');
            return [
                Limit::perMinute(5)->by($request->ip()),
                Limit::perMinute(5)->by($email . '|' . $request->ip()),
            ];
        });

        RateLimiter::for('account',function(Request $request){
            return Limit::perMinute(3)->by($request->ip()); 
        });

        RateLimiter::for('forgot-password',function(Request $request){
            return Limit::perMinute(3)->by($request->ip()); 
        });

        RateLimiter::for('reset-password',function(Request $request){
            return Limit::perMinute(5)->by($request->ip()); 
        });

        RateLimiter::for('verify-otp',function(Request $request){
            return Limit::perMinute(5)->by($request->ip()); 
        });

        RateLimiter::for('message',function(Request $request){
            return Limit::perMinute(5)->by($request->ip()); 
        });

        RateLimiter::for('index',function(Request $request){
            return Limit::perMinute(10)->by($request->ip()); 
        });

        RateLimiter::for('public-post',function(Request $request){
            return Limit::perMinute(60)->by($request->ip()); 
        });
        
        RateLimiter::for('public-category',function(Request $request){
            return Limit::perMinute(60)->by($request->ip()); 
        });

        RateLimiter::for('public-comment',function(Request $request){
            return Limit::perMinute(60)->by($request->ip()); 
        });
        
        RateLimiter::for('post-view',function(Request $request){
            return Limit::perMinute(60)->by($request->ip()); 
        });
        
        RateLimiter::for('show-setting',function(Request $request){
            return Limit::perMinute(60)->by($request->ip()); 
        });
        
        RateLimiter::for('newsletter',function(Request $request){
            return Limit::perMinute(3)->by($request->user()?->id ?: $request->ip()); 
        });

        RateLimiter::for('authenticated',function(Request $request){
            return Limit::perMinute(120)->by($request->user()?->id ?: $request->ip()); 
        });


    }
}
