<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Log;
use App\Rules\TokensLimit;

class TokensController extends Controller
{
    /**
     * Display a listing of the tokens.
     */
    public function index(): Response
    {
        return Inertia::render('Settings/Tokens/Tokens', [
            'tokens' => Auth::user()->tokens,
            'newToken' => session('newToken'),
        ]);
    }

    /**
     * Store a newly created token in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'unique:personal_access_tokens,name,NULL,user_id',
                'max:255',
                'min:3', 
                new TokensLimit,
            ],
        ]);

        $token = $request->user()->createToken($request->name);

        return redirect()->back()->with(['newToken' => [
            'id' => $token->accessToken->id,
            'token' => $token->plainTextToken,
        ]]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated = $request->validate([
            'token' => [
                'required',
                'exists:personal_access_tokens,id,tokenable_id,' . Auth::id(),
            ],
        ]);

        Auth::user()->tokens()->where('id', $request->token)->delete();
    }
}
