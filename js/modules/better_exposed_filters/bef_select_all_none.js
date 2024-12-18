/**
 * @file
 * bef_select_all_none.js
 *
 * Adds select all/none toggle functionality to an exposed filter.
 */

(function ($, once) {
  Drupal.behaviors.betterExposedFiltersSelectAllNone = {
    attach: function (context) {
      var selected = $('.form-checkboxes.bef-select-all-none:not(.bef-processed)');

      if (selected.length) {
        var itemSelected = 0;
        var selNone = Drupal.t('Clear filters');

        function changeBefToggle() {
          let count = selected.find('input:checkbox:checked').length;
          $('.bef-toggle').removeClass(function (index, className) {
            return (className.match (/(^|\s)items--\S+/g) || []).join(' ');
          }).addClass('items--' + count);
          $('.bef-toggle-span strong').text(count);
          return this;
        };

        selected.find('input:checkbox')
          .each(function () {
            if($(this).prop('checked')) {
              itemSelected ++;
            }
          });

        var link = $('<div class="bef-toggle items--' + itemSelected + '"><span class="bef-toggle-span"><strong>' + itemSelected + '</strong> selected</span><button type="button" class="btn btn-clear" href="#">' + selNone + '</button></div>');

        selected.find('input').on('click', function() {
          changeBefToggle();
        });

        link.click(function (event) {
          // Don't actually follow the link...
          event.preventDefault();
          event.stopPropagation();

          $(this)
            .siblings('.bef-select-all-none, .bef-tree')
            .find('input:checkbox').each(function () {
              $(this).prop('checked', false);
            })
            .end()

            // attr() doesn't trigger a change event, so we do it ourselves. But just on
            // one checkbox otherwise we have many spinning cursors.
            .find('input[type=checkbox]:first').change();

          changeBefToggle();
        });

        // Add link to the page for each set of checkboxes.
        selected
          .addClass('bef-processed')
          .each(function (index) {
            // Clone the link prototype and insert into the DOM.
            var newLink = link.clone(true);

            newLink.insertBefore($(this));

            // If all checkboxes are already checked by default then switch to Select None.
            if ($('input:checkbox:checked', this).length == $('input:checkbox', this).length) {
              newLink.text(selNone);
            }
          });
      }

      // @TODO:
      // Add highlight class to checked checkboxes for better theming
      // $('.bef-tree input[type="checkbox"], .bef-checkboxes input[type="checkbox"]')
      // Highlight newly selected checkboxes
      //  .change(function () {
      //    _bef_highlight(this, context);
      //  })
      //  .filter(':checked').closest('.form-item', context).addClass('highlight')
      // ;
      // @TODO: Put this somewhere else...
      // Check for and initialize datepickers
      // if (Drupal.settings.better_exposed_filters.datepicker) {
      //  // Note: JavaScript does not treat "" as null
      //  if (Drupal.settings.better_exposed_filters.datepicker_options.dateformat) {
      //    $('.bef-datepicker').datepicker({
      //      dateFormat: Drupal.settings.better_exposed_filters.datepicker_options.dateformat
      //    });
      //  }
      //  else {
      //    $('.bef-datepicker').datepicker();
      //  }
      // }
    }                   // attach: function() {
  };                    // Drupal.behaviors.better_exposed_filters = {.

  Drupal.behaviors.betterExposedFiltersAllNoneNested = {
    attach:function (context, settings) {
      $(once('bef-all-none-nested', '.bef-select-all-none-nested ul li')).each(function () {
        var $this = $(this);
        // Check/uncheck child terms along with their parent.
        $this.find('input:checkbox:first').change(function () {
          $(this).closest('li').find('ul li input:checkbox').prop('checked', this.checked);
        });

        // When a child term is checked or unchecked, set the parent term's
        // status as needed.
        $this.find('ul input:checkbox').change(function () {
          // Determine the number of unchecked sibling checkboxes.
          var $this = $(this);
          var uncheckedSiblings = $this.closest('li').siblings('li').find('> div > input:checkbox:not(:checked)').length;

          // If this term or any siblings are unchecked, uncheck the parent and
          // all ancestors.
          if (uncheckedSiblings || !this.checked) {
            $this.parents('ul').siblings('div').find('input:checkbox').prop('checked', false);
          }

          // If this and all sibling terms are checked, check the parent. Then
          // trigger the parent's change event to see if that change affects the
          // grandparent's checked state.
          if (this.checked && !uncheckedSiblings) {
            $(this).closest('ul').closest('li').find('input:checkbox:first').prop('checked', true).change();
          }
        });
      });
    }
  }

})(jQuery, once);
