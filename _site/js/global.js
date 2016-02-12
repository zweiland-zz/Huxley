$(document).ready(function() { 

    $("nav").accessibleMegaMenu({
        /* prefix for generated unique id attributes, which are required 
           to indicate aria-owns, aria-controls and aria-labelledby */
        uuidPrefix: "accessible-megamenu",

        /* css class used to define the megamenu styling */
        menuClass: "nav-menu",

        /* css class for a top-level navigation item in the megamenu */
        topNavItemClass: "nav-item",

        /* css class for a megamenu panel */
        panelClass: "sub-nav",

        /* css class for a group of items within a megamenu panel */
        panelGroupClass: "sub-nav-group",

        /* css class for the hover state */
        hoverClass: "hover",

        /* css class for the focus state */
        focusClass: "focus",

        /* css class for the open state */
        openClass: "open"
    });

    
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

  });