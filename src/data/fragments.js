import { graphql } from 'gatsby'

export const postFields = graphql`
  fragment postFields on PostsJson {
    slug
    title
    content
    publishDate(formatString: "MMMM DD, YYYY")
    tags
  }
`

export const authorFields = graphql`
  fragment authorFields on AuthorsJson {
    slug
    name
    biography
  }
`
