/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Layout from '../components/layout'
import SEOComponent from '../components/seo'
import { GatsbyImage } from 'gatsby-plugin-image'
import { MDXRenderer } from 'gatsby-plugin-mdx'

const Container = styled.div`
  margin-bottom: 15px;
`

const PagePage = ({ data }) => {
  return (
    <Layout>
      <SEOComponent
        title={data.mdx.frontmatter.title}
        description={data.mdx.excerpt}
        page={data.mdx}
      />
      <Container key={data.mdx.id}>
        <h1
          css={{
            display: 'inline',
            width: '100%',
            float: 'left',
          }}
        >
          {data.mdx.frontmatter.title}
        </h1>
        {data.mdx.frontmatter.featureImg &&
          data.mdx.frontmatter.featureImg.childImageSharp.gatsbyImageData && (
            <GatsbyImage
              image={data.mdx.frontmatter.featureImg.childImageSharp.gatsbyImageData}
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
