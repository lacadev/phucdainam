<?php
/**
 * Slider Block Render Template
 *
 * @param array $attributes Block attributes.
 * @param string $content Block content.
 */

$images = $attributes['images'] ?? [];
if ( empty( $images ) ) {
    return;
}

$autoplay = $attributes['autoplay'] ?? true;
$autoplay_delay = $attributes['autoplayDelay'] ?? 3000;
$slides_per_view = $attributes['slidesPerView'] ?? 1;
$space_between = $attributes['spaceBetween'] ?? 0;
$loop = $attributes['loop'] ?? true;
$show_pagination = $attributes['showPagination'] ?? true;
$show_navigation = $attributes['showNavigation'] ?? true;

$anchor = $attributes['anchor'] ?? '';
$class_name = 'laca-slider-block swiper';

// data attributes for Swiper initialization
$data_attrs = [
    'autoplay' => $autoplay ? 'true' : 'false',
    'delay' => $autoplay_delay,
    'slides-per-view' => $slides_per_view,
    'space-between' => $space_between,
    'loop' => $loop ? 'true' : 'false',
    'pagination' => $show_pagination ? 'true' : 'false',
    'navigation' => $show_navigation ? 'true' : 'false',
];

$attr_string = '';
foreach ( $data_attrs as $key => $value ) {
    $attr_string .= ' data-' . $key . '="' . esc_attr( $value ) . '"';
}

?>
<section 
    <?php echo $anchor ? 'id="' . esc_attr( $anchor ) . '"' : ''; ?> 
    class="<?php echo esc_attr( $class_name ); ?>"
    <?php echo $attr_string; ?>
>
    <div class="swiper-wrapper">
        <?php foreach ( $images as $image ) : ?>
            <?php 
            $url = $image['url'] ?? '';
            $id = $image['id'] ?? 0;
            $link = $image['link'] ?? '';
            if ( empty( $url ) ) continue;
            ?>
            <div class="swiper-slide laca-slider-block__slide">
                <?php if ( ! empty( $link ) ) : ?>
                    <a href="<?php echo esc_url( $link ); ?>" target="_blank" rel="noopener noreferrer" class="laca-slider-block__link">
                <?php endif; ?>
                
                <?php if ( $id ) : ?>
                    <?php echo wp_get_attachment_image( $id, 'full', false, [ 'class' => 'laca-slider-block__image' ] ); ?>
                <?php else : ?>
                    <img src="<?php echo esc_url( $url ); ?>" alt="" class="laca-slider-block__image">
                <?php body_class(); ?>
                <?php endif; ?>

                <?php if ( ! empty( $link ) ) : ?>
                    </a>
                <?php endif; ?>
            </div>
        <?php endforeach; ?>
    </div>

    <?php if ( $show_pagination ) : ?>
        <div class="swiper-pagination"></div>
    <?php endif; ?>

    <?php if ( $show_navigation ) : ?>
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    <?php endif; ?>
</section>
