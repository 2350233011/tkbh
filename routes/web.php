<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::group(['middleware'=>['cors']],function() {
//    Route::post('/import', [UserController::class, 'importExcel']);
//
//});

Route::get('/', function () {
    return view('index');
});
Route::get('/amdin', function () {
    return view('dist');
});
Route::get('/2', function () {
    return view('index2');
});

Route::post('/import', [UserController::class, 'importExcel']);
Route::post('/excelsearch', [UserController::class, 'excelsearch']);
