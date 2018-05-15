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

    if (Em.isEmpty(jQueryElement)) {
      Em.Logger.warn("element couldn't be found:", target);
      return;
    }

    return jQueryElement;
  },

  getScrollableTop () {
    // because the target elements top is calculated relative to the document,
    // and if the scrollable container is not the document,
    // we need to normalize the target elements top based on the top and current scrolled position of the scrollable
    if (this.get('scrollable').offset().top) {
      return this.get('scrollable').scrollTop() - this.get('scrollable').offset().top;
    } else {
      return 0;
    }
  },

  getVerticalCoord (target, offset = 0) {
    const  jQueryElement = this.getJQueryElement(target);
    return this.getScrollableTop() + jQueryElement.offset().top + offset;
  },

  scrollVertical (target, opts = {}) {
    return new RSVP.Promise((resolve, reject) => {

      this.get('scrollable')
        .animate(
          {
            scrollTop: this.getVerticalCoord(target, opts.offset)
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
