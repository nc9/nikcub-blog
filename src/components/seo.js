/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, meta, title, article, page }) {
  const { site, logo_small, logo_large } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            title
            description
            author
          }
        }
        logo_small: file(name: { eq:"nik" }) {
          childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(width: 60, height: 60) {
                base64
                tracedSVG
                aspectRatio
                width
                height
                src
                srcSet
                srcWebp
                srcSetWebp
                originalName
              }
          }
        }
        logo_large: file(name: { eq:"nik" }) {
          childImageSharp {
              # Specify the image processing specifications right in the query.
              # Makes it trivial to update as your page's design changes.
              fixed(width: 125, height: 125) {
                base64
                tracedSVG
                aspectRatio
                width
                height
                src
                srcSet
                srcWebp
                srcSetWebp
                originalName
              }
          }
        }
      }
    `
  )

  // console.log("article", article)
  // console.log("page", page)
  // console.log("site", site)
  // console.log("logo_small", logo_small)

  const metaDescription = description || site.siteMetadata.description

  let schemaArticle = null

  const orgBreadcrumb = (site, article, type) => {

    if (type === "page") {
      return ({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Nik Cubrilovic",
          "item": `${site.siteMetadata.siteUrl}`
        },{
          "@type": "ListItem",
          "position": 2,
          "name": article.frontmatter.title,
          "item": `${site.siteMetadata.siteUrl}/${article.fields.slug}`
        }]
      })
    }

    return ({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Nik Cubrilovic",
        "item": `${site.siteMetadata.siteUrl}`
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Posts",
        "item": `${site.siteMetadata.siteUrl}/posts`
      },{
        "@type": "ListItem",
        "position": 3,
        "name": article.frontmatter.title,
        "item": `${site.siteMetadata.siteUrl}/posts/${article.fields.slug}`
      }]
    })
  }

  const orgCreator = (input, site) => ({
    '@context': 'http://schema.org',
    '@id': `${site.siteMetadata.siteUrl}/#${input}`,
    '@type': 'Organization',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AU',
      addressLocality: '',
      postalCode: '',
    },
    name: 'Nik Cubrilovic',
    description: metaDescription,
    url: site.siteMetadata.siteUrl,
    foundingLocation: 'Australia',
    image: {
      '@type': 'ImageObject',
      url: logo_large.childImageSharp.fixed.src,
      height: '512',
      width: '512',
    },
    logo: {
      '@type': 'ImageObject',
      url: logo_small.childImageSharp.fixed.src,
      height: '60',
      width: '60',
    },
    sameAs: [
      'https://github.com/nikcub',
      'https://twitter.com/nikcub',
      'https://twitter.com/dir',
      'https://en.wikipedia.org/wiki/Nik_Cubrilovic',
      'https://youtube.com/nik',
    ],
  })

  if (article) {
    schemaArticle = {
      '@context': 'http://schema.org',
      '@type': 'Article',
      author: {
        '@id': `${site.siteMetadata.siteUrl}/#identity`,
      },
      copyrightHolder: {
        '@id': `${site.siteMetadata.siteUrl}/#identity`,
      },
      // copyrightYear: postNode.first_publication_date,
      creator: {
        '@id': `${site.siteMetadata.siteUrl}/#creator`,
      },
      publisher: {
        '@id': `${site.siteMetadata.siteUrl}/#creator`,
      },
      datePublished: article.frontmatter.date,
      dateModified: article.fields.date_modified,
      // dateModified: postNode.last_publication_date,
      description,
      headline: title,
      inLanguage: 'en',
      // url: URL,
      name: title,
      image: {
        '@type': 'ImageObject',
        url: article.frontmatter.featureImg ? article.frontmatter.featureImg.childImageSharp.fluid.src : "",
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://google.com/article"
      },
    }
  }

  const orgPage = (site, page) => ({
    '@context': 'http://schema.org',
    '@type': 'Article',
    author: {
      '@id': `${site.siteMetadata.siteUrl}/#identity`,
    },
    copyrightHolder: {
      '@id': `${site.siteMetadata.siteUrl}/#identity`,
    },
    // copyrightYear: postNode.first_publication_date,
    creator: {
      '@id': `${site.siteMetadata.siteUrl}/#creator`,
    },
    publisher: {
      '@id': `${site.siteMetadata.siteUrl}/#creator`,
    },
    datePublished: page.frontmatter.date,
    dateModified: page.frontmatter.date_modified,
    // dateModified: postNode.last_publication_date,
    description: page.excerpt,
    headline: page.frontmatter.title,
    inLanguage: 'en',
    // url: URL,
    name: page.frontmatter.title,
    image: {
      '@type': 'ImageObject',
      url: page.frontmatter.featureImg ? page.frontmatter.featureImg.childImageSharp.fluid.src : "",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": "https://google.com/article"
    },
  })

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`${site.siteMetadata.title} > %s `}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      { article && <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script> }
      { page && <script type="application/ld+json">{JSON.stringify(orgPage(site, page))}</script> }
      { article && <script type="application/ld+json">{JSON.stringify(orgBreadcrumb(site, article, "posts"))}</script> }
      { page && <script type="application/ld+json">{JSON.stringify(orgBreadcrumb(site, page, "page"))}</script> }
      <script type="application/ld+json">{JSON.stringify(orgCreator('identity', site))}</script>
      <script type="application/ld+json">{JSON.stringify(orgCreator('creator', site))}</script>
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
