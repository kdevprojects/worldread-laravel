<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $userRole = Auth::user()->role;
        if ($userRole) {

            // Set scope as admin/member based on user role
            $request->request->add([
                'scope' => $userRole
            ]);
        }
        return $next($request);
    }
}
