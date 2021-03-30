<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class AuthController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'username' => 'required|email|exists:users,email',
        'password' => 'required'
    ]);

    if( Auth::attempt(['email'=>$request->username, 'password'=>$request->password]) ) {

        $user = Auth::user();
        $userRole = $user->role;
        if ($userRole) {
            $this->scope = $userRole;
        }

        $token = $user->createToken($user->email.'-'.now(), [$this->scope]);

        return response()->json([
            'access_token' => $token->accessToken
        ]);
    }
}
}
