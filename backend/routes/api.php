<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\MonthlyReportController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\PublicCategryController;
use App\Http\Controllers\PublicPostController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::post('login',[AuthController::class,'loginAccount']);
Route::post('account',[AuthController::class, 'createAccount']);
Route::get('public-posts',[PublicPostController::class, 'publicPosts']);
Route::get('public-category',[PublicCategryController::class, 'publicCategory']);
Route::get('post-comments/{id}',[CommentController::class, 'fetchPostComments']);
Route::get('post-view/{id}',[PublicPostController::class, 'singleView']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('post-view/{id}',[PublicPostController::class, 'singleView']);
    Route::put('update-comments/{id}',[CommentController::class,'updateComment']);
    Route::get('filter-comments',[CommentController::class,'searchComments']);
    Route::post('logout',[AuthController::class,'logoutAccount']);
    Route::post('search',[AuthController::class,'searchUser']);
    Route::post('search-post',[PostController::class,'searchPost']);
    Route::get('month-report',[MonthlyReportController::class,'report']);
    Route::post('multi-delete-post',[PostController::class,'multiDeletePost']);
    Route::apiResource('users', UserController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('posts', PostController::class);
    Route::apiResource('comments', CommentController::class);
});
