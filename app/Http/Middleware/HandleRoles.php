<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class HandleRoles
{
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (Auth::guest()) {
            return redirect()->route('login');
        }

        // Check if user has any of the role
        $hasRole = collect($roles)->contains(function ($role) use ($request) {
            return $request->user()->hasRole($role);
        });

        if (!$hasRole) {
            if($request->user()->hasRole('teacher')) {
                return redirect()->route('teacher_dashboard');
            }
            if($request->user()->hasRole('parent')) {
                return redirect()->route('parent_dashboard');
            }
            abort(Response::HTTP_FORBIDDEN);
        }

        return $next($request);
    }
}
