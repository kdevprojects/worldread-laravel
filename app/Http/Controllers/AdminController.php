<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\NgAdminBuildService;

class AdminController extends Controller
{
    public function index(NgAdminBuildService $ng)
    {
        return view('admin', ['ngAssets' => $ng->assets]);
    }
}
