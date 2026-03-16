/**
 * Archive AJAX Pagination
 *
 * Khởi tạo AJAX pagination cho trang archive (blog, category, tag, CPT…).
 * Config được truyền vào qua data-archive-config trên phần tử root.
 *
 * @module archive-pagination
 */

/**
 * Khởi tạo AJAX pagination cho một wrapper archive cụ thể.
 *
 * @param {HTMLElement} wrapper
 */
function initArchivePagination( wrapper ) {
	/** @type {Object} config – xem archive.php data-archive-config */
	const config = JSON.parse( wrapper.dataset.archiveConfig || '{}' );
	if ( ! config.ajaxurl || ! config.nonce ) return;

	const grid    = wrapper.querySelector( '#archive-grid' );
	const pagWrap = wrapper.querySelector( '#archive-pagination' );
	if ( ! grid || ! pagWrap ) return;

	let currentPage = parseInt( config.current_page, 10 ) || 1;
	let isLoading   = false;

	/**
	 * Fetch một trang mới từ server.
	 *
	 * @param {number} page
	 */
	async function fetchPage( page ) {
		if ( isLoading ) return;
		isLoading = true;

		grid.setAttribute( 'aria-busy', 'true' );
		grid.classList.add( 'laca-news-list__grid--loading' );

		try {
			const body = new URLSearchParams( {
				action         : 'lacadev_archive_load',
				nonce          : config.nonce,
				paged          : page,
				posts_per_page : config.posts_per_page,
				post_type      : config.post_type,
				cat_id         : config.cat_id || 0,
				tag_id         : config.tag_id || 0,
				tax_term       : config.tax_term || 0,
				taxonomy       : config.taxonomy || '',
			} );

			const res = await fetch( config.ajaxurl, {
				method      : 'POST',
				credentials : 'same-origin',
				headers     : { 'Content-Type': 'application/x-www-form-urlencoded' },
				body,
			} );

			if ( ! res.ok ) throw new Error( `HTTP ${ res.status }` );

			const json = await res.json();
			if ( ! json.success ) throw new Error( json.data?.message || 'Server error' );

			const { html, pagination } = json.data;

			grid.innerHTML    = html;
			pagWrap.innerHTML = pagination;

			bindPaginationClicks();

			currentPage = page;

			// Scroll về đầu grid mượt mà nếu header che khuất
			const rect = wrapper.getBoundingClientRect();
			if ( rect.top < 0 ) {
				const offset = wrapper.getBoundingClientRect().top + window.scrollY - 80;
				window.scrollTo( { top: Math.max( 0, offset ), behavior: 'smooth' } );
			}

		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( '[archive-pagination] Fetch error:', err );
		} finally {
			isLoading = false;
			grid.removeAttribute( 'aria-busy' );
			grid.classList.remove( 'laca-news-list__grid--loading' );
		}
	}

	/**
	 * Gắn sự kiện click vào tất cả link trong pagination.
	 */
	function bindPaginationClicks() {
		pagWrap.querySelectorAll( 'a.page-numbers' ).forEach( ( link ) => {
			link.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				const href  = link.getAttribute( 'href' ) || '';
				let   page  = currentPage;

				// Phân tích số trang từ URL (/page/N/ hoặc ?paged=N)
				const match = href.match( /[?&/]paged?[=/](\d+)/i );
				if ( match ) {
					page = parseInt( match[ 1 ], 10 );
				} else if ( link.classList.contains( 'next' ) ) {
					page = currentPage + 1;
				} else if ( link.classList.contains( 'prev' ) ) {
					page = currentPage - 1;
				} else if ( /^\d+$/.test( link.textContent.trim() ) ) {
					page = parseInt( link.textContent.trim(), 10 );
				}

				if ( page > 0 ) fetchPage( page );
			} );
		} );
	}

	// Bind lần đầu (pagination đã có sẵn từ server-render)
	bindPaginationClicks();
}

/**
 * Khởi chạy tất cả archive wrappers trên trang.
 * Được gọi từ initializePageFeatures() trong index.js.
 */
export function initArchivePaginationAll() {
	document.querySelectorAll( '[data-archive-config]' ).forEach( initArchivePagination );
}
