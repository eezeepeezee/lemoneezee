# ReadMe.md cpm/images

# Images

This is a great tool to generate `img`, `picture`, and `figure` tags with sets of `source` or whatever you need to include your responsive images. 

## Usage

### Required settings

Twig:

```twig
{% include '/components/images/images.twig' with 
    {
      src:   'folder/filename-without-extension',
      type:  'jpg'
    }
%}
```

Parameters:

- `src`: path to an image, relatively to `/src/assets/img/`
- `type`: image type (extension): `.jpg`, `.png`, `.gif`, whatever it is.

Output:

```html
<img src="./assets/img/folder/filename-without-extension.jpg" width="" height="" alt="" class="" >
```

**Optional settings**

**For alternative WebP images**

Twig:

```twig
{% include '/components/images/images.twig' with 
    {
      src:    'folder/filename-without-extension',
      type:   'jpg',
      webp:   true
    }
%}
```

Parameters:

- `webp`: *true* in case you have an alternative WebP image.

Output:

```html
<picture>
  <source srcset="./assets/img/folder/filename-without-extension.webp" 
    type="image/webp">
  <img src="./assets/img/folder/filename-without-extension.jpg" 
    width="" height="" alt="" class="">
</picture>
```

**For alternative image sizes**

Twig:

```twig
{% include '/components/images/images.twig' with 
    {
      src:          'folder/filename-without-extension',
      type:         'jpg',
      sourceType:   'sizes',
      srcset:       [600, 1000, 2200]
    }
%}
```

Parameters:

- `sourceType`: *sizes* (activates the settings);
- `srcset`: array of sizes. You should prepare images with **_{size} suffix** (see below in generated HTML).

Output:

```html
<picture>
  <img sizes="" 
    srcset="
      ./assets/img/folder/filename-without-extension_600.jpg 600w, 
      ./assets/img/folder/filename-without-extension_1000.jpg 1000w, 
      ./assets/img/folder/filename-without-extension_2200.jpg 2200w" 
    src="
      ./assets/img/folder/filename-without-extension_2200.jpg" 
    width="" height="" alt="" class="">
</picture>
```

You can set `webp: true` also, so you will get this output then:

```html
<picture>
  <source sizes="" 
    srcset="
      ./assets/img/folder/filename-without-extension_600.webp 600w, 
      ./assets/img/folder/filename-without-extension_1000.webp 1000w, 
      ./assets/img/folder/filename-without-extension_2200.webp 2200w" 
    type="image/webp">
  <img sizes="" 
    srcset="
      ./assets/img/folder/filename-without-extension_600.jpg 600w, 
      ./assets/img/folder/filename-without-extension_1000.jpg 1000w, 
      ./assets/img/folder/filename-without-extension_2200.jpg 2200w" 
    src="./assets/img/folder/filename-without-extension_2200.jpg" 
    width="" height="" alt="" class="">
</picture>
```

**For alternative images depending on the breakpoint (in case you need, let's say, a square picture for a mobile and a landscape picture for everything else).**

Twig:

```twig
{% include '/components/images/images.twig' with 
    {
      src:          'folder/filename-without-extension',
      type:         'jpg',
      sourceType:   'art',
      sourceSet:    [
                      {bpt: 'xs', w: 100, suffix: 'closeup', srcset: [400]},
                      {w: 100, srcset: [600]}
                    ],
    }
%}
```

Parameters:

- `sourceType`: *art* (activates the settings);
- `sourceSet`: one object = one breakpoint. In an object, you define `bpt` (depending on your grid system) in every object but the last one — because it will affect "everything else but previous", `w` for estimated width of the image on this breakpoint in viewport width, `suffix` is a suffix you add to an image name, `srcset` is mostly same as in `sourceSet: 'sizes'` setting, allows to prepare imaged with a different width to choose for a different screen size or resolution (must be a single value or array).

Output:

```html
<picture>         
  <source 
    media="(max-width: 575px)" 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_closeup_400.jpg 400w">
  <img 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_600.jpg 600w" 
    src="./assets/img/folder/filename-without-extension_600.jpg" 
    width="" height="" alt="" class="">
</picture>
```

With `webp: true` will look like this:

```html
<picture>
  <source 
    media="(max-width: 575px)" 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_closeup_400.webp 400w">
  <source 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_600.webp 600w">         
  <source 
    media="(max-width: 575px)" 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_closeup_400.jpg 400w">
  <img 
    sizes="100vw" 
    srcset="./assets/img/folder/filename-without-extension_600.jpg 600w" 
    src="./assets/img/folder/filename-without-extension_600.jpg" 
    width="" height="" alt="" class="">
</picture>
```

Another optional settings which you can use with any of shown above

Twig:

```twig
{% include '/components/images/images.twig' with 
    {
      src:          'folder/filename-without-extension',
      type:         'jpg',
      size:         [2200, 1467],
      alt:          'Alternative text',
      figcaption:   'A figcaption for this lovely image',
      class:        'lazyload',
      attributes:   'data-image="my-image"'   
    }
%}
```

Parameters:

- `size`: width and height of the default image;
- `alt`: alternative text;
- `figcaption:` if not empty, generated `<figure>... <figcaption>TEXT</figcaption></figure>` construction;
- `class`: any needed classes. lazyload makes — what a surprise — lazyloading image;
- `attributes`: any other attributes.

Output:

```html
<figure>
  <img 
    data-src="./assets/img/folder/filename-without-extension.jpg" 
    width="2200" 
    height="1467" 
    alt="Alternative text" 
    class="lazyloaded" 
    data-image="my-image" 
    src="./assets/img/folder/filename-without-extension.jpg">
  <figcaption>A figcaption for this lovely image</figcaption>
</figure>
```

And again with `webp: true` it will look like this:

```html
<figure>
  <picture>
    <source 
      data-srcset="./assets/img/folder/filename-without-extension.webp" 
      type="image/webp" 
      srcset="./assets/img/folder/filename-without-extension.webp">
    <img 
      data-src="./assets/img/folder/filename-without-extension.jpg" 
      width="2200" height="1467" 
      alt="Alternative text" 
      class="lazyloaded" 
      data-image="my-image" 
      src="./assets/img/folder/filename-without-extension.jpg">
  </picture>
  <figcaption>A figcaption for this lovely image</figcaption>
</figure>
```