<?php

namespace App\Http\Controllers\Manager;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingController extends Controller
{
    public function index()
    {
        $setting = Setting::first();
        return Inertia::render('manager/setting/index', [
            'settingItem' => $setting,
        ]);
    }

    public function update(Request $request)
    {
        dd($request->all());
    }
}
