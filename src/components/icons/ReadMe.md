# Icons

This component allows to include icons from `src/assets/img/icons/sprite.svg`, which is generated from all the icons from `src/assets/img/icons/src/` folder.

The twig template generates `<span class="icon">...</span>` with an svg icon inside. The default size is 48x48px. When changing, always define both width and height.

## Usage

> Rename `le_icons` folder into `icons` to avoid rewriting the component on the framework update, so you may change anything inside safely.

### Required settings

```twig
{% include '/components/icons/icons.twig' with { icon: 'icon-name' } %}
```

Parameters:

- `icon`: name of the original icon file.

Output:

```html
<span class="icon">
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
      attributes: 'aria-hidden="true"' 
    } 
%}
```

Parameters:

- `style`: you can colorize an icon by adding any name from your default color scheme
- `class`: any additional classes
- `attributes`: any additional attributes

Output:

```html
<span class="icon icon--color-name additional-class other-additional-class" aria-hidden="true">
  <svg class="icon__svg">
    <use xlink:href="./assets/img/icons/sprite.svg#icon-name"></use>
  </svg>  
</span>
```
