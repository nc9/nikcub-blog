/** @jsx jsx */
import { jsx } from "@emotion/core"
import { Link } from "gatsby"
import styled from "@emotion/styled"

const ListItem = styled.li`
  display: inline-block;
  margin-right: 1rem;
`

const HeaderMenuLink = props => (
  <ListItem>
    <Link
      to={props.to}
      css={{
        color: `white`,
        textDecoration: `none`,
        maxWidth: '50%',
      }}
    >
      {props.children}
    </Link>
  </ListItem>
)

export default HeaderMenuLink
