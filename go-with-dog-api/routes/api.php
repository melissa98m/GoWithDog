<?php

use App\Http\Controllers\API\AddressController;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\TagController;
use App\Http\Controllers\API\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::post('logout', 'logout');
    Route::post('refresh', 'refresh');
    Route::get('current-user', 'currentUser');
});

Route::controller(CategoryController::class)->group(function () {
    Route::get('categories', 'index');
    Route::get('categories/{category}', 'show');
    Route::post('categories', 'store')->middleware('auth:api');
    Route::patch('categories/{category}', 'update')->middleware('auth:api');
    Route::delete('categories/{category}', 'destroy')->middleware('auth:api');
});

Route::controller(AddressController::class)->group(function () {
    Route::get('addresses', 'index');
    Route::get('addresses/{address}', 'show');
    Route::post('addresses', 'store')->middleware('auth:api');
    Route::patch('addresses/{address}', 'update')->middleware('auth:api');
    Route::delete('addresses/{address}', 'destroy')->middleware('auth:api');
});

Route::controller(TagController::class)->group(function () {
    Route::get('tags', 'index');
    Route::get('tags/{tag}', 'show');
    Route::post('tags', 'store')->middleware('auth:api');
    Route::patch('tags/{tag}', 'update')->middleware('auth:api');
    Route::delete('tags/{tag}', 'destroy')->middleware('auth:api');
});
Route::apiResource("users", UserController::class)->middleware('auth:api');
