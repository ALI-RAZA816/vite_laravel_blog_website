<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\PostController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login',[AuthController::class,'loginAccount']);
Route::post('account',[AuthController::class, 'createAccount']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class,'logoutAccount']);
    Route::post('search',[AuthController::class,'searchUser']);
    Route::post('search-post',[PostController::class,'searchPost']);
    Route::post('multi-delete-post',[PostController::class,'multiDeletePost']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('posts', PostController::class);
});
