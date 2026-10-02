<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MessageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name'=>'required|string|max:20',
            'email'=>'required|email',
            'subject'=>'required|string|max:100',
            'message'=>'required',
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'=>'Name field is required',
            'name.max'=>'Name must not be exceed 20 characters',
            'email.required'=>'Email is required',
            'email.email'=>'Email must be valid email',
            'subject.required'=>'Subject field is required',
            'subject.max'=>'Subject must not be exceed 100 characters',
            'message'=>'Message field is required',
        ];
    }
}
