((Drupal) => {
  Drupal.behaviors.btn = {
    attach(context) {
      context.querySelectorAll('.btn[aria-expanded]').forEach((btn) => {
        btn.addEventListener('click', () => {
          const isExpanded = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !isExpanded);
        })
      });
    },
  };
})(Drupal);
