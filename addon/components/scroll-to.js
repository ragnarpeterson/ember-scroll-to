import Em from 'ember';

export default Em.Component.extend({

  // ----- Arguments -----
  href:     null,      // Required
  label:    undefined,
  duration: undefined,
  easing:   undefined,
  offset:   undefined,


  // ----- Overridden properties -----
  tagName:           'a',
  attributeBindings: ['href'],


  // ----- Services -----
  scroller: Em.inject.service(),


  // ----- Computed properties -----
  jQueryElement: Em.computed('href', function() {
    const href = this.get('href');

    return this
      .get('scroller')
      .getJQueryElement(href);
  }),


  // ----- Events -----
  scroll: Em.on('click', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.sendAction('beforeScroll');
    Em.run.next(()=>{
      this
        .get('scroller')
        .scrollVertical(this.get('jQueryElement'), {
          duration: this.get('duration'),
          offset:   this.get('offset'),
          easing:   this.get('easing'),
          complete: () => Em.run(this, this.sendAction, 'afterScroll')
        });
    });
  })
});
