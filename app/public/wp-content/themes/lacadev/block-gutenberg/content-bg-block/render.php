<?php
/**
 * Content Background Block — render.php
 *
 * @package LacaDev
 * @var array    $attributes Block attributes.
 * @var string   $content    Block inner content (unused — dynamic).
 * @var WP_Block $block      Block instance.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$bg_id           = ! empty( $attributes['bgId'] ) ? (int) $attributes['bgId'] : 0;
$bg_url          = ! empty( $attributes['bgUrl'] ) ? esc_url( $attributes['bgUrl'] ) : '';
$overlay_opacity = isset( $attributes['overlayOpacity'] ) ? (int) $attributes['overlayOpacity'] : 60;
$title           = ! empty( $attributes['title'] ) ? $attributes['title'] : '';
$subtitle        = ! empty( $attributes['subtitle'] ) ? $attributes['subtitle'] : '';
$content_html    = ! empty( $attributes['content'] ) ? $attributes['content'] : '';

// Không render nếu không có nội dung nào
if ( ! $title && ! $subtitle && ! $content_html ) {
	return;
}

// Nếu có image ID, lấy URL đúng kích thước
if ( $bg_id ) {
	$bg_src = wp_get_attachment_image_url( $bg_id, 'full' );
	if ( $bg_src ) {
		$bg_url = esc_url( $bg_src );
	}
}

// Inline style cho section background
$section_style = $bg_url
	? sprintf( 'background-image:url(%s);', $bg_url )
	: '';

// CSS variable cho overlay opacity
$overlay_style = sprintf( '--overlay-opacity:%.2f;', $overlay_opacity / 100 );

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'laca-content-bg',
	'style' => $overlay_style,
] );
?>

<section <?php echo $wrapper_attrs; ?>>
    <div
        class="laca-content-bg__bg"
        style="<?php echo esc_attr( $section_style ); ?>"
        aria-hidden="true"
    ></div>
    <div class="laca-content-bg__overlay" aria-hidden="true"></div>

    <div class="laca-content-bg__inner">
        <?php if ( $title ) : ?>
            <h2 class="laca-content-bg__title">
                <?php echo wp_kses_post( $title ); ?>
            </h2>
        <?php endif; ?>

        <?php if ( $subtitle ) : ?>
            <p class="laca-content-bg__subtitle">
                <?php echo wp_kses_post( $subtitle ); ?>
            </p>
        <?php endif; ?>

        <?php if ( $content_html ) : ?>
            <div class="laca-content-bg__content">
                <?php echo wp_kses_post( $content_html ); ?>
            </div>
        <?php endif; ?>
    </div>
</section>
