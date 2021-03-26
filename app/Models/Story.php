<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Auth;

class Story extends Model
{
    use HasFactory, HasSlug;

    protected $guarded = [];

    public function comments()
    {
        return $this->hasMany('App\Models\Comment', 'on_story');
    }

    public function author()
    {
        return $this->belongsTo('App\Models\User', 'author_id');
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }

    public function likes()
    {
        return $this->morphToMany('App\Models\User', 'likeable')->whereDeletedAt(null);
    }

    public function getIsLikedAttribute()
    {
        $like = $this->likes()->whereUserId(Auth::user()->id)->first();
        return (!is_null($like)) ? true : false;
    }
}
