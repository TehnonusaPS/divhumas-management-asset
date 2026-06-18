<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/refresh-captcha', function () {
    return response()->json([
        'captcha' => captcha_src()
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Index');
})->middleware(['auth', 'verified'])->name('dashboard');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Navbar routes
    Route::get('/aset', function () {
        return Inertia::render('Aset/Index');
    })->name('aset');

    Route::get('/aset/pencarian', function () {
        return Inertia::render('Aset/Pencarian');
    })->name('aset.pencarian');

    Route::get('/pengaduan', function () {
        return Inertia::render('Pengaduan/Index');
    })->name('pengaduan');

    Route::get('/statistik', function () {
        return Inertia::render('Statistik/Index');
    })->name('statistik');

    Route::get('/pengguna', function () {
        return Inertia::render('Pengguna/Index');
    })->name('pengguna');
});

require __DIR__.'/auth.php';

if (app()->environment('local')) {
    Route::get('/dev/components', function () {
        return Inertia::render('Dev/ComponentShowcase');
    })->name('dev.components');
}
