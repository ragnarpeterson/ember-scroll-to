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
  
  getHorizontalCoord(target, offset = 0) {
		const jQueryElement = this.getJQueryElement(target);
		return jQueryElement.offset().left + offset;
	},

  scrollElement(target, opts = {}) {
		return new RSVP.Promise((resolve, reject) => {

			var scrollAnimation = {};
			if(opts.direction === 'horizontal') {
				scrollAnimation.scrollLeft =  this.get('scrollable').scrollLeft() - this.get('scrollable').offset().left + this.getHorizontalCoord(target, opts.offset);
			} else {
				scrollAnimation.scrollTop = this.get('scrollable').scrollTop() - this.get('scrollable').offset().top + this.getVerticalCoord(target, opts.offset);
			}
			
			this.get('scrollable')
				.animate(scrollAnimation,
					opts.duration || this.get('duration'),
					opts.easing || this.get('easing'),
					opts.complete
				)
				.promise()
				.then(resolve, reject);
		});
	},
  
  // Keep existing scrollVertical() for backwards compatibility
	scrollVertical(target, opts = {}) {
		// Vertical by default
		return this.scrollElement(target,opts);
	},
	
	scrollHorizontal(target, opts = {}) {
		// Set direction to horizontal
		opts.direction = 'horizontal';
		return this.scrollElement(target,opts);
	}
});
