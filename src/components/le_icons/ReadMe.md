# Icons

This component allows to include icons from `src/assets/img/icons/sprite.svg`, which is generated from all the icons from `src/assets/img/icons/src/` folder.

The twig template generates `<span class="icon">...</span>` with an svg icon inside. The default size is 48x48px. When changing, always define both width and height.

## Usage

### Required settings

```twig
{% include '/components/le_icons/icons.twig' with { icon: 'icon-name' } %}
```

Parameters:

- `icon`: name of the original icon file.

### Optional settings

```twig
{% include '/components/le_icons/icons.twig' with 
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