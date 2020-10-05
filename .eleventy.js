const pluginInjector = require("@infinity-interactive/eleventy-plugin-injector");
const debounce = require('lodash/debounce');
const mkdirp = require('mkdirp');

const fs = require('fs');
const glob = require('glob');
const path = require('path');
const pluginSEO = require("eleventy-plugin-seo");
const pluginSass = require("eleventy-plugin-sass");

const input = 'src';
const output = '_dist';

const bannerizerInput = path.join('./', input, 'js/bannerizer.js');
const bannerizerOutput = path.join('./', output, 'js/bannerizer.js');

const debouncedWriter = debounce(async function(instance, options, file) {
  let content = fs.readFileSync(bannerizerInput, { encoding: 'utf8' });
  let bgImages = glob.sync(path.join('./', input, '/images/banners/*'));
  //console.log(content);
  bgImages = bgImages.map(img => '"/' + path.relative('./src/', img) + '"').join(',\n')
  content = content.replace(/\/\/ bgimages/ig, bgImages);
  //console.log(bgImages);
  //console.log(content);
  //console.log('writing to: ', bannerizerOutput);
  mkdirp.sync(path.join('./', output, 'js/'));
  fs.writeFileSync(bannerizerOutput, content, { encoding: 'utf8' });
}, 500, { leading: true, trailing: false});

module.exports = function(eleventyConfig) {
  // Add a filter using the Config API
  eleventyConfig.setTemplateFormats([
    "md",
    "css"
  ]);
  eleventyConfig.addPassthroughCopy({ "src/**/*.png": "" });
  eleventyConfig.addPassthroughCopy({ "src/**/*.jpg": "" });
  eleventyConfig.addPassthroughCopy({ "src/**/*.gif": "" });
  eleventyConfig.addPassthroughCopy({ "src/favicon.ico": "" });
  eleventyConfig.addPassthroughCopy({ "src/**/*.htm": "" });
  eleventyConfig.addPassthroughCopy({ "src/**/*.html": "" });
  eleventyConfig.addPassthroughCopy({ "src/**/!(bannerizer).js": "" });
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['src/**/*.{scss,sass}', '!node_modules/**'],
    outputDir: './_dist/',
    autoprefixer: true
  });

  eleventyConfig.addFilter('getMdContent', function (content) {
    const tokens = content.split(/<p>[%]{3,}<\/p>/g);
    //console.log(tokens);
    if (tokens.length > 1) {
      return tokens[1];
    }
    return tokens[0];
  });

  eleventyConfig.addFilter('getMdHeader', function (content) {
    const tokens = content.split(/<p>[%]{3,}<\/p>/g);
    if (tokens.length > 1) {
      return tokens[0];
    }
    return '';
  });

  eleventyConfig.addPairedShortcode('scripture', function (content, verse) {
    return `<p class="scripture"><span class="verse">${verse}</span> ${content}</p>`
  });

  eleventyConfig.addShortcode('links', function () {
    return `<p class="links"><span>Links</span></p>`;
  })

  eleventyConfig.addPlugin(pluginInjector, {
    watch: [path.join('./', input, 'js/bannerizer.js'), path.join('./', input, '/images/banners/')],
    inject: debouncedWriter,
    debug: true
  });

  // You can return your Config object (optional).
  return {
    dir: {
      input: input,
      output: output
    }
  };
};
