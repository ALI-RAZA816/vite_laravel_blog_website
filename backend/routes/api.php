<?php

use App\Http\Controllers\Admin\AdminMessageController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\CommentController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\MonthlyReportController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\NewsLetterController;
use App\Http\Controllers\PublicCategryController;
use App\Http\Controllers\PublicCommentController;
use App\Http\Controllers\PublicPostController;
use App\Http\Controllers\PublicSettingController;
use App\Http\Controllers\ResetPasswordController;
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
Route::get('show-setting', [PublicSettingController::class, 'publicSetting']);
Route::post('message', [MessageController::class, 'sendMessage']);
Route::post('forgot-password', [ResetPasswordController::class, 'getResetLink']);
Route::post('verify-otp', [ResetPasswordController::class, 'verifyOtp']);
Route::post('reset-password', [ResetPasswordController::class, 'changePassword']);
Route::post('indexs', [ResetPasswordController::class, 'fetchRecord']);

Route::middleware('auth:sanctum')->group(function(){
    Route::post('logout',[AuthController::class,'logoutAccount']);
    Route::post('public-comments',[PublicCommentController::class,'addComment']);
    Route::put('public-comments/{id}',[PublicCommentController::class,'updateComment']);
    Route::get('public-comments/{id}',[PublicCommentController::class,'showComment']);
    Route::delete('public-comments/{id}',[PublicCommentController::class,'deleteComment']);
    Route::post('newsletter',[NewsLetterController::class, 'Subscribed']);
    
    Route::middleware('role:admin')->group(function(){
        Route::apiResource('settings', SettingController::class);
        Route::post('settings', [SettingController::class, 'update']);
        Route::delete('logo', [SettingController::class, 'destroy']);
        Route::apiResource('users', UserController::class)->except(['index']);
        Route::apiResource('messages', AdminMessageController::class);
        Route::put('mark-as-read/{id}', [AdminMessageController::class, 'markAsRead']);
        Route::put('mark-as-unread/{id}', [AdminMessageController::class, 'markAsUnread']);
        Route::post('reply-message', [AdminMessageController::class, 'sendReply']);
    });
        
    Route::middleware('role:admin,editor')->group(function(){
        Route::apiResource('users', UserController::class)->only(['index','show']);
    });
        
        
    Route::middleware('role:admin,editor,author')->group(function(){
        Route::get('dashboard',[DashboardController::class,'DashboardAnalysis']);
        Route::get('filter-comments',[CommentController::class,'searchComments']);
        Route::put('update-comments/{id}',[CommentController::class,'updateComment']);
        Route::get('month-report',[MonthlyReportController::class,'report']);
        Route::post('multi-delete-post',[PostController::class,'multiDeletePost']);
        Route::apiResource('comments', CommentController::class);
        Route::apiResource('posts', PostController::class);
        Route::apiResource('categories', CategoryController::class);
    });


});
