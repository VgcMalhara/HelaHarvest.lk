<?php

namespace App\Responses;

use Illuminate\Http\RedirectResponse;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request): RedirectResponse
    {
        $user = auth()->user();

        if ($user->hasRole('admin')) {
            return redirect()->intended('/admin/dashboard');
        }

        if ($user->hasRole('seller')) {
            return redirect()->intended('/seller/dashboard');
        }
        if ($user->hasRole('buyer')) {
            return redirect()->intended('/buyer/dashboard');
        }
        return redirect()->intended('/');
    }
}
