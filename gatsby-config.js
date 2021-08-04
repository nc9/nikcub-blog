module.exports = {
  siteMetadata: {
    siteUrl: 'https://nikcub.me',
    title: 'Nik Cubrilovic',
    author: 'Nik Cubrliovic',
    description: 'A weblog by Nik Cubrilovic',
    twitter: 'nikcub',
    social: [
      {
        name: 'twitter',
        url: 'https://twitter.com/nikcub',
      },
      {
        name: 'github',
        url: 'https://github.com/nc9',
      },
    ],
  },
  mapping: { 'Mdx.fields.featuredImage': 'File.absolutePath' },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-react-helmet-canonical-urls',
      options: {
        siteUrl: 'https://nikcub.me',
        // noTrailingSlash: true,
      },
    },
    'gatsby-plugin-emotion',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    'gatsby-plugin-theme-ui',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        exclude: ['/test-post'],
      },
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-149334218-1',
      },
    },
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'nikcub.me',
      },
    },
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 960,
              linkImagesToOriginal: false,
            },
          },
          // { resolve: 'gatsby-remark-copy-linked-files' },
          { resolve: 'gatsby-remark-smartypants' },
        ],
        plugins: ['gatsby-remark-images'],
        remarkPlugins: [require('remark-slug')],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './content/pages',
        name: 'mdx-pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './content/assets',
        name: 'assets',
      },
    },
  ],
}
