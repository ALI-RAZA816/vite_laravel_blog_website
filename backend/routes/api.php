<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('users', UserController::class);
Route::post('login',[AuthController::class,'loginAccount']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class,'logoutAccount']);
});
