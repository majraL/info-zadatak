$(document).ready(() => {

  $('[data-tab-togglers]').each((k, tabs) => {
    const $tabs = $(tabs);
    const $setTabova = $($tabs.data('tab-togglers'));

    $tabs.find('[data-toggle-tab]').click((e) => {
      const tabId = $(this).data('toggle-tab');
      $($tabs).find('[data-toggle-tab]').removeClass('active');
      $(this).addClass('active');

      $setTabova.find('[data-tab="' + tabId + '"]').addClass('active');
      $setTabova.find('[data-tab!="' + tabId + '"]').removeClass('active');
    });
  });

});
