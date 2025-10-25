<?php

namespace App\Http\Requests\Manager\Notification;

use Illuminate\Foundation\Http\FormRequest;

class StoreLiveNotificationRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|min:3|max:255',
            'icon' => 'required|string|in:success,error,warning,info,question',
            'message' => 'required|string|min:3|max:500',
            'footer' => 'required|string|min:3|max:500',
        ];
    }
}
