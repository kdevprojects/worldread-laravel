<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Like extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'likeables';

    protected $fillable = [
        'user_id',
        'likeable_id',
        'likeable_type',
    ];

    /**
     * Get all of the stories that are assigned this like.
     */
    public function stories()
    {
        return $this->morphedByMany('App\Models\Story', 'likeable');
    }

    /**
     * Get all of the posts that are assigned this like.
     */
    public function comments()
    {
        return $this->morphedByMany('App\Models\Comment', 'likeable');
    }
}
