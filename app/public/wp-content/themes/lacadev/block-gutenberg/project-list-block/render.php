<?php
/**
 * Project List Block — render.php
 *
 * Attributes:
 *   title        string  Tiêu đề block
 *   subtitle     string  Sub-tiêu đề
 *   displayMode  string  "auto" | "manual"
 *   orderBy      string  "date" | "rand" | "comment_count"  (chỉ dùng khi auto)
 *   selectedCats int[]   Danh sách taxonomy term ID (chỉ dùng khi auto)
 *   postsCount   int     Tổng số bài hiển thị (chỉ dùng khi auto)
 *   manualPostIds int[]  ID bài viết được chọn thủ công
 */

// ── Attributes ──────────────────────────────────────────────────────────────
$title         = ! empty( $attributes['title'] ) ? $attributes['title'] : '';
$subtitle      = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$display_mode  = ! empty( $attributes['displayMode'] ) ? $attributes['displayMode'] : 'auto';
$order_by      = ! empty( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';
$selected_cats = ! empty( $attributes['selectedCats'] ) ? array_map( 'intval', (array) $attributes['selectedCats'] ) : [];
$posts_count   = ! empty( $attributes['postsCount'] ) ? absint( $attributes['postsCount'] ) : 4;
$manual_ids    = ! empty( $attributes['manualPostIds'] ) ? array_map( 'intval', (array) $attributes['manualPostIds'] ) : [];

// ── URL filter ───────────────────────────────────────────────────────────────
// ?project_cat=slug — lọc tab theo URL, override khi displayMode=auto
$url_cat_slug = isset( $_GET['project_cat'] ) ? sanitize_title( wp_unslash( $_GET['project_cat'] ) ) : '';

// ── Tab category list ────────────────────────────────────────────────────────
// Hiển thị tabs dựa theo selectedCats (nếu không chọn → tất cả danh mục có bài)
if ( $selected_cats ) {
	$tab_cats = get_terms( [
		'taxonomy'   => 'project_cat',
		'include'    => $selected_cats,
		'hide_empty' => false,
		'orderby'    => 'include',
	] );
} else {
	$tab_cats = get_terms( [
		'taxonomy'   => 'project_cat',
		'hide_empty' => true,
	] );
}

// ── Build query ──────────────────────────────────────────────────────────────
$posts = null;

if ( $display_mode === 'manual' ) {
	// ── Manual mode ──────────────────────────────────────────────────────────
	if ( ! empty( $manual_ids ) ) {
		$query_args = [
			'post_type'           => 'project',
			'post__in'            => $manual_ids,
			'orderby'             => 'post__in',
			'posts_per_page'      => count( $manual_ids ),
			'ignore_sticky_posts' => true,
		];
		$posts = new WP_Query( $query_args );
	}
} else {
	// ── Auto mode ─────────────────────────────────────────────────────────────

	// Nếu người dùng click tab URL → lọc theo category đó, không chia đều
	if ( $url_cat_slug ) {
		$query_args = [
			'post_type'      => 'project',
			'posts_per_page' => $posts_count,
			'tax_query'      => [ [
				'taxonomy' => 'project_cat',
				'field'    => 'slug',
				'terms'    => [ $url_cat_slug ],
			] ],
		];

		switch ( $order_by ) {
			case 'rand':
				$query_args['orderby'] = 'rand';
				break;
			case 'comment_count':
				$query_args['orderby'] = 'comment_count';
				$query_args['order']   = 'DESC';
				break;
			default:
				$query_args['orderby'] = 'date';
				$query_args['order']   = 'DESC';
		}

		$posts = new WP_Query( $query_args );

	} elseif ( ! empty( $selected_cats ) && count( $selected_cats ) > 1 ) {
		// ── Chia đều theo nhiều danh mục (floor + remainder) ─────────────────
		// Ví dụ: 8 bài / 3 danh mục → base=2, rem=2 → 3 3 2
		//        7 bài / 3 danh mục → base=2, rem=1 → 3 2 2
		//        6 bài / 3 danh mục → base=2, rem=0 → 2 2 2
		$n_cats   = count( $selected_cats );
		$base     = (int) floor( $posts_count / $n_cats );
		$rem      = $posts_count % $n_cats;
		$combined = [];
		$used_ids = [];

		foreach ( array_values( $selected_cats ) as $i => $term_id ) {
			$this_count = $base + ( $i < $rem ? 1 : 0 );
			if ( $this_count < 1 ) {
				continue;
			}

			$cat_args = [
				'post_type'      => 'project',
				'posts_per_page' => $this_count,
				'tax_query'      => [ [
					'taxonomy' => 'project_cat',
					'field'    => 'term_id',
					'terms'    => [ $term_id ],
				] ],
			];

			if ( ! empty( $used_ids ) ) {
				$cat_args['post__not_in'] = $used_ids;
			}

			switch ( $order_by ) {
				case 'rand':
					$cat_args['orderby'] = 'rand';
					break;
				case 'comment_count':
					$cat_args['orderby'] = 'comment_count';
					$cat_args['order']   = 'DESC';
					break;
				default:
					$cat_args['orderby'] = 'date';
					$cat_args['order']   = 'DESC';
			}

			$cat_query = new WP_Query( $cat_args );
			if ( $cat_query->have_posts() ) {
				foreach ( $cat_query->posts as $p ) {
					if ( ! in_array( $p->ID, $used_ids, true ) ) {
						$combined[] = $p;
						$used_ids[] = $p->ID;
					}
				}
			}
		}

		// Dùng WP_Query giả để giữ interface nhất quán
		if ( ! empty( $combined ) ) {
			$posts = new WP_Query( [
				'post_type'      => 'project',
				'post__in'       => array_map( fn( $p ) => $p->ID, $combined ),
				'orderby'        => 'post__in',
				'posts_per_page' => count( $combined ),
			] );
		}

	} else {
		// ── Một danh mục hoặc tất cả → query bình thường ─────────────────────
		$query_args = [
			'post_type'      => 'project',
			'posts_per_page' => $posts_count,
		];

		if ( ! empty( $selected_cats ) ) {
			$query_args['tax_query'] = [ [
				'taxonomy' => 'project_cat',
				'field'    => 'term_id',
				'terms'    => $selected_cats,
			] ];
		}

		switch ( $order_by ) {
			case 'rand':
				$query_args['orderby'] = 'rand';
				break;
			case 'comment_count':
				$query_args['orderby'] = 'comment_count';
				$query_args['order']   = 'DESC';
				break;
			default:
				$query_args['orderby'] = 'date';
				$query_args['order']   = 'DESC';
		}

		$posts = new WP_Query( $query_args );
	}
}

// ── Block wrapper ────────────────────────────────────────────────────────────
$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'laca-project-list',
] );

// ── Current page URL (không có query string) ─────────────────────────────────
$page_url = strtok( get_permalink() ?: home_url( $_SERVER['REQUEST_URI'] ), '?' );

?>

<section <?php echo $wrapper_attrs; ?>>
    <div class="container-fluid">

        <!-- Header -->
        <div class="laca-project-list__header">
            <div class="laca-project-list__headings">
                <?php if ( $subtitle ) : ?>
                    <p class="laca-project-list__subtitle">
                        <?php echo wp_kses_post( $subtitle ); ?>
                    </p>
                <?php endif; ?>
                <?php if ( $title ) : ?>
                    <h2 class="laca-project-list__title">
                        <?php echo wp_kses_post( $title ); ?>
                    </h2>
                <?php endif; ?>
            </div>

            <!-- Tabs điều hướng URL -->
            <?php if ( ! is_wp_error( $tab_cats ) && ! empty( $tab_cats ) ) : ?>
                <nav class="laca-project-list__cats" aria-label="<?php esc_attr_e( 'Bộ lọc danh mục', 'lacadev' ); ?>">
                    <?php foreach ( $tab_cats as $cat ) : ?>
                        <a
                            href="<?php echo esc_url( add_query_arg( 'project_cat', $cat->slug, $page_url ) ); ?>"
                            class="laca-project-list__cat-btn<?php echo ( $url_cat_slug === $cat->slug ) ? ' is-active' : ''; ?>"
                        >
                            <?php echo esc_html( $cat->name ); ?>
                        </a>
                    <?php endforeach; ?>

                    <a
                        href="<?php echo esc_url( $page_url ); ?>"
                        class="laca-project-list__cat-btn laca-project-list__cat-btn--all<?php echo ( ! $url_cat_slug ) ? ' is-active' : ''; ?>"
                    >
                        <?php esc_html_e( 'Xem tất cả', 'lacadev' ); ?>
                    </a>
                </nav>
            <?php endif; ?>
        </div>

        <hr class="laca-project-list__divider" aria-hidden="true" />

        <!-- Grid -->
        <div class="laca-project-list__grid">
            <?php if ( $posts && $posts->have_posts() ) : ?>
                <?php while ( $posts->have_posts() ) : $posts->the_post(); ?>
                    <?php
                    $investor   = get_post_meta( get_the_ID(), '_investor', true );
                    $location   = get_post_meta( get_the_ID(), '_location', true );
                    $floors     = get_post_meta( get_the_ID(), '_floors', true );
                    $front_area = get_post_meta( get_the_ID(), '_front_area', true );
                    ?>
                    <article class="laca-project-list__card">
                        <a
                            href="<?php the_permalink(); ?>"
                            class="laca-project-list__card-link"
                            aria-label="<?php the_title_attribute(); ?>"
                        >
                            <div class="laca-project-list__card-img">
                                <?php if ( has_post_thumbnail() ) : ?>
                                    <?php the_post_thumbnail( 'large', [ 'loading' => 'lazy', 'alt' => get_the_title() ] ); ?>
                                <?php else : ?>
                                    <div class="laca-project-list__card-img-placeholder"></div>
                                <?php endif; ?>
                            </div>
                        </a>

                        <div class="laca-project-list__card-body">
                            <h3 class="laca-project-list__card-title">
                                <a href="<?php the_permalink(); ?>"><?php the_title(); ?></a>
                            </h3>

                            <ul class="laca-project-list__card-meta">
                                <?php if ( $investor ) : ?>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/></svg>
                                        <?php esc_html_e( 'Chủ đầu tư: ', 'lacadev' ); ?>
                                        <strong><?php echo esc_html( $investor ); ?></strong>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $location ) : ?>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>
                                        <?php esc_html_e( 'Địa điểm: ', 'lacadev' ); ?>
                                        <strong><?php echo esc_html( $location ); ?></strong>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $floors ) : ?>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48L384 48c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM64 96c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16L64 96zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32z"/></svg>
                                        <?php esc_html_e( 'Số tầng: ', 'lacadev' ); ?>
                                        <strong><?php echo esc_html( $floors ); ?></strong>
                                    </li>
                                <?php endif; ?>
                                <?php if ( $front_area ) : ?>
                                    <li>
                                        <svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M344 0L488 0c13.3 0 24 10.7 24 24l0 144c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-39-39-87 87c-9.4 9.4-24.6 9.4-33.9 0l-32-32c-9.4-9.4-9.4-24.6 0-33.9l87-87L327 41c-6.9-6.9-8.9-17.2-5.2-26.2S334.3 0 344 0zM168 512L24 512c-13.3 0-24-10.7-24-24L0 344c0-9.7 5.8-18.5 14.8-22.2s19.3-1.7 26.2 5.2l39 39 87-87c9.4-9.4 24.6-9.4 33.9 0l32 32c9.4 9.4 9.4 24.6 0 33.9l-87 87 39 39c6.9 6.9 8.9 17.2 5.2 26.2s-12.5 14.8-22.2 14.8z"/></svg>
                                        <?php esc_html_e( 'Mặt tiền: ', 'lacadev' ); ?>
                                        <strong><?php echo esc_html( $front_area ); ?></strong>
                                    </li>
                                <?php endif; ?>
                            </ul>
                        </div>
                    </article>
                <?php endwhile; ?>
                <?php wp_reset_postdata(); ?>
            <?php else : ?>
                <p class="laca-project-list__empty">
                    <?php esc_html_e( 'Chưa có dự án nào.', 'lacadev' ); ?>
                </p>
            <?php endif; ?>
        </div>

    </div>
</section>
