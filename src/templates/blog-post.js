import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const BlogPost = ({data: {post}}) => (
  <Layout>
    <h1>{post.title}</h1>
    <h4>By <Link to={`/author/${post.author.slug}`}>{post.author.name}</Link></h4>
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
      ...postFields

      author {
        ...authorFields
      }
    }
  }
`

export default BlogPost
