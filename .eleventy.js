const pluginSEO = require("eleventy-plugin-seo");
const pluginSass = require("eleventy-plugin-sass");


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
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
  eleventyConfig.addPlugin(pluginSass, {
    watch: ['src/**/*.{scss,sass}', '!node_modules/**'],
    outputDir: './_dist/',
    autoprefixer: true
  });

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: '_dist'
    }
  };
};
