<?php

namespace App\Http\Controllers;

use App\Models\Story;
use Illuminate\Http\Request;
use App\Http\Requests\StoryPostRequest;
use Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class StoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Story::with('author:id,username')->withCount('comments')->withCount('likes')->get()->toJson();
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
            $story = new Story([
                'title' => $request->title,
                'summary' => $request->summary,
                'body' => $request->body,
                'author_id' => Auth::user()->id
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
        return Story::find($id)->comments()->with('author')->get()->toJson();
    }
}
