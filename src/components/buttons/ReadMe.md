# Icons

This component gives an easy usage of different types of buttons: one line text and multiline text buttons, buttons with icons and etc. There are some design settings by default, they all might be overwritten by yourself.

## Usage

### Required settings

```twig
{% include '/components/buttons/buttons.twig' with { text: 'Click Me' } only %}
```

Parameters:

- `text`: text on the button.

Output:

```html
<button type="button" class="button" aria-label="">Click Me</button>
```


### Optional settings

```twig
{% include '/components/buttons/buttons.twig' with 
    {
      text: 'Click Me',
      desc: 'You will get something interesting',
      type: 'submit',
      size: 'small',
      style: 'brand',
      icon: 'user',
      iconType: 'side',
      round: true,
      class: 'loading other-additional-class',
      attributes: 'disabled data-toggle="nav"'
    } only
%}
```

Parameters:

- `desc`: text which will be written as a second line of the button
- `type`: if empty, will set `type="button"`. Options: `"submit"`, `"reset"`.
- `size`: there are two predefined: `"small"` and `"large"`. Everything will scale upon it.
- `style`: you can colorize a button by adding any name from your default color scheme. But button is a pretty complicated object, so make sure you add some styles too.
- `icon`: name of the icon from `src/assets/img/icons/src/` folder.
- `iconType`: `"side"` will place an icon before text, `"only"` will keep the icon without text at all (with this setting, `aria-label` will be filled with the `text` value).
- `round`: if `true`, button with `iconType: "only"` will be round shape. Otherwise will be ignored.
- `class`: any additional classes. Check the predefined `loading` class.
- `attributes`: any additional attributes.

Output:

```html
<button type="submit" class="button button--small button--brand button--icon other-additional-class button--round" aria-label="Please click this button" disabled data-toggle="nav">
  <span class="icon"><svg class="icon__svg"><use xlink:href="./assets/img/icons/sprite.svg#user"></use></svg></span>
  Click Me
  <span class="desc">You will get something interesting</span>
</button>
```
