<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        if (!auth()->check() || !auth()->user()->hasRole($role)) {
            return redirect('/')->with('error', 'You do not have seller access.');
        }

        return $next($request);
    }
}
