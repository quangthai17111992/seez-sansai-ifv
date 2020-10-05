$(document).ready(function () {
	const userAgent = navigator.userAgent.toLowerCase();
	const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);
	const isiPad = userAgent.indexOf('ipad') > -1 || userAgent.indexOf('macintosh') > -1 && 'ontouchend' in document;
	if (isTablet || isiPad) {
		document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=1280');
	}

	$("#btn-menu").on('click', function () {
		if ($(this).hasClass("active")) {
			sideBarClose();
		} else {
			sideBarOpen();
		}
		$(this).toggleClass("active");
	})

	$(window).scroll(function () {
		if ($(window).scrollTop() != 0) {
			$('#btn-menu').addClass('fixed');
		} else {
			$('#btn-menu').removeClass('fixed');
		}
	});

	var $status = $('.paging-number');
	var $slickElement = $('.slider');

	$slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$status.text('0' + i + ' | ' + '0' + slick.slideCount);
	});
	$(".slider").slick({
		autoplay: true,
		draggable: true,
		adaptiveHeight: false,
		dots: true,
		mobileFirst: true,
		arrows: false,
	});

	function sideBarClose() {
		$("#gnav-mask").hide().remove();
		$('#gnav').velocity({
			right: -690
		}, {
			duration: 600,
			delay: 0,
			easing: 'easeInOutQuint',
			complete: function () {
				$("#gnav-mask").hide().remove();
				$('#side-bar').removeClass('open');
			}
		});
	};

	function sideBarOpen() {
		$('#side-bar').addClass('open');
		$.Velocity.hook($('#gnav .gnav-list'), 'right', '-100%');
		$.Velocity.hook($('#gnav'), 'opacity', 0);
		$('#gnav').velocity({
			right: 0,
			opacity: 1
		}, {
			duration: 700,
			delay: 0,
			easing: 'easeInOutQuint'
		});
		$('#gnav .gnav-list').velocity({
			right: 0,
			opacity: 1
		}, {
			duration: 900,
			delay: 0,
			easing: 'easeInOutQuint'
		});
		var mask = "<div id='gnav-mask'></div>";
		$(mask).hide().appendTo('body').fadeIn();
	};

	// var App = function () {
	var stickyElm = document.querySelectorAll('.j-sticky');
	Stickyfill.add(stickyElm);
	// }

	// exports.default = App;

})