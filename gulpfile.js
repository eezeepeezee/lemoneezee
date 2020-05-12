/* Const variables for required modiles */

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
// const cache = require('gulp-cached');
const cheerio = require('gulp-cheerio');
const cleaner = require('gulp-clean');
const concat = require('gulp-concat');
const cssParser = require('css');
const cssnano = require('gulp-cssnano');
const data = require('gulp-data');
const del = require('del');
const footer = require('gulp-footer');
const fs = require('fs');
const fsExtra = require('fs-extra');
const gulp = require('gulp');
const header = require('gulp-header');
const inject = require('gulp-inject');
const merge = require('merge-stream');
// const path = require('path');
const plumber = require('gulp-plumber');
const readYaml = require('read-yaml');
const removeEmptyLines = require('gulp-remove-empty-lines');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const sass = require('gulp-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const svgSprite = require('gulp-svg-sprite');
const template = require('gulp-template');
const twig = require('gulp-twig');
const uglify = require('gulp-uglify');


/* Const variable for config */

const configGlobal = './config.yml';


/* Define all paths */

const paths = {
  src: {
    __core:     'src/__core/',
    assets:     'src/assets/',
    components: 'src/components/',
    includes:   'src/includes/',
    layouts:    'src/layouts/',
    pages:      'src/pages/',
  },
  build: 'build/',
};


/* BrowserSync Init and Reload */

function browserSyncInit(done) {
  browserSync.init({
    server: {
      baseDir: 'src',
      index: 'src-pages.html',
    },
    notify: false,
    port: 3000,
  });
  done();
}

function browserSyncReload(done) {
  browserSync.reload();
  done();
}


/* Separate server run for build. No reloads and other tasks */

function runbuild(done) {
  browserSync.init({
    server: {
      baseDir: 'build',
      index: 'src-pages.html',
    },
    notify: false,
    port: 3000,
  });
  done();
}

/* Generating sass, json and js config files for using in different parts of the boilerplate */

function config() {

//  console.log(readYaml.sync('./config.yml'));
  
  return gulp
    .src(`${paths.src.__core}__config/__templates/sass-config.txt`)
    .pipe(plumber({ handleError(err) { console.log(err); this.emit('end'); } }))
    .pipe(template(readYaml.sync(configGlobal)))
    .pipe(rename('_config.sass'))
    .pipe(removeEmptyLines({}))
    .pipe(gulp.dest(`${paths.src.__core}__config/`));    
  
}


/* Generate layout helpers template */

function layoutHelpers() {
  return gulp
    .src([`${paths.src.__core}__layout-helpers/layout-helpers.twig`])
    .pipe(data(() => readYaml.sync(configGlobal)))
    .pipe(twig())
    .pipe(gulp.dest(`${paths.src.__core}__layout-helpers/`));
}


/* Compiling twig into html from ./src/pages based on twig-templates from ./src/{components|includes|layouts} */

/* Delete all generated files */

function htmlClean() {
  return gulp
    .src([`src/*.html`], { read: false, force: true })
    .pipe(cleaner());
}


/* Compile html from ./src/pages */

function htmlPages() {
  return gulp
    .src([`${paths.src.pages}*.twig`])
    .pipe(plumber({ handleError(err) { console.log(err); this.emit('end'); } }))
    .pipe(data(() => readYaml.sync(configGlobal)))
    .pipe(twig({ base: 'src/' }))
    .pipe(gulp.dest('src'));
}


/* Put links for all generated html */

function htmlLinks() {
  return gulp
    .src(`${paths.src.__core}src-pages.html`)
    .pipe(plumber({ handleError(err) { console.log(err); this.emit('end'); } }))
    .pipe(inject(
      gulp.src(['src/*.html', '!src/src-pages.html'], { read: false }), {
        transform(filepath) {
          filepath = filepath.split('/src/').join('');
          if (filepath.slice(-5) === '.html') {
            return `<li><a href="${filepath}">${filepath}</a></li>`;
          }
          return inject.transform.apply(inject.transform);
        },
      },
    ))
    .pipe(gulp.dest('src'));
}


const html = gulp.series(htmlClean, htmlPages, htmlLinks);


/* Compiling Sass into common style.min.css and divided __libs/ */

/* Compiling all sass into src/assets/css/** */

function cssCompile() {
  return gulp
    .src([`${paths.src.__core}__core-sass/**/*.sass`])
    .pipe(plumber({ handleError(err) { console.log(err); this.emit('end'); } }))
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(sassGlob())
    .pipe(sass({ errLogToConsole: true }))
    .pipe(autoprefixer(['last 10 versions', '> 1%', 'IE 11'], { cascade: true }))
    .pipe(cssnano({ autoprefixer: false, zindex: false, reduceIdents: false, colormin: false }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(`${paths.src.assets}css/`));
}


/* Placing link[rel=stylesheet] into includes/head.twig. Manually put normalize.min.css first */

function cssPlace() {
  return gulp
    .src(`${paths.src.includes}head.twig`)
    .pipe(inject(gulp.src([
      `${paths.src.assets}css/libs/normalize.min.css`,
      `${paths.src.assets}css/libs/*.css`,
      `${paths.src.assets}css/*.css`],
    { read: false }),
    {
      transform(filepath) {
        let filepathSave = filepath;
        if (filepathSave) {
          filepathSave = filepath.split('src/').join('');
          return `<link rel="stylesheet" href="${filepathSave}">`;
        }
        return inject.transform.apply(inject.transform);
      },
    }))
    .pipe(gulp.dest(paths.src.includes));
}


const css = gulp.series(cssCompile, cssPlace);


/* Compiling JS */

function jsComponents() {
  /* Compile common.js and other default js if will be */

  const jsCommon = gulp
    .src([`${paths.src.__core}__core-js/*.js`])
    .pipe(babel())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(`${paths.src.assets}js/`));


  /* Compiling components.min.js from separate js-files */

  const jsComponentsBundle = gulp
    .src([`${paths.src.components}**/*.js`, `!${paths.src.components}**/%*.js`])
    .pipe(sourcemaps.init({largeFile: true}))
    .pipe(concat('components.min.js'))
    .pipe(header('window.addEventListener(\'load\', function() {'))
    .pipe(footer('});'))
    .pipe(babel())
    .pipe(sourcemaps.write('/maps'))
    .pipe(gulp.dest(`${paths.src.assets}js/`));


  /* Get separate js-files, marked with % */

  const jsComponentsSeparate = gulp
    .src([`${paths.src.components}**/%*.js`])
    .pipe(rename((path) => {
      const pathSave = path;
      pathSave.dirname = '/';
      pathSave.basename = path.basename.split('%').join('');
      pathSave.basename += '.min';
      return pathSave;
    }))
    .pipe(babel())
    .pipe(gulp.dest(`${paths.src.assets}js/`));


  return merge(jsCommon, jsComponentsBundle, jsComponentsSeparate);
}


/* Placing script[src] into includes/scripts.twig: base libs, assets libs, base js, layout-helpers and compiled components */

function jsPlace() {
  return gulp
    .src(`${paths.src.includes}scripts.twig`)
    .pipe(inject(gulp.src([
      `${paths.src.__core}__core-js/libs/*.js`,
      `${paths.src.assets}js/libs/*.js`,
      `${paths.src.__core}__layout-helpers/layout-helpers.js`,
      `${paths.src.assets}js/common.min.js`,
      `${paths.src.assets}js/components.min.js`],
    { read: false }),
    {
      transform(filepath) {
        if (filepath) {
          filepath = filepath.split('src/').join('');
          return `<script src="${filepath}"></script>`;
        }
        return inject.transform.apply(inject.transform);
      },
    }))
    .pipe(gulp.dest(paths.src.includes));
}


const js = gulp.series(jsComponents, jsPlace);


/* Creating SVG-sprite from all .svg files in src/assets/img/icons/src */

function svgIconsSprite() {
  return gulp
    .src([`${paths.src.assets}img/icons/src/*.svg`])
    .pipe(plumber({ handleError(err) { console.log(err); this.emit('end'); } }))
    .pipe(svgmin({ js2svg: { pretty: true } }))
    .pipe(cheerio({
      run($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
        $('style').remove();
      },
      parserOptions: { xmlMode: true },
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({ mode: { symbol: { sprite: '../sprite.svg' } } }))
    .pipe(gulp.dest([`${paths.src.assets}img/icons/`]));
}


/* Clean build folder before build task */

function clean() {
  return del(`${paths.build}**/*.*`);
}


/* Tasks for build */

function buildHtml() {
  /* Update css and js import right into src/*.html */

  return gulp
    .src(['src/*.html'])
    .pipe(replace(
      /<!-- inject:css -->(.*?(\r?\n))+.*?(css">)(\r?\n)?<!-- endinject -->/g,
      '<link rel="stylesheet" href="/assets/css/libs.min.css">\r\n<link rel="stylesheet" href="/assets/css/common.min.css">\r\n<script>if(\'CSS\' in window&&CSS.supports(\'color\',\'var(--color-var)\')){}else{document.write(\'<link rel="stylesheet" href="/assets/css/common.default.min.css">\')}</script><noscript><link rel="stylesheet" href="/assets/css/common.default.min.css"></noscript>',
    ))
    .pipe(replace(
      /<!-- inject:js -->(.*?(\r?\n))+.*?(script>)(\r?\n)?<!-- endinject -->/g,
      '<script src="/assets/js/libs.min.js"></script>\r\n<script src="/assets/js/common.min.js"></script>\r\n<script src="/assets/js/components.min.js"></script>',
    ))
    .pipe(gulp.dest(paths.build));
}


function buildCss() {
  /* Object to keep color schemes with variables in it */
  const colorVarsSet = {};

  /* All css variables for colors */
  let colorVarsCss = fs.readFileSync(`${paths.src.assets}css/color-vars.min.css`, 'utf8');
  
  /* Get rid of maps block and extra :root selector */
  colorVarsCss = colorVarsCss.replace(/\r?\n*?\/\*#(.*?)\*\//g, '');
  colorVarsCss = colorVarsCss.replace(/:root,/g, '');
  
  /* Split all color schemes into temporary array depending on :root */
  let c = [];
  c = colorVarsCss.split(':root');

  /* Regexp to clear string with variables */
  const s = /\[data-scheme=.*?\]/gm;

  /* Loop through [data-scheme=*] { variables } */
  c.forEach((varsSet) => {

    /* This is a fucking trick */
    if (varsSet.length > 1) {
      /* Get rid of curly bracets */
      varsSet = varsSet.replace(/{|(}(\\n)?)/g, '');
      
      /* Get scheme name with 's' regexp */
      let colorSchemeName = varsSet.match(s)[0].replace('[data-scheme=', '').replace(']', '');
      colorSchemeName = `"${colorSchemeName}"`;

      /* Create subarray for current color scheme */
      colorVarsSet[colorSchemeName] = {};

      /* Loop through string, convert it into array and create subarray 'var-name': 'var-value' */
      const colors = varsSet.replace(s, '').split(';');

      colors.forEach((color) => {
        color = color.split(':');
        colorVarsSet[colorSchemeName][color[0]] = color[1];
      });
    }
  });
  

  /* Get initial common.min.css and parse it into object */

  const commoncss = fs.readFileSync(`${paths.src.assets}css/common.min.css`, 'utf8');
  let cssParsed = cssParser.parse(commoncss);

  let rules = cssParsed.stylesheet.rules;
  rules = rules.filter((item) => item.type !== 'import');
  
  function matchRule(rule) {
    if (Object.prototype.hasOwnProperty.call(rule, 'declarations')) {
      rule.declarations = rule.declarations.filter((item) => item.value.match(/var\(--c/) !== null);
    }    
  }
  
  rules.forEach((rule) => {
    if (rule.type === 'rule') {
        matchRule(rule);
    } else if (rule.type === 'media') {
      rule.rules.forEach((rule) => {
          matchRule(rule);
      });
    }
  });

  cssParsed.stylesheet.rules = rules;

  /* Stringify and back to get rid of null objects */
  
  cssParsed = JSON.stringify(cssParsed);
  cssParsed = cssParsed.replace(/null,/g, '');
  cssParsed = cssParsed.replace(/,null/g, '');
  cssParsed = JSON.parse(cssParsed);
  cssParsed = cssParser.stringify(cssParsed);

  /* Loop though color schemes and create separate style files */
  Object.entries(colorVarsSet).forEach(([colorSchemeName, colorSchemeData]) => {

    /* Get color scheme name for color suffix */
    const fileSuffix = colorSchemeName.replace(/"/g, '');

    /* Create new css string and copy parsed one into it */
    let cssToSave = cssParsed;
    
    /* Loop through every color var and replace with its value in a css string */
    Object.entries(colorSchemeData).forEach(([varName, varValue]) => {

      const regex = new RegExp(`var\\(${varName}(,[\(\)a-zA-Z0-9,#]*)?\\)`, 'g');
      cssToSave = cssToSave.replace(regex, varValue);
      
    });
    
    /* Need to clear unnested properties for colors which weren'r reassigned */
    const regex = new RegExp(`rgba\\(var\\(--c-(.*?)\\)?\\),?[.0-9]*?\\)`, 'g');    
    cssToSave = cssToSave.replace(regex, '');
    
    /* Create dir if not exists */
    fsExtra.ensureDirSync(`${paths.build}assets/css/`);

    /* Create file for every color scheme and minify it */
    fs.writeFile(`${paths.build}assets/css/common.${fileSuffix}.min.css`, cssToSave, (err) => {
      if (err) { console.log(err); } else {
        return gulp.src(`${paths.build}assets/css/common.${fileSuffix}.min.css`)
          .pipe(cssnano({ autoprefixer: false, zindex: false, reduceIdents: false }))
          .pipe(gulp.dest(`${paths.build}assets/css/`));
      }
      return false;
    });
  });


  /* Compile all css libs into one */

  const buildCssLibs = gulp
    .src([`${paths.src.assets}css/libs/*.css`])
    .pipe(concat('libs.min.css'))
    .pipe(cssnano({ autoprefixer: false, zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(`${paths.build}assets/css/`));


  /* Build color-vars.min.css and common.min.css into one */

  const buildCssCommon = gulp
    .src([`${paths.src.assets}css/color-vars.min.css`, `${paths.src.assets}css/common.min.css`])
    .pipe(concat('common.min.css'))
    .pipe(cssnano({ autoprefixer: false, zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(`${paths.build}assets/css/`));


  /* Move separate css files but layout-helpers */

  const buildCssSeparate = gulp
    .src([`${paths.src.assets}css/**/*.css`, `!${paths.src.assets}css/libs/*.css`, `!${paths.src.assets}css/color-vars.min.css`, `!${paths.src.assets}css/common.min.css`, `!${paths.src.assets}css/layout-helpers.min.css`])
    .pipe(cssnano({ autoprefixer: false, zindex: false, reduceIdents: false }))
    .pipe(gulp.dest(`${paths.build}assets/css/`));


  return merge(buildCssLibs, buildCssCommon, buildCssSeparate);
}


function buildFonts() {
  /* Moving fonts */

  return gulp
    .src([`${paths.src.assets}fonts/**/*.*`])
    .pipe(gulp.dest(`${paths.build}assets/fonts/`));
}


function buildImg() {
  /* Moving images */

  return gulp
    .src([`${paths.src.assets}img/**/*.*`])
    .pipe(gulp.dest(`${paths.build}assets/img/`));
}


function buildJs() {
  /* Compile all js libs into one */

  const buildJsLibs = gulp
    .src([`${paths.src.__core}__core-js/libs/*.js`, `${paths.src.assets}js/libs/*.js`])
    .pipe(babel())
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.build}assets/js/`));


  /* Compile common.js */

  const buildJsCommon = gulp
    .src([`${paths.src.__core}__core-js/common.js`])
    .pipe(rename({ suffix: '.min' }))
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.build}assets/js/`));


  /* Compile separate components (everything but libs) */

  const buildJsComponents = gulp
    .src([`${paths.src.assets}js/**/*.js`, `!${paths.src.assets}js/libs/*.js`])
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(`${paths.build}assets/js/`));

  return merge(buildJsLibs, buildJsCommon, buildJsComponents);
}


/* Preparing whole src before watch or build */

const srcPrepare = gulp.series(config, layoutHelpers, css, js, html, svgIconsSprite);


/* Watcher */

function watchFiles() {
  gulp.watch(['src/{components,includes,layouts,pages}/**/*.twig'], gulp.series(html, browserSyncReload));
  gulp.watch([`${paths.src.__core}__core-sass/**/*.sass`, 'src/{components,layouts,pages}/**/*.sass'], gulp.series(css, browserSyncReload));
  gulp.watch([`${paths.src.assets}img/**/*.*`], browserSyncReload);
  gulp.watch([`${paths.src.__core}__core-js/common.js`, `${paths.src.assets}js/*.js`, `!${paths.src.assets}js/*.min.js`, `${paths.src.components}**/*.js`], gulp.series(js, browserSyncReload));
}


/* Watcher and builder series */

const watch = gulp.series(srcPrepare, gulp.parallel(watchFiles, browserSyncInit));
const build = gulp.series(clean, srcPrepare, gulp.parallel(buildHtml, buildCss, buildFonts, buildImg, buildJs));


/* Available tasks from command line */
exports.config    = config;
exports.watch     = watch;
exports.build     = build;
exports.runbuild  = runbuild;
exports.default   = watch;
