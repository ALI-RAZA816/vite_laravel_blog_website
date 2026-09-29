<?php

namespace App\Http\Requests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNewUserRequest extends FormRequest
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
        $id = $this->route('user');
        return [
            'name'=>'required|string|max:50',
            'username'=>['nullable', 'string', 'max:50', Rule::unique('users', 'username')->ignore($id)],
            'email'=>['required', 'email', Rule::unique('users', 'email')->ignore($id)],
            'bio'=>'nullable|string|max:300',
            'role'=>'required|in:admin,editor,author,user',
            'image' => 'nullable|image|mimes:jpg,jpeg,png|max:3072',
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
            'bio.max'=>'Bio must not be exceed 100 characters',
            'image.mimes'=>'File type must be png,jpeg,jpg',
            'image.max'=>'File size must be 3MB or less',
        ];
    }
}
