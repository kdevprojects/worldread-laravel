<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Story;

class ProfileController extends Controller
{
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        return User::select('id', 'username', 'first_name', 'last_name', 'email')
            // ->with(['stories' => function($query) {
            //     return $query->select(['id', 'author_id', 'title']);
            // }])
            // ->with(['stories.comments' => function($query) {
            //     return $query->select(['id', 'on_story']);
            // }])
            ->where('username', $param)
            ->orWhere('id', $param)->firstOrFail();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function stories($param)
    {
        $user = User::where('id', $param)->orWhere('username', $param)->firstOrFail();
        return $user->stories()->with('author')->withCount('comments')->withCount('likes')->orderBy('created_at', 'DESC')->get()->toJson();
    }
}
