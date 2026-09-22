<?php

namespace App\Http\Controllers;

use App\Models\Setting;


class PublicSettingController extends Controller
{
    public function publicSetting()
    {
        $setting = Setting::first();
        if($setting){
            return response()->json([
                'setting'=>$setting
            ],200);
        }
        return response()->json([
            'setting'=>$setting
        ],200);
    }
}
