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
        # title
        # tags
        # keywords

      }
      frontmatter {
        title
        date
        # date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
