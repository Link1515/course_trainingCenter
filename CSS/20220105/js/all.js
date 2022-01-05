// Model
$('#reg_btn, #login_btn').on('click', function () {
  $('body,#navbar').css({
    overflow: 'auto',
    paddingRight: 0
  });
});

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);
