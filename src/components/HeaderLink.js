/** @jsx jsx */
import { Link } from "gatsby"
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"

const Header = styled.h1`
    // margin: 0;
    max-width: 50%;
    display: inline;
    color: white;
`

const HeaderLink = props => (
  <Link
    to={"/"}
    css={{
      color: `white`,
      textDecoration: `none`,
      maxWidth: '50%',
    }}
  >
    <Header>{props.children}</Header>
  </Link>
)

export default HeaderLink
