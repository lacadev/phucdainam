<?php
/**
 * News List Block — render.php
 *
 * Attributes:
 *   title        string   Tiêu đề block
 *   subtitle     string   Sub-tiêu đề
 *   orderBy      string   "date" | "rand" | "comment_count"
 *   selectedCats int[]    Danh sách category ID
 *   postsCount   int      Số bài hiển thị
 *   viewAllUrl   string   URL nút "Xem tất cả"
 *   viewAllText  string   Text nút "Xem tất cả"
 *   showExcerpt  bool     Hiển thị mô tả ngắn
 *   showCategory bool     Hiển thị nhãn danh mục
 */

// ── Attributes ──────────────────────────────────────────────────────────────
$title         = isset( $attributes['title'] ) ? $attributes['title'] : '';
$subtitle      = isset( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$order_by      = isset( $attributes['orderBy'] ) ? $attributes['orderBy'] : 'date';
$selected_cats = ! empty( $attributes['selectedCats'] ) ? array_map( 'intval', (array) $attributes['selectedCats'] ) : [];
$posts_count   = isset( $attributes['postsCount'] ) ? absint( $attributes['postsCount'] ) : 4;
$view_all_url  = ! empty( $attributes['viewAllUrl'] ) ? esc_url( $attributes['viewAllUrl'] ) : '';
$view_all_text = ! empty( $attributes['viewAllText'] ) ? $attributes['viewAllText'] : __( 'Xem tất cả', 'lacadev' );
$show_excerpt  = isset( $attributes['showExcerpt'] ) ? (bool) $attributes['showExcerpt'] : true;
$show_category = isset( $attributes['showCategory'] ) ? (bool) $attributes['showCategory'] : true;

// ── WP_Query ─────────────────────────────────────────────────────────────────
// Lưu ý: KHÔNG dùng orderby=rand (tốn CPU) — dùng PHP shuffle thay thế
$use_rand = ( $order_by === 'rand' );

$query_args = [
	'post_type'           => 'post',
	'post_status'         => 'publish',
	'posts_per_page'      => $use_rand ? max( $posts_count * 3, 12 ) : $posts_count, // lấy dư để shuffle
	'no_found_rows'       => true,
	'ignore_sticky_posts' => true,
];

// ── orderBy ──────────────────────────────────────────────────────────────────
if ( $order_by === 'comment_count' ) {
	$query_args['orderby'] = 'comment_count';
	$query_args['order']   = 'DESC';
} else {
	$query_args['orderby'] = 'date';
	$query_args['order']   = 'DESC';
}

// ── Category filter ───────────────────────────────────────────────────────────
if ( ! empty( $selected_cats ) ) {
	$query_args['category__in'] = $selected_cats;
}

$query = new WP_Query( $query_args );
$posts = $query->posts;

// Nếu random: shuffle rồi lấy đúng số lượng
if ( $use_rand && ! empty( $posts ) ) {
	shuffle( $posts );
	$posts = array_slice( $posts, 0, $posts_count );
}

// ── Wrapper attributes ────────────────────────────────────────────────────────
$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'laca-news-list',
] );
?>
<section <?php echo $wrapper_attrs; ?>>
	<div class="container-fluid">

		<?php if ( $title || $subtitle || $view_all_url ) : ?>
		<div class="laca-news-list__header">
			<div class="laca-news-list__header-text">
				<?php if ( $subtitle ) : ?>
					<span class="laca-news-list__subtitle"><?php echo esc_html( $subtitle ); ?></span>
				<?php endif; ?>
				<?php if ( $title ) : ?>
					<h2 class="laca-news-list__title"><?php echo wp_kses_post( $title ); ?></h2>
				<?php endif; ?>
			</div>
			<?php if ( $view_all_url && $view_all_text ) : ?>
				<a href="<?php echo esc_url( $view_all_url ); ?>" class="laca-news-list__view-all btn btn-primary">
					<?php echo esc_html( $view_all_text ); ?>
				</a>
			<?php endif; ?>
		</div>
		<hr class="laca-news-list__divider">
		<?php endif; ?>

		<?php if ( ! empty( $posts ) ) : ?>
		<div class="laca-news-list__grid">
			<?php foreach ( $posts as $post ) :
				$post_id   = $post->ID;
				$post_url  = get_permalink( $post_id );
				$post_title = get_the_title( $post_id );
				$thumb_id  = get_post_thumbnail_id( $post_id );

				// Excerpt: ưu tiên custom, fallback nội dung rút gọn
				$excerpt = has_excerpt( $post_id )
					? wp_trim_words( get_the_excerpt( $post_id ), 18, '…' )
					: wp_trim_words( wp_strip_all_tags( $post->post_content ), 18, '…' );

				// Category
				$cats = get_the_terms( $post_id, 'category' );
				$cat_name = '';
				if ( $show_category && ! empty( $cats ) && ! is_wp_error( $cats ) ) {
					$cat_name = esc_html( $cats[0]->name );
					$cat_url  = esc_url( get_term_link( $cats[0] ) );
				}
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
					<?php if ( $show_category && $cat_name ) : ?>
						<a href="<?php echo $cat_url; ?>" class="laca-news-list__cat"><?php echo $cat_name; ?></a>
					<?php endif; ?>

					<h3 class="laca-news-list__item-title">
						<a href="<?php echo esc_url( $post_url ); ?>"><?php echo esc_html( $post_title ); ?></a>
					</h3>

					<?php if ( $show_excerpt && $excerpt ) : ?>
						<p class="laca-news-list__excerpt"><?php echo esc_html( $excerpt ); ?></p>
					<?php endif; ?>

					<a href="<?php echo esc_url( $post_url ); ?>" class="laca-news-list__read-more">
						<?php esc_html_e( 'Xem thêm', 'lacadev' ); ?>
					</a>
				</div>
			</article>
			<?php endforeach; ?>
		</div>
		<?php else : ?>
		<p class="laca-news-list__empty"><?php esc_html_e( 'Không có bài viết nào.', 'lacadev' ); ?></p>
		<?php endif; ?>

	</div><!-- /.container-fluid -->
</section>

<?php wp_reset_postdata(); ?>
