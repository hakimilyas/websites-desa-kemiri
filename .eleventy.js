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

  // Berita Collection (sorted latest to oldest)
  eleventyConfig.addCollection("berita", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/berita/*.md").sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  });

  // Safe JSON Filter for Alpine.js data binding
  eleventyConfig.addFilter("json", function(value) {
    return JSON.stringify(value);
  });

  // Readable Date Filter in Indonesian
  eleventyConfig.addFilter("readableDate", function(dateObj) {
    if (!dateObj) return "";
    const date = new Date(dateObj);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
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
