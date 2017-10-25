/**
 * carbonhouse
 *
 * @author		carbonhouse Dev Team
 * @copyright	Copyright (c) carbonhouse
 * @since		Version 0.1
 *
 */

define('app',
	['module',
	 'underscore',
	 'backbone'],

	function(
		Module,
		_,
		Backbone){

		var App = Backbone.View.extend( {

			initialize: function initialize(){
				//this.initialize_search();
				this.searchAppHover();

				this.setupResponsiveImages(500);
				this.rearrangeHome(1319);
				this.buildMasonry(1320);

				this.newsCarousel();
				this.parallaxPromoBackground();

				this.calendarFilter();

				this.mapControlShowHideListings();
				
				this.showingsOpenClose();
				this.initOpenCloseEvent();
				this.select_dropdown();
				this.mobileItemClose();
				this.buttonTextWrap();
				this.moveBreadcrumbs();
				this.openSearch();
				this.toggleEventListing(900);
				this.toggleHomeEventListing(1319);
				this.eventGridOverlay(900);

			},
			loadSearchApp: function loadSearchApp(evt) {
			    console.log("Loading search app");

			    if(!$('.searchbar').hasClass('active')){
			        var script   = document.createElement("script");
			        script.type  = "text/javascript";
			        script.src   = ADMIN_S3_URL + 'ember/build/showtime-ember.min.js';
			        document.body.appendChild(script);

			        $(this).closest('.searchbar').addClass('active');
			        require([ADMIN_S3_URL + 'ember/build/showtime-ember.min.js'], function(){
			            submitQuickSearch =  function(){
			            	//console.log('Search Submitted');
			               // $('.showtime-search form').submit();
			            }
			        });
			        $(document).keypress(function(e) {
					    if((e.which == 13) && ($('.showtime-search form input').is(":focus"))) {
					        e.preventDefault();
					    }
					});



			    }
			},
			searchAppHover: function searchAppHover(){
			    self = this;
			    var eventlistener = ($('html').hasClass('touch')) ? 'touchstart' : 'mouseover';
			    if(!$('.searchbar').hasClass('active')){
			        $('.search-trigger').one( 'hover', self.loadSearchApp() );
			    }
			    if(window.location.pathname == '/search') {
			       // self.loadSearchApp();
			    }
			},
			gotoSearch: function gotoSearch(){
			    $('#gotoSearch').click(function(){
			        $('html, body').animate({
			                scrollTop: $("#event-search").offset().top
			        }, 600);
			        $('.ember-text-field').focus();
			    });
			},
			initialize_search : function initialize_search(){
				console.log('initializing search');
			    if(window.location.pathname == '/search') {
			        require([ADMIN_S3_URL + 'ember/build/showtime-ember.min.js'], function(){
			            submitQuickSearch =  function(){
			                $('.showtime-search form').submit();
			            }
			        });
			    }
			},
			setupResponsiveImages: function setupResponsiveImages(breakpoint){



				// change images on resize
			    var slideshowImages = function(){
			    	var winWidth = $(window).width();
		    	    $('.rsContent.img-responsive').each(function() {
		    	        var img_src = (winWidth < 500) ? $(this).data('mobile') : $(this).data('image');
		    	        $(this).find('img').attr('src',img_src);
		    		});

		    		//change all images with img-responsive class
	    		    $('.img-responsive').each(function() {
	    		        var img_src = (winWidth <= 500) ? $(this).data('mobile') : $(this).data('image');
	    		        $(this).attr('src',img_src);
	    		        $(this).find('img').attr('src',img_src);
	    			});
				}
				slideshowImages();
				window.addEventListener("resize", slideshowImages);
			},
			rearrangeHome: function rearrangeHome(breakpoint){
				$('#pages.home .grid-column:first-child').addClass('firstColumn').find('.p-listing').addClass('staysGrid');
				$('#pages.home .grid-column:last-child').addClass('lastColumn').find('.p-listing').addClass('staysGrid');

				var doRearrange = function doRearrange(){
					var lastColumn = $('.lastColumn');
					var firstColumn = $('.firstColumn');

					var winWidth = $(window).width();

					if (breakpoint >= winWidth)
					{
						lastColumn = lastColumn.detach();
						lastColumn.insertAfter(firstColumn);
						lastColumn = null;
						
					}
					else{
						lastColumn = lastColumn.detach();
						lastColumn.insertAfter($('#pages.home .grid-column:last-child'));
						lastColumn = null;
					
					}

				}

				doRearrange();
				$(window).resize(function(){
					
						doRearrange();
				
				});
			},
			buildMasonry: function buildMasonry(breakpoint)
			{
				var doMasonry = function(){

				
					$('#pages.home .m-eventList.m-eventList__grid').css({'opacity': 0});
							$('#pages.home .grid-column').css({
							'position' : 'static',
							'top' : 'auto',
							'left' : 'auto',
							'opacity': 1
							});
							var outerWidth = $('#pages.home .grid-row').width();
							//get smallest of grid-column widths
							var itemWidth = outerWidth;
							$('#pages.home .grid-column').each(function(){
								if(($(this).outerWidth() < itemWidth) && (!$(this).parent().hasClass('current_events')))
									itemWidth = $(this).outerWidth();
							});
							
							var itemsPerRow = Math.round(outerWidth / itemWidth);
							
							var rowHeight = 0;
							var elements = Array();
							var column = 0;
							$('#pages.home .grid-column').each(function(index, value){
								var previousElement = $(value).prev();
								var posTop = 0;
								var posLeft = 0;

								if (column > (itemsPerRow  - 1))
								{
									var aboveElement = elements[column - itemsPerRow];
									
									posTop = (aboveElement.position().top + aboveElement.outerHeight());
									
									if ((((column) % itemsPerRow) !== 0) && (previousElement.position()))
									{
										posLeft = (previousElement.position().left + previousElement.outerWidth());
									}
									else
									{
										posLeft = 0;
									}

									$(value).css({
										'position': 'absolute',
										'top': posTop + 20 + 'px',
										'left': posLeft + 'px',
									});
								}
								//Check if it's bigger than the smallest
								if($(this).outerWidth() > itemWidth)
								{
									//How much bigger
									var factor = Math.round($(this).outerWidth() / itemWidth);
									
									if (factor > 1)
									{
										elements[column] = elements[column + 1] = $(this);
										column += 2;
									}
									else{
										elements[column] = $(this);
										column++;
									}
									
								}
								else{
									elements[column] = $(this);
									column++;
								}

								

								var thisRowHeight = (posTop + 20 + $(value).outerHeight());
								if (thisRowHeight > rowHeight)
									rowHeight = thisRowHeight;
							});

						

							// var lastColumn = $('.grid-column').last();
							// var rowHeight = (lastColumn.position().top + lastColumn.outerHeight());
				
							$('#pages.home .grid-row').height(rowHeight);
							$('#pages.home .m-eventList.m-eventList__grid .list').height(rowHeight);
							$('#pages.home .m-eventList.m-eventList__list .list').height('auto');
							$('#pages.home .m-eventList.m-eventList__list .grid-row').height('auto');
							$('#pages.home .m-eventList').css({'opacity': 1});
				};
				$('body').on('masonry-load', function(){
					
						doMasonry();	
					
				
					});
				// $(document).ready(function(){
				// 	console.log('Performing Masonry on document ready');
				// 	doMasonry();
				// });

				// $(window).bind('load', function(){
				// 	console.log('Performing Masonry on window load.');
				// 	doMasonry();
				// });
				
				var winWidth = $(window).width();
				if (breakpoint <= winWidth){
					
					doMasonry();
				}
			

				$(window).resize(function(){
					
						var winWidth = $(window).width();
						if (breakpoint <= winWidth){
						
							doMasonry();
						}
						else{
							$('#pages.home .grid-column').removeAttr('style');
							$('#pages.home .grid-row').removeAttr('style');
						}
				
				});
				// if ($('.m-eventList').length && $('.grid-row').length)
				// {
					
						

					
				// }
			},
			newsCarousel: function newsCarousel(){
				var maxHeight = 0;
				var setMaxHeight = function(){
					$('.news-carousel .news_item').each(function(){
						if ($(this).outerHeight() > maxHeight)
							maxHeight = $(this).outerHeight();
					});

					$('.news-carousel').css({'max-height': maxHeight + 60});
				};
				
				setMaxHeight();

				$(window).resize(function(){
					setMaxHeight();
				});
			},
			parallaxPromoBackground: function parallaxPromoBackground(){

				var container = $('.parallax_promo');

				var isVisible = function(panel){
					if(!panel.length) return false;
				    var rect, html;
				    html = document.documentElement;
				    rect = panel.get(0).getBoundingClientRect();

				    return ( !!rect 
				      && rect.bottom >= 0 
				      && rect.right >= 0 
				      && rect.top <= html.clientHeight 
				      && rect.left <= html.clientWidth 
				    );
				};

				$(window).on('scroll',function(){
					visible = isVisible(container);
					if(visible)
					{
						var topOffset = container.offset().top;
						var scrollTop = $(window).scrollTop();
						difference = scrollTop - topOffset;

						container.find('.background').css({'background-position-y': (difference / 3)});
					}
					else{
						container.find('.background').removeAttr('style');
					}
				});
			},
			calendarFilter: function calendarFilter(){
				$('.events-by-venue .select-list li a').on('click', function(e){
					e.preventDefault();
					var venueId = $(this).data('venue_id');
					$('.event_item').fadeOut(300, function(){
						if (venueId == 0)
						{
							$('.event_item').show();
						}
						else
						{
							$('.event_item[data-venue='+venueId+']').show();
						}
					});
					
				});
			},
			mapControlShowHideListings: function mapControlShowHideListings(){
				$('body').on('click', '.map_control .hotels', function(){
					var isActive = $(this).hasClass('active');
					if(isActive)
					{
						$('#concierge_1').show();
					}
					else
					{
						$('#concierge_1').fadeOut(300);
					}
				});

				$('body').on('click', '.map_control .restaurants', function(){
					var isActive = $(this).hasClass('active');
					if(isActive)
					{
						$('#concierge_2').show();
					}
					else
					{
						$('#concierge_2').fadeOut(300);
					}
				});
				$('body').on('click', '.map_control .parking', function(){
					var isActive = $(this).hasClass('active');
					if(isActive)
					{
						$('#concierge_3').show();
					}
					else
					{
						$('#concierge_3').fadeOut(300);
					}
				});
			},
			showingsOpenClose: function showingsOpenClose(){
				var originalMaxHeight = $('.eventDetailShowings:not(is-active) .showings_left.hide_extra').css('maxHeight');
				var fullHeight = $('.showings_left.hide_extra').prop('scrollHeight') + 20;
				var maxHeight = originalMaxHeight;

				var setBodyHeight = function(originalMaxHeight, fullHeight){
					if(!$('.eventDetailShowings').hasClass('is-active')){
						maxHeight = originalMaxHeight;
					}
					else{
						maxHeight = fullHeight;
					};
					$('.showings_left').css({'maxHeight': maxHeight});
				}

				var activateButtons = function(originalMaxHeight){
					var fullHeight = $('.showings_left.hide_extra').prop('scrollHeight');
					var maxHeight = originalMaxHeight;

					if (fullHeight <= parseInt(maxHeight, 10))
						$('show_hide_showings').hide();
					else
						$('show_hide_showings').show();

					setBodyHeight(originalMaxHeight, fullHeight);
				}

				activateButtons(originalMaxHeight);

				$(window).resize(function(){
					activateButtons(originalMaxHeight);
				});

				$('.show_hide_showings').on('click', function(e){
					
					$(e.currentTarget).parent().toggleClass('is-active');
					activateButtons(originalMaxHeight);
				});
			},
			initOpenCloseEvent: function initOpenCloseEvent(){
				var originalMaxHeight = $('.eventDetailDescription:not(.eventDetailDescription-isActive) .descriptionBody').css('maxHeight');
				var fullHeight = $('.descriptionBody').prop('scrollHeight') + 20;
				var maxHeight = originalMaxHeight;
				
				var setBodyHeight = function(originalMaxHeight, fullHeight){
					if (!$('.eventDetailDescription').hasClass('eventDetailDescription-isActive'))
					{
						maxHeight = originalMaxHeight;
					}
					else
					{
						maxHeight = fullHeight;
					};
					$('.descriptionBody').css({'maxHeight': maxHeight});
				}

				var activateButtons = function(originalMaxHeight){
					var fullHeight = $('.descriptionBody').prop('scrollHeight');
					var maxHeight = originalMaxHeight;

					if (fullHeight <= parseInt(maxHeight, 10))
					{
						$('.eventDetailDescription__hide').hide();
					}
					else
					{
						$('.eventDetailDescription__hide').show();
					}

					setBodyHeight(originalMaxHeight, fullHeight);
					
					//Hide Button if the description is less than the original Max Height
					if($('.descriptionBody').prop('scrollHeight') < parseInt(originalMaxHeight) + 20 )
					{
						$('.eventDetailDescription__hide').fadeOut();
						$('.descriptionBody').removeAttr('style');
					}
				}

				activateButtons(originalMaxHeight);
				
				$(window).resize(function(){
					activateButtons(originalMaxHeight);
				});

				//OnClickEvent
				$('.eventDetailDescription__hide').on('click', function(e)
				{
					
					$(e.currentTarget).parent().toggleClass('eventDetailDescription-isActive');
					activateButtons(originalMaxHeight);
				});
			},
			setupGridOverlay: function setupGridOverlay()
			{

			

				$('.grid-column').each(function(){
					
					var eventElement = $(this).children('.m-eventItem.p-listing');
					//if ($(window).width() >= breakpoint){
					var thumbHeight = eventElement.height();
					var infoHeight = eventElement.find('.grid-info').outerHeight();
					
					var heightDiff = thumbHeight - infoHeight;

					

					var buttonsWrapper = eventElement.children('.p-listing__thumb').children('.m-eventItem__buttons');
					var buttonGroup = buttonsWrapper.children('.btn-group');

					//buttonsWrapper.height(heightDiff);

					var buttonsWrapperWidth = buttonsWrapper.width();

					var buttonGroupWidth = buttonGroup.width();
					var buttonGroupHeight = buttonGroup.height();


					if(heightDiff <= 0)
					{
						heightDiff = eventElement.children('p-listing__thumb').height();
					}

					buttonGroup.css({
						'left': ((buttonsWrapperWidth - buttonGroupWidth) / 2),
						'height': heightDiff
					});
					$(this).css({'opacity': 1});
				});

				
			},
			eventGridOverlay: function eventGridOverlay(breakpoint){
				var thisApp = this;
				if ($(window).width() >= breakpoint){
					thisApp.setupGridOverlay();
				}

				$(window).on('resize', function(){
				if ($(window).width() >= breakpoint){
						thisApp.setupGridOverlay();
					}
				});

				$('body').bind('lazyload_event_content_loaded', function(){
					if ($(window).width() >= breakpoint){
						
						thisApp.setupGridOverlay();
					}
				});

				

				thisApp.setupGridOverlay();	
				
			},
			select_dropdown: function select_dropdown(){

				$(document).mouseup(function (e)
				{
				    var container = $('.select-dropdown .select-button.is-open');

				    if (!container.is(e.target) 
				        && container.has(e.target).length === 0) 
				    {
				       container.parent('.select-dropdown').toggleClass('is-open');
						container.siblings('ul.select-list').slideUp();
						container.toggleClass('is-open');
				    }
				});

				$('body').on('click', '.select-dropdown .select-button', function(){
					if ($(this).hasClass('is-open'))
					{
						$(this).parent('.select-dropdown').toggleClass('is-open');
						$(this).siblings('ul.select-list').slideUp();
						$(this).toggleClass('is-open');
					}
					else{
						var allDropdowns = $('.select-dropdown .select-button');
						allDropdowns.removeClass('is-open').siblings('ul.select-list').hide();
						allDropdowns.parent('.select-dropdown').removeClass('is-open');
						$(this).parent('.select-dropdown').toggleClass('is-open');
						$(this).siblings('ul.select-list').slideDown();
						$(this).toggleClass('is-open');
					}
				});

			},
			toggleHomeEventListing: function toggleHomeEventListing(breakpoint)
			{
				var thisApp = this;
				//Start with Grid View
				$("#pages.home .m-eventList").addClass('m-eventList__grid').removeClass('m-eventList__list');
				

				

				var checkMobile = function(){
					var winWidth = $(window).width();
					var mobileMediaQuery = breakpoint;
					
					if (winWidth <= mobileMediaQuery)
					{
						$("#pages.home .grid-row").addClass('is-list-view').removeClass('is-grid-view');
						$("#pages.home .m-eventList").addClass('m-eventList__list').removeClass('m-eventList__grid');
					}
					else
					{
						$("#pages.home .m-eventList").addClass('m-eventList__grid').removeClass('m-eventList__list');
						$("#pages.home .grid-row").addClass('is-grid-view').removeClass('is-list-view');
						
						//Make sure listings only take list styles
						$('#pages.home .m-eventList.m-eventList__listing').addClass('m-eventList__list').removeClass('m-eventList__grid');
					}
					$('#pages.home .m-eventList').css({'opacity': '1'});
				};
				checkMobile();

				$(window).resize(function(){
					checkMobile();
				});
			},
			toggleEventListing: function toggleEventListing(breakpoint)
			{
				var thisApp = this;
				//Start with Grid View
				$(".m-eventList").addClass('m-eventList__grid').removeClass('m-eventList__list');
				

				$('.m-eventList__toggle-item').on('click', function(){
					$('.m-eventList__toggle-item').removeClass('m-eventList__toggle-isActive');
					$(this).addClass('m-eventList__toggle-isActive');
					var type = $(this).attr('data-event-toggle');
					if (type == 'grid')
					{
						$(".m-eventList").addClass('m-eventList__grid').removeClass('m-eventList__list');
						$(".grid-row").addClass('is-grid-view').removeClass('is-list-view');
						
						//Make sure listings only take list styles
						$('.m-eventList.m-eventList__listing').addClass('m-eventList__list').removeClass('m-eventList__grid');
						
					}
					else
					{
						$(".m-eventList").addClass('m-eventList__list').removeClass('m-eventList__grid');
						$(".grid-row").addClass('is-list-view').removeClass('is-grid-view').css({'height': 'auto'});
						$('.list').css({'height': 'auto'});

					}
				});

				var checkMobile = function(){
					var winWidth = $(window).width();
					var mobileMediaQuery = breakpoint;
					
					if (winWidth <= mobileMediaQuery)
					{
						$(".grid-row").addClass('is-list-view').removeClass('is-grid-view');
						$(".m-eventList").addClass('m-eventList__list').removeClass('m-eventList__grid');
					}
					else
					{
						var type = $('.m-eventList__toggle-isActive').attr('data-event-toggle');
						if (type == 'grid' || type == null)
						{
							$(".m-eventList").addClass('m-eventList__grid').removeClass('m-eventList__list');
							$(".grid-row").addClass('is-grid-view').removeClass('is-list-view');
							
							//Make sure listings only take list styles
							$('.m-eventList.m-eventList__listing').addClass('m-eventList__list').removeClass('m-eventList__grid');
							
						}
						else
						{
							$(".m-eventList").addClass('m-eventList__list').removeClass('m-eventList__grid');
							$(".grid-row").addClass('is-list-view').removeClass('is-grid-view').css({'height': 'auto'});
							$('.list').css({'height': 'auto'});
						}

						
					}
					$('.m-eventList').css({'opacity': '1'});
				};
				checkMobile();

				$(window).resize(function(){
					checkMobile();
				});
			},
			mainNavTertiary: function mainNavTertiary(){
				$('.nav_wrapper').on('click', '.main_nav .sub > ul > li.has-sub:not(.active) > a', function(e){
					e.preventDefault();
					
					$(this).parent().addClass('active').find('.subsub').slideDown(300);

				});
				$('.nav_wrapper').on('click', '.main_nav .sub > ul > li.has-sub:not(.active) > .close-button', function(e){
					e.preventDefault();
					
					$(this).parent().addClass('active').find('.subsub').slideDown(300);

				});
				$('.nav_wrapper').on('click', '.main_nav .sub > ul > li.has-sub.active > .close-button', function(e){
					e.stopImmediatePropagation();
					$(this).parent().removeClass('active').find('.subsub').slideUp(300);
					
				});
			},
			openSearch: function openSearch(){
				$('.search-trigger').on('click', function(){
					$('#search').fadeIn().find('input[type="text"]').focus();
					$('body').css({'overflow': 'hidden','height': '100%'});
				});
				$('.search-close').on('click', function(){
					$('#search').fadeOut();
					$('body').removeAttr('style');
				});
			},
			moveBreadcrumbs: function moveBreadcrumbs(){
				if ($('.breadcrumb').next('.full-slideshow').length != 0){
					var slideshow = $('.breadcrumb').next('.full-slideshow');
					$('.breadcrumb').detach().insertAfter(slideshow);
				}
			},
			buttonTextWrap: function buttonTextWrap(){
				$('.btn').each(function(){
				     var me = $(this);
				  
				     me.html(me.html().replace(/^(\w+)/, '<span class="first-word">$1</span>'));
				});
			},
			mobileItemClose: function mobileItemClose(){
				
				$('.nav_wrapper').on('click', '.mobile_nav .close-button', function(e){
					e.stopImmediatePropagation();
					$('.mobile_nav .navigate__top-level-items.is-opened .sub').slideUp(300, function(){
						$(this).parent().addClass('is-closed').removeClass('is-opened');
					});
					

				});
			},

		} );

		__showtime.frontend.APP = new App();

		return __showtime.frontend.APP;

	}
);