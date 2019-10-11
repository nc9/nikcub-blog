import { graphql } from "gatsby"

import PostPage from "../components/PostPage"

export default PostPage

export const query = graphql`
  query PostPage($id: String!, $previousId: String, $nextId: String) {
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
    previous: mdx(id: { eq: $previousId }) {
      id
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
      }
    }
    next: mdx(id: { eq: $nextId }) {
      id
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        # date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
