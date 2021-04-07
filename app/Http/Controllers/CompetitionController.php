<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;
use App\Models\Competition;
use App\Http\Requests\CompetitionPostRequest;
use Symfony\Component\HttpKernel\Exception\HttpException;

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
            $competition = new Competition([
                'name' => $request->name,
                'description' => $request->description,
                'fee' => $request->fee,
                'reward' => $request->reward,
                'deadline' => $request->deadline
            ]);
            $competition->save();
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
}
