<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\UserRegisterRequest;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::where('role', '=', 'member')->orderBy('created_at', 'DESC')->get()->toJson();
    }
    public function user(Request $request)
    {
        return $request->user()->with('competitions:id')->firstOrFail()->toJson();
    }
    public function register(UserRegisterRequest $request)
    {
        User::create([
            'username' => $request->username,
            'first_name' => $request->first_name,
            'last_name' => $request->first_name,
            'email' => $request->email,
            'password' => Hash::make($request->password)
        ]);
        return response()->json([
            'message' => 'User successfully registered'
        ]);
    }
}
