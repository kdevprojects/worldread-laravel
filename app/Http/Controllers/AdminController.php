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
        //     'role' => 'admin',
        //     'description' => '',
        //     'picture' => 'img/profiles/default.png'
        // ]);

        return view('admin', ['ngAssets' => $ng->assets]);
    }
}
