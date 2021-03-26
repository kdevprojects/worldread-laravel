<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')
    ->get('user', function (Request $request) {
        return $request->user();
    });
Route::post('user', [UserController::class, 'register']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('stories', [StoryController::class, 'store']);
});
Route::get('stories', [StoryController::class, 'index']);
Route::get('stories/{param}', [StoryController::class, 'show']);
Route::get('stories/{id}/comments', [StoryController::class, 'comments']);

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('comments', [CommentController::class, 'store']);
});

Route::group(['middleware' => 'auth:api'], function () {
    Route::post('likes/stories/{id}', [LikeController::class, 'likeStory']);
});
