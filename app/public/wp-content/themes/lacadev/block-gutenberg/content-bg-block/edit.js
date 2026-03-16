import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	Button,
} from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const {
		bgId,
		bgUrl,
		overlayOpacity,
		title,
		subtitle,
		content,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'laca-content-bg',
	} );

	const overlayStyle = {
		position: 'absolute',
		inset: 0,
		background: `rgba(0,0,0,${ overlayOpacity / 100 })`,
	};

	const sectionStyle = {
		position: 'relative',
		backgroundImage: bgUrl ? `url(${ bgUrl })` : 'none',
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundColor: bgUrl ? 'transparent' : '#1a1a1a',
		minHeight: '400px',
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Background', 'lacadev' ) }
					initialOpen={ true }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ ( media ) =>
								setAttributes( {
									bgId: media.id,
									bgUrl: media.url,
								} )
							}
							allowedTypes={ [ 'image' ] }
							value={ bgId }
							render={ ( { open } ) => (
								<div>
									{ bgUrl ? (
										<>
											<img
												src={ bgUrl }
												alt=""
												style={ {
													width: '100%',
													height: '80px',
													objectFit: 'cover',
													borderRadius: '4px',
													marginBottom: '8px',
													display: 'block',
												} }
											/>
											<Button
												variant="secondary"
												onClick={ open }
												style={ { marginRight: '8px' } }
											>
												{ __( 'Thay ảnh', 'lacadev' ) }
											</Button>
											<Button
												variant="link"
												isDestructive
												onClick={ () =>
													setAttributes( { bgId: 0, bgUrl: '' } )
												}
											>
												{ __( 'Xoá', 'lacadev' ) }
											</Button>
										</>
									) : (
										<Button variant="primary" onClick={ open }>
											{ __( 'Chọn ảnh nền', 'lacadev' ) }
										</Button>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>

					<RangeControl
						label={ __( 'Độ tối overlay (%)', 'lacadev' ) }
						value={ overlayOpacity }
						onChange={ ( val ) =>
							setAttributes( { overlayOpacity: val } )
						}
						min={ 0 }
						max={ 95 }
						step={ 5 }
						style={ { marginTop: '16px' } }
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<section className="laca-content-bg__section" style={ sectionStyle }>
					{/* Overlay */ }
					<div className="laca-content-bg__overlay" style={ overlayStyle } />

					<div className="laca-content-bg__inner">
						<RichText
							tagName="h2"
							className="laca-content-bg__title"
							value={ title }
							onChange={ ( val ) => setAttributes( { title: val } ) }
							placeholder={ __( 'Tên công ty / Tiêu đề chính…', 'lacadev' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<RichText
							tagName="p"
							className="laca-content-bg__subtitle"
							value={ subtitle }
							onChange={ ( val ) => setAttributes( { subtitle: val } ) }
							placeholder={ __( 'Slogan / Subtitle…', 'lacadev' ) }
							allowedFormats={ [ 'core/bold', 'core/italic' ] }
						/>

						<RichText
							tagName="div"
							multiline="p"
							className="laca-content-bg__content"
							value={ content }
							onChange={ ( val ) => setAttributes( { content: val } ) }
							placeholder={ __( 'Nội dung mô tả… (Enter để xuống dòng mới)', 'lacadev' ) }
							allowedFormats={ [
								'core/bold',
								'core/italic',
								'core/link',
								'core/strikethrough',
							] }
						/>
					</div>
				</section>
			</div>
		</>
	);
}
