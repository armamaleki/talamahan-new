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
        $data = $request->validate([
            'site_name' => 'nullable',
            'site_email' => 'nullable',
            'site_phone' => 'nullable',
            'site_address' => 'nullable',
            'site_instagram' => 'nullable',
            'site_youtube' => 'nullable',
            'site_linkedin' => 'nullable',
            'site_twitter' => 'nullable',
            'site_facebook' => 'nullable',

            'openHour' => "required",
            'closeHour' => "required",
            'commission' => "required",
        ]);

        $setting = Setting::firstOrNew([]);
        $setting->open = $data['openHour'];
        $setting->close = $data['closeHour'];
        $setting->fill($data);
        $setting->save();
        clearSettingCache();
    }
}
