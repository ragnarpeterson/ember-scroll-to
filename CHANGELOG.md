# Changelog

## 0.3.1
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
