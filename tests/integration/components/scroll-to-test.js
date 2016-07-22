import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('scroll-to', 'Integration | Component | scroll to', {
  integration: true
});

test('it renders using block and non-block usage', function(assert) {
  // Template block usage
  this.render(hbs`
    {{#scroll-to}}
      template block text
    {{/scroll-to}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');

  // Template non-block usage
  this.render(hbs`{{scroll-to href='#' label='scroll-to label'}}`);

  assert.equal(this.$().text().trim(), 'scroll-to label');
});
