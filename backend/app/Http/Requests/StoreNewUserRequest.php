<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNewUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string|max:50',
            'username'=>'nullable|string|max:50|unique:users,username',
            'emailaddress'=>'required|email|unique:users,email',
            'bio'=>'nullable|string|max:100',
            'password'=>'required|min:5|confirmed',
            'role'=>'required|in:admin,editor,author,user',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:3072',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'=>'Name is required',
            'name.string'=>'Name must be string',
            'name.max'=>'Name must not exceed 50 characters',
            'emailaddress.required'=>'Email is required',
            'emailaddress.email'=>'Email must be valid',
            'emailaddress.unique'=>'Email already exists',
            'username.string'=>'Username must be string',
            'username.max'=>'Username must not exceed 50 characters',
            'username.unique'=>'Username already exists',
            'password.required'=>'Password is required',
            'password.min'=>'Password must be at least 5 characters',
            'password.confirmed'=>'Password does not match',
            'bio.max'=>'Bio must not be exceed 100 characters',
            'image.mimes'=>'File type must be png,jpeg,jpg or 3MB',
        ];
    }
}
