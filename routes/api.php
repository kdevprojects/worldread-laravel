<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompetitionController;
use App\Models\User;

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

// Authentication
Route::group(['middleware' => 'auth:api'], function () {
    Route::get('user', [UserController::class, 'user']);
});
Route::post('user', [UserController::class, 'register']);
Route::post('auth/login', [AuthController::class, 'login']);

// Stories
Route::group(['middleware' => 'auth:api'], function () {
    Route::middleware(['scope:member'])->group(function () {
        Route::post('stories', [StoryController::class, 'store']);
    });
});
Route::get('stories', [StoryController::class, 'index']);
Route::get('stories/{param}', [StoryController::class, 'show']);
Route::get('stories/{id}/comments', [StoryController::class, 'comments']);

// Comments
Route::group(['middleware' => 'auth:api'], function () {
    Route::middleware(['scope:member'])->group(function () {
        Route::post('comments', [CommentController::class, 'store']);
    });
});

// Likes
Route::group(['middleware' => 'auth:api'], function () {
    Route::middleware(['scope:member'])->group(function () {
        Route::post('likes/stories/{id}', [LikeController::class, 'likeStory']);
    });
});

// Profiles
Route::get('profiles/{param}', [ProfileController::class, 'show']);
Route::get('profiles/{param}/stories', [ProfileController::class, 'stories']);
Route::get('profiles/{param}/competitions', [ProfileController::class, 'competitions']);

// Competitions
Route::group(['middleware' => 'auth:api'], function () {
    Route::middleware(['scope:member'])->group(function () {
        Route::post('competitions/{id}/enter', [CompetitionController::class, 'enter']);
    });
});
Route::get('competitions', [CompetitionController::class, 'index']);
Route::get('competitions/{param}', [CompetitionController::class, 'show']);

// Admin
Route::middleware(['auth:api', 'role'])->group(function () {
    Route::middleware(['scope:admin'])->group(function () {
        Route::get('users', [UserController::class, 'index']);
        Route::post('competitions', [CompetitionController::class, 'store']);
    });
});
