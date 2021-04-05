<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'email',
        'password'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function stories()
    {
        return $this->hasMany('App\Models\Story', 'author_id');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment', 'from_user');
    }

    public function role()
    {
        $role = $this->role;
        return $role;
    }

    public function can_story()
    {
        $role = $this->role;
        if ($role == 'member' || $role == 'admin') {
            return true;
        }
        return false;
    }

    public function is_admin()
    {
        $role = $this->role;
        if ($role == 'admin') {
            return true;
        }
        return false;
    }

    public function likedPosts()
    {
        return $this->morphedByMany('App\Models\Story', 'likeable')->whereDeletedAt(null);
    }

    public function competitions()
    {
        //return $this->belongsToMany(RelatedModel, pivot_table_name, foreign_key_of_current_model_in_pivot_table, foreign_key_of_other_model_in_pivot_table);
        return $this->belongsToMany(
            Competition::class,
            'competitions_users',
            'user_id',
            'competition_id'
        )->as('subscription')
            ->withTimestamps();
    }

    public function getCompetitionsIdsAttribute()
    {
        return $this->competitions->pluck('competition_id');
    }
}
