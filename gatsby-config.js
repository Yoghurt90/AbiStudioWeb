const path = require("path");
const { title, keywords, description, author, defaultLang, trackingId } = require("./config/site");

module.exports = {
  siteMetadata: {
    title,
    keywords,
    description,
    author,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: title,
        short_name: "Agency",
        start_url: "/",
        background_color: "#ffffff",
        theme_color: "#fed136",
        display: "minimal-ui",
        icon: "content/assets/images/AbiCameraIconPNG.png",
      },
    },
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "markdown",
        path: `${__dirname}/content`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/content/assets/images`,
      },
    },
    {
      resolve: "custom-source-youtube",
      options: {
        // Comma-separated list of the YouTube playlist ID(s)
        playlistId: "PL3XLvoaGQ93sOiAXWY4MnUNW-bKuZNViP,PL3XLvoaGQ93sxgN6CxqocjddGm6b0GpX6",
        apiKey: 'AIzaSyD8vCUsEkHYr9IkUTFOR6GjRqvmm6Ngzj8',
        debug: true,
      },
    },
    // {
    //   resolve: `gatsby-source-youtube-v2`,
    //   options: {
    //     channelId: ['UCSZVBxTQFzR6xZ0WSNlRZSA'],
    //     apiKey: 'AIzaSyD8vCUsEkHYr9IkUTFOR6GjRqvmm6Ngzj8',
    //     maxVideos: 50 // Defaults to 50
    //   },
    // },
    // {
    //   resolve: `gatsby-source-vimeo`,
    //   options: {
    //     clientID: '70df0f11ea76b8a22b090cb42972d173ac3a4a27',
    //     clientSecret: 'znq6dZEjiqg1lP/GFwNi8NMhKuTjq6DhRoxYWkH71TZneFk77FZpoz8sseBqUu/cp335cKDfBUxnU2L72Job2yT1w/GtGt1BuiDzPrNN+CxAgJaUeSrpGPjvkDfS1zaQ',
    //     userID: 'omgvisuals',
    //   },
    // },
    "gatsby-plugin-eslint",
    "gatsby-plugin-material-ui",
    "gatsby-plugin-react-helmet",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sharp",
    "gatsby-plugin-offline",
    "gatsby-plugin-anchor-links",
    {
      resolve: "gatsby-plugin-sass",
      options: {
        data: `@import "core.scss";`,
        includePaths: [path.resolve(__dirname, "src/style")],
      },
    },
    {
      resolve: "gatsby-plugin-google-fonts",
      options: {
        fonts: [
          `Montserrat\:400,700`,
          `Kaushan+Script`,
          `Droid+Serif\:400,700,400i,700i`,
          `Roboto+Slab\:400,100,300,700`,
        ],
      },
    },
    {
      resolve: "gatsby-plugin-i18n",
      options: {
        langKeyDefault: defaultLang,
        useLangKeyLayout: false,
        pagesPaths: ["/content/"],
      },
    },
  ],
};
