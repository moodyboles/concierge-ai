<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TokensController;
use App\Http\Controllers\GenerateDishes;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\Api\DishesApiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', function () {
    return redirect()->route('register');
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::prefix('settings')->group(function () {
        Route::resource('tokens', TokensController::class)->only(['index', 'store']);
        Route::delete('tokens', [TokensController::class, 'destroy'])->name('tokens.destroy');
    });
});

Route::prefix('generate')
    ->middleware('auth')
    ->group(function () {
        Route::get('/dishes', [GenerateDishes::class, 'index'])->name('generate.view');
        Route::patch('/dishes', [GenerateDishes::class, 'generate'])->name('generate.dishes');
});

Route::resource('events', EventsController::class)->only(['index', 'show'])->middleware('auth');

Route::prefix('api')
    ->group(function () {

        Route::prefix('v1')
            ->middleware('auth:sanctum')
            ->group(function () {

                Route::get('/generate-dishes', [DishesApiController::class, 'get'])->name('api.dishes');
                
            });

});

require __DIR__.'/auth.php';
