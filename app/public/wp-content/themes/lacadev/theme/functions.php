<?php
use WPEmerge\Facades\WPEmerge;
use WPEmergeTheme\Facades\Theme;

if (!defined('ABSPATH')) {
    exit;
}

// =============================================================================
// SECURITY & PERMISSIONS
// =============================================================================
/**
 * Define super users (Developers) who can see system menus and hidden users.
 */
add_filter('lacadev_super_user_logins', function($logins) {
    return ['lacadev']; // Add your developer username here
});

/**
 * Inject night sky background to login page
 */
add_action('login_header', function() {
    ?>
    <div class="login-night-sky" aria-hidden="true">
        <div class="alp-stars">
            <?php foreach (range(1, 80) as $i) : 
                $size = rand(15, 30) / 10;
                $left = rand(0, 10000) / 100;
                $top = rand(0, 10000) / 100;
                $dur = rand(20, 50) / 10;
                $delay = rand(0, 50) / 10;
            ?>
                <div class="alp-star" style="left:<?php echo $left; ?>%; top:<?php echo $top; ?>%; width:<?php echo $size; ?>px; height:<?php echo $size; ?>px; --d:<?php echo $dur; ?>s; animation-delay:<?php echo $delay; ?>s;"></div>
            <?php endforeach; ?>
        </div>
        <div class="alp-moon"></div>
    </div>
    <?php
});

/**
 * Custom check for super user status
 */
add_filter('lacadev_is_super_user', function($is_super, $current_user) {
    // Developers are always super users regardless of role
    $super_logins = apply_filters('lacadev_super_user_logins', ['lacadev']);
    if (in_array($current_user->user_login, $super_logins, true)) {
        return true;
    }
    return $is_super;
}, 10, 2);

// =============================================================================
// THEME INFORMATION
// =============================================================================
define('AUTHOR', [
    'name' => 'La Cà Dev',
    'email' => 'admin@lacadev.com',
    'phone_number' => '0989.64.67.66',
    'website' => 'https://lacadev.com/',
    'date_started' => get_option('_theme_info_date_started'),
    'date_published' => get_option('_theme_info_date_publish'),
]);

// =============================================================================
// DIRECTORY CONSTANTS
// =============================================================================

// Directory Names
define('APP_APP_DIR_NAME', 'app');
define('APP_APP_HELPERS_DIR_NAME', 'helpers');
define('APP_APP_ROUTES_DIR_NAME', 'routes');
define('APP_APP_SETUP_DIR_NAME', 'setup');
define('APP_DIST_DIR_NAME', 'dist');
define('APP_RESOURCES_DIR_NAME', 'resources');
define('APP_THEME_DIR_NAME', 'theme');
define('APP_VENDOR_DIR_NAME', 'vendor');

// Theme Component Names
define('APP_THEME_USER_NAME', 'users');
define('APP_THEME_TAXONOMY_NAME', 'taxonomies');
define('APP_THEME_WIDGET_NAME', 'widgets');
define('APP_THEME_BLOCK_NAME', 'blocks');
define('APP_THEME_WALKER_NAME', 'walkers');

// Directory Paths
define('APP_DIR', dirname(__DIR__) . DIRECTORY_SEPARATOR);
define('APP_APP_DIR', APP_DIR . APP_APP_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_HELPERS_DIR', APP_APP_DIR . APP_APP_HELPERS_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_ROUTES_DIR', APP_APP_DIR . APP_APP_ROUTES_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_RESOURCES_DIR', APP_DIR . APP_RESOURCES_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_THEME_DIR', APP_DIR . APP_THEME_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_VENDOR_DIR', APP_DIR . APP_VENDOR_DIR_NAME . DIRECTORY_SEPARATOR);
define('APP_DIST_DIR', APP_DIR . APP_DIST_DIR_NAME . DIRECTORY_SEPARATOR);

// Setup Directories
define('APP_APP_SETUP_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR);
// define('APP_APP_SETUP_ECOMMERCE_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_ECOMMERCE_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_SETUP_USER_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_USER_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_SETUP_TAXONOMY_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_TAXONOMY_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_SETUP_WIDGET_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_WIDGET_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_SETUP_BLOCK_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_BLOCK_NAME . DIRECTORY_SEPARATOR);
define('APP_APP_SETUP_WALKER_DIR', APP_THEME_DIR . APP_APP_SETUP_DIR_NAME . DIRECTORY_SEPARATOR . APP_THEME_WALKER_NAME . DIRECTORY_SEPARATOR);

// =============================================================================
// DEPENDENCIES & AUTOLOADING
// =============================================================================

// Load composer dependencies
if (file_exists(APP_VENDOR_DIR . 'autoload.php')) {
    require_once APP_VENDOR_DIR . 'autoload.php';
    \Carbon_Fields\Carbon_Fields::boot();
}

// Enable Theme shortcut
WPEmerge::alias('Theme', \WPEmergeTheme\Facades\Theme::class);

// Load helpers
require_once APP_APP_DIR . 'helpers.php';

// Load responsive image helpers (NEW - for automatic srcset/sizes)
require_once APP_APP_DIR . 'helpers/responsive-images.php';

// Bootstrap Theme
// phpcs:ignore
Theme::bootstrap(require APP_APP_DIR . 'config.php');

// Register hooks
require_once APP_APP_DIR . 'hooks.php';

// =============================================================================
// THEME SETUP
// =============================================================================
add_action('after_setup_theme', function () {
    // Load textdomain
    load_theme_textdomain('laca', APP_THEME_DIR . 'languages');

    // Load theme components
    require_once APP_APP_SETUP_DIR . 'theme-support.php';
    require_once APP_APP_SETUP_DIR . 'menus.php';

    // Load security & SEO (Phase 1 improvements)
    require_once APP_APP_SETUP_DIR . 'security.php';
    require_once APP_APP_SETUP_DIR . 'recaptcha.php';
    // contact-recaptcha.php removed - recaptcha.php handles all forms including contact
    // require_once APP_APP_SETUP_DIR . 'seo.php';

    // Load image optimization (Phase 2 improvements)
    require_once APP_APP_SETUP_DIR . 'image-optimization.php';

    // Load advanced optimization modules
    require_once APP_APP_SETUP_DIR . 'assets.php';
    require_once APP_APP_SETUP_DIR . 'performance.php';

    // Load Gutenberg blocks (Carbon Fields)
    // $blocks_dir = APP_APP_SETUP_DIR . '/blocks';
    // $block_files = glob($blocks_dir . '/*.php');
    // foreach ($block_files as $block_file) {
    //     require_once $block_file;
    // }

    // Load ReactJS Gutenberg blocks
    require_once APP_APP_SETUP_DIR . 'gutenberg-blocks.php';

});

// =============================================================================
// AUTOLOAD COMPONENTS
// =============================================================================
$folders = [
    // APP_APP_SETUP_ECOMMERCE_DIR,
    APP_APP_SETUP_TAXONOMY_DIR,
    APP_APP_SETUP_WALKER_DIR,
];

foreach ($folders as $folder) {
    $filesPath = scandir($folder);
    if ($filesPath !== false) {
        foreach ($filesPath as $item) {
            $file = $folder . $item;
            if (is_file($file)) {
                require_once $folder . $item;
            }
        }
    }
}

/**
 * Localize AJAX search data (script bundled in theme.js)
 */
function custom_ajax_search_script()
{
    wp_localize_script('theme-js-bundle', 'themeSearch', [
        'ajaxurl' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('theme_search_nonce'),
    ]);
}
add_action('wp_enqueue_scripts', 'custom_ajax_search_script');

/**
 * Register custom query vars for search pagination
 */
function lacadev_register_search_query_vars($vars)
{
    $vars[] = 'paged_post';
    $vars[] = 'paged_page';
    $vars[] = 'paged_product';
    $vars[] = 'paged_service';
    // Add more custom post types as needed
    return $vars;
}
add_filter('query_vars', 'lacadev_register_search_query_vars');

// =============================================================================
// ARCHIVE AJAX PAGINATION
// =============================================================================

/**
 * AJAX handler – load archive page (posts, categories, tags, custom post types).
 * Trả về JSON: { html: string, pagination: string, found: int }
 */
function lacadev_ajax_archive_load() {
    // Verify nonce
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'theme_nonce' ) ) {
        wp_send_json_error( [ 'message' => __( 'Invalid nonce', 'laca' ) ], 403 );
    }

    $paged        = max( 1, absint( $_POST['paged'] ?? 1 ) );
    $posts_per    = max( 1, min( 48, absint( $_POST['posts_per_page'] ?? get_option( 'posts_per_page', 12 ) ) ) );
    $post_type    = sanitize_key( $_POST['post_type'] ?? 'post' );
    $cat_id       = absint( $_POST['cat_id'] ?? 0 );
    $tag_id       = absint( $_POST['tag_id'] ?? 0 );
    $tax_term     = absint( $_POST['tax_term'] ?? 0 );
    $taxonomy     = sanitize_key( $_POST['taxonomy'] ?? '' );

    $args = [
        'post_type'           => $post_type,
        'post_status'         => 'publish',
        'posts_per_page'      => $posts_per,
        'paged'               => $paged,
        'ignore_sticky_posts' => true,
        'no_found_rows'       => false,
    ];

    if ( $cat_id ) {
        $args['cat'] = $cat_id;
    } elseif ( $tag_id ) {
        $args['tag_id'] = $tag_id;
    } elseif ( $tax_term && $taxonomy ) {
        $args['tax_query'] = [[
            'taxonomy' => $taxonomy,
            'field'    => 'term_id',
            'terms'    => $tax_term,
        ]];
    }

    $query = new WP_Query( $args );

    // N+1 prevention
    if ( ! empty( $query->posts ) ) {
        update_post_caches( $query->posts, $post_type, true, true );
        update_object_term_cache( wp_list_pluck( $query->posts, 'ID' ), $post_type );
    }

    // Render items HTML
    ob_start();
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $post_id    = get_the_ID();
            $post_url   = get_permalink();
            $post_title = get_the_title();
            $thumb_id   = get_post_thumbnail_id();

            $cats     = get_the_terms( $post_id, 'category' );
            $cat_name = '';
            $cat_url  = '';
            if ( ! empty( $cats ) && ! is_wp_error( $cats ) ) {
                $cat_name = esc_html( $cats[0]->name );
                $cat_url  = esc_url( get_term_link( $cats[0] ) );
            }

            $the_post    = get_post( $post_id );
            $excerpt_raw = has_excerpt( $post_id )
                ? get_the_excerpt( $post_id )
                : wp_strip_all_tags( $the_post->post_content );
            $excerpt = wp_trim_words( $excerpt_raw, 18, '…' );
            ?>
            <article class="laca-news-list__item">
                <a href="<?php echo esc_url( $post_url ); ?>" class="laca-news-list__thumb-link" tabindex="-1" aria-hidden="true">
                    <div class="laca-news-list__thumb">
                        <?php if ( $thumb_id ) : ?>
                            <?php echo wp_get_attachment_image( $thumb_id, 'large', false, [
                                'class'   => 'laca-news-list__img',
                                'loading' => 'lazy',
                                'alt'     => esc_attr( $post_title ),
                            ] ); ?>
                        <?php else : ?>
                            <div class="laca-news-list__img-placeholder"></div>
                        <?php endif; ?>
                    </div>
                </a>

                <div class="laca-news-list__content">
                    <?php if ( $cat_name ) : ?>
                        <a href="<?php echo $cat_url; ?>" class="laca-news-list__cat"><?php echo $cat_name; ?></a>
                    <?php endif; ?>

                    <h3 class="laca-news-list__item-title">
                        <a href="<?php echo esc_url( $post_url ); ?>"><?php echo esc_html( $post_title ); ?></a>
                    </h3>

                    <?php if ( $excerpt ) : ?>
                        <p class="laca-news-list__excerpt"><?php echo esc_html( $excerpt ); ?></p>
                    <?php endif; ?>

                    <a href="<?php echo esc_url( $post_url ); ?>" class="laca-news-list__read-more">
                        <?php esc_html_e( 'Xem thêm', 'laca' ); ?>
                    </a>
                </div>
            </article>
            <?php
        }
    }
    $html = ob_get_clean();
    wp_reset_postdata();

    // Render pagination HTML
    $pagination_html = '';
    if ( $query->max_num_pages > 1 ) {
        $pages = paginate_links( [
            'base'      => '%_%',
            'format'    => '',
            'current'   => $paged,
            'total'     => $query->max_num_pages,
            'mid_size'  => 2,
            'type'      => 'array',
            'prev_next' => true,
            'prev_text' => '&laquo;',
            'next_text' => '&raquo;',
        ] );

        if ( is_array( $pages ) ) {
            $pagination_html = '<nav class="pagination-container" aria-label="Page navigation"><ul class="pagination-list">';
            foreach ( $pages as $page ) {
                $is_current  = strpos( $page, 'current' ) !== false;
                $is_dots     = strpos( $page, 'dots' ) !== false;
                $item_class  = 'pagination-item';
                if ( $is_current ) $item_class .= ' is-active';
                if ( $is_dots )    $item_class .= ' is-dots';
                $pagination_html .= '<li class="' . esc_attr( $item_class ) . '">' . $page . '</li>';
            }
            $pagination_html .= '</ul></nav>';
        }
    }

    wp_send_json_success( [
        'html'        => $html,
        'pagination'  => $pagination_html,
        'found'       => (int) $query->found_posts,
        'max_pages'   => (int) $query->max_num_pages,
        'current'     => $paged,
    ] );
}
add_action( 'wp_ajax_lacadev_archive_load',        'lacadev_ajax_archive_load' );
add_action( 'wp_ajax_nopriv_lacadev_archive_load', 'lacadev_ajax_archive_load' );

// =============================================================================
// AJAX: PROJECT ARCHIVE LOAD
// =============================================================================
/**
 * AJAX handler cho trang archive dự án.
 * Hỗ trợ filter theo project_cat và phân trang.
 * Render project cards đúng kiểu laca-project-list__card với meta fields.
 */
function lacadev_ajax_project_archive_load() {
    if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['nonce'] ) ), 'theme_nonce' ) ) {
        wp_send_json_error( [ 'message' => __( 'Invalid nonce', 'laca' ) ], 403 );
    }

    $paged    = max( 1, absint( $_POST['paged'] ?? 1 ) );
    $posts_per = max( 1, min( 48, absint( $_POST['posts_per_page'] ?? get_option( 'posts_per_page', 12 ) ) ) );
    $cat_slug = isset( $_POST['cat_slug'] ) ? sanitize_title( wp_unslash( $_POST['cat_slug'] ) ) : '';

    $args = [
        'post_type'           => 'project',
        'post_status'         => 'publish',
        'posts_per_page'      => $posts_per,
        'paged'               => $paged,
        'ignore_sticky_posts' => true,
        'no_found_rows'       => false,
        'orderby'             => 'date',
        'order'               => 'DESC',
    ];

    if ( $cat_slug ) {
        $args['tax_query'] = [[
            'taxonomy' => 'project_cat',
            'field'    => 'slug',
            'terms'    => $cat_slug,
        ]];
    }

    $query = new WP_Query( $args );

    // N+1 prevention
    if ( ! empty( $query->posts ) ) {
        update_post_caches( $query->posts, 'project', true, true );
        update_object_term_cache( wp_list_pluck( $query->posts, 'ID' ), 'project' );
    }

    // Render project cards HTML
    ob_start();
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $post_id    = get_the_ID();
            $post_url   = get_permalink();
            $post_title = get_the_title();
            $thumb_id   = get_post_thumbnail_id();

            $investor   = get_post_meta( $post_id, '_investor', true );
            $location   = get_post_meta( $post_id, '_location', true );
            $floors     = get_post_meta( $post_id, '_floors', true );
            $front_area = get_post_meta( $post_id, '_front_area', true );
            ?>
            <article class="laca-project-list__card">
                <a href="<?php echo esc_url( $post_url ); ?>" class="laca-project-list__card-link" aria-label="<?php echo esc_attr( $post_title ); ?>">
                    <div class="laca-project-list__card-img">
                        <?php if ( $thumb_id ) : ?>
                            <?php echo wp_get_attachment_image( $thumb_id, 'large', false, [
                                'loading' => 'lazy',
                                'alt'     => esc_attr( $post_title ),
                            ] ); ?>
                        <?php else : ?>
                            <div class="laca-project-list__card-img-placeholder"></div>
                        <?php endif; ?>
                    </div>
                </a>
                <div class="laca-project-list__card-body">
                    <h3 class="laca-project-list__card-title">
                        <a href="<?php echo esc_url( $post_url ); ?>"><?php echo esc_html( $post_title ); ?></a>
                    </h3>
                    <ul class="laca-project-list__card-meta">
                        <?php if ( $investor ) : ?>
                            <li>
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                                <?php esc_html_e( 'Chủ đầu tư: ', 'laca' ); ?><strong><?php echo esc_html( $investor ); ?></strong>
                            </li>
                        <?php endif; ?>
                        <?php if ( $location ) : ?>
                            <li>
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                <?php esc_html_e( 'Địa điểm: ', 'laca' ); ?><strong><?php echo esc_html( $location ); ?></strong>
                            </li>
                        <?php endif; ?>
                        <?php if ( $floors ) : ?>
                            <li>
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48L384 48c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM64 96c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16L64 96zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32z"/></svg>
                                <?php esc_html_e( 'Số tầng: ', 'laca' ); ?><strong><?php echo esc_html( $floors ); ?></strong>
                            </li>
                        <?php endif; ?>
                        <?php if ( $front_area ) : ?>
                            <li>
                                <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"/></svg>
                                <?php esc_html_e( 'Mặt tiền: ', 'laca' ); ?><strong><?php echo esc_html( $front_area ); ?></strong>
                            </li>
                        <?php endif; ?>
                    </ul>
                </div>
            </article>
            <?php
        }
    }
    $html = ob_get_clean();
    wp_reset_postdata();

    // Pagination HTML
    $pagination_html = '';
    if ( $query->max_num_pages > 1 ) {
        $pages = paginate_links( [
            'base'      => '%_%',
            'format'    => '',
            'current'   => $paged,
            'total'     => $query->max_num_pages,
            'mid_size'  => 2,
            'type'      => 'array',
            'prev_next' => true,
            'prev_text' => '&laquo;',
            'next_text' => '&raquo;',
        ] );
        if ( is_array( $pages ) ) {
            $pagination_html = '<nav class="pagination-container" aria-label="Page navigation"><ul class="pagination-list">';
            foreach ( $pages as $page ) {
                $is_current  = strpos( $page, 'current' ) !== false;
                $is_dots     = strpos( $page, 'dots' ) !== false;
                $item_class  = 'pagination-item';
                if ( $is_current ) $item_class .= ' is-active';
                if ( $is_dots )    $item_class .= ' is-dots';
                $pagination_html .= '<li class="' . esc_attr( $item_class ) . '">' . $page . '</li>';
            }
            $pagination_html .= '</ul></nav>';
        }
    }

    wp_send_json_success( [
        'html'       => $html,
        'pagination' => $pagination_html,
        'found'      => (int) $query->found_posts,
        'max_pages'  => (int) $query->max_num_pages,
        'current'    => $paged,
    ] );
}
add_action( 'wp_ajax_lacadev_project_archive_load',        'lacadev_ajax_project_archive_load' );
add_action( 'wp_ajax_nopriv_lacadev_project_archive_load', 'lacadev_ajax_project_archive_load' );

// =============================================================================
// CUSTOM POST TYPES
// =============================================================================

new \App\PostTypes\project();

// =============================================================================
// COMMENTS CALLBACK
// =============================================================================
function lacadev_custom_comments_callback( $comment, $args, $depth ) {
    $GLOBALS['comment'] = $comment;
    
    $tag = ( isset($args['style']) && 'b' === $args['style'] ) ? 'b' : 'li';
    $add_below = 'div-comment';
    ?>
    <<?php echo $tag; ?> <?php comment_class( empty( $args['has_children'] ) ? 'custom-comment' : 'parent custom-comment' ); ?> id="comment-<?php comment_ID(); ?>">
        <article id="div-comment-<?php comment_ID(); ?>" class="comment-body">
            <div class="comment-meta">
                <div class="comment-author vcard">
                    <?php 
                    $avatar_size = $args['avatar_size'] ?? 48;
                    if ( 0 != $avatar_size ) {
                        echo get_avatar( $comment, $avatar_size );
                    }
                    ?>
                    <?php printf( '<span class="author-name">%s</span>', get_comment_author_link( $comment ) ); ?>
                </div><!-- .comment-author -->

                <div class="comment-metadata">
                    <a href="<?php echo esc_url( get_comment_link( $comment, $args ) ); ?>">
                        <time datetime="<?php comment_time( 'c' ); ?>">
                            <?php printf( __( '%s ago', 'laca' ), human_time_diff( get_comment_time('U'), current_time('timestamp') ) ); ?>
                        </time>
                    </a>
                </div><!-- .comment-metadata -->
            </div><!-- .comment-meta -->

            <?php if ( '0' == $comment->comment_approved ) : ?>
            <p class="comment-awaiting-moderation"><?php _e( 'Your comment is awaiting moderation.', 'laca' ); ?></p>
            <?php endif; ?>

            <div class="comment-content">
                <?php comment_text(); ?>
            </div><!-- .comment-content -->

            <div class="comment-actions">
                <?php
                comment_reply_link(
                    array_merge(
                        $args,
                        array(
                            'add_below' => $add_below,
                            'depth'     => $depth,
                            'max_depth' => $args['max_depth'] ?? 5,
                            'before'    => '<div class="reply">',
                            'after'     => '</div>',
                        )
                    )
                );
                ?>
            </div>
        </article><!-- .comment-body -->
    <?php
}
