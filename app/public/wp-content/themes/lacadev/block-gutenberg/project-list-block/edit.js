import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	CheckboxControl,
	SelectControl,
	RadioControl,
	Spinner,
	TextControl,
	Button,
	Flex,
	FlexItem,
	FlexBlock,
} from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useState, useCallback } from '@wordpress/element';
import { closeSmall } from '@wordpress/icons';

// ── PostImage component (theo pattern theme-mau) ───────────────────────────────
function PostImage( { id } ) {
	const media = useSelect(
		( select ) => {
			if ( ! id || isNaN( parseInt( id ) ) ) return null;
			return select( coreStore ).getMedia( id );
		},
		[ id ]
	);

	if ( ! media ) {
		return <div className="laca-project-list__card-img-placeholder" />;
	}

	return (
		<img
			src={
				media.media_details?.sizes?.medium_large?.source_url ||
				media.media_details?.sizes?.medium?.source_url ||
				media.source_url
			}
			alt={ media.alt_text || '' }
		/>
	);
}

// ── Main Edit component ────────────────────────────────────────────────────────
export default function Edit( { attributes, setAttributes } ) {
	const {
		title,
		subtitle,
		displayMode,
		orderBy,
		selectedCats,
		postsCount,
		manualPostIds,
	} = attributes;

	const [ searchKeyword, setSearchKeyword ] = useState( '' );

	const blockProps = useBlockProps( {
		className: 'laca-project-list',
	} );

	// ── Taxonomy list ──────────────────────────────────────────────────────────
	const categories = useSelect(
		( select ) =>
			select( coreStore ).getEntityRecords( 'taxonomy', 'project_cat', {
				per_page: -1,
				hide_empty: false,
				_fields: 'id,name,slug',
			} ),
		[]
	);

	// ── Preview posts trong editor (AUTO mode) — dùng useSelect chuẩn Gutenberg ──
	const { previewPosts, isLoadingPosts } = useSelect(
		( select ) => {
			if ( displayMode !== 'auto' ) {
				return { previewPosts: null, isLoadingPosts: false };
			}

			const { getEntityRecords, isResolving } = select( coreStore );

			const query = {
				per_page: postsCount,
				status: 'publish',
				_embed: true,
			};

			if ( orderBy === 'rand' ) {
				query.orderby = 'rand';
			} else if ( orderBy === 'comment_count' ) {
				query.orderby = 'comment_count';
				query.order = 'desc';
			} else {
				query.orderby = 'date';
				query.order = 'desc';
			}

			// Filter by category
			if ( selectedCats && selectedCats.length > 0 ) {
				query.project_cat = selectedCats.join( ',' );
			}

			const records = getEntityRecords( 'postType', 'project', query );
			const loading = isResolving( 'getEntityRecords', [ 'postType', 'project', query ] );

			return {
				previewPosts: records || [],
				isLoadingPosts: loading,
			};
		},
		[ displayMode, postsCount, selectedCats, orderBy ]
	);

	// ── Manual mode: search posts ──────────────────────────────────────────────
	const searchResults = useSelect(
		( select ) => {
			if ( displayMode !== 'manual' || ! searchKeyword.trim() ) {
				return null;
			}
			return select( coreStore ).getEntityRecords( 'postType', 'project', {
				search: searchKeyword,
				per_page: 8,
				_fields: 'id,title',
			} );
		},
		[ displayMode, searchKeyword ]
	);

	// ── Manual mode: resolve selected posts for display ────────────────────────
	const selectedPosts = useSelect(
		( select ) => {
			if ( ! manualPostIds.length ) {
				return [];
			}
			const results = [];
			manualPostIds.forEach( ( id ) => {
				const post = select( coreStore ).getEntityRecord(
					'postType',
					'project',
					id,
					{ _fields: 'id,title,featured_media', _embed: true }
				);
				if ( post ) {
					results.push( post );
				}
			} );
			return results;
		},
		[ manualPostIds ]
	);

	// ── Handlers ───────────────────────────────────────────────────────────────
	const toggleCat = ( id, checked ) => {
		const next = checked
			? [ ...selectedCats, id ]
			: selectedCats.filter( ( c ) => c !== id );
		setAttributes( { selectedCats: next } );
	};

	const addManualPost = useCallback(
		( id ) => {
			if ( ! manualPostIds.includes( id ) ) {
				setAttributes( { manualPostIds: [ ...manualPostIds, id ] } );
			}
			setSearchKeyword( '' );
		},
		[ manualPostIds ]
	);

	const removeManualPost = useCallback(
		( id ) => {
			setAttributes( {
				manualPostIds: manualPostIds.filter( ( p ) => p !== id ),
			} );
		},
		[ manualPostIds ]
	);

	// ── Styles helpers ─────────────────────────────────────────────────────────
	const hint = { fontSize: '11px', color: '#757575', marginBottom: '8px' };

	return (
		<>
			{/* ── Sidebar ─────────────────────────────────────────────────── */}
			<InspectorControls>

				{/* Chế độ hiển thị */}
				<PanelBody title={ __( 'Chế độ hiển thị', 'lacadev' ) } initialOpen={ true }>
					<RadioControl
						label={ __( 'Cách lấy bài viết', 'lacadev' ) }
						selected={ displayMode }
						options={ [
							{ label: __( 'Tự động (theo danh mục)', 'lacadev' ), value: 'auto' },
							{ label: __( 'Thủ công (chọn từng bài)', 'lacadev' ), value: 'manual' },
						] }
						onChange={ ( val ) => setAttributes( { displayMode: val } ) }
					/>
				</PanelBody>

				{/* ── Auto mode settings ───────────────────────────────────── */}
				{ displayMode === 'auto' && (
					<>
						<PanelBody title={ __( 'Danh mục hiển thị', 'lacadev' ) } initialOpen={ true }>
							<p style={ hint }>
								{ __( 'Không chọn = hiển thị tất cả.', 'lacadev' ) }
							</p>
							{ ! categories ? (
								<Spinner />
							) : (
								categories.map( ( cat ) => (
									<CheckboxControl
										key={ cat.id }
										label={ cat.name }
										checked={ selectedCats.includes( cat.id ) }
										onChange={ ( checked ) => toggleCat( cat.id, checked ) }
									/>
								) )
							) }
						</PanelBody>

						<PanelBody title={ __( 'Sắp xếp & Số lượng', 'lacadev' ) } initialOpen={ true }>
							<SelectControl
								label={ __( 'Thứ tự hiển thị', 'lacadev' ) }
								value={ orderBy }
								options={ [
									{ label: __( 'Mới nhất', 'lacadev' ), value: 'date' },
									{ label: __( 'Ngẫu nhiên', 'lacadev' ), value: 'rand' },
									{ label: __( 'Xem nhiều nhất', 'lacadev' ), value: 'comment_count' },
								] }
								onChange={ ( val ) => setAttributes( { orderBy: val } ) }
							/>
							<RangeControl
								label={ __( 'Tổng số dự án hiển thị', 'lacadev' ) }
								value={ postsCount }
								onChange={ ( val ) => setAttributes( { postsCount: val } ) }
								min={ 1 }
								max={ 24 }
							/>
						</PanelBody>
					</>
				) }

				{/* ── Manual mode settings ─────────────────────────────────── */}
				{ displayMode === 'manual' && (
					<PanelBody title={ __( 'Chọn dự án thủ công', 'lacadev' ) } initialOpen={ true }>
						<p style={ hint }>
							{ __( 'Tìm và chọn từng dự án muốn hiển thị.', 'lacadev' ) }
						</p>

						<TextControl
							label={ __( 'Tìm dự án', 'lacadev' ) }
							placeholder={ __( 'Nhập tên dự án…', 'lacadev' ) }
							value={ searchKeyword }
							onChange={ setSearchKeyword }
						/>

						{ searchKeyword && (
							<div style={ { marginTop: '4px', marginBottom: '12px' } }>
								{ ! searchResults ? (
									<Spinner />
								) : searchResults.length === 0 ? (
									<p style={ { ...hint, margin: 0 } }>
										{ __( 'Không tìm thấy kết quả.', 'lacadev' ) }
									</p>
								) : (
									searchResults.map( ( post ) => (
										<div
											key={ post.id }
											style={ {
												padding: '6px 8px',
												borderBottom: '1px solid #eee',
												cursor: manualPostIds.includes( post.id ) ? 'default' : 'pointer',
												opacity: manualPostIds.includes( post.id ) ? 0.4 : 1,
											} }
											onClick={ () =>
												! manualPostIds.includes( post.id ) &&
												addManualPost( post.id )
											}
										>
											<span style={ { fontSize: '12px' } }>
												{ manualPostIds.includes( post.id ) ? '✓ ' : '+ ' }
												{ post.title?.rendered || `#${ post.id }` }
											</span>
										</div>
									) )
								) }
							</div>
						) }

						{ manualPostIds.length > 0 && (
							<>
								<p style={ { ...hint, marginTop: '8px' } }>
									{ __( 'Đã chọn:', 'lacadev' ) }
								</p>
								{ manualPostIds.map( ( id ) => {
									const post = selectedPosts.find( ( p ) => p.id === id );
									return (
										<Flex key={ id } align="center" style={ { marginBottom: '4px' } }>
											<FlexBlock>
												<span style={ { fontSize: '12px' } }>
													{ post
														? post.title?.rendered || `#${ id }`
														: `#${ id }` }
												</span>
											</FlexBlock>
											<FlexItem>
												<Button
													icon={ closeSmall }
													label={ __( 'Xóa', 'lacadev' ) }
													isSmall
													onClick={ () => removeManualPost( id ) }
												/>
											</FlexItem>
										</Flex>
									);
								} ) }
							</>
						) }
					</PanelBody>
				) }

			</InspectorControls>

			{/* ── Canvas preview ───────────────────────────────────────────── */}
			<div { ...blockProps }>
				<div className="container-fluid">
					{/* Header */}
					<div className="laca-project-list__header">
						<div className="laca-project-list__headings">
							<RichText
								tagName="p"
								className="laca-project-list__subtitle"
								value={ subtitle }
								onChange={ ( val ) => setAttributes( { subtitle: val } ) }
								placeholder={ __( 'Sub-tiêu đề…', 'lacadev' ) }
								allowedFormats={ [] }
							/>
							<RichText
								tagName="h2"
								className="laca-project-list__title"
								value={ title }
								onChange={ ( val ) => setAttributes( { title: val } ) }
								placeholder={ __( 'Tiêu đề…', 'lacadev' ) }
								allowedFormats={ [ 'core/bold', 'core/italic' ] }
							/>
						</div>

						{/* Category tabs preview (decorative) */}
						<div className="laca-project-list__cats">
							{ categories ? (
								<>
									{ categories
										.filter( ( c ) =>
											selectedCats.length === 0
												? true
												: selectedCats.includes( c.id )
										)
										.map( ( cat ) => (
											<span
												key={ cat.id }
												className="laca-project-list__cat-btn"
											>
												{ cat.name }
											</span>
										) ) }
									<span className="laca-project-list__cat-btn laca-project-list__cat-btn--all">
										{ __( 'Xem tất cả', 'lacadev' ) }
									</span>
								</>
							) : (
								<Spinner />
							) }
						</div>
					</div>

					<hr className="laca-project-list__divider" />

					{/* Grid preview */}
					<div className="laca-project-list__grid">
						{ displayMode === 'auto' ? (
							isLoadingPosts || previewPosts === null ? (
								<div style={ { padding: '2rem', textAlign: 'center' } }>
									<Spinner />
									<p style={ { color: '#999' } }>{ __( 'Đang tải dự án…', 'lacadev' ) }</p>
								</div>
							) : previewPosts.length === 0 ? (
								<p style={ { color: '#999', fontStyle: 'italic', gridColumn: '1/-1' } }>
									{ __( 'Không tìm thấy dự án nào. Kiểm tra lại danh mục hoặc thêm dự án.', 'lacadev' ) }
								</p>
							) : (
								previewPosts.map( ( post ) => (
									<article
										key={ post.id }
										className="laca-project-list__card"
									>
										<div className="laca-project-list__card-img">
											<PostImage id={ post.featured_media } />
										</div>
										<div className="laca-project-list__card-body">
											<h3
												className="laca-project-list__card-title"
												dangerouslySetInnerHTML={ {
													__html: post.title?.rendered,
												} }
											/>
										</div>
									</article>
								) )
							)
						) : (
							/* Manual mode preview */
							manualPostIds.length === 0 ? (
								<p style={ { color: '#999', fontStyle: 'italic', gridColumn: '1/-1' } }>
									{ __( 'Chưa chọn dự án nào. Dùng panel bên phải để tìm và thêm dự án.', 'lacadev' ) }
								</p>
							) : (
								selectedPosts.map( ( post ) => (
									<article
										key={ post.id }
										className="laca-project-list__card"
									>
										<div className="laca-project-list__card-img">
											<PostImage id={ post.featured_media } />
										</div>
										<div className="laca-project-list__card-body">
											<h3
												className="laca-project-list__card-title"
												dangerouslySetInnerHTML={ {
													__html: post.title?.rendered || `#${ post.id }`,
												} }
											/>
										</div>
									</article>
								) )
							)
						) }
					</div>
				</div>
			</div>
		</>
	);
}
