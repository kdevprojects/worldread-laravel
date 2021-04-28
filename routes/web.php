<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AdminController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{any}', [AppController::class, 'index'])->where('any', '^(?!admin|_assets[\w\s\-_\/]+).*$');
Route::get('/admin', [AdminController::class, 'index']);

Route::prefix('_assets')->group(function () {
    Route::prefix('img')->group(function () {
        Route::get('/stories/{filename}', function ($filename) {
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $file = \Illuminate\Support\Facades\Storage::get('public/img/stories/' . $filename);
            return response($file, 200)->header('Content-Type', 'image/' . $ext);
        });
        Route::get('/posts/{filename}', function ($filename) {
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $file = \Illuminate\Support\Facades\Storage::get('public/img/posts/' . $filename);
            return response($file, 200)->header('Content-Type', 'image/' . $ext);
        });
        Route::get('/competitions/{filename}', function ($filename) {
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $file = \Illuminate\Support\Facades\Storage::get('public/img/competitions/' . $filename);
            return response($file, 200)->header('Content-Type', 'image/' . $ext);
        });
        Route::get('/profiles/{filename}', function ($filename) {
            $ext = pathinfo($filename, PATHINFO_EXTENSION);
            $file = \Illuminate\Support\Facades\Storage::get('public/img/profiles/' . $filename);
            return response($file, 200)->header('Content-Type', 'image/' . $ext);
        });
    });
});
