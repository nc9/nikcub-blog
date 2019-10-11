import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PostExcerpt from "../components/PostExcerpt"

const IndexPage = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title="Home" />
      <h4>{ data.allMdx.totalCount } Posts</h4>
      { data.allMdx.nodes.map(node  => (
        <PostExcerpt key={node.id} post={node} />
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
{
  allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {fields: {source: {eq: "posts"}, title: {}}, frontmatter: {status: {ne: "draft"}}}) {
    totalCount
    nodes {
      id
      fields {
        slug
      }
      frontmatter {
        title
        date
      }
      excerpt
    }
  }
}

`
