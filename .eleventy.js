const pluginSEO = require("eleventy-plugin-seo");
const pluginSass = require("eleventy-plugin-sass");


module.exports = function(eleventyConfig) {
  // Add a filter using the Config API
  eleventyConfig.setTemplateFormats([
    "md",
    "css",
    "jpg",
    "png",
    "gif",
    "htm",
    "html"
  ]);
  eleventyConfig.addPlugin(pluginSEO, require("./src/_data/seo.json"));
  eleventyConfig.addPlugin(pluginSass, {});

  // You can return your Config object (optional).
  return {
    dir: {
      input: "src",
      output: '_dist'
    }
  };
};
