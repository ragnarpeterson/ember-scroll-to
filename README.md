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

If you want to perfom some action after scroll:

```hbs
{{scroll-to href='#faq' afterScroll='customAction'}}
```
