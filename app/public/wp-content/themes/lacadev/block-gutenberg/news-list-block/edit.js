import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	CheckboxControl,
	SelectControl,
	ToggleControl,
	TextControl,
	Spinner,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

// ── PostImage component ────────────────────────────────────────────────────────
function PostImage( { id } ) {
	const media = useSelect(
		( select ) => {
			if ( ! id || isNaN( parseInt( id ) ) ) return null;
			return select( coreStore ).getMedia( id );
		},
		[ id ]
	);

	if ( ! media ) {
		return <div className="laca-news-list__img-placeholder" />;
	}

	return (
		<img
			src={
				media.media_details?.sizes?.medium_large?.source_url ||
				media.media_details?.sizes?.medium?.source_url ||
				media.source_url
			}
			alt={ media.alt_text || '' }
			className="laca-news-list__img"
		/>
	);
}

// ── Main Edit component ────────────────────────────────────────────────────────
export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		subtitle,
		orderBy,
		selectedCats,
		postsCount,
		viewAllUrl,
		viewAllText,
		showExcerpt,
		showCategory,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'laca-news-list',
	} );

	// ── Taxonomy list (category) ───────────────────────────────────────────────
	const categories = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecords( 'taxonomy', 'category', {
				per_page: -1,
				hide_empty: false,
				_fields: 'id,name,slug',
			} ),
		[]
	);

	// ── Preview posts trong editor ─────────────────────────────────────────────
	const { previewPosts, isLoadingPosts } = useSelect(
		( select ) => {
			const { getEntityRecords, isResolving } = select( coreStore );

			const query = {
				per_page: postsCount,
				status: 'publish',
				_embed: true,
			};

			if ( orderBy === 'rand' ) {
				query.orderby = 'date'; // editor dùng date thay rand để ổn định
				query.order = 'desc';
			} else if ( orderBy === 'comment_count' ) {
				query.orderby = 'comment_count';
				query.order = 'desc';
			} else {
				query.orderby = 'date';
				query.order = 'desc';
			}

			if ( selectedCats && selectedCats.length > 0 ) {
				query.categories = selectedCats.join( ',' );
			}

			const records = getEntityRecords( 'postType', 'post', query );
			const loading = isResolving( 'getEntityRecords', [
				'postType',
				'post',
				query,
			] );

			return {
				previewPosts: records || [],
				isLoadingPosts: loading,
			};
		},
		[ postsCount, selectedCats, orderBy ]
	);

	// ── Category checkbox handler ──────────────────────────────────────────────
	const toggleCat = ( catId ) => {
		const next = selectedCats.includes( catId )
			? selectedCats.filter( ( id ) => id !== catId )
			: [ ...selectedCats, catId ];
		setAttributes( { selectedCats: next } );
	};

	// ── Order options ──────────────────────────────────────────────────────────
	const orderOptions = [
		{ label: __( 'Mới nhất', 'lacadev' ), value: 'date' },
		{ label: __( 'Xem nhiều nhất', 'lacadev' ), value: 'comment_count' },
		{ label: __( 'Ngẫu nhiên', 'lacadev' ), value: 'rand' },
	];

	// ── Excerpt: cắt ngắn ─────────────────────────────────────────────────────
	const trimExcerpt = ( str, max = 100 ) => {
		if ( ! str ) return '';
		const p = document.createElement( 'p' );
		p.innerHTML = str;
		const text = p.textContent || p.innerText || '';
		return text.length > max ? text.slice( 0, max ) + '…' : text;
	};

	return (
		<>
			{ /* ── InspectorControls (sidebar) ─────────────────────────────────── */ }
			<InspectorControls>
				<PanelBody
					title={ __( 'Cài đặt hiển thị', 'lacadev' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Sắp xếp theo', 'lacadev' ) }
						value={ orderBy }
						options={ orderOptions }
						onChange={ ( val ) =>
							setAttributes( { orderBy: val } )
						}
					/>
					<RangeControl
						label={ __( 'Số bài hiển thị', 'lacadev' ) }
						value={ postsCount }
						onChange={ ( val ) =>
							setAttributes( { postsCount: val } )
						}
						min={ 1 }
						max={ 12 }
					/>
					<ToggleControl
						label={ __( 'Hiển thị mô tả ngắn', 'lacadev' ) }
						checked={ showExcerpt }
						onChange={ ( val ) =>
							setAttributes( { showExcerpt: val } )
						}
					/>
					<ToggleControl
						label={ __( 'Hiển thị danh mục', 'lacadev' ) }
						checked={ showCategory }
						onChange={ ( val ) =>
							setAttributes( { showCategory: val } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Lọc theo danh mục', 'lacadev' ) }
					initialOpen={ false }
				>
					{ ! categories ? (
						<Spinner />
					) : (
						categories.map( ( cat ) => (
							<CheckboxControl
								key={ cat.id }
								label={ cat.name }
								checked={ selectedCats.includes( cat.id ) }
								onChange={ () => toggleCat( cat.id ) }
							/>
						) )
					) }
					{ selectedCats.length > 0 && (
						<p style={ { marginTop: '8px' } }>
							<button
								type="button"
								onClick={ () =>
									setAttributes( { selectedCats: [] } )
								}
								style={ {
									background: 'none',
									border: 'none',
									padding: 0,
									color: '#007cba',
									cursor: 'pointer',
									fontSize: '12px',
								} }
							>
								{ __( 'Bỏ lọc tất cả', 'lacadev' ) }
							</button>
						</p>
					) }
				</PanelBody>

				<PanelBody
					title={ __( 'Nút xem tất cả', 'lacadev' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'URL', 'lacadev' ) }
						value={ viewAllUrl }
						type="url"
						placeholder="https://..."
						onChange={ ( val ) =>
							setAttributes( { viewAllUrl: val } )
						}
					/>
					<TextControl
						label={ __( 'Nhãn nút', 'lacadev' ) }
						value={ viewAllText }
						onChange={ ( val ) =>
							setAttributes( { viewAllText: val } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			{ /* ── Block Editor Preview ─────────────────────────────────────────── */ }
			<section { ...blockProps }>
				<div className="container-fluid">
					{ /* Header */ }
					<div className="laca-news-list__header">
						<div className="laca-news-list__header-text">
							<RichText
								tagName="span"
								className="laca-news-list__subtitle"
								value={ subtitle }
								onChange={ ( val ) =>
									setAttributes( { subtitle: val } )
								}
								placeholder={ __( 'Sub-tiêu đề…', 'lacadev' ) }
							/>
							<RichText
								tagName="h2"
								className="laca-news-list__title"
								value={ title }
								onChange={ ( val ) =>
									setAttributes( { title: val } )
								}
								placeholder={ __( 'Tiêu đề…', 'lacadev' ) }
							/>
						</div>
						{ viewAllUrl && viewAllText && (
							<span className="laca-news-list__view-all btn btn-primary">
								{ viewAllText }
							</span>
						) }
					</div>
					<hr className="laca-news-list__divider" />

					{ /* Grid */ }
					{ isLoadingPosts ? (
						<div style={ { padding: '2rem', textAlign: 'center' } }>
							<Spinner />
						</div>
					) : (
						<div className="laca-news-list__grid">
							{ previewPosts.length === 0 && (
								<p style={ { color: '#999' } }>
									{ __(
										'Không có bài viết nào phù hợp.',
										'lacadev'
									) }
								</p>
							) }
							{ previewPosts.map( ( post ) => {
								const thumbnailId =
									post.featured_media ||
									post?._embedded?.[
										'wp:featuredmedia'
									]?.[ 0 ]?.id;
								const catNames = post?._embedded?.[
									'wp:term'
								]?.[ 0 ]
									?.map( ( t ) => t.name )
									.join( ', ' );
								const excerpt = trimExcerpt(
									post.excerpt?.rendered || ''
								);
								return (
									<article
										key={ post.id }
										className="laca-news-list__item"
									>
										<div className="laca-news-list__thumb">
											<PostImage id={ thumbnailId } />
										</div>
										<div className="laca-news-list__content">
											{ showCategory && catNames && (
												<span className="laca-news-list__cat">
													{ catNames }
												</span>
											) }
											<h3 className="laca-news-list__item-title">
												{ post.title?.rendered || '' }
											</h3>
											{ showExcerpt && excerpt && (
												<p className="laca-news-list__excerpt">
													{ excerpt }
												</p>
											) }
											<span className="laca-news-list__read-more">
												{ __( 'Xem thêm', 'lacadev' ) }
											</span>
										</div>
									</article>
								);
							} ) }
						</div>
					) }
				</div>
			</section>
		</>
	);
}
