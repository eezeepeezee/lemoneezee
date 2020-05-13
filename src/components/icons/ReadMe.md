# Icons

This component allows to include icons from `src/assets/img/icons/sprite.svg`, which is generated from all the icons from `src/assets/img/icons/src/` folder. You can put any svg icons you want, the only rule is to make them square. They all will be optimized while sprite generating.

The twig template generates `<span class="icon" aria-hidden="true">...</span>` with an svg icon inside. The default size is 48x48px. When changing, always define both width and height for `span.icon`.

## Usage

> Note: `aria-hidden="true"` is added by default.

### Required settings

```twig
{% include '/components/icons/icons.twig' with { icon: 'icon-name' } only %}
```

Parameters:

- `icon`: name of the original icon file without `.svg` extention.

Output:

```html
<span class="icon" aria-hidden="true">
  <svg class="icon__svg">
    <use xlink:href="./assets/img/icons/sprite.svg#icon-name"></use>
  </svg>  
</span>
```

### Optional settings

```twig
{% include '/components/icons/icons.twig' with 
    { 
      icon: 'icon-name', 
      style: 'color-name', 
      class: 'additional-class other-additional-class',
      attributes: 'data-toggle="menu"' 
    } only
%}
```

Parameters:

- `style`: you can colorize an icon by adding any name from your default color scheme, e.g. `brand`.
- `class`: any additional classes
- `attributes`: any additional attributes

Output:

```html
<span class="icon icon--color-name additional-class other-additional-class" aria-hidden="true" data-toggle="menu">
  <svg class="icon__svg">
    <use xlink:href="./assets/img/icons/sprite.svg#icon-name"></use>
  </svg>  
</span>
```
