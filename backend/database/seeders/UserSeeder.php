<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(path:'database/json/users.json');
        $students = collect(json_decode($json));

        $students->each(function($student){
            User::create([
                'name'=>$student->name,
                'username'=>$student->username,
                'email'=>$student->email,
                'role'=>$student->role,
                'join_date'=>$student->join_date,
                'status'=>$student->status,
                'password'=>$student->password,
                'bio'=>$student->bio
            ]);
        });
    }
}
