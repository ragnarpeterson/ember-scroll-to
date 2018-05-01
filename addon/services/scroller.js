import Em from 'ember';

const DURATION = 750;
const EASING = 'swing';
const OFFSET = 0;

const { RSVP } = Em;

export default Em.Service.extend({
  // ----- Static properties -----
  duration: DURATION,
  easing: EASING,
  offset: OFFSET,

  // ----- Computed properties -----
  scrollable: Em.computed(function() {
    return Em.$('html, body');
  }),

  // ----- Methods -----
  getJQueryElement(target) {
    const jQueryElement = Em.$(target);

    if (!jQueryElement) {
      Em.Logger.warn("element couldn't be found:", target);
      return;
    }

    return jQueryElement;
  },

  getVerticalCoord(target, offset = 0) {
    const jQueryElement = this.getJQueryElement(target);
    return jQueryElement.offset().top + offset;
  },

  scrollVertical(target, opts = {}) {
    var top =
      -this.get('scrollable').offset().top +
      this.getVerticalCoord(target, opts.offset);

    return new RSVP.Promise((resolve, reject) => {
      this.get('scrollable')
        .animate(
          {
            scrollTop: top
          },
          opts.duration || this.get('duration'),
          opts.easing || this.get('easing'),
          opts.complete
        )
        .promise()
        .then(resolve, reject);
    });
  }
});
