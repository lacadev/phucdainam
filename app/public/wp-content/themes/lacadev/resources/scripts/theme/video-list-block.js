/**
 * Video List Block — frontend lightbox JS
 *
 * Mở lightbox khi click vào item có data-video attribute.
 * Hỗ trợ: YouTube embed, Vimeo embed, direct video (MP4).
 * Đóng: click backdrop, nút ✕, phím Escape.
 */

export function initVideoListBlock() {
	const lightbox = document.getElementById( 'laca-video-lightbox' );
	if ( ! lightbox ) return;

	const mediaWrap = lightbox.querySelector( '.laca-video-lightbox__media' );
	const closeBtn  = lightbox.querySelector( '.laca-video-lightbox__close' );
	const backdrop  = lightbox.querySelector( '.laca-video-lightbox__backdrop' );

	// ── Helpers ──────────────────────────────────────────────────
	function openLightbox( embedUrl, isDirectVideo ) {
		// Clear trước
		mediaWrap.innerHTML = '';

		if ( isDirectVideo ) {
			const video = document.createElement( 'video' );
			video.src      = embedUrl;
			video.controls = true;
			video.autoplay = true;
			video.playsInline = true;
			mediaWrap.appendChild( video );
		} else {
			const iframe = document.createElement( 'iframe' );
			iframe.src             = embedUrl;
			iframe.frameBorder     = '0';
			iframe.allow           = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
			iframe.allowFullscreen = true;
			iframe.loading         = 'lazy';
			iframe.title           = 'Video';
			mediaWrap.appendChild( iframe );
		}

		lightbox.removeAttribute( 'hidden' );
		document.body.style.overflow = 'hidden';
		closeBtn.focus();
	}

	function closeLightbox() {
		lightbox.setAttribute( 'hidden', '' );
		document.body.style.overflow = '';
		// Stop video / iframe
		mediaWrap.innerHTML = '';
	}

	// ── Event: click video items ──────────────────────────────────
	document.addEventListener( 'click', ( e ) => {
		const item = e.target.closest( '[data-video]' );
		if ( ! item ) return;

		const embedUrl       = item.dataset.video;
		const type           = item.dataset.type || 'embed';
		const isDirectVideo  = type === 'direct';

		if ( embedUrl ) {
			openLightbox( embedUrl, isDirectVideo );
		}
	} );

	// Keyboard: Enter / Space trên item
	document.addEventListener( 'keydown', ( e ) => {
		if ( ( e.key === 'Enter' || e.key === ' ' ) && e.target.closest( '[data-video]' ) ) {
			e.preventDefault();
			e.target.closest( '[data-video]' ).click();
		}

		// Escape để đóng
		if ( e.key === 'Escape' && ! lightbox.hidden ) {
			closeLightbox();
		}
	} );

	// ── Event: đóng lightbox ─────────────────────────────────────
	closeBtn.addEventListener( 'click', closeLightbox );
	backdrop.addEventListener( 'click', closeLightbox );
}
