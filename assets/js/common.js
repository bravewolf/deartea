

$(function(){

	BrowserDetect.init();
	$('body').addClass(BrowserDetect.browser+' v'+ BrowserDetect.version);
	if($('body').hasClass('ie')) {
		if ( ! Number.isNaN ){
			Number.isNaN = function isNaN ( value ){  return value !== value;  };
		}
	}

	//header mini point
	var baseLine = parseInt($('#header nav').position().top + $('#header nav').outerHeight());
	mobileCheck();

	if($('#wrap').hasClass('sub')) {
		headerMin(baseLine);
		headerChange();
	}

	$(window).resize(function () {
		mobileCheck();
		if($('#wrap').hasClass('sub')) {
			headerMin(baseLine);
			headerChange();
		}
	});
	$(window).on("scroll touchmove", function() {
		if($('#wrap').hasClass('sub')) {
			headerMin(baseLine);
			headerChange();
		}
	});

	// scroll
	var lastScroll = 0;
	$(window).on('scroll',function() {
		var scroll = $(window).scrollTop();

		// scroll up check
		if(lastScroll - scroll > 0) {
			$("body").addClass("scroll-up");
		} else {
			$("body").removeClass("scroll-up");
		}
		lastScroll = scroll;
	});

	// mobile menu
	$('.menu-open').on('click',function() {
		$('body').addClass('opened-full-nav');

		$('#header').addClass('fadeInDown');
	});
	$('.menu-close').on('click',function() {
		$('body').removeClass('opened-full-nav');

		$('#header').removeClass('fadeInDown');
	});
	/*
	AOS.init({
		easing: 'ease-in-out-sine'
	});
	*/
	wow = new WOW({
			boxClass:     'wow',      // default
			animateClass: 'animated', // default
			offset:       0,          // default
			mobile:       true,       // default
			live:         true        // default
	});
	wow.init();

	//modal

	// tabs Link
	$('.tabs > li a').each(function(){
		$(this).on('click',function (e) {
			e.preventDefault();
			$(this).parent('li').addClass('active').siblings('li').removeClass('active')
		});
	});

	//form label
	$('.input-text, .textarea').on("focusout", function() {
		var text_val = $(this).val();
		if (text_val === "") {
			$(this).removeClass('has-value');
		} else {
			$(this).addClass('has-value');
		}
	});
	$('.select').each(function(){
		var select_val = $(this).children(':selected').text();
		if (select_val === "") {
			$(this).removeClass('has-value');
		} else {
			$(this).addClass('has-value');
		}
	});
	$('.select').on('change', function(){
		var select_val = $(this).children(':selected').text();
		if (select_val === "") {
			$(this).removeClass('has-value');
		} else {
			$(this).addClass('has-value');
		}
	});
});

//is-mobile
function mobileCheck() {
	var wWidth = $(window).innerWidth();
	if(wWidth > 750) {
		$('body').removeClass('is-mobile');
		//tablet
		if(wWidth > 1025) {
			$('body').removeClass('is-tablet');
		} else {
			$('body').addClass('is-tablet');
		}
	} else {
		$('body').removeClass('is-tablet');
		$('body').addClass('is-mobile');
	}
}

//headerMini
function headerMin(px) {
	var scrollTop = $(window).scrollTop();
	var fixedPoint = $('.section[data-header-fix]').offset().top - px;

	//fixed change
	if (scrollTop > fixedPoint) {
		$('#header').addClass('fixed');
		$('body').addClass('is-fixed-header');
	} else {
		$('#header').removeClass('fixed');
		$('body').removeClass('is-fixed-header');
	}
}

//headerChange
function headerChange() {
	var scrollTop = $(window).scrollTop();

	//section change Nav
	var $window = $(window),
		$section = $('.section[data-header-color]'),
		$header = $('#header'),
		$nav = $('#header nav'),
		$logo = $('#header h1'),
		$btnOpen = $('#header .btn.menu-open');

	var logoPoint = scrollTop + ( $logo.position().top ) + ( $logo.outerHeight() * .8 );
	var btnPoint = scrollTop + ( $nav.position().top ) + ( $btnOpen.outerHeight() * .23);

	$section.each(function () {
		var $this = $(this);
		var myTopPosi = $this.position().top,
			myBtmPosi = $this.position().top + $this.height(),
			myColor = $this.data('header-color'),
			headerMinPoint = $this.data('header-min');

		if (myTopPosi <= logoPoint && myBtmPosi > logoPoint) {
			//navColor
			if (myColor == 'dark') {
				$header.addClass('white');
			} else {
				$header.removeClass('white');
			}
		}

		if (myTopPosi <= btnPoint && myBtmPosi > btnPoint) {
			//btnColor
			if (myColor == 'dark') {
				$btnOpen.addClass('white');
				//console.log(btnPoint);
			} else {
				$btnOpen.removeClass('white');
			}
		}
	});
}

function openModalTea(obj) {
	var cloneTxt = $(obj).children('.hover-area').clone(true);
	var popDetail = $(cloneTxt).wrap('<div class="modal item-detail fadeInDown" data-wow-duration="2s" />').parent();

	$(popDetail).appendTo("#wrap");
	$('.modal.item-detail').append('<button class="btn modal-close"><span class="blind">닫기</span></button>');
	$('body').addClass("opened-modal");

	$('.modal-close').on('click',function() {
		var modal = $(obj).closest('.modal');
		closeModal();
	});
}

function openModalStore(obj) {
	var cloneTxt = $(obj).clone(true);
	var txtContent = $(cloneTxt).html();
	var changTag = '<div class="modal item-detail fadeInDown" data-wow-duration="2s"><div class="store-area">'+txtContent+'</div><button class="btn modal-close"><span class="blind">닫기</span></button></div>';

	$(changTag).insertAfter("#footer");
	$('body').addClass("opened-modal");

	$('.modal-close').on('click',function() {
		var modal = $(obj).closest('.modal');
		closeModal();
	});
}

function closeModal() {
	$('#wrap .modal').remove();
	$('body').removeClass("opened-modal");
}



/**
 * BrowserDetect
 */
var BrowserDetect = {
	init: function () {
		this.browser = this.searchString(this.dataBrowser) || "Other";
		this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
	},
	searchString: function (data) {
		for (var i = 0; i < data.length; i++) {
			var dataString = data[i].string;
			this.versionSearchString = data[i].subString;

			if (dataString.indexOf(data[i].subString) !== -1) {
				return data[i].identity;
			}
		}
	},
	searchVersion: function (dataString) {
		var index = dataString.indexOf(this.versionSearchString);
		if (index === -1) {
			return;
		}

		var rv = dataString.indexOf("rv:");
		if (this.versionSearchString === "Trident" && rv !== -1) {
			return parseFloat(dataString.substring(rv + 3));
		} else {
			return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
		}
	},

	dataBrowser: [
		{string: navigator.userAgent, subString: "Edge", identity: "edge"},
		{string: navigator.userAgent, subString: "MSIE", identity: "ie"},
		{string: navigator.userAgent, subString: "Trident", identity: "ie"},
		{string: navigator.userAgent, subString: "Firefox", identity: "ff"},
		{string: navigator.userAgent, subString: "Opera", identity: "opera"},
		{string: navigator.userAgent, subString: "OPR", identity: "opera"},

		{string: navigator.userAgent, subString: "Chrome", identity: "chrome"},
		{string: navigator.userAgent, subString: "Safari", identity: "safari"}
	]
};
