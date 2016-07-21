# Changelog

## 0.5.2
- Ember CLI Upgrade [\#22](https://github.com/jasonkriss/ember-scroll-to/pull/18) ([blimmer](https://github.com/blimmer))

## 0.5.1
- Added default param value for `scrollVertical` [\#18](https://github.com/jasonkriss/ember-scroll-to/pull/18) ([corrspt](https://github.com/corrspt))

## 0.5.0
- Abstract scrolling logic into service [\#15](https://github.com/jasonkriss/ember-scroll-to/pull/15) ([lolmaus](https://github.com/lolmaus))

## 0.4.0
- Provide optional offset parameter.

  You might want to use this if you have a fixed
  position header and need to pad out the scroll.
  Negative and positive values are accepted.

  For example:
  ```handlebars
  {{#scroll-to href='#my-element' offset=-50}}
    My Element
  {{/scroll-to}}
  ```
