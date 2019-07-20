import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const BlogPost = ({data: {post}}) => (
  <Layout>
    <h1>{post.title}</h1>
    <h4>By {post.author.map(author => <Link to={`/author/${author.slug}`}>{author.name}</Link>)}</h4>
    <p>{post.publishDate}</p>
    <hr />
    <p>{post.content}</p>
    <hr />
    <p style={{fontStyle:"italic"}}>Tags: {post.tags.join(', ')}</p>
  </Layout>
)

export const query = graphql`
  query ($id: String!) {
    post: postsJson(id: {eq: $id}) {
      title
      slug
      content
      publishDate(formatString: "MMMM DD, YYYY")
      tags
      author {
        slug
        name
        biography
      }
    }
  }
`

export default BlogPost
