<?php
/**
 * Video List Block - render.php
 *
 * @package LacaDev
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content.
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$title        = isset( $attributes['title'] ) ? wp_kses_post( $attributes['title'] ) : '';
$subtitle     = isset( $attributes['subtitle'] ) ? esc_html( $attributes['subtitle'] ) : '';
$view_all_url = isset( $attributes['viewAllUrl'] ) ? esc_url( $attributes['viewAllUrl'] ) : '';
$view_all_txt = isset( $attributes['viewAllText'] ) ? esc_html( $attributes['viewAllText'] ) : '';
$videos       = isset( $attributes['videos'] ) && is_array( $attributes['videos'] ) ? $attributes['videos'] : [];

// Không render nếu không có video
if ( empty( $videos ) ) {
	return;
}

/**
 * Helper: parse URL video → embed URL cho lightbox
 */
if ( ! function_exists( 'lacadev_parse_video_embed_url' ) ) {
	function lacadev_parse_video_embed_url( string $url ): string {
		// YouTube
		if ( preg_match( '/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m ) ) {
			return 'https://www.youtube.com/embed/' . $m[1] . '?autoplay=1&rel=0';
		}
		// Vimeo
		if ( preg_match( '/vimeo\.com\/(\d+)/', $url, $m ) ) {
			return 'https://player.vimeo.com/video/' . $m[1] . '?autoplay=1';
		}
		// Direct file or other — return as-is
		return $url;
	}
}

/**
 * Helper: lấy YouTube thumbnail URL từ video URL (fallback khi không có ảnh bìa)
 * Thứ tự ưu tiên: maxresdefault → hqdefault
 */
if ( ! function_exists( 'lacadev_get_youtube_thumbnail' ) ) {
	function lacadev_get_youtube_thumbnail( string $url ): string {
		if ( preg_match( '/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $m ) ) {
			return 'https://i.ytimg.com/vi/' . $m[1] . '/hqdefault.jpg';
		}
		return '';
	}
}

$wrapper_attrs = get_block_wrapper_attributes( [ 'class' => 'laca-video-list' ] );
?>

<section <?php echo $wrapper_attrs; ?>>
	<div class="container-fluid">

		<?php if ( $title || $subtitle || $view_all_url ) : ?>
		<div class="laca-video-list__header">
			<div class="laca-video-list__header-text">
				<?php if ( $subtitle ) : ?>
					<span class="laca-video-list__subtitle"><?php echo esc_html( $subtitle ); ?></span>
				<?php endif; ?>
				<?php if ( $title ) : ?>
					<h2 class="laca-video-list__title"><?php echo wp_kses_post( $title ); ?></h2>
				<?php endif; ?>
			</div>
			<?php if ( $view_all_url && $view_all_txt ) : ?>
				<a href="<?php echo esc_url( $view_all_url ); ?>" class="laca-video-list__view-all btn btn-primary">
					<?php echo esc_html( $view_all_txt ); ?>
				</a>
			<?php endif; ?>
		</div>
		<hr class="laca-video-list__divider">
		<?php endif; ?>

		<?php
		$mosaic_videos  = array_slice( $videos, 0, 5 );
		$extra_videos   = array_slice( $videos, 5 );

		/**
		 * Helper: render 1 article
		 */
		$render_item = function( $video, $extra_class = '' ) {
			$video_url  = isset( $video['url'] ) ? esc_url( $video['url'] ) : '';
			$thumb_url  = isset( $video['thumbnailUrl'] ) ? esc_url( $video['thumbnailUrl'] ) : '';
			$thumb_id   = isset( $video['thumbnailId'] ) ? absint( $video['thumbnailId'] ) : 0;
			$label      = isset( $video['label'] ) ? esc_html( $video['label'] ) : '';
			$embed_url  = $video_url ? lacadev_parse_video_embed_url( $video_url ) : '';
			if ( ! $thumb_id && ! $thumb_url && $video_url ) {
				$thumb_url = lacadev_get_youtube_thumbnail( $video_url );
			}
			$cls = 'laca-video-list__item' . ( $extra_class ? " $extra_class" : '' );
			?>
			<article
				class="<?php echo esc_attr( $cls ); ?>"
				<?php if ( $embed_url ) : ?>
					data-video="<?php echo esc_attr( $embed_url ); ?>"
					data-type="embed"
					role="button"
					tabindex="0"
					aria-label="<?php echo $label ? esc_attr( sprintf( __( 'Xem video: %s', 'lacadev' ), $label ) ) : esc_attr__( 'Xem video', 'lacadev' ); ?>"
				<?php endif; ?>
			>
				<div class="laca-video-list__thumb">
					<?php if ( $thumb_id ) : ?>
						<?php echo wp_get_attachment_image( $thumb_id, 'large', false, [ 'class' => 'laca-video-list__img', 'loading' => 'lazy', 'alt' => $label ] ); ?>
					<?php elseif ( $thumb_url ) : ?>
						<img src="<?php echo esc_url( $thumb_url ); ?>" alt="<?php echo esc_attr( $label ); ?>" class="laca-video-list__img" loading="lazy">
					<?php else : ?>
						<div class="laca-video-list__img-placeholder"></div>
					<?php endif; ?>

					<?php if ( $embed_url ) : ?>
						<button class="laca-video-list__play" aria-hidden="true" tabindex="-1">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
								<circle cx="12" cy="12" r="11" stroke="#fff" stroke-width="1.5" opacity=".9"/>
								<path d="M10 8.5l6 3.5-6 3.5V8.5z" fill="#fff"/>
							</svg>
						</button>
					<?php endif; ?>

					<?php if ( $label ) : ?>
						<div class="laca-video-list__label"><span><?php echo esc_html( $label ); ?></span></div>
					<?php endif; ?>
				</div>
			</article>
			<?php
		};
		?>

		<?php if ( ! empty( $mosaic_videos ) ) : ?>
		<!-- Mosaic: video 0 (featured 50%) + video 1-4 (2×2 ở 50% còn lại) -->
		<div class="laca-video-list__mosaic">
			<?php $render_item( $mosaic_videos[0], 'laca-video-list__item--featured' ); ?>
			<?php if ( count( $mosaic_videos ) > 1 ) : ?>
			<div class="laca-video-list__mosaic-right">
				<?php for ( $i = 1; $i < count( $mosaic_videos ); $i++ ) : ?>
					<?php $render_item( $mosaic_videos[ $i ] ); ?>
				<?php endfor; ?>
			</div>
			<?php endif; ?>
		</div>
		<?php endif; ?>

		<?php if ( ! empty( $extra_videos ) ) : ?>
		<!-- Regular grid: 4 cột/row (video 6+) -->
		<div class="laca-video-list__grid">
			<?php foreach ( $extra_videos as $video ) : ?>
				<?php $render_item( $video ); ?>
			<?php endforeach; ?>
		</div>
		<?php endif; ?>

	</div><!-- /.container-fluid -->
</section>

<!-- Lightbox modal (dùng chung toàn trang, render 1 lần) -->
<?php if ( ! did_action( 'lacadev_video_lightbox_rendered' ) ) :
	do_action( 'lacadev_video_lightbox_rendered' );
?>
<div id="laca-video-lightbox" class="laca-video-lightbox" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Video', 'lacadev' ); ?>" hidden>
	<div class="laca-video-lightbox__backdrop"></div>
	<div class="laca-video-lightbox__box">
		<button class="laca-video-lightbox__close" aria-label="<?php esc_attr_e( 'Đóng', 'lacadev' ); ?>">
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
				<path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
			</svg>
		</button>
		<div class="laca-video-lightbox__media"></div>
	</div>
</div>
<?php endif; ?>
