<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(path:'database/json/setting.json');
        $settings = collect(json_decode($json));

        $settings->each(function($setting){
            Setting::create([
                "site_title"=> $setting->site_title,
                "site_description"=> $setting->site_description,
                "site_copyright"=> $setting->site_copyright,
                "site_logo"=>$setting->site_logo ?? null,
                "f_url"=> $setting->f_url,
                "t_url"=> $setting->t_url,
                "i_url"=> $setting->i_url,
                "l_url"=> $setting->l_url,
                "site_maintence"=> $setting->site_maintence
            ]);
        });
    }
}
