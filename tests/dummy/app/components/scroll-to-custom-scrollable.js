import ScrollToComponent from 'ember-scroll-to/components/scroll-to';
import Ember from 'ember';

const {
  inject: {
    service,
  },
} = Ember;

export default ScrollToComponent.extend({
  scroller: service('custom-scrollable'),
});
