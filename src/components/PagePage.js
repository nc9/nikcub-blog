/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Layout from '../components/layout'
import SEO from '../components/seo'
import Img from 'gatsby-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Container = styled.div`
  margin-bottom: 15px;
`

const PagePage = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} description={data.mdx.excerpt} page={data.mdx} />
      <Container key={data.mdx.id}>
        <h3
          css={{
            display: 'inline',
          }}
        >
          {data.mdx.frontmatter.title}
        </h3>
        {data.mdx.frontmatter.featureImg && data.mdx.frontmatter.featureImg.childImageSharp.fluid && (
          <Img
            fluid={data.mdx.frontmatter.featureImg.childImageSharp.fluid}
            // objectFit="cover"
            // objectPosition="50% 50%"
            alt={data.mdx.frontmatter.featureImageAlt || data.mdx.frontmatter.title}
          />
        )}
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </Container>
    </Layout>
  )
}

export default PagePage
