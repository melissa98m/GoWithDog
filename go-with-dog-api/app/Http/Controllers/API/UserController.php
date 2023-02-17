<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'status' => 'Success',
            'data' => $users
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param User $user
     * @return JsonResponse
     */
    public function show(User $user)
    {
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Tag  $tag
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['status' => 'Supprimer avec succès']);
    }

    public function Current()
    {
        $current = Auth::id();
        return response()->json(
            ['status' => 'Success',
            'data' => $current
            ]);
    }
    public function updatePassword(Request $request)
    {
        # Validation
        $request->validate(
            [
                'old_password' => 'required',
                'new_password' => 'required|min:6',
                'confirm_password' => 'required|same:new_password',
            ]);


        #Match The Old Password
        $user = $request->user();
        if (Hash::check($request->old_password, auth()->user()->password)) {
            $user->update([
                'password' => Hash::make($request->new_password)
            ]);
            return response()->json([
                'message' => "Password successfully updated",
            ], 200);
        } else {
            return response()->json([
                'message' => "Old password does not matched",
            ], 400);
        }

    }

}
