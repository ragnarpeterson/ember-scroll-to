# ember-scroll-to

Animated vertical scrolling to a specified id.


## Installation

From within your ember-cli project directory: 

```bash
ember install ember-scroll-to
```


## The component

The `{{scroll-to}}` creates an `<a>` element that, when clicked, scrolls to the specified selector.

In your template:

```hbs
{{scroll-to href='#faq' label='FAQ'}}
```

You can also use the block form:

```hbs
{{#scroll-to href='#faq'}}
  FAQ
{{/scroll-to}}
```

If you want to perform some action after scroll:

```hbs
{{scroll-to href='#faq' afterScroll='customAction'}}
```

The component accepts the following options

* `href` -- (required) a selector of an element to scroll to on click.
* `label` -- text to display on the component. Ignored when used in a block form.
* `duration` -- number of milliseconds for the transition to occur over. Default is 750ms.
* `easing` -- the jQuery animate transition to use. Default is 'swing'. With a standard setup,
you could also use 'linear'. If you want more, check out [jQuery UI](http://jqueryui.com/).
* `offset` -- An optional offset. The most common use case for this is if you have a fixed header
that you need to account for.
* `direction` -- 'vertical' or 'horizontal'. Vertical by default.

Example usage with all options at once:

```hbs
{{scroll-to
  href='#faq'
  label='FAQ'
  duration=1000
  easing='linear'
  offset=-60
  direction='vertical'
}}
```


## Service

You can also invoke scrolling programmatically. To do so, inject the `scroller` service into your object:

```js
scroller: Ember.inject.service()
```

Then you can use the `scrollElement` method on it:

```
this.get('scroller').scrollElement(target, options);
```

`target` can be anything that jQuery accepts (selector, element, jQuery collection...).

`options` is a hash with any of the following key-value pairs (all optional):

* `offset`
* `duration`
* `easing`
* `direction`
* `complete` -- a callback to execute once the scrolling animation is complete.

The method returns a Promise that will resolve as soon as the animation has completed.

## Configuration
Some frameworks - like Google's Material Design Lite - will use a custom DOM structure to wrap the main content (e.g. for facilitating responsive design, modal overlays). For use in such environments, you'll want to override the default scrollable element (`html, body`) with the container element that should be used by the service to set the vertical scroll position. To do so, extend the service:
```javascript
// app/services/scroller.js
import Ember from 'ember';
import Scroller from 'ember-scroll-to/services/scroller';

export default Scroller.extend({
  scrollable: Ember.computed(function() {
    return Ember.$('main.mdl-layout__content');
  })
});
```
Where in this example `main.mdl-layout__content` is the content container of the page for Material Design Lite. Inspect your DOM to find the main element if scrolling is not working.
