<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Competition;
use App\Http\Requests\CompetitionPostRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
class CompetitionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Competition::orderBy('created_at', 'DESC')->get()->toJson();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\Response
     */
    public function show($param)
    {
        return Competition::with('stories')->whereSlug($param)
            ->orWhere('id', $param)->firstOrFail()->toJson();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CompetitionPostRequest $request)
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
                $path_to_picture = 'img/competitions/' . $picture_name;
                Storage::disk('public')->put($path_to_picture, base64_decode($picture));
            }
            $competition = new Competition([
                'name' => $request->name,
                'description' => $request->description,
                'fee' => $request->fee,
                'reward' => $request->reward,
                'deadline' => $request->deadline, 
                'picture' => $path_to_picture
            ]);
            $competition->save();
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => 'success'
        ]);
    }

    public function upload(Request $request)
    {
        try {
            if ($request->hasFile('file')) {
                if ($request->file->isValid()) {
                    $file = $request->file;
                    $fileContent = File::get($file);
                    $fileName = 'img/competitions/file-' . Str::random(10) . '.' . $file->getClientOriginalExtension();
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
     * Store a newly created resource in storage.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\Response
     */
    public function enter($id)
    {
        try {
            $user = Auth::user();
            $user->competitions()->attach($id);
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => 'You have successfully entered a competition'
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Models\Competition  $competition
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $request)
    {
        try {
            $user = Auth::user();
            $user->competitions()->updateExistingPivot($request->competition_id, [
                'story_id' => $request->story_id,
            ]);
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }

        return response()->json([
            'message' => 'You have successfully submitted a story'
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function results()
    {
        $competitions = Competition::with(['stories' => function ($q) {
            $q->select(array('title', 'slug', 'author_id'))
            ->with('author:id,username')
            ->withCount('comments')
            ->withCount('likes')
            ->limit(3)
            ->orderBy('likes_count', 'desc')
            ->get();
        }])->get()->toJson();
        return $competitions;
    }
}
