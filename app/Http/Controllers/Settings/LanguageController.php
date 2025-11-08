<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class LanguageController extends Controller
{
    public function index()
    {
        return Inertia::render('settings/language');
    }

    public function change(Request $request)
    {
        $lang = $request->lang;
        $request->session()->put('locale', $lang);
        app()->setLocale($lang);
        return back();
    }
}
