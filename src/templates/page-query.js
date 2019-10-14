import { graphql } from "gatsby"

import PagePage from "../components/PagePage"

export default PagePage

export const query = graphql`
  query PagePage($id: String!) {
    site {
      siteMetadata {
        title
        social {
          name
          url
        }
      }
    }
    mdx(id: { eq: $id }) {
      id,
      excerpt,
      body
      fields {
        slug
        date
        date_modified
        git_modified

      }
      frontmatter {
        title
        date
        # date(formatString: "MMMM DD, YYYY")
        featureImg: featureImage {
          id
          childImageSharp {
            fluid(maxWidth: 960) {
              aspectRatio
              presentationWidth
              # base64
              tracedSVG
              aspectRatio
              src
              srcSet
              srcWebp
              srcSetWebp
              originalName
              presentationHeight
            }
          }
        }
      }
    }
  }
`
