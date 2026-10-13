<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class LoginUserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_login_user_with_blocked_email()
    {
        User::factory()->create([
            'email' => 'hamza.raza1@example.com',
            'password' => Hash::make('Hamza@958Pass'),
            'status' => 'blocked',
        ]);

        $response = $this->postJson('/api/login',[
            'email'=>'hamza.raza1@example.com',
            'password'=>'Hamza@958Pass'
        ]);
        $response->assertStatus(401);
        $response->assertJson([
            'status'=>401,
            'message'=>"You can't login. Your account may be restriced or blocked"
        ],401);
    }

    public function test_login_user_with_wrong_password()
    {
        User::factory()->create([
            'email' => 'alirazamujahid102@gmail.com',
            'password' => Hash::make('alliance'),
            'status' => 'inactive',
        ]);

        $response = $this->postJson('/api/login',[
            'email'=>'alirazamujahid102@gmail.com',
            'password'=>'allianceasdf'
        ]);
        $response->assertStatus(401);
        $response->assertJson([
            'status'=>401,
            'password'=>"Incorrect Password"
        ],401);
    }

    public function test_user_with_no_exist_email()
    {
        $response = $this->postJson('/api/login',[
            'email'=>'aliraza102@gmail.com',
            'password'=>'alliance'
        ]);
        $response->assertStatus(404);
        $response->assertJson([
            'message'=>"Email doesn't exist"
        ],404);
    }
}