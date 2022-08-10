function initValik() {
    "use strict";
    //   loader ------------------
    firstLoad();
    function firstLoad() {
        var counter = 0;
        var count = 0;
        var i = setInterval(function () {
            $(".loader_count").html(count);
            counter++;
            count++;
            if (counter == 101) {
                clearInterval(i);
            }
        }, 14);
        TweenMax.to($(".loading-text-container"), 1.0, {
            force3D: true,
            scale: "0.9",
            opacity: 0,

            ease: Expo.easeInOut,
            delay: 1.3,
            onComplete: function () {
                $(".main-loader-wrap").fadeOut(800);
            }
        });
    }
    var cholder = $('.content-holder'),
        chbg = $(".content-bg"),
        pbw = $(".progress-bar-wrap"),
        mh = $(".main-header"),
        sbw = $(".sidebar-wrap");
    if (cholder.hasClass("hide-dec")) {
        chbg.addClass("hide_cb");
        pbw.addClass("hide_pw");
        mh.removeClass("top-header");
        sbw.removeClass("top-sb");
    } else {
        chbg.removeClass("hide_cb");
        pbw.removeClass("hide_pw");
        mh.addClass("top-header");
        sbw.addClass("top-sb");
    }
    if (cholder.hasClass("vis-pb")) {
        pbw.addClass("show_pw");
    } else {
        pbw.removeClass("show_pw");
    }
    //   Background image ------------------
    var a = $(".bg");
    a.each(function (a) {
        if ($(this).attr("data-bg")) $(this).css("background-image", "url(" + $(this).data("bg") + ")");
    });
    //  scrollToFixed------------------
    $(".fix-column_init ").scrollToFixed({
        minWidth: 1068,
        zIndex: 112,
        marginTop: 160,
        removeOffsets: true,
        limit: function () {
            var a = $(".limit-box").offset().top - $(".fix-column_init").outerHeight(true);
            return a;
        }
    });
    //   Isotope------------------
    function n() {
        if ($(".gallery-items").length) {
            var a = $(".gallery-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three",
                singleMode: true,
                transformsEnabled: true,
                transitionDuration: "900ms"
            });
            a.imagesLoaded(function () {
                a.isotope("layout");
            });
            $(".gallery-filters").on("click  ", "a.gallery-filter", function (b) {
                b.preventDefault();
                var c = $(this).attr("data-filter"),
                    d = $(this).text();
                a.isotope({
                    filter: c
                });
                $(".gallery-filters a").removeClass("gallery-filter-active");
                $(this).addClass("gallery-filter-active");


            });
        }
        $(".gallery-items").isotope("on", "layoutComplete", function (a, b) {
            var b = a.length;
            $(".num-album").html(b);
        });
        var b = $(".gallery-item").length;
        $(".all-album , .num-album").html(b);

        $(".load-more").on("click", function (e) {
            e.preventDefault();
            var $this = $(this);
            setTimeout(function () {
                $this.addClass("compload");
                $(".portfolio-msg").addClass("vismsg");
            }, 700);
            a.infinitescroll({
                navSelector: "#infiniti_nav",
                nextSelector: "#infiniti_nav a",
                itemSelector: ".gallery-item, .gallery-item-second, .gallery-item-three"
            }, function (b) {
                a.isotope("appended", $(b));
                a.imagesLoaded(function () {
                    a.isotope("layout");
                });
                var b = $(".gallery-item").length;
                $(".all-album").html(b);

                $("a").on({
                    mouseenter: function () {
                        $(".element-item").addClass("elem_hover");
                    },
                    mouseleave: function () {
                        $(".element-item").removeClass("elem_hover");
                    }
                });
            });
        });
    }
    n();
    $(window).on("load", function () {
        n();
    });
    // isotope------------------
    function postGrid() {
        if ($(".post-items").length) {
            var $grid2 = $(".post-items").isotope({
                singleMode: true,
                columnWidth: ".grid-sizer, .grid-sizer-second, .grid-sizer-three",
                itemSelector: ".post-item",
            });
            $grid2.imagesLoaded(function () {
                $grid2.isotope("layout");
            });
        }
    }
    postGrid();
    //   Blog filter ------------------
    $(".blog-btn").on("click", function () {
        $(this).parent(".blog-btn-filter").find(".blog-filter-wrap").slideToggle(500);
        return false;
    });
    $(".blog-filter-wrap_item").on({
        mouseenter: function () {
            var textAnim2 = $(this).data("bfgt");
            $(".blog-filter-wrap_title").text(textAnim2);
        },
        mouseleave: function () {
            $(".blog-filter-wrap_title").text("");
        }
    });
    function csselem() {
        $(".fw-carousel .swiper-container").css({
            height: $(".fw-carousel").outerHeight(true)
        });
        $(".fs-slider-item").css({
            height: $(".fs-slider").outerHeight(true)
        });

        $(".ms-item_fs").css({
            height: $(".slideshow-container_wrap").outerHeight(true)
        });
    }
    $(window).on("resize", function () {
        csselem();
    });
    csselem();
    //   sliders ------------------
    function setUpCarouselSlider() {
        $('.fw-carousel .swiper-wrapper').addClass('no-horizontal-slider');
        if ($(".fw-carousel").length > 0) {
            if ($(window).width() >= 768 && j2 == undefined) {
                var totalSlides2 = $(".fw-carousel .swiper-slide:not(.swiper-slide-duplicate) img").length;
                var j2 = new Swiper(".fw-carousel .swiper-container", {
                    preloadImages: false,
                    loop: false,
                    freeMode: false,
                    slidesPerView: "auto",
                    spaceBetween: 10,
                    grabCursor: true,
                    mousewheel: false,
                    speed: 1400,
                    scrollbar: {
                        el: '.hs_init',
                        draggable: true,
                    },
                    pagination: {
                        el: '.hs_counter .current',
                        type: 'fraction',
                        renderFraction: function (currentClass) {
                            return '<span class="' + currentClass + '"></span>' + '<span class="csep">of</span>' + '<span class="j2total">' + totalSlides2 + '</span>';
                        }
                    },
                    centeredSlides: false,
                    effect: "slide",
                    navigation: {
                        nextEl: '.fw-carousel-button-next',
                        prevEl: '.fw-carousel-button-prev',
                    }

                });
            }
            if ($(window).width() < 768 && j2 !== undefined) {
                j2.destroy();
                j2 = undefined;
                $('.fw-carousel .swiper-wrapper').removeAttr('style').addClass('no-horizontal-slider');
                $('.swiper-slide').removeAttr('style');
            }
        }
        $(".fw-carousel.thumb-contr .swiper-slide:not(.swiper-slide-duplicate) img").each(function () {
            var ccasdc = $(this).attr("src");
            $("<div class='thumb-img'><img src='" + ccasdc + "'></div>").appendTo(".thumbnail-wrap");
        });
        $(".thumb-img").on('click', function () {
            j2.slideTo($(this).index(), 500);
            hideThumbnails();
        });
    }
    setUpCarouselSlider();
    var thumbcont = $(".thumbnail-container"),
        thumbItrm = $(".thumb-img"),
        stbtn = $(".show_thumbnails");
    function showThumbnails() {
        TweenMax.to(thumbcont, 1.0, {
            force3D: true,
            bottom: 0,
            ease: Expo.easeInOut,
            onComplete: function () {
                thumbItrm.addClass("visthumbnails");
                thumbcont.addClass("visthumbnails");
            }
        });
        stbtn.removeClass("unvisthum");
        $(".fw_cb").addClass("un_visbtn");
    }
    function hideThumbnails() {
        thumbItrm.removeClass("visthumbnails");
        TweenMax.to(thumbcont, 1.0, {
            force3D: true,
            delay: 0.2,
            bottom: "100%",
            ease: Expo.easeInOut,
            onComplete: function () {
                thumbcont.removeClass("visthumbnails");
                $(".fw_cb").removeClass("un_visbtn");
            }
        });
        stbtn.addClass("unvisthum");
    }
    stbtn.on("click", function () {
        if ($(this).hasClass("unvisthum")) showThumbnails();
        else hideThumbnails();
    });
    if ($(".single-slider").length > 0) {
        var j3 = new Swiper(".single-slider .swiper-container", {
            preloadImages: false,
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            autoHeight: true,
            grabCursor: false,
            mousewheel: false,
            pagination: {
                el: '.ss-slider-pagination',
                clickable: true,

            },
            navigation: {
                nextEl: '.fw-slider-button-next',
                prevEl: '.fw-slider-button-prev',
            },
        });
        var totalSlides = $(".single-slider .swiper-slide:not(.swiper-slide-duplicate) img").length;
        $('.total').html('0' + totalSlides);
        j3.on('slideChange', function () {
            var csli = j3.realIndex + 1,
                curnum = $('.current'),
                curnumanm = $('.hs_counter .current');
            TweenMax.to(curnumanm, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(curnumanm, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum.html('0' + csli);
                }
            });
            TweenMax.to(curnumanm, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });
    }
    if ($(".testilider").length > 0) {
        var j2 = new Swiper(".testilider .swiper-container", {
            preloadImages: false,
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            grabCursor: true,
            mousewheel: false,
            centeredSlides: true,
            pagination: {
                el: '.tc-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.ts-button-next',
                prevEl: '.ts-button-prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 2,
                },
                640: {
                    slidesPerView: 1,
                },
            }
        });
    }
    if ($(".hero-carousel").length > 0) {
        var hcarosel = new Swiper(".hero-carousel .swiper-container", {
            preloadImages: false,
            slidesPerView: 2,
            spaceBetween: 10,
            loop: true,
            grabCursor: true,
            mousewheel: true,
            centeredSlides: false,
            parallax: true,
            speed: 1400,
            pagination: {
                el: '.hc-pag',
                clickable: true,
            },
            navigation: {
                nextEl: '.hc_btn_next',
                prevEl: '.hc_btn_prev',
            },
            breakpoints: {
                1064: {
                    slidesPerView: 1,
                },
            }
        });
        hcarosel.on("slideChangeTransitionStart", function () {
            $(".hero-blur-container").addClass("hideblur");
        });
        hcarosel.on("slideChangeTransitionEnd", function () {
            var actslidec = $(".hero-carousel .swiper-slide.swiper-slide-active .hero-carousel_item .bg").attr('data-bg');
            $('.hero-blur-container .bg').css("background-image", "url(" + actslidec + ")");
            $(".hero-blur-container").removeClass("hideblur");
        });
        var actslidec = $(".hero-carousel .swiper-slide.swiper-slide-active .hero-carousel_item .bg").attr('data-bg');
        $('.hero-blur-container .bg').css("background-image", "url(" + actslidec + ")");		
        var totalSlides2 = $(".hero-carousel .swiper-slide:not(.swiper-slide-duplicate)").length;
        $('.total_c').html(totalSlides2);
        hcarosel.on('slideChange', function () {
            var csli2 = hcarosel.realIndex + 1,
                curnum2 = $('.current_c'),
                curnumanm2 = $('.hc_counter .current_c');
            TweenMax.to(curnumanm2, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(curnumanm2, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum2.html(csli2);
                }
            });
            TweenMax.to(curnumanm2, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });
    }
    if ($(".fs-slider").length > 0) {
        var mouseContr2 = $(".fs-slider").data("mousecontrol2");
        var fss = new Swiper(".fs-slider .swiper-container", {
            preloadImages: false,
            loop: true,
            grabCursor: true,
            speed: 2400,
            spaceBetween: 0,
            effect: "slide",
            mousewheel: true,
            parallax: true,
            pagination: {
                el: '.hc-pag',
                clickable: true,

            },
            navigation: {
                nextEl: '.fs-slider-button-next',
                prevEl: '.fs-slider-button-prev',
            },
            autoplay: {
                delay: 3500,
                disableOnInteraction: false
            }
        });
        var autobtn2 = $(".play-pause_slider2");
        function autoEnd2() {
            autobtn2.removeClass("auto_actslider2");
            fss.autoplay.stop();
        }
        function autoStart2() {
            autobtn2.addClass("auto_actslider2");
            fss.autoplay.start();
        }
        autobtn2.on("click", function () {
            if (autobtn2.hasClass("auto_actslider2")) autoEnd2();
            else autoStart2();
            return false;
        });
        var totalSlides3 = $(".fs-slider .swiper-slide:not(.swiper-slide-duplicate)").length;
        $('.total_c').html(totalSlides3);
        fss.on('slideChange', function () {
            var csli3 = fss.realIndex + 1,
                curnum3 = $('.current_c'),
                curnumanm3 = $('.hc_counter .current_c');
            TweenMax.to(curnumanm3, 0.2, {
                force3D: true,
                y: -10,
                opacity: 0,
                ease: Power2.easeOut,
                onComplete: function () {
                    TweenMax.to(curnumanm3, 0.1, {
                        force3D: true,
                        y: 10
                    });
                    curnum3.html(csli3);
                }
            });
            TweenMax.to(curnumanm3, 0.2, {
                force3D: true,
                y: 0,
                delay: 0.3,
                opacity: 1,
                ease: Power2.easeOut
            });
        });
    }
    if ($(".slideshow-container_wrap").length > 0) {
        var ms1 = new Swiper(".slideshow-container_wrap .swiper-container", {
            preloadImages: false,
            loop: true,
            speed: 2400,
            spaceBetween: 0,
            effect: "fade",
            init: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false
            }

        });
        kpsc();
        ms1.on("slideChangeTransitionStart", function () {
            eqwe();
        });
        ms1.on("slideChangeTransitionEnd", function () {
            kpsc();
        });
        function kpsc() {
            $(".slide-progress").css({
                width: "100%",
                transition: "width 4000ms"
            });
        }
        function eqwe() {
            $(".slide-progress").css({
                width: 0,
                transition: "width 0s"
            });
        }
    }
    //   lightGallery------------------
    $(".image-popup , .single-popup-image").lightGallery({
        selector: "this",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        counter: false
    });
    var o = $(".lightgallery"),
        p = o.data("looped");
    o.lightGallery({
        selector: ".lightgallery a.popup-image , .lightgallery  a.popgal",
        cssEasing: "cubic-bezier(0.25, 0, 0.25, 1)",
        download: false,
        loop: p,
        counter: false
    });
    $('#html5-videos').lightGallery({
        selector: 'this',
        counter: false,
        download: false,
        zoom: false
    });
    $(".filter-button").on("click  ", function () {
        $(".hid-filter").slideToggle(500);
    });

    $(".gallery-filters a").on("click", function () {
        if ($(window).width() < 768) {
            $(".hid-filter").delay(1000).slideUp(300);
        }
    });
    $(".mob-filter_btn").on("click  ", function () {
        $(".gfm").slideToggle(500);
    });
    var textTitle = $(".hero-title h2").text();
    $(".dec-title span").text(textTitle);
    $(".content-nav li a ").on({
        mouseenter: function () {
            var textAnim = $(this).find("strong").text();
            $(".dec-title span").text(textAnim);
        },
        mouseleave: function () {
            $(".dec-title span").text(textTitle);
        }
    });
    // Share   ------------------
    $(".share-container").share({
        networks: ['facebook', 'pinterest', 'twitter', 'tumblr']
    });
    //   Video------------------	
    if ($(".video-holder-wrap").length > 0) {
        function videoint() {

            var w = $(".background-vimeo").data("vim"),
                bvc = $(".background-vimeo"),
                bvmc = $(".media-container"),
                bvfc = $(".background-vimeo iframe "),
                vch = $(".video-container");
            bvc.append('<iframe src="//player.vimeo.com/video/' + w + '?background=1"  frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen ></iframe>');
            $(".video-holder").height(bvmc.height());
            if ($(window).width() > 1024) {
                if ($(".video-holder").length > 0)
                    if (bvmc.height() / 9 * 16 > bvmc.width()) {
                        bvfc.height(bvmc.height()).width(bvmc.height() / 9 * 16);
                        bvfc.css({
                            "margin-left": -1 * $("iframe").width() / 2 + "px",
                            top: "-75px",
                            "margin-top": "0px"
                        });
                    } else {
                        bvfc.width($(window).width()).height($(window).width() / 16 * 9);
                        bvfc.css({
                            "margin-left": -1 * $("iframe").width() / 2 + "px",
                            "margin-top": -1 * $("iframe").height() / 2 + "px",
                            top: "50%"
                        });
                    }
            } else if ($(window).width() < 760) {
                $(".video-holder").height(bvmc.height());
                bvfc.height(bvmc.height());
            } else {
                $(".video-holder").height(bvmc.height());
                bvfc.height(bvmc.height());
            }
            vch.css("width", $(window).width() + "px");
            vch.css("height", Number(720 / 1280 * $(window).width()) + "px");
            if (vch.height() < $(window).height()) {
                vch.css("height", $(window).height() + "px");
                vch.css("width", Number(1280 / 720 * $(window).height()) + "px");
            }
        }
        videoint();
    }
    //   scroll to------------------
    $(".custom-scroll-link").on("click", function () {
        var a = 70;
        if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") || location.hostname == this.hostname) {
            var b = $(this.hash);
            b = b.length ? b : $("[name=" + this.hash.slice(1) + "]");
            if (b.length) {
                $("html,body").animate({
                    scrollTop: b.offset().top - a
                }, {
                    queue: false,
                    duration: 1200,
                    easing: "easeInOutExpo"
                });
                return false;
            }
        }
    });
    $(".to-top").on("click", function (a) {
        a.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    $(window).on("scroll", function () {
        var a = $(document).height();
        var b = $(window).height();
        var c = $(window).scrollTop();
        var d = c / (a - b) * 100;
        $(".progress-bar").css({
            width: d + "%"
        });
    });
    //   Contact form------------------
    $("#contactform").submit(function () {
        var a = $(this).attr("action");
        $("#message").slideUp(750, function () {
            $("#message").hide();
            $("#submit").attr("disabled", "disabled");
            $.post(a, {
                name: $("#name").val(),
                email: $("#email").val(),
                comments: $("#comments").val()
            }, function (a) {
                document.getElementById("message").innerHTML = a;
                $("#message").slideDown("slow");
                $("#submit").removeAttr("disabled");
                if (null != a.match("success")) $("#contactform").slideDown("slow");
            });
        });
        return false;
    });
    $("#contactform input, #contactform textarea").keyup(function () {
        $("#message").slideUp(1500);
    });
    //  Map------------------
    if ($("#map-single").length > 0) {
        var latlog = $('#map-single').data('latlog'),
            popupTextit = $('#map-single').data('popuptext'),
            map = L.map('map-single').setView(latlog, 11);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png').addTo(map);
        if ($(window).width() > 1064) {
            var offset = map.getSize().x * 0.15;
            map.panBy(new L.Point(-offset, 0), {
                animate: false
            });
        } else {
            var offset = map.getSize().x * 0;
            map.panBy(new L.Point(-offset, 0), {
                animate: false
            });
        }
        var greenIcon = L.icon({
            iconUrl: 'images/greenGate/marker.png',
            iconSize: [40, 40],
            popupAnchor: [0, -26]
        });
        L.marker(latlog, {
            icon: greenIcon
        }).addTo(map).bindPopup(popupTextit);
    }
    $(".show_contact-form").on("click", function (e) {
        e.preventDefault();
        $(".content-inner").addClass("vis-con-form");
    });
    $(".close-contact_form").on("click", function () {
        $(".content-inner").removeClass("vis-con-form");
        $("#message").slideUp(500);
        $(".custom-form").find("input[type=text], textarea").val("");
    });
//  cursor  ------------------
    $("a , .btn ,   textarea,   input  , .leaflet-control-zoom , .sb-button , .close-contact_form , .hc-single_btn  , .tumbnail-button , .swiper-pagination-bullets , .to-top-btn  , .gc-slider-cont  , .hp_popup , button  , .fw_cb , .promo-video-btn , .hc-controls , .sb-overlay , .play-pause_slider2").on({
        mouseenter: function () {
            $(".element-item").addClass("elem_hover");
        },
        mouseleave: function () {
            $(".element-item").removeClass("elem_hover");
        }
    });
    $(".swiper-slide").on({
        mouseenter: function () {
            $(".element-item").addClass("slider_hover");
        },
        mouseleave: function () {
            $(".element-item").removeClass("slider_hover");
        }
    });
    $(".swiper-slide a.box-media-zoom , .hero-carousel_project-title , .fs-slider_align_title h2 a , .hero-btn ").on({
        mouseenter: function () {
            $(".element-item").removeClass("slider_hover");
        },
        mouseleave: function () {
            $(".element-item").addClass("slider_hover");
        }
    });
    $("#footer-twiit").on({
        mouseenter: function () {
            $(".element").addClass("unvis_elem");
        },
        mouseleave: function () {
            $(".element").removeClass("unvis_elem");
        }
    });
    $(".sb-overlay").on({
        mouseenter: function () {
            $(".element-item").addClass("close-icon");
        },
        mouseleave: function () {
            $(".element-item").removeClass("close-icon");
        }
    });
    $("p , h1 , h2 , h3 , h4 , h5 , .policy-box , .gfc_title , .swiper-counter , .share-title , .dec-title , .inline-facts-holder , .serv-list , .team-item-title , .post-opt , .caption-wrap ul li span").on({
        mouseenter: function () {
            $(".element-item").addClass("elem_text");
        },
        mouseleave: function () {
            $(".element-item").removeClass("elem_text");
        }
    });
}
if ($(".element-item").length > 0) {
    var mouse = {
        x: 0,
        y: 0
    };
    var pos = {
        x: 0,
        y: 0
    };
    var ratio = 0.15;
    var active = false;
    var ball = document.querySelector('.element-item');
    TweenLite.set(ball, {
        xPercent: -50,
        yPercent: -50
    });
    document.addEventListener("mousemove", mouseMove);
    function mouseMove(e) {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        mouse.x = e.pageX;
        mouse.y = e.pageY - scrollTop;
    }
    TweenMax.ticker.addEventListener("tick", updatePosition);
    function updatePosition() {
        if (!active) {
            pos.x += (mouse.x - pos.x) * ratio;
            pos.y += (mouse.y - pos.y) * ratio;
            TweenMax.set(ball, {
                x: pos.x,
                y: pos.y
            });
        }
    }
}
//  menu  ------------------
$(".nav-button-wrap").on("click", function () {
    $(".main-menu").toggleClass("vismobmenu");
});
function mobMenuInit() {
    var ww = $(window).width();
    if (ww < 1064) {
        $(".menusb").remove();
        $(".main-menu").removeClass("nav-holder");
        $(".main-menu nav").clone().addClass("menusb").appendTo(".main-menu");
        $(".menusb").menu();
    } else {
        $(".menusb").remove();
        $(".main-menu").addClass("nav-holder");
    }
}
mobMenuInit();
$("#menu2").menu();
$(".sliding-menu li a.nav").parent("li").addClass("submen-dec");
var $window = $(window);
$window.on("resize", function () {
    mobMenuInit();
});
//   load animation------------------
function contentAnimShow() {
    $('.main-header nav li').addClass("parlink");
    $('.main-header nav li > ul li ,.main-header nav li   ul li > ul li ').removeClass("parlink");
    $('.main-header  nav  a').removeClass('act-link');
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/") + 1);
    $("a.ajax").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
            $(this).addClass("act-link");
    });
    if ($(".main-header nav li > a").hasClass("act-link")) {
        $(".main-header nav li ul li > a.act-link").parents(".main-header nav li.parlink").find("a").addClass("act-link");
    }
    $(".content-holder").addClass("hid-conh");
    $(".pl-spinner").addClass("act-loader");
    hideSb();
    $(".main-menu").removeClass("vismobmenu");
}

function contentAnimHide() {
    setTimeout(function () {
        $(".content-holder").removeClass("hid-conh");
    }, 500);
    setTimeout(function () {
        $("html, body").animate({
            scrollTop: 0
        }, {
            queue: true,
            duration: 10,
        });
        $(".progress-bar").css({
            width: 0 + "%"
        });
    }, 120);
    setTimeout(function () {
        $(".pl-spinner").removeClass("act-loader");
    }, 800);
}
$('a.ajax').on('click', function () {
    $('nav li a').removeClass('act-link');
    $(this).addClass('act-link');
});
//   mailchimp------------------
$("#subscribe").ajaxChimp({
    language: "eng",
    url: "https://gmail.us1.list-manage.com/subscribe/post?u=1fe818378d5c129b210719d80&amp;id=a2792f681b"
});
$.ajaxChimp.translations.eng = {
    submit: "Submitting...",
    0: '<i class="fal fa-check"></i> We will be in touch soon!',
    1: '<i class="fal fa-exclamation-circle"></i> You must enter a valid e-mail address.',
    2: '<i class="fal fa-exclamation-circle"></i> E-mail address is not valid.',
    3: '<i class="fal fa-exclamation-circle"></i> E-mail address is not valid.',
    4: '<i class="fal fa-exclamation-circle"></i> E-mail address is not valid.',
    5: '<i class="fal fa-exclamation-circle"></i> E-mail address is not valid.'
};
// twitter ------------------
if ($("#footer-twiit").length > 0) {
    var config1 = {
        "profile": {
            "screenName": 'katokli3mmm'
        },
        "domId": 'footer-twiit',
        "maxTweets": 2,
        "enableLinks": true,
        "showImages": false
    };
    twitterFetcher.fetch(config1);
}
var sbo = $(".sb-overlay"),
    sb = $(".sidebar-wrap"),
    sbb = $(".sb-button"),
    sbw = $(".sb-widget-wrap");
function showSb() {
    sbo.fadeIn(500);
    sb.addClass("vis-sb");
    sbb.removeClass("c_sb").addClass("r_sbb");
    setTimeout(function () {
        sbw.each(function (ab) {
            var bp3 = $(this);
            setTimeout(function () {
                TweenMax.to(bp3, 0.9, {
                    force3D: true,
                    y: "0",
                    opacity: "1",
                    ease: Power2.easeOut
                });
            }, 110 * ab);
        });
    }, 500);
}
function hideSb() {
    sb.removeClass("vis-sb");
    sbb.addClass("c_sb").removeClass("r_sbb");
    setTimeout(function () {
        TweenMax.to(sbw, 0.9, {
            force3D: true,
            y: "50px",
            opacity: "0",
            ease: Power2.easeOut
        });
    }, 300);
    sbo.fadeOut(500);
}
sbb.on("click", function () {
    if ($(this).hasClass("c_sb")) showSb();
    else hideSb();
});
sbo.on("click", function () {
    hideSb();
});
$('head').append('<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">');
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});
//   Init Ajax------------------
$(function () {
    $.coretemp({
        reloadbox: "#wrapper",
        outDuration: 850,
        inDuration: 1
    });
    readyFunctions();
    $(document).on({
        ksctbCallback: function () {
            readyFunctions();
        }
    });
});
//   Init All Functions------------------
function readyFunctions() {
    initValik();
}