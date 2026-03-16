/* eslint-disable no-unused-vars */
import '@images/favicon.ico';
import '@styles/theme';
import './pages/*.js';
import './ajax-search.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Swup from 'swup';
import Swiper from 'swiper';
import { initAboutLacaHero } from './pages/about-laca';
import { initContactPage } from './pages/contact';
import { initCommentForm } from './pages/comments';
import './project-block.js';
import { initProjectListBlock } from './project-list-block.js';
import { initVideoListBlock } from './video-list-block.js';
import { initProjectGallery } from './project-gallery.js';
import { initArchivePaginationAll } from './archive-pagination.js';
import { initProjectArchiveAll } from './archive-project.js';
import '../../../block-gutenberg/slider-block/view.js';
import AOS from 'aos';

gsap.registerPlugin( ScrollTrigger );

// Simple device check – used to avoid heavy animations on mobile
const isMobileDevice =
	window.matchMedia &&
	window.matchMedia('(max-width: 768px)').matches;

/**
 * Check và show loader NGAY nếu cần (trước DOMContentLoaded)
 * Để tránh flash of content
 */
const shouldShowLoader = () => {
	const LOADER_KEY = 'laca_loader_shown';
	const HOURS_24 = 24 * 60 * 60 * 1000;
	const lastShown = localStorage.getItem( LOADER_KEY );
	const now = Date.now();
	
	return !lastShown || ( now - parseInt( lastShown ) ) >= HOURS_24;
};

// Show loader immediately if needed (desktop/tablet only)
if ( ! isMobileDevice && shouldShowLoader() ) {
	console.log( '🎬 Preparing page loader...' );
	document.documentElement.classList.add( 'loading' );
}

document.addEventListener( 'DOMContentLoaded', () => {
	const swup = new Swup();
	
	initializePageFeatures();
	
	// Initialize page loader (will check localStorage again)
	initPageLoader();

	// Swup navigation - không show loader
	swup.hooks.on( 'content:replace', () => {
		console.log( '🔄 Swup navigation - re-initializing features' );
		initializePageFeatures();
	} );
} );

function initializePageFeatures() {
	// Skip heavy visual effects on mobile for better performance
	if ( ! isMobileDevice ) {
		setupGsap404();
	}

	initAboutLacaHero();
	initHeaderScroll();
	initMobileMenu();
	initContactPage();
	initCommentForm();
	initProjectListBlock();
	initVideoListBlock();
	initProjectGallery();
	initArchivePaginationAll();
	initProjectArchiveAll();

	// Refresh ScrollTrigger after items are initialized
	setTimeout( () => {
		ScrollTrigger.refresh();
	}, 500 );
}

/**
 * Hiển thị Page Loader
 */
function showPageLoader() {
	const loader = document.querySelector( '.page-loader' );
	const textLoader = document.querySelector( '.text-loader' );
	if ( ! loader || ! textLoader ) {
		return;
	}

	loader.classList.add( 'active' );
	gsap.set( [ loader, textLoader ], { display: 'block', opacity: 1 } );
	document.body.classList.add( 'overflow-hidden' );
	startFlicker();
}

/**
 * Ẩn Page Loader
 */
function hidePageLoader() {
	const loader = document.querySelector( '.page-loader' );
	const textLoader = document.querySelector( '.text-loader' );
	if ( ! loader || ! textLoader ) {
		return;
	}

	const randoms = document.querySelectorAll( '.randoms' );
	randoms.forEach( ( el ) => ( el.style.opacity = '1' ) );

	gsap.to( textLoader, {
		opacity: 0,
		duration: 0.5,
		delay: 0.3,
		ease: 'power2.inOut',
		onComplete: () => {
			gsap.to( loader, {
				opacity: 0,
				duration: 0.6,
				delay: 0.1,
				ease: 'power2.inOut',
				onComplete: () => {
					loader.style.display = 'none';
					loader.classList.remove( 'active' );
					document.body.classList.remove( 'overflow-hidden' );
					document.documentElement.classList.remove( 'loading' );
					stopFlicker();
					console.log( '✅ Page loader hidden' );
				},
			} );
		},
	} );
}

/**
 * Khởi tạo Page Loader lần đầu
 * CHỈ hiển thị lần đầu vào web hoặc sau 24h
 */
function initPageLoader() {
	const loader = document.querySelector( '.page-loader' );
	if ( ! loader ) {
		return;
	}

	// Do not show blocking loader on mobile – keep experience snappy
	if ( isMobileDevice ) {
		loader.style.display = 'none';
		loader.classList.remove( 'active' );
		document.body.classList.remove( 'overflow-hidden' );
		document.documentElement.classList.remove( 'loading' );
		return;
	}

	// Check localStorage: đã show loader trong vòng 24h chưa?
	const LOADER_KEY = 'laca_loader_shown';
	const HOURS_24 = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
	
	const lastShown = localStorage.getItem( LOADER_KEY );
	const now = Date.now();
	
	// Nếu đã show trong 24h → Skip loader, ẩn ngay
	if ( lastShown && ( now - parseInt( lastShown ) ) < HOURS_24 ) {
		console.log( '⚡ Page loader skipped (shown within 24h)' );
		loader.style.display = 'none';
		loader.classList.remove( 'active' );
		document.body.classList.remove( 'overflow-hidden' );
		document.documentElement.classList.remove( 'loading' );
		return;
	}

	// Lần đầu HOẶC đã qua 24h → Show loader
	console.log( '🎬 Page loader activated (first visit or 24h passed)' );
	loader.classList.add( 'active' );
	document.body.classList.add( 'overflow-hidden' );
	document.documentElement.classList.add( 'loading' );
	startFlicker();

	// Save timestamp
	localStorage.setItem( LOADER_KEY, now.toString() );

	// Hiển thị trong 1s (1000ms)
	const startTime = Date.now();
	const minDisplayTime = 1000;

	const handleFinish = () => {
		const elapsedTime = Date.now() - startTime;
		const remainingTime = Math.max( 0, minDisplayTime - elapsedTime );
		setTimeout( hidePageLoader, remainingTime );
	};

	if ( document.readyState === 'complete' ) {
		handleFinish();
	} else {
		window.addEventListener( 'load', handleFinish );
	}

	// Fallback an toàn sau 5s
	setTimeout( () => {
		if ( loader.style.display !== 'none' ) {
			console.warn( '⏱️ Page loader timeout - forcing hide' );
			hidePageLoader();
		}
	}, 5000 );
}

/**
 * Khởi tạo hoạt ảnh GSAP và AOS
 */
function initAnimations() {
	// GSAP
	gsap.registerPlugin( ScrollTrigger );
	gsap.from( '.block-title-scroll', {
		x: '50%',
		duration: 2,
		opacity: 0.3,
		scrollTrigger: {
			trigger: '.block-title-scroll',
			start: 'top 80%',
			end: 'bottom 20%',
			scrub: true,
		},
	} );

	//   // AOS
	AOS.init({
		duration: 400,
	});
}

/**
 * Header Scroll logic (Hide on scroll down, Show on scroll up)
 */
function initHeaderScroll() {
	const header = document.getElementById( 'header' );
	if ( ! header ) {
		return;
	}

	let lastScrollTop = 0;
	const threshold = 100;

	window.addEventListener(
		'scroll',
		() => {
			const scrollTop =
				window.pageYOffset || document.documentElement.scrollTop;

			// Background / Scrolled state
			if ( scrollTop > 50 ) {
				header.classList.add( 'header--scrolled' );
			} else {
				header.classList.remove( 'header--scrolled' );
			}

			// Hide / Show logic
			if ( scrollTop > threshold ) {
				if ( scrollTop > lastScrollTop ) {
					// Scroll Down
					header.classList.add( 'header--hidden' );
				} else {
					// Scroll Up
					header.classList.remove( 'header--hidden' );
				}
			} else {
				header.classList.remove( 'header--hidden' );
			}

			lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		},
		{ passive: true }
	);
}

/**
 * Mobile Menu logic (Full screen overlay)
 */
function initMobileMenu() {
	const burgerBtn = document.getElementById( 'btn-hamburger' );
	const overlay = document.querySelector( '.header__overlay' );

	if ( ! burgerBtn || ! overlay ) {
		return;
	}

	function toggleMenu( forceClose = false ) {
		const isActive = burgerBtn.classList.contains( 'active' );
		const shouldClose = forceClose || isActive;

		if ( shouldClose ) {
			burgerBtn.classList.remove( 'active' );
			overlay.classList.remove( 'active' );
			document.body.classList.remove( 'menu-open' );
			
			// Close all submenus when closing the main menu
			const openSubmenus = overlay.querySelectorAll( '.has-children.open' );
			openSubmenus.forEach( ( item ) => item.classList.remove( 'open' ) );
		} else {
			burgerBtn.classList.add( 'active' );
			overlay.classList.add( 'active' );
			document.body.classList.add( 'menu-open' );
		}
	}

	burgerBtn.addEventListener( 'click', () => toggleMenu() );

	// Close menu when clicking on the overlay background (if it exists)
	const overlayBg = overlay.querySelector( '.header__overlay-bg' );
	if ( overlayBg ) {
		overlayBg.addEventListener( 'click', () => toggleMenu( true ) );
	}

	// Use event delegation for all clicks inside the overlay
	overlay.addEventListener( 'click', ( e ) => {
		const targetLink = e.target.closest( 'a' );
		if ( ! targetLink ) {
			return;
		}

		const menuItem = targetLink.closest( '.menu-item' );
		if ( ! menuItem ) {
			return;
		}

		const isParent = menuItem.classList.contains( 'has-children' );
		const isMobile = window.innerWidth < 1200;

		if ( isMobile && isParent ) {
			e.preventDefault();
			e.stopPropagation();

			const isOpen = menuItem.classList.contains( 'open' );

			// Close other open submenus at the same level (Accordion)
			const siblings = menuItem.parentElement.querySelectorAll( ':scope > .has-children' );
			siblings.forEach( ( sibling ) => {
				if ( sibling !== menuItem ) {
					sibling.classList.remove( 'open' );
				}
			} );

			menuItem.classList.toggle( 'open' );
			console.log( `📱 Mobile menu: ${menuItem.classList.contains( 'open' ) ? 'Opened' : 'Closed'} sub-menu` );
		} else if ( ! isParent ) {
			// regular link - close menu
			toggleMenu( true );
		}
	} );
}

function setupGsap404() {
	gsap.set( 'svg', { visibility: 'visible' } );

	gsap.to( '#spaceman', {
		y: 5,
		rotation: 2,
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
		duration: 1,
	} );

	gsap.to( '#starsBig line', {
		rotation: 'random(-30,30)',
		transformOrigin: '50% 50%',
		yoyo: true,
		repeat: -1,
		ease: 'sine.inOut',
	} );

	gsap.fromTo(
		'#starsSmall g',
		{ scale: 0 },
		{
			scale: 1,
			transformOrigin: '50% 50%',
			yoyo: true,
			repeat: -1,
			stagger: 0.1,
		}
	);

	gsap.to( '#circlesSmall circle', {
		y: -4,
		yoyo: true,
		duration: 1,
		ease: 'sine.inOut',
		repeat: -1,
	} );

	gsap.to( '#circlesBig circle', {
		y: -2,
		yoyo: true,
		duration: 1,
		ease: 'sine.inOut',
		repeat: -1,
	} );

	gsap.set( '#glassShine', { x: -68 } );
	gsap.to( '#glassShine', {
		x: 80,
		duration: 2,
		rotation: -30,
		ease: 'expo.inOut',
		transformOrigin: '50% 50%',
		repeat: -1,
		repeatDelay: 8,
		delay: 2,
	} );
}
