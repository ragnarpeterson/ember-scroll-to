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

  scrollableIsDocument: Em.computed('scrollable', function() {
    return Em.$('html, body')[0] === this.get('scrollable')[0];
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
    const jQueryElement = this.getJQueryElement(target);

    if (this.get('scrollableIsDocument')) {
      // when scrolling the document, scroll directly to the target element's top
      return jQueryElement.offset().top + offset;
    } else {
      // when scrolling a custom scrollable element:
      // (1) subtract the scrollable offset from top of the page
      // (2) add the current scrollTop for scrollable
      return this.getElementTop(jQueryElement) + this.get('scrollable').scrollTop() - this.getElementTop(this.get('scrollable')) + offset;
    }
  },

  getElementTop($element) {
    // Top is relative to the document. To get the math right,
    // revert any scale applied to the element (by ember test container for example)
    let element = $element[0];
    let scaleMultiplier = 1 / (element.getBoundingClientRect().height / element.offsetHeight);
    return scaleMultiplier * $element.offset().top;
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
