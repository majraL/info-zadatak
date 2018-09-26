var swiper = new Swiper('[data-swiper-container]', {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false,
  },
  speed: 1000,
});