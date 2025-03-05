/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
      title: "Kierz.io - Futuristic Portfolio",
      description: "Portfolio site showcasing creative digital experiences at the intersection of technology and design",
      author: "@kierzio",
      siteUrl: "https://kierz.io",
    },
    plugins: [
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-image",
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "images",
          path: `${__dirname}/src/images`,
        },
      },
      "gatsby-plugin-postcss",
      {
        resolve: "gatsby-plugin-manifest",
        options: {
          name: "Kierz.io Portfolio",
          short_name: "Kierz.io",
          start_url: "/",
          background_color: "#0d0d0d",
          theme_color: "#00f0ff",
          display: "minimal-ui",
          icon: "static/images/icon.png", // Path to your site icon
        },
      },
    ],
  };