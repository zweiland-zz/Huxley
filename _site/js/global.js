$(function() {

    /* Search */

    $('.search-toggle').on("click", function(e) {
		$('#global-search-overlay').show();
		window.location.hash = '#global-search';
    });

    $('.close-overlay').on("click", function(e) {
		$('#global-search-overlay').hide();
		window.location.hash = '#global-header';
    });

    $(document).keyup(function(e) {
	  if (e.keyCode == 27) $('#global-search-overlay').hide();   // esc
	});

    

    /* Filters */

    $('.filter-button').on("click", function(e) {
        e.preventDefault();
        $(this).toggleClass("open");
        $(this).parents("form.table-filters").find("fieldset.filters").toggleClass("open");
    });

    $('#apply-filter').on("click", function(e) {
        e.preventDefault();
        $(this).parents("fieldset.filters").removeClass("open");
        $(".feedback-block").show();
    });

    $('.reset-filter').on("click", function(e) {
        e.preventDefault();
        $(this).parents("fieldset.filters").removeClass("open");
        $(".feedback-block").hide();
    });



    /* Patron Detail Page */

    $('.edit-patron-detail-button').on("click", function(e) {
        e.preventDefault();
        $(this).text("Close").addClass("close-edit-panel");

        $(this).parents("li.detail-item").find(".edit-detail-panel").show();
        $(this).parents("li.detail-item").find(".view-detail-panel").hide();
    });

    $('li.detail-item').find(".close-edit-panel").on("click", function(e) {
        e.preventDefault();

        $(this).parents("li.detail-item").find(".edit-patron-detail-button").text("Edit");
        $(this).parents("li.detail-item").find(".edit-detail-panel").hide();
        $(this).parents("li.detail-item").find(".view-detail-panel").show();
    });


    /* Log in */

    $("#log-in").on("click", function(e){
        $(this).addClass("logging-in");
        $(this).text("Logging in...");
    });
    



    /* 4. Tab Interface
    -----------------------------------------------------------------------------------------
    */

    // The class for the container div

    var $container = '.tab-interface';

    // The setup

    $($container +' ul').attr('role','tablist');
    $($container +' [role="tablist"] li').attr('role','presentation');
    $('[role="tablist"] a').attr({
        'role' : 'tab',
        'tabindex' : '-1'
    });

    // Make each aria-controls correspond id of targeted section (re href)

    $('[role="tablist"] a').each(function() {
      $(this).attr(
        'aria-controls', $(this).attr('href').substring(1)
      );
    });

    // Make the first tab selected by default and allow it focus

    $('[role="tablist"] li:first-child a').attr({
        'aria-selected' : 'true',
        'tabindex' : '0'
    });

    // Make each section focusable and give it the tabpanel role

    $($container +' section').attr({
      'role' : 'tabpanel'
    });

    // Make first child of each panel focusable programmatically

    $($container +' section > *:first-child').attr({
        'tabindex' : '0'
    });

    // Make all but the first section hidden (ARIA state and display CSS)

    $('[role="tabpanel"]:not(:first-of-type)').attr({
      'aria-hidden' : 'true'
    });


    // Change focus between tabs with arrow keys

    $('[role="tab"]').on('keydown', function(e) {

      // define current, previous and next (possible) tabs

      var $original = $(this);
      var $prev = $(this).parents('li').prev().children('[role="tab"]');
      var $next = $(this).parents('li').next().children('[role="tab"]');
      var $target;

      // find the direction (prev or next)

      switch (e.keyCode) {
        case 37:
          $target = $prev;
          break;
        case 39:
          $target = $next;
          break;
        default:
          $target = false
          break;
      }

      if ($target.length) {
          $original.attr({
            'tabindex' : '-1',
            'aria-selected' : null
          });
          $target.attr({
            'tabindex' : '0',
            'aria-selected' : true
          }).focus();
      }

      // Hide panels

      $($container +' [role="tabpanel"]')
        .attr('aria-hidden', 'true');

      // Show panel which corresponds to target

      $('#' + $(document.activeElement).attr('href').substring(1))
        .attr('aria-hidden', null);

    });

    // Handle click on tab to show + focus tabpanel

    $('[role="tab"]').on('click', function(e) {

      e.preventDefault();

      // remove focusability [sic] and aria-selected

      $('[role="tab"]').attr({
        'tabindex': '-1',
        'aria-selected' : null
        });

      // replace above on clicked tab

      $(this).attr({
        'aria-selected' : true,
        'tabindex' : '0'
      });

      // Hide panels

      $($container +' [role="tabpanel"]').attr('aria-hidden', 'true');

      // show corresponding panel

      $('#' + $(this).attr('href').substring(1))
        .attr('aria-hidden', null);

    }); 

});

$(function() {

/* 6. Warning dialog
-----------------------------------------------------------------------------------------
*/


$('[data-dialog-call]').on('click', function (e) {
  e.preventDefault();

  // define the dialog element
  var dialog = $('body > dialog');

  // record the trigger element
  var trigger = $(this).attr('id') ? $(this).attr('id') : 'trigger';

  // open dialog and add roles
  dialog
    .attr({
      'tabindex' : '0',
      'open' : 'true',
      'role' : 'alertdialog',
      'aria-labelledby' : 'd-message'
    });

  // retrieve custom close button wording, if any
  var closeText =  $(this).attr('data-dialog-response') ? $(this).attr('data-dialog-response') : 'close';

  // build the dialog markup
  dialog.wrapInner('<div><div role="document" tabindex="0"><button role="button">'+ closeText +'</button></div></div>');

  // Insert the message held in the trigger's [data-dialog-msg] attribute
  $('<p id="d-message">' + $(this).attr('data-dialog-call') + '</p>')
  .insertBefore(dialog.find('button:first-of-type'));

  // hide and make unfocusable all other elements
  $('body > *:not(dialog)').addClass('mod-hidden');

  // make last button in dialog the close button
  var close = dialog.find('button:last-of-type');
  $(close).focus();

  var content = dialog.find('[role="document"]');

  var closeDialog = function() {

    dialog.find('p').remove();

    $('body > *:not(dialog)').removeClass('mod-hidden');

    //set focus back to element that triggered dialog

    $('#' + trigger).focus();

    // If we manufactured the ID, remove it
    if ($('#' + trigger).attr('id') === 'trigger') {
      $('#' + trigger).attr('id', null);
    }

    // remove dialog attributes and empty dialog
    dialog.removeAttr('open role aria-describedby tabindex');

    dialog.empty();

    $(dialog).off('keypress.escape');

  }

  // run closeDialog() on click of close button
  $(close).on('click', function() {
    closeDialog();
  });

  // also run closeDialog() on ESC

  $(dialog).on('keypress.escape', function(e) {
    if (e.keyCode == 27) {
      closeDialog();
    }
  });

  // Refocus dialog if user tries to leave it

  $(close).on('keydown', function(e) {
    if ((e.keyCode || e.which) === 9) {
        content.focus();
        e.preventDefault();
    }
  });

});
});