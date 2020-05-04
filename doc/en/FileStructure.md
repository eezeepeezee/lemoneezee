# LemonEezee File Structure

## Initial file structure

Once you downloaded repository you will see the following folders and files (not going to dig deeper right away to not making it too complicated now):

```bash
lemoneezee/
├── app/
│   ├── __core/
│   ├── assets/
│   ├── components/
│   ├── includes/
│   ├── layouts/
│   ├── pages/
│   ├── app-pages.html
│   └── le_index.html
├── doc/
├── .babelrc
├── .gitignore
├── .nvmrc
├── .eslintrc.js
├── config.yml
├── config-default.yml
├── gulpfile.js
├── LICENSE
├── package.json
├── package-lock.json
└── ReadMe.md
```

This system is even more simple than it seems to be. 

First, two little rules for the whole framework:

1. **__{foldername}** — if folder name starts with two underscores (now it is `app/__core/` and everything inside it), it means, that it is vital and may be fully updated on every next release, so you'd better don't touch it at all. Or at your own risk. 
2. **le_{foldername/filename}** — if the folder or file name starts with **"le_"**, it means that this is an example of something (e.g. component or layout) and can be used after copying it and removing the prefix. It may also be updated on any of the next releases. 

## What is what

Let's see how simple is the file structure, what it is for, and how to use it properly. This manual is a common overview, and all the details will be published in the docs later.

### `app/__core/`

No surprise, it is a core of the framework. It contains configuration, scripts, styles, and Layout Helpers module.

### `app/assets/`

Folder for static files. By default, contains `css/`, `fonts/`, `img/`, `js/` and `video/` subfolders. You can add any folders and files here, but be careful with `css/` and `/js` — all the styles and scripts, including libs, automatically compiles into that folders, you will see them after the initial run.

### `app/components/`

This one is for components that can be included in different parts of the project. You can create your own or use one of the predefined set (will be uploaded later). Every component is usually a folder named `{component-name}/` with 3 files inside: `{component-name}.sass`, `{component-name}.js` and `{component-name}.twig`.

### `app/includes/`

This folder contains blocks of code that are not basically a part of the layout. By default, it is **head** and **scripts** templates with some cool automatization features. 

### `app/layouts/`

Here we keep layouts templates. A layout template is a Twig template in which you put content later. The default template already includes head and scripts from `app/includes/`, so you will see an example of how to use it.

### `app/pages/`

Here we create pages itself, but only a part with the content (usually between `<body><div class="wrapper"></div></body>` tags). It should extend a layout template from `app/layouts/` and will be compiled into .html with the same name in the root of `app/` folder.

### `app/app-pages.html`

This is a nice feature. This file is automatically compiled with the list of all pages you create in `app/pages/`. Once you're running a development server, you will see this file as an index file with the list of links to every compiled HTML-file.

### `doc/`

All the manuals. You may put it into .gitignore on your own project.

### `config.yml` (and `config-default.yml`)

This is the most useful file in the framework. Here you configure everything: colors, grids, spacers, typography to use it in templates and styles — and there will be an additional manual for this (though it is still simple, you need half an hour to remember what is what). File `config.yml` is an initial copy of `config-default.yml` which will be updated in case we will do some new stuff for configuration — so you can delete it or keep if you want to have a reference of default settings. 

There are plenty of powerful things to configurate even after you've made lots of work on your project — we'll see it later.

### Other files in the root folder

As a web developer, you should be familiar with other files like `package.json` or `.babelrc`, if not — you can simply google what is that for, but all in all, you don't really need to make anything with them.