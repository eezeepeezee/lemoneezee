![LemonEezee frontend-template](https://raw.githubusercontent.com/eezeepeezee/lemoneezee/master/docs/src/logo_lemoneezee.png "LemonEezee frontend-template")

# LemonEezee

![GitHub last commit](https://img.shields.io/github/last-commit/eezeepeezee/lemoneezee)
![GitHub](https://img.shields.io/github/license/eezeepeezee/lemoneezee)
![node-current](https://img.shields.io/node/v/fs-extra)
![David](https://img.shields.io/david/dev/eezeepeezee/lemoneezee)


Yet another frontend-template. Or framework. Or boilerplate. Whatever.

## What is LemonEezee?

LemonEezee is a fully configurable and not overstyled frontend-template that helps quickly start projects from scratch. It provides a wide range of tasks to automate the web-developing process and has some nice functions inside to make this process more precise.

## Requirements

* [Node.js >= v.10 (with npm)](https://nodejs.org/en/)
* [Gulp](https://www.npmjs.com/package/gulp)


## Installation and quick start

Get the repo onto your local machine (or download zip):

```bash
$ git clone https://github.com/eezeepeezee/lemoneezee.git my-awesome-project
```

Install npm packages:

```bash
$ cd my-awesome-project
$ rm -rf .git
$ npm i
```

Start working:

```bash
$ gulp watch
```

> While it is still alpha, full manual will be published later.

## Who may need this?

Mostly, individual developers and small teams who don't want to waste time for organizing workflow instead of doing work itself.

## What are the key ideas of LemonEezee?

1. **Easy configuring with your exact preferences**

   Setup your own breakpoints — even the names, if you don't like "sm" or "xl" prefixes. Need 16 columns in your grid system? Or 8? Or 32? Doesn't matter. You will automatically get CSS-classes like `col-sm-10` or `col-md-24` depending on your choice (and also some universal like `col-half` and `col-quarter`).   
   In addition to the grid, you can configure the color system, spacers, and typography — and get a bunch of CSS classes, Sass functions, and mixins, code snippets, and other things to use in your project.

2. **Lots of automated tasks not to waste your time**

   You won't forget to include your stylesheets or scripts into your page — it will be done automatically. Need a sprite of SVG icons? Just put them into one folder. Do you care about prefixes in CSS? Or correct fonts including? It is all already tuned. You will spend an hour to know how it works and then forget about doing it by yourself.

3. **Some nice helping features**

   With Layout Helpers module you will get some nice stuff like visualizing guides and breakpoints, "mouse killer" to test your UI in keyboard-only, and a couple more cool things.

## Skills requirements

- **HTML5**, **CSS3** and **Sass**, **Vanilla JS**, a little bit of **Twig**.
- Know how to run commands in terminal and be familiar with **Node.js** and **NPM** (if you are not aware of any of those — it is worth spending couple hours on YouTube and you're one level up).

## Thanks and credits

![LemonEezee frontend-template](https://raw.githubusercontent.com/eezeepeezee/lemoneezee/master/docs/src/logo_browserstack.png "LemonEezee frontend-template")

[Browserstack](https://www.browserstack.com/) for the great opportunity of free testing for open source projects.

There are some great third-party libraries and technologies which make LemonEezee much more better. 

- [details-element-polyfill](https://github.com/javan/details-element-polyfill) by Javan Makhmali
- [fastclick](https://github.com/ftlabs/fastclick) by FT Labs
- [lazysizes](https://github.com/aFarkas/lazysizes) by Alexander Farkas
- [picturefill](https://github.com/scottjehl/picturefill) by Scott Jehl
- [svgxuse](https://github.com/Keyamoon/svgxuse) by Keyamoon

## Contributors

My name is Misha Frunze, I do web and design with my team [Eezeepeezee](https://eezeepeezee.ru). Not a great JS-coder.