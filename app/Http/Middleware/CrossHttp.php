<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CrossHttp
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse) $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        header('Access-Control-Allow-Origin:*');
        header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS,PATCH');
        header('Access-Control-Allow-Headers:Origin, Content-Type, Cookie, Accept, X-CSRF-TOKEN,token,Authorization');
        header('Access-Control-Allow-Credentials:true');
        return $next($request);
    }
}
