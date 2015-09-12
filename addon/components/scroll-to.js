import Em from 'ember';

var DURATION = 750;
var EASING = 'swing';

export default Em.Component.extend({
  tagName: 'a',
  href: null,
  duration: DURATION,
  easing: EASING,
  attributeBindings: ['href'],

  scrollable: Em.computed(function() {
    return Em.$('html, body');
  }),

  target: Em.computed('href', function() {
    const elem = Em.$(this.get('href'));
    if (!elem) {
      Em.Logger.warn(`element ${this.get('href')} couldn\'t be found`);
      return;
    }
    
    return elem.offset().top;
  }),

  scroll: Em.on('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.get('scrollable').animate({
      scrollTop: this.get('target')
    }, this.get('duration'), this.get('easing'));
  })
});
