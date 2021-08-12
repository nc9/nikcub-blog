import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import SEOComponent from '../components/seo'
import PostExcerpt from '../components/PostExcerpt'
import '../style.css'

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEOComponent title="Home" description="Homepage and blog of Nik Cubrilovic" />
      <h4>{data.allMdx.totalCount} Posts</h4>
      {data.allMdx.nodes.map((node) => (
        <PostExcerpt key={node.id} post={node} />
      ))}
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  {
    allMdx(
      sort: { fields: frontmatter___date, order: DESC }
      filter: {
        fields: { source: { eq: "posts" }, title: {} }
        frontmatter: { status: { ne: "draft" } }
      }
    ) {
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
