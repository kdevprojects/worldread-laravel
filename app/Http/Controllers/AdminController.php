<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NgAdminBuildService;
use App\Models\User;
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
        //     'password' => Hash::make('Route_66'),
        //     'role' => 1
        // ]);
        return view('admin', ['ngAssets' => $ng->assets]);
    }
}
