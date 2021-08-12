/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { GatsbyImage } from 'gatsby-plugin-image'
import DateTime from './DateTime'

const Container = styled.div`
  margin-bottom: 15px;
`
const px = [`32px`, `16px`, `8px`, `4px`]
const shadow = px.map((v) => `rgba(0, 0, 0, 0.15) 0px ${v} ${v} 0px`)

const PostPage = ({ data }) => {
  // console.log(data.frontmatter)

  return (
    <Layout>
      <SEO title={data.mdx.frontmatter.title} description={data.mdx.excerpt} article={data.mdx} />
      <Container key={data.mdx.id}>
        <h3
          css={{
            display: 'inline',
          }}
        >
          {data.mdx.frontmatter.title}
        </h3>
        <p>
          Published: <DateTime date={data.mdx.frontmatter.date} />
        </p>
        <p>
          Modified: <DateTime date={data.mdx.fields.git_modified} />
        </p>
        {data.mdx.frontmatter.featureImg &&
          data.mdx.frontmatter.featureImg.childImageSharp.gatsbyImageData && (
            <GatsbyImage
              image={data.mdx.frontmatter.featureImg.childImageSharp.gatsbyImageData}
              objectFit="cover"
              objectPosition="50% 50%"
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

export default PostPage
