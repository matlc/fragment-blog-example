import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"

const BlogAuthor = ({data: {author}}) => (
  <Layout>
    <h1>{author.name}</h1>
    <p>{author.biography}</p>
    <h3>Posts by {author.name}</h3>
    <div style={{display: 'flex'}}>
      {
        author.posts.map(post =>
          (
            <div style={{maxWidth: '200px', marginRight: '2rem'}}>
              <h4><Link to={`/post/${post.slug}`}>{post.title}</Link></h4>
              <p>{post.publishDate}</p>
              <p style={{fontStyle:"italic"}}>Tags: {post.tags.join(', ')}</p>
            </div>
          )
        )
      }
    </div>
  </Layout>
)

export const query = graphql`
  query ($id: String!) {
    author: authorsJson(id: {eq: $id}) {
      ...authorFields

      posts {
        ...postFields
      }
    }
  }
`

export default BlogAuthor
