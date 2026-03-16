<?php

/**
 * Theme footer partial.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WPEmergeTheme
 */
?>
<!-- footer -->
<div class="top-footer">
    <div class="container">
        <div class="top-footer__inner">
            <div class="top-footer__col">
                <?php echo do_shortcode('[wp_tuoixaydung]'); ?>
            </div>
            <div class="top-footer__col">
                <?php echo do_shortcode('[wp_xemhuongnha]'); ?>
            </div>
        </div>
    </div>
</div>
<?php
$contact_slogan = getOption('contact_slogan');
$bg_contact_ft = getOption('bg_contact_ft');
$bg_contact_ft_url = $bg_contact_ft ? wp_get_attachment_image_url($bg_contact_ft, 'full') : '';
$logo_footer = getOption('logo_footer');
$logo_footer_url = wp_get_attachment_image_url($logo_footer, 'full');
$footer_slogan = getOption('footer_slogan');
$ft_title_1 = getOption('footer_title_menu_1');
$ft_menu_1 = getOption('footer_menu_1');
$ft_title_2 = getOption('footer_title_menu_2');
$ft_menu_2 = getOption('footer_menu_2');
?>

<footer class="footer">
    <div class="footer__cta-wrapper">
        <div class="container">
            <div class="footer__cta" style="background-image: url('<?php echo esc_url( $bg_contact_ft_url ); ?>');">
                <div class="footer__cta-content">
                    <h2 class="footer__cta-title">
                        <?php echo nl2br( wp_kses_post( $contact_slogan ) ); ?>
                    </h2>
                </div>
                <div class="footer__cta-action">
                    <?php
                        // Get the page that uses the contact template
                        $contact_pages = get_pages([
                            'meta_key' => '_wp_page_template',
                            'meta_value' => 'page_templates/template-contact.php'
                        ]);
                        $contact_url = !empty($contact_pages) ? get_permalink($contact_pages[0]->ID) : '/lien-he';
                    ?>
                    <a href="<?php echo esc_url($contact_url); ?>" class="footer__btn footer__btn--primary">Liên hệ ngay</a>
                </div>
            </div>
        </div>
    </div>

    <div class="footer__main">
        <div class="container">
            <div class="footer__grid">
                <div class="footer__col footer__col--about">
                    <a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="footer__logo">
                        <img src="<?php echo esc_url( $logo_footer_url ); ?>" alt="Phuc Dai Nam">
                    </a>
                    <?php if ( $footer_slogan = carbon_get_theme_option( 'footer_slogan' . currentLanguage() ) ) : ?>
                        <p class="footer__slogan"><?php echo nl2br( esc_html( $footer_slogan ) ); ?></p>
                    <?php endif; ?>
                    <div class="footer__socials">
                        <a href="#" class="footer__social-link" title="Facebook"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                        <a href="#" class="footer__social-link" title="Tiktok"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
                        <a href="#" class="footer__social-link" title="Youtube"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg></a>
                        <a href="#" class="footer__social-link" title="Pinterest"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.592 0 12.017 0z"/></svg></a>
                    </div>
                </div>
                <div class="footer__col footer__col--company">
                    <?php if ( $ft_title_1 ) : ?>
                        <h3 class="footer__title"><?php echo esc_html( $ft_title_1 ); ?></h3>
                    <?php endif; ?>
                    <?php if ( ! empty( $ft_menu_1 ) ) : ?>
                        <ul class="footer__links">
                            <?php foreach ( $ft_menu_1 as $item ) : ?>
                                <li class="footer__link-item"><a href="<?php echo esc_url( $item['url'] ); ?>" class="footer__link"><?php echo esc_html( $item['title'] ); ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
                <div class="footer__col footer__col--services">
                    <?php if ( $ft_title_2 ) : ?>
                        <h3 class="footer__title"><?php echo esc_html( $ft_title_2 ); ?></h3>
                    <?php endif; ?>
                    <?php if ( ! empty( $ft_menu_2 ) ) : ?>
                        <ul class="footer__links">
                            <?php foreach ( $ft_menu_2 as $item ) : ?>
                                <li class="footer__link-item"><a href="<?php echo esc_url( $item['url'] ); ?>" class="footer__link"><?php echo esc_html( $item['title'] ); ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
                <div class="footer__col footer__col--contact">
                    <h3 class="footer__title">LIÊN HỆ CHÚNG TÔI</h3>
                    <ul class="footer__contact-list">
                        <?php 
                        $ft_phones = getOption('phone_numbers'); 
                        if ( ! empty( $ft_phones ) ) : 
                        ?>
                        <li class="footer__contact-item">
                            <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg> <strong class="footer__contact-label">Hotline:</strong> 
                            <?php 
                            $phone_links = [];
                            foreach ( $ft_phones as $p ) {
                                if ( ! empty( $p['phone'] ) ) {
                                    $phone_links[] = '<a href="tel:' . esc_attr( preg_replace('/[^\d+]/', '', $p['phone']) ) . '" class="footer__contact-link">' . esc_html( $p['phone'] ) . '</a>';
                                }
                            }
                            echo implode(' - ', $phone_links);
                            ?>
                        </li>
                        <?php endif; ?>

                        <?php 
                        $footer_email = getOption('email');
                        if ( ! empty( $footer_email ) ) : 
                        ?>
                        <li class="footer__contact-item"><svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg> <strong class="footer__contact-label">Email:</strong> <a href="mailto:<?php echo esc_attr( $footer_email ); ?>" class="footer__contact-link"><?php echo esc_html( $footer_email ); ?></a></li>
                        <?php endif; ?>

                        <?php 
                        $ft_addresses = getOption('address_locations');
                        if ( ! empty( $ft_addresses ) ) : 
                            foreach ( $ft_addresses as $addr ) : 
                                if ( ! empty( $addr['address'] ) ) : 
                        ?>
                        <li class="footer__contact-item"><svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; flex-shrink: 0;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> 
                            <?php if ( ! empty( $addr['branch'] ) ) : ?>
                            <strong class="footer__contact-label"><?php echo esc_html( $addr['branch'] ); ?>:</strong> 
                            <?php endif; ?>
                            <?php echo nl2br( esc_html( $addr['address'] ) ); ?>
                        </li>
                                <?php endif; ?>
                            <?php endforeach; ?>
                        <?php endif; ?>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="footer__bottom">
        <div class="footer__container">
            <p class="footer__copyright">Copyright &copy; <?php echo date('Y'); ?> Phuc Dai Nam. All rights reserved</p>
        </div>
    </div>
</footer>
<!-- footer end -->

</div>
<!-- container-wrapper end -->

<?php wp_footer(); ?>
</body>

</html>