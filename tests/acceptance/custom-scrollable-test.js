import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import { later } from '@ember/runloop';
import Ember from 'ember';

moduleForAcceptance('Acceptance | custom scrollable');

test('visiting /custom-scrollable', function(assert) {
  visit('/custom-scrollable');

  andThen(function() {
    assert.equal(currentURL(), '/custom-scrollable', 'current url is correct');
  });

  // Scroll to position-1
  andThen(function() {
    click('a.test-scroll-to-position-1');
    later(() => console.log("wait for scroll"), 1000);
  });
  andThen(function() {
    let top = document.getElementById('position-1').getBoundingClientRect().top;
    assert.equal(top, Ember.$('#scrollable-container').offset().top, 'After clicking on position-1 it should be at the top of the page');
  });

  // While at position-1, scroll _down_ to position-2
  andThen(function() {
    click('a.test-scroll-to-position-2');
    later(() => console.log("wait for scroll"), 1000);
  });
  andThen(function() {
    let top = document.getElementById('position-2').getBoundingClientRect().top;
    assert.equal(top, Ember.$('#scrollable-container').offset().top, 'After clicking on position-2 it should be at the top of the page');
  });

  // While at position-2, scroll _up_ to position-1
  andThen(function() {
    click('a.test-scroll-to-position-1');
    later(() => console.log("wait for scroll"), 1000);
  });
  andThen(function() {
    let top = document.getElementById('position-1').getBoundingClientRect().top;
    assert.equal(top, Ember.$('#scrollable-container').offset().top, 'After clicking on position-1 it should be at the top of the page');
  });
});
