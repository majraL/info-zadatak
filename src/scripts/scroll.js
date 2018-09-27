const scroll = new SmoothScroll('[data-scroll]', {
  speed: 1000,
  easing: 'easeInOutCubic'
});

$(window).on('scroll', () => {
  
  const toTop = $('[data-fixed-el]');

  const showEl = (el) => {
    $(el).addClass('active');
  }

  const hideEl = (el) => {
    $(el).removeClass('active');
  }

  $(window).scrollTop() > 1000 ? showEl(toTop) : hideEl(toTop);

});
