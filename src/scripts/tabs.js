$(document).ready(function() {

  $('[data-tab-togglers]').each(function(k, tabs) {
    var $tabs = $(tabs);
    var $setTabova = $($tabs.data('tab-togglers'));

    $tabs.find('[data-toggle-tab]').click(function(e) {
      var tabId = $(this).data('toggle-tab');
      $($tabs).find('[data-toggle-tab]').removeClass('active');
      $(this).addClass('active');

      $setTabova.find('[data-tab="' + tabId + '"]').addClass('active');
      $setTabova.find('[data-tab!="' + tabId + '"]').removeClass('active');
    });
  });

});
