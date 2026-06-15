<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

    // Navbar routes
    Route::get('/aset', function () {
        return Inertia::render('Aset');
    })->name('aset');

    Route::get('/aset/pencarian', function () {
        return Inertia::render('PencarianAset');
    })->name('aset.pencarian');

    Route::get('/pengaduan', function () {
        return Inertia::render('Pengaduan');
    })->name('pengaduan');

    Route::get('/statistik', function () {
        return Inertia::render('Statistik');
    })->name('statistik');

    Route::get('/pengguna', function () {
        return Inertia::render('ManajemenPengguna');
    })->name('pengguna');
});

require __DIR__.'/auth.php';
