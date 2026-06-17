<?php

namespace App\Services;

use Illuminate\Support\Facades\Session;

class CaptchaService
{
    /**
     * Generate an SVG captcha and store the answer in the session.
     * Returns a base64 encoded SVG data URI.
     */
    public static function generate(): string
    {
        // Use numbers only, excluding 0 and 1 for maximum legibility
        $characters = '23456789';
        $code = '';
        for ($i = 0; $i < 4; $i++) {
            $code .= $characters[rand(0, strlen($characters) - 1)];
        }

        // Store the captcha code in the session
        Session::put('captcha_code', $code);

        // SVG Dimensions
        $width = 130;
        $height = 48;
        
        // Start SVG document with dark red styling matching the Welcome/Login theme
        $svg = '<svg width="' . $width . '" height="' . $height . '" viewBox="0 0 ' . $width . ' ' . $height . '" xmlns="http://www.w3.org/2000/svg" style="background: #110204; border-radius: 8px; overflow: hidden; border: 1px solid rgba(232, 25, 44, 0.25);">';
        
        // Add subtle gradient background noise
        $svg .= '<defs>';
        $svg .= '<linearGradient id="captchaGrad" x1="0%" y1="0%" x2="100%" y2="100%">';
        $svg .= '<stop offset="0%" stop-color="#1a0406" />';
        $svg .= '<stop offset="100%" stop-color="#0a0102" />';
        $svg .= '</linearGradient>';
        $svg .= '</defs>';
        $svg .= '<rect width="100%" height="100%" fill="url(#captchaGrad)" />';

        // Add some noise grid/lines (gold and red)
        for ($i = 0; $i < 6; $i++) {
            $x1 = rand(0, $width);
            $y1 = rand(0, $height);
            $x2 = rand(0, $width);
            $y2 = rand(0, $height);
            $color = rand(0, 1) ? 'rgba(232, 25, 44, 0.2)' : 'rgba(212, 175, 55, 0.2)';
            $svg .= '<line x1="' . $x1 . '" y1="' . $y1 . '" x2="' . $x2 . '" y2="' . $y2 . '" stroke="' . $color . '" stroke-width="' . rand(1, 2) . '" />';
        }

        // Add background noise dots (gold and red particles)
        for ($i = 0; $i < 40; $i++) {
            $cx = rand(0, $width);
            $cy = rand(0, $height);
            $r = rand(1, 2);
            $color = rand(0, 1) ? 'rgba(232, 25, 44, 0.25)' : 'rgba(212, 175, 55, 0.25)';
            $svg .= '<circle cx="' . $cx . '" cy="' . $cy . '" r="' . $r . '" fill="' . $color . '" />';
        }

        // Add the text characters
        $len = strlen($code);
        $charWidth = ($width - 20) / $len;
        
        // Colors mapping to the golden/red premium theme
        $colors = [
            '#d4af37', // Gold
            '#e2b35c', // Light Gold
            '#f1c40f', // Vibrant Gold
            '#e8192c', // Theme Red
            '#ff4d5a', // Light Red
        ];

        for ($i = 0; $i < $len; $i++) {
            $char = $code[$i];
            $x = 12 + ($i * $charWidth) + rand(-2, 2);
            $y = ($height / 2) + 8 + rand(-3, 3);
            $angle = rand(-15, 15);
            $color = $colors[rand(0, count($colors) - 1)];
            
            // Render character with rotation and styling
            $svg .= '<text x="' . $x . '" y="' . $y . '" fill="' . $color . '" font-size="' . rand(24, 28) . '" font-weight="bold" font-family="monospace, Courier, sans-serif" transform="rotate(' . $angle . ', ' . ($x + 6) . ', ' . ($y - 8) . ')">' . $char . '</text>';
        }

        $svg .= '</svg>';

        return 'data:image/svg+xml;base64,' . base64_encode($svg);
    }

    /**
     * Check if the provided value matches the captcha code in the session.
     * Burns the code from the session to prevent replay attacks.
     */
    public static function check(?string $value): bool
    {
        if (empty($value)) {
            return false;
        }

        $sessionValue = Session::get('captcha_code');
        
        // Clear the code so it cannot be used again
        Session::forget('captcha_code');
        
        return $sessionValue !== null && strtolower($value) === strtolower($sessionValue);
    }
}
