/** @jsx jsx */
import { jsx } from "@emotion/core"
import styled from "@emotion/styled"
import { Link } from "gatsby"
import DateTime from "./DateTime"

const Container = styled.div`
  margin-bottom: 15px;
`

const PostExcerpt = ({ post }) => (
  <Container key={post.id}>
    <Link to={'/posts' + post.fields.slug}>
      <h3 css={{
        display: "inline"
      }}>{post.frontmatter.title}</h3>
    </Link>
    {" "}-{" "}
    <span><DateTime date={post.frontmatter.date} /></span>
    <p>{post.excerpt}</p>
  </Container>
)

export default PostExcerpt
