<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use Auth;

class Post extends Model
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

    public function commentsCount()
    {
        return $this->comments()->count();
    }

}
