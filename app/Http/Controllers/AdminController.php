<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NgAdminBuildService;
use App\Models\User;
use App\Models\Competition;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function index(NgAdminBuildService $ng)
    {
        // User::create([
        //     'username' => 'admin',
        //     'first_name' => 'admin',
        //     'last_name' => 'admin',
        //     'email' => 'admin@admin.com',
        //     'password' => Hash::make('password'),
        //     'role' => 1
        // ]);
        $competitions = Competition::with(['stories' => function ($q) {
            $top = $q->withCount('likes')->orderBy('likes_count', 'desc')->first();
            dd($top->title);
        }])->get()->toJson();
        dd($competitions);
        return view('admin', ['ngAssets' => $ng->assets]);
    }
}
