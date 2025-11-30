<?php

namespace App\Http\Requests\Dashboard\Trade;

use Illuminate\Foundation\Http\FormRequest;

class StoreTradeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "amount" => "required|numeric|min:1|max:10",
            "fee" => "required|numeric",
            "type" => 'required|in:purchase,sale',
            "tp" => 'nullable|numeric',
            "sl" => 'nullable|numeric',
        ];
    }
}
