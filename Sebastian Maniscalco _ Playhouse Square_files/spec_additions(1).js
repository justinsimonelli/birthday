/**
 * This is the place where you will add configurations to the
 * plugin used by component. You can also reference the calling
 * element through callback function where the instance is the
 * DOM element that the plugin function is bound to.
 *
 * ie:
 * 	component_name_spec: {
 * 		'data_option_name[optional _merge]' :{
 * 			'option' : 'value',
 *    		callback: function __callback(instance){
 *    			console.log($instance)
 *    		}
 * 		}
 * 	}
 */


FRONTEND = {
	navigate_spec : {
	    'default_merge' :{
	    	'general': {
        		'breakpoint'        :   1024
    		},
    		'mainNav': {
    			// 'overrideSubHide'   :   {
       //      		'active'    :   true,
       //      		callback    :   function(event){
       //      			var submenu = $('.main_nav').find('.sub');
       //      			submenu.delay(300).fadeOut(300);
       //      		}
       //  		},
    		},
    		'mobileNav': {
				'transition'        :   'fade' //Slide or Fade  
    		}
	    }
	},
	royalslider_spec : {
		'content_merge' : {
			'arrowsNav': true,
		    'loop': true,
		    'keyboardNavEnabled': true,
		    'controlsInside': true,
		    'imageScaleMode': 'none',
		    'arrowsNavAutoHide': true,
		    'autoScaleSlider': false,
		    'autoHeight': true,
		    'imageAlignCenter': false,
		    'controlNavigation': 'none',
		    'thumbsFitInViewport': false,
		    'navigateByClick': true,
		    'startSlideId': 0,
		    'desktopMinWidth': 768,
		    'autoPlay': {
		    	'enabled': true,
		    	'pauseOnHover': true,
		    	'delay': 6000
		    },
		    'transitionType':'move',
		    'globalCaption': true,
		    
		    'video':{
		    	'youTubeCode': "<iframe src='https://www.youtube.com/embed/%id%?rel=0&autoplay=1&showinfo=0&wmode=opaque' frameborder='no'></iframe>"
		    },
			callback : function __callback(instance){
				var slider = $(instance).data('royalSlider');
			}
		},
		'homepage_merge' : {
			
			callback : function __callback(instance){
				var slider = $(instance).data('royalSlider');
			}
		},
		'full-width_merge' : {
			callback : function __callback(instance){
				var slider = $(instance).data('royalSlider');
				slider.ev.on('rsVideoPlay', function() {
				   $('body').addClass('videoPlaying');
				});
				slider.ev.on('rsVideoStop', function() {
				    $('body').removeClass('videoPlaying');
				});
			}
		},
		'homepage-full_merge' : {
			//'controlsInside': true,
			callback : function __callback(instance){
				var slider = $(instance).data('royalSlider');				
				
				
				slideStop = false;
				
				$(document).on('scroll', function(){

					scrollTop = $(document).scrollTop();
					if ($('body.home').length){
						if (typeof slider != "undefined" && typeof slider != false)
						{
							if (!slideStop && (($(instance).outerHeight() + $(instance).offset().top) < scrollTop))
							{
								slideStop = true;
								slider.stopAutoPlay();
							}
							else if(slideStop && (($(instance).outerHeight() + $(instance).offset().top) > scrollTop))
							{
								slideStop = false;
								slider.startAutoPlay();
							}
						}
					}
				});

				var waitForFinalEvent = (function () {
					  var timers = {};
					  return function (callback, ms, uniqueId) {
					    if (!uniqueId) {
					      uniqueId = "Don't call this twice without a uniqueId";
					    }
					    if (timers[uniqueId]) {
					      clearTimeout (timers[uniqueId]);
					    }
					    timers[uniqueId] = setTimeout(callback, ms);
					  };
				})();

				var changeArrows = function(){
					waitForFinalEvent(function(){
						slider.updateSliderSize(true);
						var currentSlide = slider.currSlide.content[0];
					   	
					   	var height = $(currentSlide).outerHeight();
					   
					   	$('.rsArrow').height(height);
					   }, 500, "ChangeArrows");
					
				};

				$(window).resize(function(){
					changeArrows();
				});


				slider.ev.on('rsAfterSlideChange', function(event) {
				 	changeArrows();
				});



				slider.ev.on('rsAfterContentSet', function(e, slideObject) {
					changeArrows();
					$('.rsContent').each(function() {
	    		        var img_src = ($(window).width() < 500) ? $(this).data('mobile') : $(this).data('image');
	    		     
	    		        $(this).find('img').attr('src',img_src);
	    			});
				});
			}
		}
	},

	carousel_spec : {
		"basic_merge" : {
			callback : function __callback(instance){
				$('.carousel-nav .arrow-left').jcarouselControl({
					target: '-=5'
				});
				$('.carousel-nav .arrow-right').jcarouselControl({
					target: '+=6	'
				});
			}
		}
	},
	owl_carousel_spec: {
		"sponsors_footer" : 
		{
			'items' : 3,
			'itemsDesktop': [1200,3],
			'itemsTablet': [1024,2],
			'itemsMobile': [900,1],
			//Autoplay
			'autoPlay' : true,
			'stopOnHover' : true,

			// Navigation
			'navigation' : true,
			'navigationText' : 
			[
				'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 29 55"><defs></defs><path id="Shape_835_copy" data-name="Shape 835 copy" d="M310.859,3297.01l2.149,2.12-24.8,25.38,24.8,25.39-2.149,2.11L284,3324.51Z" transform="translate(-284 -3297)"/></svg>', 
				'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29 55" style="enable-background:new 0 0 29 55;" xml:space="preserve"><path id="Shape_835_copy" d="M29,27.5L2.1,55L0,52.9l24.8-25.4L0,2.1L2.1,0L29,27.5z"/></svg>'

			],
			//Pagination
			'pagination' : false,
			//Mouse Events
			'dragBeforeAnimFinish' : true,
			'mouseDrag' : true,
			'touchDrag' : true,
			callback: function __callback(instance){
				var owl = $(instance);
				owl.on('initialized.owl.carousel', function(event) {
					console.log('initialized');
				});
			}
		},
		"sponsors_banner" : 
		{
			'items' : 1,
			'itemsDesktop': [1200,1],
			'itemsTablet': [1024,1],
			'itemsMobile': [768,1],
			//Autoplay
			'autoPlay' : true,
			'stopOnHover' : true,

			// Navigation
			'navigation' : false,
			'navigationText' : 
			[
				'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 29 55"><defs></defs><path id="Shape_835_copy" data-name="Shape 835 copy" d="M310.859,3297.01l2.149,2.12-24.8,25.38,24.8,25.39-2.149,2.11L284,3324.51Z" transform="translate(-284 -3297)"/></svg>', 
				'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29 55" style="enable-background:new 0 0 29 55;" xml:space="preserve"><path id="Shape_835_copy" d="M29,27.5L2.1,55L0,52.9l24.8-25.4L0,2.1L2.1,0L29,27.5z"/></svg>'
			],
			//Pagination
			'pagination' : false,
			//Mouse Events
			'dragBeforeAnimFinish' : true,
			'mouseDrag' : true,
			'touchDrag' : true,
			callback: function __callback(instance){
				var owl = $(instance);
				owl.on('initialized.owl.carousel', function(event) {
					console.log('initialized');
				});
			}
		},
		"news-homepage" : 
		{
			'items' : 1,
			'itemsDesktop': [1200,1],
			'itemsTablet': [1024,1],
			'itemsMobile': [768,1],
			//Autoplay
			'autoPlay' : true,
			'stopOnHover' : true,

			// Navigation
			'navigation' : true,
			'navigationText' : 
			[
				'<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 29 55"><defs></defs><path id="Shape_835_copy" data-name="Shape 835 copy" d="M310.859,3297.01l2.149,2.12-24.8,25.38,24.8,25.39-2.149,2.11L284,3324.51Z" transform="translate(-284 -3297)"/></svg>', 
				'<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 29 55" style="enable-background:new 0 0 29 55;" xml:space="preserve"><path id="Shape_835_copy" d="M29,27.5L2.1,55L0,52.9l24.8-25.4L0,2.1L2.1,0L29,27.5z"/></svg>'
			],
			//Pagination
			'pagination' : false,
			'slideSpeed' : 1000,
			'paginationSpeed': 1000,
			//Mouse Events
			'dragBeforeAnimFinish' : true,
			'mouseDrag' : true,
			'touchDrag' : true,
			callback: function __callback(instance){
				var owl = $(instance);
				owl.on('initialized.owl.carousel', function(event) {
					console.log('initialized');
				});
			}
		}
	},

	chirp_spec : {
		'tweets_merge': {
			'user'  : '[twitter_handle]'
		}
	},

	facebook_wall_spec :{
		'default_merge':{
			id:'',
			accessToken:'AAAAAEbfPtLIBAPfJZBwPoudKjiSb7aizedmBa6F8aNT4DXkZBoygNHN6kPrSQdWjc4AhkBTZCOy5SfbC76YvEAHeYC5wGW2pCtGUGypivFxe1s3y8If'
		}
	},
	sticky_spec: {
		'basic_merge': {
			//Min. screen width for sticky sidebar to start working at
			minWidth: 			1320,
			//offset from top of window to stick
			stickyOffset: 		0,

			//element to reference for a 'un-stick' event
			container: 			".eventDetailContent", //IF NOT SET FALLBACK IS: .event_list

			//where to stop on spec_options.container
			// "container_bottom" | "container_top" | false
			stickyStopPoint: 	"container_bottom",

			//offset from spec_options.container to unstick
			stickyStopOffset: 	0,

			updateOnClick: 		[".faq_list_item", ".eventDetailShowings", ".eventDetailDescription"],
			OnClickTimeout: 	10,
			OnClickRepeat: 		40,
			callback : function __callback(instance){
			}
		}
	},
	scroller_spec			: {},
	calendar_spec			: {},
	responsiveslides_spec	: {},
	lightbox_spec			: {},
	magnificpopup_spec		: {},
	map_v2_spec 			: {
		'venues_map':
		{
			'a': 'right on',
			'venue' : '1',
			'scrollwheel' :false,
			'direction_box_onload': false,
			'concierge' : false,  
			'dynamic_venue' : true,  
			'branding': '.map_wrapper', 
			'icons_array' : ['/themes/default/s3/images/icons/drop_pin_icon.png'],
			'show_all_venues' : true,  
			'hideControls' : false,  
			'hideZoom' : false,
			'spec_zoom' : 18,  
			'draggable': true,
				
				'styles' :  
						[
				    {
				       "featureType": "administrative.locality",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "saturation": "6"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#0006ff "
				           }
				       ]
				   },
				   {
				       "featureType": "landscape.natural",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#e0efef "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#c0e8e8 "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "all",
				       "stylers": [
				           {
				               "saturation": "59"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#2200ff "
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels.icon",
				       "stylers": [
				           {
				               "visibility": "simplified"
				           },
				           {
				               "weight": "7.45"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "lightness": 100
				           },
				           {
				               "visibility": "simplified"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "transit.line",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "lightness": 700
				           }
				       ]
				   },
				   {
				       "featureType": "water",
				       "elementType": "all",
				       "stylers": [
				           {
				               "color": "#7dcdcd "
				           }
				       ]
				   }
				]
				,  
				'draggable' : true,
				'extras' : '',
				'apiKey': 'AIzaSyCSx_RQ_ZnNS-9165sKumTA3EPDJ3WRpIE'
		},
		'visitors_guide_map':
		{
				'a': 'right on',
				'venue' : '1',
				'scrollwheel' :false,
				'direction_box_onload': false,
				'concierge' : true,  
				'dynamic_venue' : false,  
				'branding': '#branding.map_wrapper', 
				'icons_array' : [APPLICATION_URL+'themes/default/s3/images/icons/drop_pin_icon.png', APPLICATION_URL+'themes/default/s3/images/icons/map_icon_hotels.png', APPLICATION_URL+'themes/default/s3/images/icons/map_icon_restaurant.png', APPLICATION_URL+'themes/default/s3/images/icons/map_icon_parking.png'],  
				'show_all_venues' : false,  
				'hideControls' : false,  
				'hideZoom' : false,  
				'spec_zoom' : 18,  
				'centeronResize' : false,
				
				'styles' :  
						[
				    {
				       "featureType": "administrative.locality",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "saturation": "6"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#0006ff "
				           }
				       ]
				   },
				   {
				       "featureType": "landscape.natural",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#e0efef "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#c0e8e8 "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "all",
				       "stylers": [
				           {
				               "saturation": "59"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#2200ff "
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels.icon",
				       "stylers": [
				           {
				               "visibility": "simplified"
				           },
				           {
				               "weight": "7.45"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "lightness": 100
				           },
				           {
				               "visibility": "simplified"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "transit.line",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "lightness": 700
				           }
				       ]
				   },
				   {
				       "featureType": "water",
				       "elementType": "all",
				       "stylers": [
				           {
				               "color": "#7dcdcd "
				           }
				       ]
				   }
				]
				,  
				'draggable' : true,
				'extras' : '',
				'apiKey': 'AIzaSyCSx_RQ_ZnNS-9165sKumTA3EPDJ3WRpIE'
		},
		'directions_map':
		{
				'a': 'right on',
				'venue' : '1',
				'scrollwheel' :false,
				'direction_box_onload': false,
				'concierge' : true,  
				'dynamic_venue' : false,  
				'branding': '#branding.map_wrapper', 
				'icons_array' : [APPLICATION_URL+'themes/default/s3/images/icons/blank_pin.png', APPLICATION_URL+'themes/default/s3/images/icons/blank_pin.png', APPLICATION_URL+'themes/default/s3/images/icons/blank_pin.png', APPLICATION_URL+'themes/default/s3/images/icons/map_icon_parking.png'],  
				'show_all_venues' : false,  
				'hideControls' : false,  
				'hideZoom' : false,  
				'spec_zoom' : 15,  
				'centeronResize' : false,
				
				'styles' :  
						[
				    {
				       "featureType": "administrative.locality",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "saturation": "6"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#0006ff "
				           }
				       ]
				   },
				   {
				       "featureType": "landscape.natural",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#e0efef "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "geometry.fill",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "color": "#c0e8e8 "
				           }
				       ]
				   },
				   {
				       "featureType": "poi",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "all",
				       "stylers": [
				           {
				               "saturation": "59"
				           },
				           {
				               "visibility": "off"
				           },
				           {
				               "hue": "#2200ff "
				           }
				       ]
				   },
				   {
				       "featureType": "poi.attraction",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "on"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "poi.business",
				       "elementType": "labels.icon",
				       "stylers": [
				           {
				               "visibility": "simplified"
				           },
				           {
				               "weight": "7.45"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "lightness": 100
				           },
				           {
				               "visibility": "simplified"
				           }
				       ]
				   },
				   {
				       "featureType": "road",
				       "elementType": "labels",
				       "stylers": [
				           {
				               "visibility": "off"
				           }
				       ]
				   },
				   {
				       "featureType": "transit.line",
				       "elementType": "geometry",
				       "stylers": [
				           {
				               "visibility": "on"
				           },
				           {
				               "lightness": 700
				           }
				       ]
				   },
				   {
				       "featureType": "water",
				       "elementType": "all",
				       "stylers": [
				           {
				               "color": "#7dcdcd "
				           }
				       ]
				   }
				]
				,  
				'draggable' : true,
				'extras' : '',
				'apiKey': 'AIzaSyCSx_RQ_ZnNS-9165sKumTA3EPDJ3WRpIE'
		}
	},
	collapse_spec			: {
		'faq_merge' :{
			'accordion': false
		}
	},
	event_lazyload_spec 	: {
		'events_merge' :{
	    		'parentClass' : '.grid-container .grid-row',
	    		callback : function __callback(instance){
	    			var lazyload = $(instance.el);
	    			lazyload.on('eventsRendered', function(){
						$('body').trigger('lazyload_event_content_loaded');
	    			});

					
				}
	    	}
	}
}
