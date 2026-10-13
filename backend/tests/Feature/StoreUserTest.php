<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreUserTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    use RefreshDatabase;
    public function test_create_user_with_credientials(){
        $response = $this->postJson('/api/account',[
            'name'=>'Muhammad Ahmad',
            'username'=>'345muhammadahmad',
            'role'=>'user',
            'status'=>'inactive',
            'bio'=>'I am a testing user',
            'emailaddress'=>'muhammadahmad345@gmail.com',
            'password'=>'Password123',
            'password_confirmation' => 'Password123',
            'imageName'=>'Capture.png',
            'date'=>'10 Oct, 26',

        ]);

        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'message' => 'You created account successfully',
        ],200);
    }

    public function test_create_user_with_exist_email()
    {
        User::factory()->create([
            'email'=>'muhammasdfsdfdahmad345@gmail.com'
        ]);
        
        $response = $this->postJson('/api/account',[
            'emailaddress'=>'muhammasdfsdfdahmad345@gmail.com',
        ]);
        $response->assertStatus(422);
    }
        
    public function test_create_user_with_wrong_password()
    {
        $response = $this->postJson('/api/account',[
            'password'=>'Password123',
            'password_confiration'=>'Password123234'
        ]);
        $response->assertStatus(422);
    }
}