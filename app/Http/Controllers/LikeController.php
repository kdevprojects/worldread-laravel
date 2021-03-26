<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use Auth;
use Symfony\Component\HttpKernel\Exception\HttpException;

class LikeController extends Controller
{
    public function likeStory($id)
    {
        // here you can check if story exists or is valid or whatever

        if($this->handleLike('App\Models\Story', $id)) {
            return response()->json([
                'liked' => true
            ]);
        };
        return response()->json([
            'liked' => false
        ]);

    }

    public function handleLike($type, $id)
    {
        try {
            $existing_like = Like::withTrashed()->whereLikeableType($type)->whereLikeableId($id)->whereUserId(Auth::user()->id)->first();

            if (is_null($existing_like)) {
                Like::create([
                    'user_id'       => Auth::user()->id,
                    'likeable_id'   => $id,
                    'likeable_type' => $type,
                ]);
                return true; // new like added
            } else {
                // if (is_null($existing_like->deleted_at)) {
                //     $existing_like->delete();
                // } else {
                //     $existing_like->restore();
                // }
                return false; // do nothing
            }
        } catch (\Exception $e) {
            throw new HttpException(500, $e->getMessage());
        }
    }
}
