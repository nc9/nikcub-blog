/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { MDXRenderer } from "gatsby-plugin-mdx"
import Img from "gatsby-image"
import DateTime from "./DateTime"

const Container = styled.div`
  margin-bottom: 15px;
`

const PostPage = ({ data }) => {

  // console.log(data.frontmatter)

  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} description={data.mdx.excerpt} article={data.mdx} />
      <Container key={data.mdx.id}>
        <h3 css={{
          display: "inline"
        }}>{data.mdx.frontmatter.title}</h3>
        {" "}-{" "}
        <DateTime date={data.mdx.frontmatter.date} />
        { data.mdx.frontmatter.featureImg && data.mdx.frontmatter.featureImg.childImageSharp.fluid &&
          <Img
            fluid={data.mdx.frontmatter.featureImg.childImageSharp.fluid}

            // objectFit="cover"
            // objectPosition="50% 50%"
            alt={data.mdx.frontmatter.featureImageAlt || data.mdx.frontmatter.title}
          />}
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export default PostPage
