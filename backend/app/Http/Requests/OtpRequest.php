<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OtpRequest extends FormRequest
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
            'code'=>'required|numeric|digits:6'
        ];
    }

    public function messages(): array
    {
        return [
            'code.required'=>'Please enter the full 6-digit code',
            'code.numeric'=>'OTP code must be numeric',
            'code.digits'   => 'OTP code must be exactly 6 digits',
        ];
    }
}
