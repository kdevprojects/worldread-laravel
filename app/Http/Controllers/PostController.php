<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostPostRequest;
use Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Str;
class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->query('featured')) {
            return Post::where('active', true)->where('featured', true)->orderBy('created_at', 'DESC')->get()->toJson();
        }
        return Post::with('author:id,username')->withCount('comments')->where('active', true)->orderBy('created_at', 'DESC')->get()->toJson();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexAdmin(Request $request)
    {
        return Post::with('author:id,username')->withCount('comments')->orderBy('created_at', 'DESC')->get()->toJson();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(PostPostRequest $request)
    {
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
                $path_to_picture = 'img/posts/' . $picture_name;
                Storage::disk('public')->put($path_to_picture, base64_decode($picture));
            }
            $post = new Post([
                'title' => $request->title,
                'summary' => $request->summary,
                'body' => $request->body,
                'author_id' => Auth::user()->id,
                'picture' => $path_to_picture
            ]);
            $post->save();
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => 'success'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function upload(Request $request)
    {
        try {
            if ($request->hasFile('file')) {
                if ($request->file->isValid()) {
                    $file = $request->file;
                    $fileContent = File::get($file);
                    $fileName = 'img/posts/file-' . Str::random(10) . '.' . $file->getClientOriginalExtension();
                    Storage::disk('public')->put($fileName, $fileContent);
                }
            }
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => ['url' => '_assets/' . $fileName]
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        return Post::whereSlug($param)
            ->orWhere('id', $param)->with('author:id,username')->withCount('comments')->firstOrFail()->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(PostPostRequest $request, $id)
    {
        try {
            $path_to_picture = '';
            $post_data = array(
                'title' => $request->title,
                'summary' => $request->summary,
                'body' => $request->body,
                'active' => $request->active,
                'featured' => $request->featured,
                'author_id' => Auth::user()->id
            );

            if ($request->picture) {
                $picture_64 = $request->picture; //your base64 encoded data
                $extension = explode('/', explode(':', substr($picture_64, 0, strpos($picture_64, ';')))[1])[1];   // .jpg .png .pdf

                $replace = substr($picture_64, 0, strpos($picture_64, ',') + 1);

                // find substring fro replace here eg: data:image/png;base64,

                $picture = str_replace($replace, '', $picture_64);

                $picture = str_replace(' ', '+', $picture);

                $picture_name = Str::random(10) . '.' . $extension;
                $path_to_picture = 'img/posts/' . $picture_name;
                Storage::disk('public')->put($path_to_picture, base64_decode($picture));

                $post_data = array_merge($post_data, array('picture' => $path_to_picture));
            }
            $affectedRows = Post::where("id", $id)->update($post_data);

        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => 'success'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        //
    }

    /**
     * Display the specified post's comments.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function comments($id)
    {
        return Post::find($id)->comments()->with('author')->orderBy('created_at', 'ASC')->get()->toJson();
    }
}
