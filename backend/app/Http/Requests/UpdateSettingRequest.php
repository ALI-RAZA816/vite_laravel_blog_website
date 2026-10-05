<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
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
            'site_title'=>'required|string|max:50',
            'site_desc'=>'required|string|max:300',
            'site_copyright'=>'required|max:200',
            'f_url' => 'nullable|url|max:255',
            't_url' => 'nullable|url|max:255',
            'i_url' => 'nullable|url|max:255',
            'l_url' => 'nullable|url|max:255',
            'site_logo'=>'nullable|image|mimes:jpg,jpeg,png|max:3072',
        ];
    }

    public function messages(): array
    {
        return [
            'site_title.required'=>'Website name is required',
            'site_title.string'=>'Name must be string',
            'site_title.max'=>'Name must not exceed 5 characters',
            'site_desc.required'=>'Website description is required',
            'site_desc.string'=>'Description must be string',
            'site_desc.max'=>'Description must not exceed 300 characters',
            'site_copyright.required'=>'Copyright text is required',
            'site_copyright.max'=>'Description must not exceed 200 characters',
            'site_logo.mimes'=>'File type must be png,jpeg,jpg',
            'site_logo.max'=>'File size must be 3MB or less',
            'f_url.url' => 'Facebook URL must be a valid URL',
            't_url.url' => 'Twitter URL must be a valid URL',
            'i_url.url' => 'Instagram URL must be a valid URL',
            'l_url.url' => 'LinkedIn URL must be a valid URL',
        ];
    }
}
