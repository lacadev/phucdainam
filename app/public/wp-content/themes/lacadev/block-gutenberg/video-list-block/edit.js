import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	Button,
	Spinner,
} from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { useState } from '@wordpress/element';
import { plus, trash } from '@wordpress/icons';
import { v4 as uuidv4 } from 'uuid';

/**
 * Tạo ID ngắn gọn (không cần uuid đầy đủ)
 */
function makeId() {
	return Math.random().toString( 36 ).slice( 2, 9 );
}

/**
 * Lấy YouTube thumbnail URL từ video URL
 */
function getYouTubeThumbnail( url ) {
	if ( ! url ) return '';
	const match = url.match(
		/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
	);
	if ( match ) {
		return `https://i.ytimg.com/vi/${ match[ 1 ] }/hqdefault.jpg`;
	}
	return '';
}

export default function Edit( { attributes, setAttributes } ) {
	const { title, subtitle, viewAllUrl, viewAllText, videos } = attributes;

	const blockProps = useBlockProps( {
		className: 'laca-video-list',
	} );

	// ── Helpers ───────────────────────────────────────────────────
	const updateVideo = ( index, patch ) => {
		const next = videos.map( ( v, i ) => ( i === index ? { ...v, ...patch } : v ) );
		setAttributes( { videos: next } );
	};

	const addVideo = () => {
		setAttributes( {
			videos: [
				...videos,
				{
					id: makeId(),
					url: '',
					thumbnailUrl: '',
					thumbnailId: 0,
					label: '',
				},
			],
		} );
	};

	const removeVideo = ( index ) => {
		setAttributes( { videos: videos.filter( ( _, i ) => i !== index ) } );
	};

	// ── Sidebar ────────────────────────────────────────────────────
	const inspector = (
		<InspectorControls>
			<PanelBody title={ __( 'Liên kết & Điều hướng', 'lacadev' ) } initialOpen={ true }>
				<TextControl
					label={ __( 'Text nút "Xem tất cả"', 'lacadev' ) }
					value={ viewAllText }
					onChange={ ( val ) => setAttributes( { viewAllText: val } ) }
				/>
				<TextControl
					label={ __( 'URL "Xem tất cả"', 'lacadev' ) }
					value={ viewAllUrl }
					type="url"
					onChange={ ( val ) => setAttributes( { viewAllUrl: val } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);

	// ── Thumbnail placeholder style ────────────────────────────────
	const thumbPlaceholderStyle = {
		background: '#e0e0e0',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontSize: 12,
		color: '#666',
		minHeight: 80,
		cursor: 'pointer',
	};

	// ── Editor render ──────────────────────────────────────────────
	return (
		<>
			{ inspector }
			<section { ...blockProps }>
				{/* Header */}
				<div className="laca-video-list__header">
					<div className="laca-video-list__header-text">
						<RichText
							tagName="span"
							className="laca-video-list__subtitle"
							value={ subtitle }
							onChange={ ( val ) => setAttributes( { subtitle: val } ) }
							placeholder={ __( 'Sub-tiêu đề…', 'lacadev' ) }
							allowedFormats={ [] }
						/>
						<RichText
							tagName="h2"
							className="laca-video-list__title"
							value={ title }
							onChange={ ( val ) => setAttributes( { title: val } ) }
							placeholder={ __( 'Tiêu đề…', 'lacadev' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>
					</div>
					{ viewAllText && (
						<span className="laca-video-list__view-all btn btn-primary">
							{ viewAllText }
						</span>
					) }
				</div>

				<hr className="laca-video-list__divider" />

				{/* Video grid preview */}
				<div className="laca-video-list__grid">
					{ videos.map( ( video, index ) => (
						<div
							key={ video.id || index }
							className={ `laca-video-list__item laca-video-list__item--${ index === 0 ? 'featured' : 'small' }` }
						>
							{/* Thumbnail */}
							<MediaUploadCheck>
								<MediaUpload
									onSelect={ ( media ) =>
										updateVideo( index, {
											thumbnailUrl: media.url,
											thumbnailId: media.id,
										} )
									}
									allowedTypes={ [ 'image' ] }
									value={ video.thumbnailId || 0 }
									render={ ( { open } ) => {
									const ytThumb = ! video.thumbnailUrl ? getYouTubeThumbnail( video.url ) : '';
									const displayThumb = video.thumbnailUrl || ytThumb;
									return (
										<div
											className="laca-video-list__thumb"
											style={ displayThumb ? {} : thumbPlaceholderStyle }
										>
											{ displayThumb ? (
												<img
													src={ displayThumb }
													alt={ video.label || '' }
													style={ { cursor: 'pointer' } }
													onClick={ open }
												/>
											) : (
												<span
													onClick={ open }
													style={ { cursor: 'pointer' } }
												>
													{ __( 'Chọn ảnh bìa', 'lacadev' ) }
												</span>
											) }
											{ video.thumbnailUrl && (
												<button
													style={ {
														position: 'absolute', top: 4, right: 4,
														background: 'rgba(0,0,0,.55)', border: 'none',
														borderRadius: 3, color: '#fff', cursor: 'pointer',
														fontSize: 10, padding: '2px 5px', zIndex: 2,
													} }
													onClick={ () => updateVideo( index, { thumbnailUrl: '', thumbnailId: 0 } ) }
													title={ __( 'Xoá ảnh bìa', 'lacadev' ) }
												>✕</button>
											) }
											{ ytThumb && ! video.thumbnailUrl && (
												<span
													style={ {
														position: 'absolute', bottom: 4, left: 4,
														background: 'rgba(0,0,0,.55)', color: '#fff',
														fontSize: 10, padding: '2px 5px', borderRadius: 3,
													} }
												>YouTube</span>
											) }
											<div className="laca-video-list__play-icon">▶</div>
										</div>
									);
								} }
								/>
							</MediaUploadCheck>

							{/* Controls */}
							<div style={ { padding: '8px', background: '#f9f9f9', borderTop: '1px solid #eee' } }>
								<TextControl
									label={ __( 'URL Video (YouTube / Vimeo / MP4)', 'lacadev' ) }
									value={ video.url }
									onChange={ ( val ) => updateVideo( index, { url: val } ) }
									placeholder="https://youtube.com/watch?v=..."
								/>
								<TextControl
									label={ __( 'Nhãn (tùy chọn)', 'lacadev' ) }
									value={ video.label || '' }
									onChange={ ( val ) => updateVideo( index, { label: val } ) }
									placeholder={ __( 'Ví dụ: Sunflower Villa', 'lacadev' ) }
								/>
								<Button
									isDestructive
									variant="tertiary"
									size="small"
									icon={ trash }
									onClick={ () => removeVideo( index ) }
								>
									{ __( 'Xoá video', 'lacadev' ) }
								</Button>
							</div>
						</div>
					) ) }
				</div>

				{/* Add video button */}
				<div style={ { marginTop: 16, textAlign: 'center' } }>
					<Button
						variant="primary"
						icon={ plus }
						onClick={ addVideo }
					>
						{ __( 'Thêm video', 'lacadev' ) }
					</Button>
				</div>
			</section>
		</>
	);
}
