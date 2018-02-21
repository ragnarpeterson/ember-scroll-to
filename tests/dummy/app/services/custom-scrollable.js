import Ember from 'ember';
import ScrollerService from 'ember-scroll-to/services/scroller'

const {
  computed,
  $,
} = Ember;

export default ScrollerService.extend({
  scrollable: computed(function() {
    return $('#scrollable-container');
  }),
});
