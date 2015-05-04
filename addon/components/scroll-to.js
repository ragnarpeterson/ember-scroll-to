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
    return Em.$(this.get('href')).offset().top;
  }),

  scroll: Em.on('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.get('scrollable').animate({
      scrollTop: this.get('target')
    }, this.get('duration'), this.get('easing'));
  })
});
