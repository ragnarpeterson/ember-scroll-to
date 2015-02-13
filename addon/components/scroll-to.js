import Em from 'ember';

var DURATION = 750;

var EASING = 'swing';

export default Em.Component.extend({
  tagName: 'a',
  href: null,
  duration: DURATION,
  easing: EASING,
  attributeBindings: ['href'],

  scrollable: function() {
    return Em.$('html, body');
  }.property(),

  target: function() {
    return Em.$(this.get('href')).offset().top;
  }.property('href'),

  scroll: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.get('scrollable').animate({
      scrollTop: this.get('target')
    }, this.get('duration'), this.get('easing'));
  }.on('click')
});
