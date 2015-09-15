import Em from 'ember';

const DURATION = 750;
const EASING = 'swing';
const OFFSET = 0;

export default Em.Component.extend({
  tagName: 'a',
  href: null,
  duration: DURATION,
  easing: EASING,
  offset: OFFSET,
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

    return elem.offset().top + this.get('offset');
  }),

  scroll: Em.on('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.get('scrollable').animate({
      scrollTop: this.get('target')
    }, this.get('duration'), this.get('easing'), Em.run.bind(this, this.sendAction, 'afterScroll'));
  })
});
