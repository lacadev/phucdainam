/**
 * Project Archive — AJAX Filter + Pagination
 *
 * Xử lý:
 * 1. Click tab filter (.laca-project-archive__filter-btn) → AJAX load page 1
 * 2. Click pagination (giống archive-pagination.js) → AJAX load page N
 *
 * Config được truyền vào qua data-archive-config trên phần tử .laca-project-archive.
 *
 * @module archive-project
 */

/**
 * Khởi tạo AJAX filter + pagination cho trang archive project.
 *
 * @param {HTMLElement} wrapper  — phần tử có data-archive-config
 */
function initProjectArchive( wrapper ) {
	/** @type {Object} */
	const config = JSON.parse( wrapper.dataset.archiveConfig || '{}' );
	if ( ! config.ajaxurl || ! config.nonce ) return;

	const grid    = wrapper.querySelector( '#archive-grid' );
	const pagWrap = wrapper.querySelector( '#archive-pagination' );
	const filterNav = wrapper.querySelector( '.laca-project-archive__filter' );
	if ( ! grid || ! pagWrap ) return;

	let currentPage    = parseInt( config.current_page, 10 ) || 1;
	let currentCatSlug = config.cat_slug || '';
	let isLoading      = false;

	/**
	 * Fetch một trang / filter mới từ server.
	 *
	 * @param {number} page
	 * @param {string} catSlug
	 */
	async function fetchPage( page, catSlug ) {
		if ( isLoading ) return;
		isLoading = true;

		grid.setAttribute( 'aria-busy', 'true' );
		grid.classList.add( 'laca-project-list__grid--loading' );

		try {
			const body = new URLSearchParams( {
				action         : 'lacadev_project_archive_load',
				nonce          : config.nonce,
				paged          : page,
				posts_per_page : config.posts_per_page,
				cat_slug       : catSlug,
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

			currentPage    = page;
			currentCatSlug = catSlug;

			// Cập nhật URL (không reload trang)
			const newUrl = new URL( config.archive_url );
			if ( catSlug ) newUrl.searchParams.set( 'project_cat', catSlug );
			if ( page > 1 ) newUrl.searchParams.set( 'paged', page );
			window.history.replaceState( null, '', newUrl.toString() );

			// Cập nhật trạng thái active trên tabs
			if ( filterNav ) {
				filterNav.querySelectorAll( '.laca-project-archive__filter-btn' ).forEach( ( btn ) => {
					const slug = btn.dataset.catSlug || '';
					btn.classList.toggle( 'is-active', slug === catSlug );
				} );
			}

			// Scroll về đầu grid nếu bị che khuất
			const rect = grid.getBoundingClientRect();
			if ( rect.top < 0 ) {
				const offset = grid.getBoundingClientRect().top + window.scrollY - 100;
				window.scrollTo( { top: Math.max( 0, offset ), behavior: 'smooth' } );
			}

		} catch ( err ) {
			// eslint-disable-next-line no-console
			console.error( '[archive-project] Fetch error:', err );
		} finally {
			isLoading = false;
			grid.removeAttribute( 'aria-busy' );
			grid.classList.remove( 'laca-project-list__grid--loading' );
		}
	}

	/**
	 * Gắn sự kiện click vào các link pagination.
	 */
	function bindPaginationClicks() {
		pagWrap.querySelectorAll( 'a.page-numbers' ).forEach( ( link ) => {
			link.addEventListener( 'click', ( e ) => {
				e.preventDefault();

				const href  = link.getAttribute( 'href' ) || '';
				let   page  = currentPage;

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

				if ( page > 0 ) fetchPage( page, currentCatSlug );
			} );
		} );
	}

	/**
	 * Gắn sự kiện click vào filter tabs.
	 */
	function bindFilterClicks() {
		if ( ! filterNav ) return;
		filterNav.querySelectorAll( '.laca-project-archive__filter-btn' ).forEach( ( btn ) => {
			btn.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				const slug = btn.dataset.catSlug || '';
				fetchPage( 1, slug );
			} );
		} );
	}

	// Khởi tạo
	bindPaginationClicks();
	bindFilterClicks();
}

/**
 * Khởi chạy tất cả project archive wrappers trên trang.
 * Được gọi từ initializePageFeatures() trong index.js.
 */
export function initProjectArchiveAll() {
	document.querySelectorAll( '.laca-project-archive[data-archive-config]' ).forEach( initProjectArchive );
}
