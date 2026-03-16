<?php
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Theme header partial.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WPEmergeTheme
 */
?>

<!DOCTYPE html>
<html <?php language_attributes(); ?> data-theme="light">

<head>
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0">
	<link rel="profile" href="http://gmpg.org/xfn/11" />
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>

	<link rel="apple-touch-icon" sizes="57x57" href="<?php theAsset('favicon/apple-icon-57x57.png'); ?>">
	<link rel="apple-touch-icon" sizes="60x60" href="<?php theAsset('favicon/apple-icon-60x60.png'); ?>">
	<link rel="apple-touch-icon" sizes="72x72" href="<?php theAsset('favicon/apple-icon-72x72.png'); ?>">
	<link rel="apple-touch-icon" sizes="76x76" href="<?php theAsset('favicon/apple-icon-76x76.png'); ?>">
	<link rel="apple-touch-icon" sizes="114x114" href="<?php theAsset('favicon/apple-icon-114x114.png'); ?>">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php theAsset('favicon/apple-icon-120x120.png'); ?>">
	<link rel="apple-touch-icon" sizes="144x144" href="<?php theAsset('favicon/apple-icon-144x144.png'); ?>">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php theAsset('favicon/apple-icon-152x152.png'); ?>">
	<link rel="apple-touch-icon" sizes="180x180" href="<?php theAsset('favicon/apple-icon-180x180.png'); ?>">
	<link rel="icon" type="image/png" sizes="192x192" href="<?php theAsset('favicon/android-icon-192x192.png'); ?>">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php theAsset('favicon/favicon-32x32.png'); ?>">
	<link rel="icon" type="image/png" sizes="96x96" href="<?php theAsset('favicon/favicon-96x96.png'); ?>">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php theAsset('favicon/favicon-16x16.png'); ?>">
	<link rel="manifest" href="<?php theAsset('favicon/manifest.json'); ?>">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="<?php theAsset('favicon/ms-icon-144x144.png'); ?>">
    <meta name="theme-color" content="#ffffff">
    <?php
    $critical_css_path = get_template_directory() . '/dist/styles/critical.css';
    if (file_exists($critical_css_path)) {
        echo '<style id="critical-css">' . file_get_contents($critical_css_path) . '</style>';
    }
    ?>
    <style>
        :root {
            /* Theme colors */
            --primary-color: <?php echo carbon_get_theme_option('primary_color'); ?>;
            --secondary-color: <?php echo carbon_get_theme_option('secondary_color'); ?>;
            --text-color: <?php echo carbon_get_theme_option('text_color'); ?>;
        }
    </style>
</head>

<body <?php body_class(); ?>>
    <?php
    app_shim_wp_body_open();
    ?>

	<!-- Skip to content link for accessibility -->
	<a class="skip-link screen-reader-text" href="#main-content">
		<?php esc_html_e('Skip to content', 'laca'); ?>
	</a>

	<?php
	if (is_home() || is_front_page()):
		echo '<h1 class="site-name screen-reader-text">' . esc_html(get_bloginfo('name')) . '</h1>';
	endif;
	?>

	<div class="wrapper" id="swup">
        <?php if (!is_404()) : ?>

            <div class="top-info">
                <div class="container-fluid">
                    <div class="top-info__inner">
                        <div class="top-info__left">
                            <!-- Phone numbers -->
                            <?php
                            $phones = getOption('phone_numbers');
                            if ($phones) :
                                foreach ($phones as $phone) :
                                    $phone_number = str_replace(['.', ' '], '', $phone['phone']);
                            ?>
                                <div class="top-info__left-item">
                                    <span class="top-info__left-item-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M9.85651 7.20127C10.3746 6.51451 10.5604 5.79072 9.97444 5.15183C8.65949 3.34202 7.77515 2.22284 7.22044 1.68386C6.16589 0.659207 4.43112 0.797808 3.51779 1.68299C3.02723 2.15843 2.86116 2.32169 2.35747 2.82492C-0.448184 5.58606 1.26285 11.423 5.81139 15.9014C10.3589 20.3787 16.2926 22.0626 19.1041 19.2956C19.5689 18.8549 19.9624 18.4676 20.2728 18.145C21.1678 17.2145 21.3037 15.5834 20.2669 14.5238C19.7354 13.9805 18.6503 13.1526 16.7329 11.8036C16.1457 11.2871 15.4494 11.399 14.811 11.811C14.504 12.0091 14.2805 12.2096 13.8585 12.625L13.0923 13.3791C12.9914 13.4785 11.621 12.8034 10.2907 11.4937C8.95972 10.1832 8.2739 8.8352 8.37435 8.7364L9.14112 7.98178C9.27499 7.84997 9.339 7.78616 9.42108 7.70131C9.59209 7.52452 9.73368 7.36409 9.85651 7.20127ZM14.5057 14.7702L15.2721 14.0159C15.5044 13.7873 15.6549 13.6467 15.7773 13.5498C17.457 14.7362 18.4297 15.4822 18.8271 15.8883C19.0656 16.1321 19.0286 16.577 18.8212 16.7926C18.5342 17.0909 18.1613 17.4579 17.7037 17.892C15.8857 19.681 11.0959 18.3217 7.22513 14.5107C3.35315 10.6984 1.97188 5.98641 3.7762 4.2107C4.27786 3.70954 4.4368 3.55328 4.92035 3.08463C5.10166 2.90892 5.59552 2.86946 5.81608 3.08376C6.24314 3.49872 7.03534 4.49644 8.20071 6.09317C8.14038 6.16684 8.06503 6.25009 7.97333 6.34489C7.90603 6.41446 7.84996 6.47037 7.72738 6.59105L6.96136 7.34493C5.65821 8.62661 6.76802 10.808 8.87697 12.8844C10.9845 14.9594 13.203 16.0522 14.5057 14.7702Z"></path></svg>
                                        <a href="tel:<?php echo esc_attr($phone_number); ?>"><?php echo esc_html($phone['name']); ?>: <?php echo esc_html($phone_number); ?></a>
                                    </span>
                                </div>
                            <?php 
                                endforeach;
                            endif; 
                            ?>
                            
                            <!-- Email -->
                            <?php
                            $email = getOption('email');
                            if ($email) :
                            ?>
                                <div class="top-info__left-item">
                                    <span class="top-info__left-item-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="19" viewBox="0 0 22 19" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M2 0.950684H20C21.1046 0.950684 22 1.83143 22 2.9179V16.6884C22 17.7749 21.1046 18.6556 20 18.6556H2C0.89543 18.6556 0 17.7749 0 16.6884V2.9179C0 1.83143 0.89543 0.950684 2 0.950684ZM2 7.4603V16.6884H20V7.46072L11 11.887L2 7.4603ZM2 5.26084L11 9.68752L20 5.26131V2.9179H2V5.26084Z"></path></svg>
                                    </span>
                                    <a href="mailto:<?php echo esc_attr($email); ?>"><?php echo esc_html($email); ?></a>
                                </div>
                            <?php endif; ?>
                        </div>

                        <div class="top-info__right">
                            <div class="top-info__right-item">
                                <!-- Search form -->
                                <div class="header__search">
                                    <div class="header__search-inner">
                                        <form class="header__search-box" method="get" role="search" aria-label="<?php esc_attr_e('Tìm kiếm', 'laca'); ?>" action="<?php echo esc_url(home_url('/')) ?>">
                                            <label for="search-input" class="screen-reader-text"><?php esc_html_e('Từ khóa tìm kiếm', 'laca'); ?></label>
                                            <input type="text" 
                                                    id="search-input"
                                                    name="s"
                                                    class="header__search-input"
                                                    placeholder="<?php echo esc_attr__('Tìm kiếm ...', 'laca'); ?>" 
                                                    aria-label="<?php esc_attr_e('Nhập từ khóa tìm kiếm', 'laca'); ?>"/>
                                            <button type="reset" class="header__search-reset" aria-label="<?php esc_attr_e('Xóa tìm kiếm', 'laca'); ?>"></button>
                                            <div class="header__search-results" 
                                                    role="status" 
                                                    aria-live="polite" 
                                                    aria-atomic="true"></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <header class="header" id="header">
                <div class="container-fluid">
                    <div class="header__inner">
                        <!-- Logo -->
                        <div class="header__logo">
                            <?php 
                            $logo_id = carbon_get_theme_option('logo');
                            $logo_url = wp_get_attachment_image_url($logo_id, 'full');
                            if ($logo_url) :
                            ?>
                                <a href="<?php echo esc_url(home_url('/')); ?>" class="header__logo-link">
                                    <img src="<?php echo esc_url($logo_url); ?>" class="header__logo-img" alt="<?php echo esc_attr(get_bloginfo('name')); ?>">
                                </a>
                            <?php
                            endif;
                            ?>
                        </div>
                        <!-- Main menu -->
                        <div class="header__menu-desktop">
                            <?php
                            echo '<nav class="header__nav" aria-label="' . esc_attr__('Main menu', 'laca') . '">';
                                wp_nav_menu([
                                    'theme_location' => 'main-menu',
                                    'menu_class'     => 'header__menu-list',
                                    'container'      => false,
                                    'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
                                    'walker'         => new Laca_Menu_Walker(),
                                ]);
                            echo '</nav>';
                            ?>
                        </div>

                        <div class="header__menu-mobile">
                            <div class="header__hamburger" id="btn-hamburger">
                                <div class="header__hamburger-icon">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Mobile Overlay Menu -->
                <div class="header__overlay">
                    <div class="header__overlay-bg"></div>
                    <div class="header__overlay-inner">
                        <?php theLanguageSwitcher(); ?>
                        <div class="header__overlay-label"><?php _e('NAVIGATION', 'laca'); ?></div>
                        <?php
                        echo '<nav class="header__overlay-nav">';
                            wp_nav_menu([
                                'theme_location' => 'main-menu',
                                'menu_class'     => 'header__overlay-menu-list',
                                'container'      => false,
                                'items_wrap'     => '<ul class="%2$s">%3$s</ul>',
                                'walker'         => new Laca_Menu_Walker(),
                            ]);
                        echo '</nav>';
                        ?>
                        
                        <div class="header__overlay-footer">
                            <div class="header__overlay-socials">
                                <a href="#" target="_blank" class="header__overlay-social-link">Facebook</a>
                                <a href="#" target="_blank" class="header__overlay-social-link">Instagram</a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        <?php endif; ?>
