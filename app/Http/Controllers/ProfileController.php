<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\User;
use App\Models\Story;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

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
        return User::select('id', 'username', 'first_name', 'last_name', 'email', 'picture', 'description')
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if ($user->id == $id) {

            try {

                $path_to_picture = '';
                if ($request->picture) {
                    $picture_64 = $request->picture; //your base64 encoded data
                    $extension = explode('/', explode(':', substr($picture_64, 0, strpos($picture_64, ';')))[1])[1];   // .jpg .png .pdf

                    $replace = substr($picture_64, 0, strpos($picture_64, ',') + 1);

                    // find substring fro replace here eg: data:image/png;base64,

                    $picture = str_replace($replace, '', $picture_64);

                    $picture = str_replace(' ', '+', $picture);

                    $picture_name = Str::random(10) . '.' . $extension;
                    $path_to_picture = 'img/profiles/' . $picture_name;
                    Storage::disk('public')->put($path_to_picture, base64_decode($picture));
                }
                $user->picture = $path_to_picture;
                $user->description = $request->description;
                $user->save();
            } catch (\Exception $e) {
                throw new HttpException(500, $e->getMessage());
            }
        }

        return response()->json([
            'id' => $user->id,
            'picture' => $user->picture,
            'message' => 'success'
        ]);
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

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function competitions($param)
    {
        $user = User::where('id', $param)->orWhere('username', $param)->firstOrFail();
        return $user->competitions()->orderBy('created_at', 'DESC')->get()->toJson();
    }
}
