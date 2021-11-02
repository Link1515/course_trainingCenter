$('aaa').animate({}, function () {
  $('bbb').animate({}, function () {});
});

const waitAnimate = async (item) => {
  return new Promise((resolve, reject) => {
    $(`${item}`).animate();
    resolve('OK');
  });
};
