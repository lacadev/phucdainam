<?php
/**
 * Template Part: Rating Box
 * CTA đánh giá bài viết – phù hợp theme xây dựng Phúc Đại Nam
 */
$post_url   = get_permalink();
$post_title = get_the_title();
$hotline    = '0855115566'; // Có thể dùng option/ACF sau
?>
<div class="rating-box">

    <!-- Icon helm / hardhat building -->
    <div class="rating-box__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M3 17h18v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2z"/>
            <path d="M21 17a9 9 0 0 0-18 0"/>
            <path d="M12 3v5m-4.5 2 1.5-5m7.5 5-1.5-5"/>
        </svg>
    </div>

    <!-- Nội dung -->
    <div class="rating-box__body">
        <p class="rating-box__question">
            Bài viết có hữu ích với bạn không?
        </p>
        <p class="rating-box__sub">
            Nếu bạn cần tư vấn thêm về xây dựng – nội thất, đội ngũ Phúc Đại Nam luôn sẵn sàng hỗ trợ.
        </p>

        <!-- Nút đánh giá sao (kk Star Ratings hoặc fallback) -->
        <?php if ( function_exists( 'kk_star_ratings' ) ) : ?>
        <div class="rating-box__stars">
            <?php echo kk_star_ratings(); ?>
        </div>
        <?php endif; ?>

        <!-- CTA liên hệ -->
        <div class="rating-box__actions">
            <a href="tel:<?php echo esc_attr( $hotline ); ?>" class="rating-box__btn rating-box__btn--primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.8 19.8 0 0 1 1.61 3.42 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.72 16z"/>
                </svg>
                Gọi tư vấn ngay
            </a>
            <a href="/lien-he/" class="rating-box__btn rating-box__btn--outline">
                Để lại thông tin
            </a>
        </div>
    </div>

</div>
