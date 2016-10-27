import Em from 'ember';

const DURATION = 750;
const EASING   = 'swing';
const OFFSET   = 0;

const { RSVP } = Em;

export default Em.Service.extend({

  // ----- Static properties -----
  duration: DURATION,
  easing:   EASING,
  offset:   OFFSET,


  // ----- Computed properties -----
  scrollable: Em.computed(function() {
    return Em.$('html, body');
  }),


  // ----- Methods -----
  getJQueryElement (target) {
    const jQueryElement = Em.$(target);

    if (!jQueryElement) {
      Em.Logger.warn("element couldn't be found:", target);
      return;
    }

    return jQueryElement;
  },

  getVerticalCoord (target, offset = 0) {
    const  jQueryElement = this.getJQueryElement(target);
    return jQueryElement.offset().top + offset;
  },

  scrollVertical (target, opts = {}) {
    return new RSVP.Promise((resolve) => {
      this.get('scrollable').animate({
          scrollTop: this.get('scrollable').scrollTop() - this.get('scrollable').offset().top + this.getVerticalCoord(target, opts.offset)
        },
        opts.duration || this.get('duration'),
        opts.easing   || this.get('easing'),
        function() {
          if (typeof opts.complete === 'function') {
            opts.complete.apply(this, arguments);
          }
          resolve();
        }
      );
    });
  }
});
