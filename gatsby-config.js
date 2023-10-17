/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `probtab`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
      __key: "pages"
    },
    // Add configurations for each tutorial
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "Complexity Theory",
        "path": "./src/pages/tutorials/"
      },
      __key: "comp_tutorial"
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "Partial Orders",
        "path": "./src/pages/tutorials/"
      },
      __key: "poset_tutorial"
    },
  ],
};
