module.exports = function(eleventyConfig) {
  // Passthrough copy assets and admin CMS files
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/admin");

  // UMKM Collection
  eleventyConfig.addCollection("umkm", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/umkm/*.md");
  });

  // Galeri Collection
  eleventyConfig.addCollection("galeri", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/galeri/*.md");
  });

  // Safe JSON Filter for Alpine.js data binding
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      data: "data",
      output: "_site"
    },
    templateFormats: ["html", "njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
