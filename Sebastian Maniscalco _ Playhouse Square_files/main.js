/**
 * carbonhouse
 *
 * @author		carbonhouse Dev Team
 * @copyright	Copyright (c) carbonhouse
 * @since		Version 0.1
 *
 */

(function() {

	__showtime = {}
	__showtime.frontend = {};

	/**
	 * The ui_modules object is where you define the modules you are using
	 * and the selector you want to bind to those modules. The selector variable
	 * in each component object will allow you to give the component a list of
	 * selectors.
	 * @type {Object}
	 */
	__showtime.frontend.ui_modules = {

		royalslider : {
			'folder_name'	: 'royalslider',
			'selector'		: ['.royalSlider']
		},
		scroller : {
			'folder_name'	: 'scroller',
			'selector'		: ['.scroller_container']
		},
		calendar_new: {
			'folder_name'	: 'calendar',
			'selector'		: ['.tl-calendar']
		},
		responsiveslides:{
			'folder_name'	: 'responsiveslides',
			'selector'		: ['.rslides']
		},
		lightbox_v2: {
			'folder_name'	: 'lightbox',
			'selector'		: ['a[rel="lightbox"]']
		},
		magnificpopup :{
			'folder_name'	: 'magnificpopup',
			'selector'		: ['.open-gallery-link']
		},
		map_v2:{
			'folder_name'	:'map',
			'selector'		: ['.map_wrapper']
		},
		collapse : {
			'folder_name'	: 'collapse',
			'selector'		: ['.faq dl', '.m-content__faq dl']
		},
		carousel: {
			'folder_name'	: 'carousel',
			'selector'		: ['.carousel .list_holder']
		},
		overlay: {
			'folder_name': 'overlay',
			'selector' : ['#overlay_container']
		},
		chirp :{
			'folder_name' : 'chirp',
			'selector' 	  : ['#tweets']
		},
		owl_carousel :{
			'folder_name' : 'owl_carousel',
			'selector' 	  : ['.owl_carousel']
		},
		facebook_wall :{
			'folder_name' : 'facebook_wall',
			'selector' 	  : ['.facebook_feed']
		},
		event_lazyload :{
			'folder_name' 	: 'event_lazyload',
			'selector' 	  	: ['#loadMoreEvents']
		},
		// mobile_nav :{
		// 	'folder_name' 	: 'mobile_nav',
		// 	'selector' 	  	: ['nav']
		// },
		alert :{
			'folder_name' 	: 'alert',
			'selector' 	  	: ['.m-alert']
		},
		navigate:{
		    'folder_name'   :'navigate',
		    'selector'  : ['nav.header_nav']
		},
		sticky: {
			'folder_name'	: 'sticky',
			'selector'		: ['aside .rightBreakout']
		}

	};

	if(SHOWTIME_ENV == 'dev')
	{
		var base = 'src_app';
	}
	else {
		var base = 'app.optimized';
	}

	

	require.config({

		baseURL: 'www/themes/default/s3/js',

		paths: {
			'overrides' : 'spec_additions',
			'base'		: base,
			'app'       : 'app',
			
		},

		shim:{
			'app':{
				'deps':[
					'base'
				]
			},
			
			'base':{
				'deps':[
					'overrides'
				]
			}
		}
	
		},require(['base','app','overrides'], function(Base,App) {
	
	}));

}).call(this);