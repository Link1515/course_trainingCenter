// Model
$('#reg_btn, #login_btn').on('click', function () {
  $('body,#navbar').css({
    overflow: 'auto',
    paddingRight: 0
  });
});

// section03
$('#race a').on('click', function () {
  $('#race a').removeClass('active');
  $(this).addClass('active');
});

// swiper
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  speed: 1000,
  spaceBetween: 15,
  centeredSlides: true,
  autoplay: {
    delay: 10000
  },
  slidesPerView: 'auto',
  effect: 'coverflow',
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true
  },
  breakpoints: {
    576: {
      slidesPerView: 2
    },
    768: {
      slidesPerView: 3
    },
    1200: {
      slidesPerView: 4
    }
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination'
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }

  // And if we need scrollbar
  // scrollbar: {
  //   el: '.swiper-scrollbar'
  // }
});

// gsap
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

$('#navbar .main-link').each(function (index) {
  $(this).on('click', function (e) {
    e.preventDefault();
    if ($(this).attr('href') === '#section04' || $(this).attr('href') === '#section05') {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`
        },
        duration: 1.5,
        ease: 'back.inOut'
      });
    } else {
      gsap.to($(window), {
        scrollTo: {
          y: `#section0${index + 1}`,
          offsetY: 150
        },
        duration: 1.5,
        ease: 'back.inOut'
      });
    }
  });
});
