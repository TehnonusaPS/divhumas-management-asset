<?php

// Paksa Laravel untuk tidak menggunakan cache file bawaan lokal
if (!isset($_SERVER['LARAVEL_STORAGE_PATH'])) {
    define('LARAVEL_START', microtime(true));
}

// Jalankan aplikasi utama
require __DIR__ . '/../public/index.php';
