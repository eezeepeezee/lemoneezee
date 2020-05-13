# How to configure LemonEezee

This document tells how to set up `config.yml`, and a little about what's happening behind the scenes and how you may use the results of those settings in your styles and templates. But while this is still a common overview of framework functionality, you may need full documentation that describes all the available Sass functions and mixins, CSS-classes, and other code snippets that you are able to use — you can find it in "How to use LemonEezee". 

Quick links:

- [Overview](#overview-of-configyml) of `config.yml`
- [Colors](#colors)
    - `base`
    - `baseAdjustSteps`
    - `schemes`
    - `schemesAdjustSteps`
    - `metaThemeColor`
    - `colorGuides`
- [Grid](#grid)
    - `breakpoints`
    - `breakpointsUnit`
    - `layoutMinWidth`
    - `columns`
    - `gutters`
    - `fixWrapperWidth`
    - `rotateBackMap`
- [Spacers](#spacers)
    - `spacer`
    - `spacerMap`
    - `defaultMarginY`
    - `defaultColPadding`
- [Typography](#typography)
    - `fontsInclude`
    - `fontsGoogle`
    - `fontMain` and `fontStyle`
    - `htmlFontSize`, `fontSizeBase`, `lineHeightBase` and `fontWeightBase`

## Overview of `config.yml`

All the content of `config.yml` is divided into four major blocks: 

```yaml
colors:
  # settings

grid:
  # settings

spacers:
  # settings

typography:
  # settings
```

So let's go one by one, see what is for, and what is happening behind the scenes for a better understanding of how LemonEezee works. 

- **Note:** if you're not familiar with YAML syntax, you can check it out [here](https://docs.ansible.com/ansible/latest/reference_appendices/YAMLSyntax.html), but the main thing is than you need quotes "" if your value includes special characters, (e.g. `:`, `{`, `}`, `[`, `]`, `,`, `&`, `*`, `#`, `?`, `|`, `-`, `<`, `>`, `=`, `!`, `%`, `@`, `\`).
- **Note:** use camelCase for naming settings.


## Colors

In `colors` you're able to set color schemes and some additional settings which will be used in some parts of your project. Let's see in detail.

- **Note:** Use can use HEX, RGB, or HSL color modes, but not RGBa or HSLa.

---
#### `base`

Sets `white` and `black` colors for using them independently on further color schemes and calculating intermediate gray colors.

- **Note:** should be zero saturated because calculation is done within one color channel.

```yaml
base:
  white: "#ffffff"
  black: "#0b0b0b"
```

---
#### `baseAdjustSteps`

Defines how many intermediate gray colors will be created between `white` and `black`. 

By default, it will create `gray-1` (the lightest gray), `gray-2`, `gray-3`, `gray-4`, and `gray-5` (the darkest gray).

```yaml
baseAdjustSteps: 10

# 0 — 20
```

---
#### `schemes`

It seems large, but it simply defines color schemes. As many as you want your site to switch between.

```yaml
# the first scheme must always be named "default"

schemes:
  default:
    brand:       "#fff500"
    accent:      "rgb(56, 188, 25)"
    success:     "hsl(136, 79%, 45%)"
    warning:     "#dae21e"
    danger:      "#e80f0f"
    info:        "#0080ff"
    interactive: "#178ee5"
  alternative:
    brand:       "#0089ff"
    success:     "#4fc970"
    warning:     "#b1b907"
    danger:      "#ea3838"
    info:        "#237cd4"
```

Name the colors the way you want and reassign them in different schemes. If you want to keep the same value of, for example, `interactive` for all color schemes, don't define anywhere but in `default`, and it will automatically get the value from the `default` scheme for all of the others.

Behinde the scenes there's so much happening:

1) You can use a color name from a scheme in your `.sass` as an argument for the function `color()` (and don't forget we also have black-and-white set too). The second argument might be opacity which of course is 1 by default:

```sass
.some-element
  background: color(brand)
  color: color(accent, 0.75)
  border-top: 1px solid color(black)
  border-bottom: 1px solid color(gray-2)
```

2) `color()` returns custom properties after compling CSS:

```css
.some-element {
  background: rgba(var(--c-brand), 1);
  color: rgba(var(--c-accent), .75);
  border-top: 1px solid rgba(var(--c-black), 1);
  border-bottom: 1px solid rgba(var(--c-gray-2), 1);
}
```

3) And you will also see `data-scheme` attribute in your html: 

```html
<!doctype html>
<html data-scheme="default">
```

So what's the trick? 

The trick is when you set `data-scheme="alternative"` (or another scheme name that you have), for example, via JavaScript, all the variables change their values on the fly. This happens because they are all set in `common.min.css` for the `:root` element with `[data-scheme]` selectors for every defined scheme.

What about older browsers support? It is already done! 

When you make a build, it will create additional files like `common.default.min.css` and `common.alternative.min.css` with all the elements and their only properties which use `color()` in a value. It means, `color: color(brand)` will become `color: #38bc19`. 

When you make a build, it will create additional files like `common.default.min.css` and `common.alternative.min.css` with all the elements and their only properties which use `color()` in value (not to keep trash). It means, `color: color(brand)` will become `color: #fff50` in `common.default.min.css` and `color: #0089ff` in `common.alternative.min.css`.

Then look at `<head>` section of your every `*.html`: there's already a script which detects browsers with no CSS variables support and gives `common.default.min.css` as an additional stylesheet right after `common.min.css`. Switch for alternative schemes is done with loading other generated stylesheets. 

---
#### `schemesAdjustSteps`

This is another key feature of color schemes. This one creates a set of lighter and darker colors for every color of your schemes. 

```yaml
schemesAdjustSteps: 5    

# 0 — 5
```

They are named with two prefixes: **{ *color-name* }-{ *l/d* }-{ *from 1 to amount of steps* }**, so you get something like `brand-l-5` as the lightest and `brand-d-5` as the darkest of `brand` itself. Usage is the same: 

```sass
.some-element
  background: color(brand-l-2)
  color: color(accent-d-3, 0.5)
```

If you set fewer steps, and then understand that it is not enough and set up more (up to 5), colors which were created will stay the same and you won't have to rewrite styles. It means, that with any value of `schemesAdjustSteps` you will get the same color, for example, for `brand-d-1` — in this case, it is a color which is a little darker than the basic `brand`.

- **Note:** too light or too bright color may have been generated into inappropriate set of lighter and darker colors, so sometimes it is better to light and dark colors as a separate ones in a scheme.

---
#### `metaThemeColor`

Used as `<meta name="theme-color" content="#dee600">` in the `<head>` section to hightlight a browser tab in Chrome on Android devices.

```yaml
metaThemeColor: "#dee600"
```

---
#### `colorGuides`

Color of guides in Layout Helpers module.

```yaml
colorGuides: "#ff0080"
```


## Grid

In `grid` you set up everything to handle your layout within your grid system. And some extra features also! Let's see.

---
#### `breakpoints`

Sets breakpoints to create all the basic stuff: classes for layouts, media queries, functions, and mixins in Sass.

You can use any breakpoint names instead of default ones and define as many as you need (but at least — two for correct calculation of all the grid stuff). Remember, LemonEezee is a mobile fist, so each breakpoint means *"this size and everything larger".* 

```yaml
# the first breakpoint must be equal to 0

breakpoints:
  xs: 0
  sm: 576
  md: 768
  lg: 992
  xl: 1200
```

---
#### `breakpointsUnit`

Set units which will be applied to breakpoints values. In case you need something but `px` by default (you may read the article "[PX, EM or REM Media Queries?](https://zellwk.com/blog/media-query-units/)"

```yaml
breakpointsUnit: px
```

---
#### `layoutMinWidth`

Sets `min-width` property for `<body>`. Should be less than the second breakpoint, so the first one could be applied instead of adding x-scroll.

```yaml
layoutMinWidth: 320px
```

---
#### `columns`

Amount of columns in your grid.

```yaml
# 1 — ∞, but don't be crazy, please

columns: 16
```

 Together with breakpoints it works like this:

- creates columns classes: 
**.col-{ *each breakpoint* }-{ *from 1 to amount of columns* }**, 
e. g.: `.col-sm-1`, `.col-md-10`, `.col-xl-6` and so on;
- creates offset classes: 
**.offset-{ *each breakpoint* }-{ *from 1 to amount of columns* }**, 
e. g.: `.offset-sm-2`, `.offset-md-4`, `.offset-xl-8` and so on;
- creates Sass-mixins for media queries: 
**=screen({ *each-breakpoint* })**, 
**=screen-max({ *each-breakpoint* })**, 
**=screen-only({ *each-breakpoint* }),**
e. g.: `=screen(sm)`, `=screen-max(md)`, `=screen-only(lg)`.

**Note:** you never have classes for the first breakpoint. Instead `col-xs-10`  or `offset-xs-2` you should use `col-10`  or `offset-2`. 
The reason is that the first breakpoint affects any width from "0 to ∞" until you reassign the behavior with any other breakpoint. So naming keeps that logic: *"not getting from some width and higher"* but *"just getting any width"*. Think the behavior is more simple than the explanation.

---
#### `gutters`

Defines left and right margin for each of elements: `.wrapper`, `.container`, `.row`, and all of `.col-*-*`. The cool thing is that you can define margins for every breakpoint separately. For example, you may not be having gutters between columns on smaller devices, but turn them on for large screens.

```yaml
gutters:
  wrapper: "(xs: 16px, sm: 0, lg: 32px)"
  container: false
  row: false
  col: "(xs: 8px, md: 16px)"
```

---
#### `fixWrapperWidth`

On every listed breakpoint `.wrapper` would become fixed with a width equal to this breakpoint. By default, `.wrapper` (and so `.container`, `.row`, and all of `.col-*-*`) is fluid.

**Note:** the setting affects on "breakpoint-only" mode. Means, if you need a fixed wrapper on every screen larger than "lg", you set this breakpoint and everything larger.

```yaml
fixWrapperWidth: "(md, xl)"    

# In case you don't need fixed wrapper at all: 
# fixWrapperWidth: false
```

---
#### `rotateBackMap`

This thing is used in a default component `rotate-back`. The component hides all of the content and shows the screens where you can ask to rotate user's device to another orientation.

```yaml
rotateBackMap: false     

# In case you want to turn it on, list breakpoints and orientation:
# rotateBackMap: "(xs: landscape, sm: portrait)"
```


## Spacers

Forget about calculating margins and paddings in your head or write them in your styles manually each time. Set them in `spacers` and use as classes and mixins.

---
#### `spacer`

This is a key setting to define a minimum step or a multiplier for your spacing system. The default value of 8px is most common (read "[Intro to The 8-Point Grid System](https://builttoadapt.io/intro-to-the-8-point-grid-system-d2573cde8632)" to know more), but you can define whatever you want and any unit you want (e. g., *rem*).

```yaml
spacer: 8px
```

---
#### `spacerMap`

List of predefined spacers, which are used as a multilpler for a main `spacer` setting. 

```yaml
spacerMap:
  a: "(xs: 1)"
  b: "(xs: 2, sm: 3)"
  c: "(xs: 4)"
  d: "(xs: 6)"
  e: "(xs: 10)"
```

Let's see what it means:

`a: "(xs: 1)"` — any time you call for "a" size of margin or padding (we'll see later how to do it), you will get **1** * 8px = **8px** on **xs- and larger screens** (means **all screens**).
`b: "(xs: 2, sm: 3)"` — you will get **2** * 8px = **16px** on **xs-screen**, but will become  **3** * 8px = **24px** on **sm-screen** and **larger**. See the trick?

For example, you may define some spacing for using it between the main sections of your site. But you want these sections to be a little bit closer to each other on phones rather than desktops. That's why you can set one spacer separately for every breakpoint.

The names (a, b, c, d, e) is totally up to you. Behind the scenes, it creates classes and mixins for margins and paddings, like: 

- `.mb-a` (means `margin-bottom: 8px`, cause `a: "(xs: 1)"`);
- `+padding(y, d)` which will be compiled in CSS `padding-top: 48px; padding-bottom: 48px`, cause `d: "(xs: 6)"` and 6 * 8px = 48px.

---
#### `defaultMarginY`

This section depends on what you defined in the previous one. Set default top and bottom margins for any of these key elements of the layout, and they will be applied automatically. Remember, `.wrapper` and `.row` are flex-containers, so vertical margins will not collapse.

```yaml
defaultMarginY:
  container: false
  row: b
  col: false
```

---
#### `defaultColPadding`

Default padding for every `.col-*-*` element. Applies the same padding for top, right, bottom, and left sides.

```yaml
defaultColPadding: false

# In case you need default padding:
# defaultColPadding: a
```


## Typography

The idea is that in `typography` you set the basics, but the detailed tune of your headings, paragraphs, and all of the other text elements you do by yourself.

---
#### `fontsInclude`

List of fonts that you manually upload into `src/assets/fonts/`. 

```yaml
fontsInclude:
  "Roboto-Regular": 400
  "Roboto-Bold": 700
```

**Note:** you have to have both `.woff` and `.woff2`. 

So each setting is basically **"{ *fontname* }"**, so the example above will include fonts from `src/assets/fonts/Roboto-Regular.(woff/woff2)` and `src/assets/fonts/Roboto-Bold.(woff/woff2)`. The numeric parameter will set up a `font-weight` in CSS. 

---
#### `fontsGoogle`

Fonts from GoogleFonts. Everything is pretty simple.

```yaml
fontsGoogle:
  PT Serif: "https://fonts.googleapis.com/css?family=PT+Serif&display=swap"
```

---
#### `fontMain` and `fontStyle`

`fontMain` is the font which is set as a `font-family` for the whole document. 

`fontStyle` is chosen by you according to your `fontMain` and this setting is compiled into a fallback for `font-family`.

```yaml
fontMain:  "Roboto-Regular"
fontStyle: "sans-serif"

# "sans-serif" / serif / monospace
```

 In this case, it will make:

```css
body {
  font-family: Roboto-Regular, -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               'Helvetica Neue', Ubuntu, Arial, sans-serif;
}
```

---
#### `htmlFontSize`, `fontSizeBase`, `lineHeightBase` and `fontWeightBase`

Basic settings for fonts. Use any possible settings according to CSS spec.

```yaml
htmlFontSize:   16px
fontSizeBase:   1rem
lineHeightBase: 1.5
fontWeightBase: normal
```

These settings output is:

```css
html {
  font-size: 16px;
}

body {
  font-size: 1rem;
  line-height: 1.5;
  font-weight: normal;
}
```

One thing is that `lineHeightBase` will be used as a base for the Sass-function `"line-h(2)"` which returns `lineHeightBase` * (argument), e. g. the current example will return `line-height: 3`.