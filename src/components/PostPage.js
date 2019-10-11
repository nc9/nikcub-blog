/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import DateTime from "./DateTime"

const Container = styled.div`
  margin-bottom: 15px;
`

const PostPage = ({ data }) => {
  console.log(data)

  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} description={data.mdx.excerpt} />
      <Container key={data.mdx.id}>
        <h3 css={{
          display: "inline"
        }}>{data.mdx.frontmatter.title}</h3>
        {" "}-{" "}
        <DateTime date={data.mdx.frontmatter.date} />
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export default PostPage
