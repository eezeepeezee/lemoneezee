# Icons

This component gives an easy usage of different types of buttons: one line text and multiline text buttons, buttons with icons and etc. There are some design settings by default, they all might be overwritten by yourself.

## Usage

### Required settings

```twig
{% include '/components/le_buttons/buttons.twig' with 
    {
      text: 'Click Me'
    } 
%}
```

Parameters:

- `text`: text on the button.

### Optional settings

```twig
{% include '/components/le_buttons/buttons.twig' with 
    {
      text: 'Click Me',
      desc: 'You will get something interesting',
      size: 'small',
      style: 'brand',
      icon: 'user',
      iconType: 'side',
      round: true,
      class: 'loading other-additional-class',
      attributes: 'disabled data-toggle="nav"' 
    } 
%}
```

Parameters:

- `desc`: text which will be written as a second line of the button
- `size`: there are two predefined: `"small"` and `"large"`. Everything will scale upon it.
- `style`: you can colorize a button by adding any name from your default color scheme. But button is a pretty complicated object, so make sure you add some styles too.
- `icon`: you can add an icon from `src/assets/img/icons/src/` folder. It will automatically place it as an icon component.
- `iconType`: `"side"` will place an icon before text, `"only"` will keep the icon without text at all (with this setting, `aria-label` will be filled with the `text` value).
- `round`: if `true`, button with `iconType: "only"` will be round shape. Otherwise will be ignored.
- `class`: any additional classes.
- `attributes`: any additional attributes.