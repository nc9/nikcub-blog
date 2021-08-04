import React from 'react'
import styled from '@emotion/styled'
// import * as shortcodes from '@blocks/kit'
import { MDXProvider } from '@mdx-js/react'
import { useStaticQuery, graphql } from 'gatsby'
import Header from './header'
import { rhythm } from '../utils/typography'
import CodeBlock from '../components/CodeBlock'
import './style-fix.css'
// import "./reset.css"

const components = {
  // ...shortcodes,
  code: props => <CodeBlock {...props} />,
}

const Container = styled.div`
  margin: 0 auto;
  max-width: 960px;
  // padding: ${rhythm(2)};
  padding-top: ${rhythm(1.5)};
`

const Footer = styled.footer`
  margin-top: 45px;
  margin-bottom: 30px;
  padding-top: 18px;
  border-top: 1px solid silver;
  text-align: center;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      file(name: { eq: "nik" }) {
        childImageSharp {
          # Specify the image processing specifications right in the query.
          # Makes it trivial to update as your page's design changes.
          fixed(width: 32, height: 32) {
            base64
            tracedSVG
            aspectRatio
            width
            height
            src
            srcSet
            srcWebp
            srcSetWebp
            originalName
          }
        }
      }
    }
  `)

  return (
    <MDXProvider>
      <>
        <Header
          headerImage={data.file.childImageSharp.fixed}
          siteTitle={data.site.siteMetadata.title}
        />
        <Container>
          <main>{children}</main>
          <Footer>
            © {new Date().getFullYear()} - Nik Cubrilovic - follow{' '}
            <a href="https://twitter.com/dir">@dir</a> for blog updates
          </Footer>
        </Container>
      </>
    </MDXProvider>
  )
}

export default Layout
