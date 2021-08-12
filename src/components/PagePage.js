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
const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

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
        <section
          sx={{
            my: 5,
            '.gatsby-resp-image-wrapper': { my: [4, 4, 5], boxShadow: shadow.join(`, `) },
            variant: `layout.content`,
          }}
        >
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </section>
      </Container>
    </Layout>
  )
}

export default PagePage
