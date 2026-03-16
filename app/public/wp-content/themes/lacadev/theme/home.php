<?php
/**
 * App Layout: layouts/app.php
 *
 * Home / Posts Page Template
 *
 * Template dành cho trang Posts Page được set trong Settings → Reading.
 * WordPress dùng home.php (trước index.php) khi một Page được chỉ định
 * làm "Posts page" (show_on_front = page).
 *
 * Template Hierarchy: home.php → index.php
 *
 * @link    https://codex.wordpress.org/Template_Hierarchy
 * @package WPEmergeTheme
 */

// Trang Posts Page dùng cùng layout với trang archive thông thường.
// Chỉ cần include archive.php là đủ.
require __DIR__ . '/archive.php';
