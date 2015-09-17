# ember-scroll-to

Animated scrolling to a specified id.

## Installation

```bash
# From within your ember-cli project
ember install ember-scroll-to
```

## Usage

In your template:

```hbs
{{scroll-to href='#faq' label='FAQ'}}
{{!-- or --}}
{{#scroll-to href='#faq'}}FAQ{{/scroll-to}}
```

If you want to perform some action after scroll:

```hbs
{{scroll-to href='#faq' afterScroll='customAction'}}
```

## Options

### Duration
Number of milliseconds for the transition to occur over. Default is 750ms.

Example usage:
```hbs
{{scroll-to href='#faq' label='FAQ' duration=1000}}
```

### Easing
The jQuery animate transition to use. Default is 'swing'. With a standard setup,
you could also use 'linear'. If you want more, check out [jQuery UI](http://jqueryui.com/).

Example usage:
```hbs
{{scroll-to href='#faq' label='FAQ' easing='linear'}}
```

### Offset
An optional offset. The most common use case for this is if you have a fixed header
that you need to account for.

Example usage (with a 60px tall fixed header):
```hbs
{{scroll-to href='#faq' label='FAQ' offset=-60}}
```
