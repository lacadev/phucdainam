/**
 * Project Gallery - PhotoSwipe v5
 * BEM: .project-gallery, .project-gallery__grid, .project-gallery__item
 *
 * NOTE: Dùng static import thay vì dynamic import để tránh lỗi 404 chunk
 * do publicPath Webpack chưa được cấu hình đúng cho WordPress.
 */
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import PhotoSwipe from 'photoswipe';
import 'photoswipe/style.css';

export function initProjectGallery() {
    const galleryEl = document.getElementById('project-gallery');
    if (!galleryEl) {
        return;
    }

    const lightbox = new PhotoSwipeLightbox({
        gallery: '#project-gallery',
        children: '.project-gallery__item',

        // Static import - không tạo chunk riêng
        pswpModule: PhotoSwipe,

        bgOpacity: 0.92,
        showHideAnimationType: 'zoom',
        loop: true,
        wheelToZoom: true,
        padding: { top: 20, bottom: 20, left: 20, right: 20 },
    });

    lightbox.init();
}
