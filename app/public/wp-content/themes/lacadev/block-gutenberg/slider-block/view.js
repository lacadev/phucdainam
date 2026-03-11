/**
 * Laca Slider Block Frontend Logic
 */
import Swiper from 'swiper/bundle';

const initSliderBlock = () => {
    const blocks = document.querySelectorAll('.laca-slider-block');

    blocks.forEach(block => {
        // Avoid dual initialization
        if (block.classList.contains('swiper-initialized')) return;

        const autoplay = block.dataset.autoplay === 'true';
        const delay = parseInt(block.dataset.delay) || 3000;
        const slidesPerView = parseInt(block.dataset.slidesPerView) || 1;
        const spaceBetween = parseInt(block.dataset.spaceBetween) || 0;
        const loop = block.dataset.loop === 'true';
        const pagination = block.dataset.pagination === 'true';
        const navigation = block.dataset.navigation === 'true';

        new Swiper(block, {
            loop,
            autoplay: autoplay ? { delay: delay, disableOnInteraction: false } : false,
            slidesPerView,
            spaceBetween,
            pagination: pagination ? { el: '.swiper-pagination', clickable: true } : false,
            navigation: navigation ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,
            // Responsive breakpoints if needed, but for now we follow attributes
        });
    });
};

// Initialize on load
document.addEventListener('DOMContentLoaded', initSliderBlock);

// For Swup navigation
window.addEventListener('load', () => {
    if (window.swup) {
        window.swup.hooks.on('content:replace', initSliderBlock);
    }
});

// Fallback init
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initSliderBlock();
}

export default initSliderBlock;
