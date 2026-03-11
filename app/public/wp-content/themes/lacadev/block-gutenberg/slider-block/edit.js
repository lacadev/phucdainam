import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaPlaceholder, MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, RangeControl, Button, TextControl, Dashicon } from '@wordpress/components';
import { useEffect, useRef, useCallback, useState } from '@wordpress/element';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { images, autoplay, autoplayDelay, slidesPerView, spaceBetween, loop, showPagination, showNavigation } = attributes;
	const swiperContainerRef = useRef( null );
	const swiperInstanceRef = useRef( null );
	const [ swiperKey, setSwiperKey ] = useState( 0 );

	const blockProps = useBlockProps( {
		className: 'laca-slider-block',
	} );

	// Unique selectors scoped to this block instance
	const paginationClass = `swiper-pagination-${ clientId }`;
	const prevClass = `swiper-btn-prev-${ clientId }`;
	const nextClass = `swiper-btn-next-${ clientId }`;

	const destroySwiper = useCallback( () => {
		if ( swiperInstanceRef.current ) {
			swiperInstanceRef.current.destroy( true, true );
			swiperInstanceRef.current = null;
		}
	}, [] );

	const initSwiper = useCallback( () => {
		destroySwiper();

		const container = swiperContainerRef.current;
		if ( ! container || images.length === 0 ) {
			return;
		}

		const config = {
			slidesPerView,
			spaceBetween,
			loop: images.length > 1 ? loop : false,
			autoplay: autoplay && images.length > 1 ? { delay: autoplayDelay, disableOnInteraction: false } : false,
			observer: true,
			observeParents: true,
			observeSlideChildren: true,
		};

		if ( showPagination ) {
			config.pagination = {
				el: `.${ paginationClass }`,
				clickable: true,
			};
		}

		if ( showNavigation && images.length > 1 ) {
			config.navigation = {
				nextEl: `.${ nextClass }`,
				prevEl: `.${ prevClass }`,
			};
		}

		swiperInstanceRef.current = new Swiper( container, config );
	}, [ images, autoplay, autoplayDelay, slidesPerView, spaceBetween, loop, showPagination, showNavigation, paginationClass, prevClass, nextClass, destroySwiper ] );

	// Re-init Swiper when settings or images change
	useEffect( () => {
		// Small delay to ensure React has finished rendering the DOM
		const timer = setTimeout( () => {
			initSwiper();
		}, 150 );

		return () => {
			clearTimeout( timer );
			destroySwiper();
		};
	}, [ swiperKey, initSwiper, destroySwiper ] );

	// Trigger re-init when attributes change
	useEffect( () => {
		setSwiperKey( ( prev ) => prev + 1 );
	}, [ images, autoplay, autoplayDelay, slidesPerView, spaceBetween, loop, showPagination, showNavigation ] );

	const onSelectImages = ( newImages ) => {
		const updatedImages = newImages.map( ( img ) => ( {
			id: img.id,
			url: img.url,
			link: '',
		} ) );
		setAttributes( { images: [ ...images, ...updatedImages ] } );
	};

	const updateImageLink = ( index, link ) => {
		const newImages = [ ...images ];
		newImages[ index ] = { ...newImages[ index ], link };
		setAttributes( { images: newImages } );
	};

	const removeImage = ( index ) => {
		const newImages = images.filter( ( _, i ) => i !== index );
		setAttributes( { images: newImages } );
	};

	return (
		<div { ...blockProps }>
			<InspectorControls>
				<PanelBody title={ __( 'Slider Settings', 'lacadev' ) }>
					<ToggleControl
						label={ __( 'Autoplay', 'lacadev' ) }
						checked={ autoplay }
						onChange={ ( value ) => setAttributes( { autoplay: value } ) }
					/>
					{ autoplay && (
						<RangeControl
							label={ __( 'Autoplay Delay (ms)', 'lacadev' ) }
							value={ autoplayDelay }
							onChange={ ( value ) => setAttributes( { autoplayDelay: value } ) }
							min={ 1000 }
							max={ 10000 }
							step={ 500 }
						/>
					) }
					<RangeControl
						label={ __( 'Slides Per View', 'lacadev' ) }
						value={ slidesPerView }
						onChange={ ( value ) => setAttributes( { slidesPerView: value } ) }
						min={ 1 }
						max={ 6 }
					/>
					<RangeControl
						label={ __( 'Space Between', 'lacadev' ) }
						value={ spaceBetween }
						onChange={ ( value ) => setAttributes( { spaceBetween: value } ) }
						min={ 0 }
						max={ 50 }
					/>
					<ToggleControl
						label={ __( 'Loop', 'lacadev' ) }
						checked={ loop }
						onChange={ ( value ) => setAttributes( { loop: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Pagination', 'lacadev' ) }
						checked={ showPagination }
						onChange={ ( value ) => setAttributes( { showPagination: value } ) }
					/>
					<ToggleControl
						label={ __( 'Show Navigation', 'lacadev' ) }
						checked={ showNavigation }
						onChange={ ( value ) => setAttributes( { showNavigation: value } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Manage Slides', 'lacadev' ) } initialOpen={ false }>
					{ images.map( ( img, index ) => (
						<div
							key={ img.id || index }
							style={ {
								marginBottom: '12px',
								padding: '10px',
								background: '#f8f8f8',
								border: '1px solid #e0e0e0',
								borderRadius: '4px',
							} }
						>
							<div style={ { display: 'flex', alignItems: 'center', marginBottom: '8px' } }>
								<img
									src={ img.url }
									alt=""
									style={ { width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px', borderRadius: '3px' } }
								/>
								<span style={ { flex: 1, fontWeight: 500 } }>
									{ __( 'Slide', 'lacadev' ) } { index + 1 }
								</span>
								<Button isDestructive isSmall onClick={ () => removeImage( index ) }>
									<Dashicon icon="trash" />
								</Button>
							</div>
							<TextControl
								label={ __( 'Link URL', 'lacadev' ) }
								value={ img.link || '' }
								onChange={ ( value ) => updateImageLink( index, value ) }
								placeholder="https://..."
							/>
						</div>
					) ) }
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImages }
							multiple
							type="image"
							render={ ( { open } ) => (
								<Button isPrimary onClick={ open }>
									{ __( 'Add Slide Images', 'lacadev' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			{ images.length === 0 ? (
				<MediaPlaceholder
					icon="images-alt2"
					label={ __( 'Slider Images', 'lacadev' ) }
					onSelect={ onSelectImages }
					accept="image/*"
					multiple
				/>
			) : (
				<div
					key={ swiperKey }
					className="swiper laca-slider-block__swiper"
					ref={ swiperContainerRef }
					style={ {
						width: '100%',
						overflow: 'hidden',
						position: 'relative',
					} }
				>
					<div className="swiper-wrapper">
						{ images.map( ( img, index ) => (
							<div key={ img.id || index } className="swiper-slide">
								<img
									src={ img.url }
									alt=""
									style={ {
										width: '100%',
										height: 'auto',
										display: 'block',
										objectFit: 'cover',
									} }
								/>
							</div>
						) ) }
					</div>
					{ showPagination && (
						<div className={ `swiper-pagination ${ paginationClass }` }></div>
					) }
					{ showNavigation && images.length > 1 && (
						<>
							<div className={ `swiper-button-prev ${ prevClass }` }></div>
							<div className={ `swiper-button-next ${ nextClass }` }></div>
						</>
					) }
				</div>
			) }
		</div>
	);
}
