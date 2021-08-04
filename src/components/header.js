/** @jsx jsx */
import { jsx } from '@emotion/react'
import styled from '@emotion/styled'
import HeaderLink from './HeaderLink'
import HeaderMenuLink from './HeaderMenuLink'
import Img from 'gatsby-image'

const Header = styled.header`
  background: rebeccapurple;
`
const Menu = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding-top: 7px;
  padding-bottom: 7px;
`

const HeaderMenu = styled.ul`
  list-style: none;
  float: right;
`

const HeaderComponent = ({ headerImage, siteTitle }) => (
  <Header>
    <Menu>
      {headerImage ? (
        <Img
          fixed={headerImage}
          // objectFit="cover"
          // objectPosition="50% 50%"
          alt=""
          css={{
            marginRight: '10px',
            marginTop: '0px',
          }}
        />
      ) : (
        undefined
      )}
      <HeaderLink>{siteTitle}</HeaderLink>
      <HeaderMenu>
        <HeaderMenuLink to="about">About</HeaderMenuLink>
      </HeaderMenu>
    </Menu>
  </Header>
)

export default HeaderComponent
