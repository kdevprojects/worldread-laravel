<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use App\Http\Requests\StoryPostRequest;
use Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($request->query('limit')) {
            $limit = $request->query('limit');
            return Story::where('active', true)->orderBy('created_at', 'DESC')->limit($limit)->get()->toJson();
        }
        return Story::where('active', true)->with('author:id,username')->withCount('comments')->withCount('likes')->orderBy('created_at', 'DESC')->get()->toJson();
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
    public function store(StoryPostRequest $request)
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
                $path_to_picture = 'img/stories/' . $picture_name;
                Storage::disk('public')->put($path_to_picture, base64_decode($picture));
            }
            $story = new Story([
                'title' => $request->title,
                'summary' => $request->summary,
                'body' => $request->body,
                'author_id' => Auth::user()->id,
                'picture' => $path_to_picture
            ]);
            $story->save();
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
                    $fileName = 'img/stories/file-' . Str::random(10) . '.' . $file->getClientOriginalExtension();
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
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        return Story::whereSlug($param)
            ->orWhere('id', $param)->with('author:id,username')->withCount('comments')->withCount('likes')->firstOrFail()->toJson();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function edit(Story $story)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Story $story)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function destroy(Story $story)
    {
        //
    }

    /**
     * Display the specified story's comments.
     *
     * @param  \App\Models\Story  $story
     * @return \Illuminate\Http\Response
     */
    public function comments($id)
    {
        return Story::find($id)->comments()->with('author')->orderBy('created_at', 'ASC')->get()->toJson();
    }
}
