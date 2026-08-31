<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use App\Models\MonthlyReport;

class MonthlyReportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $json = File::get(path:'database/json/monthlyReport.json');
        $monthlyData = collect(json_decode($json));
        $monthlyData->each(function($data){
            MonthlyReport::create([
                'user_id'=>$data->user_id,
                'month'=>$data->month,
                'year'=>$data->year,
                'total_post'=>$data->total_post
            ]);
        });
    }
}
