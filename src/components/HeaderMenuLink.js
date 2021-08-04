/** @jsx jsx */
import { jsx } from '@emotion/react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'

const ListItem = styled.li`
  display: inline-block;
  margin-top: 10px;
`

const HeaderMenuLink = props => (
  <ListItem>
    <Link
      to={props.to}
      css={{
        color: `white`,
        textDecoration: `none`,
        maxWidth: '50%',
        marginTop: '10px',
      }}
    >
      {props.children}
    </Link>
  </ListItem>
)

export default HeaderMenuLink
