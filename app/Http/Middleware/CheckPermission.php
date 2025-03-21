<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission)
    {
        if (Auth::guest()) {
            return redirect()->route('login');
        }

        // if (! $request->user()->hasPermissionTo($permission)) {
        //     abort(403);
        // }

        return $next($request);
    }
}
