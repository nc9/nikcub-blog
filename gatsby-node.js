const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
// const Debug = require(`debug`)
const execa = require('execa')
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve } = require(`gatsby-core-utils`)

// const debug = Debug()

const replaceTrailing = _path => _path.replace(/\/$/, ``)

const withDefaults = themeOptions => {
  const basePath = `/`
  const postsPath = `${__dirname}/content/posts`
  const pagesPath = `${__dirname}/content/pages`
  const assetPath = `${__dirname}/content/assets`

  return {
    basePath,
    postsPath,
    pagesPath,
    assetPath,
  }
}

const gitModified = async absolutePath => {
  const { stdout } = await execa('git', ['log', '-1', '--pretty=format:%aI', '--', absolutePath])

  if (stdout) {
    return stdout
  }
}

const gitLogs = async absolutePath => {
  const { stdout } = await execa('git', [
    'log',
    '-1',
    '--pretty=format:%aI,%H,%h,%an,%ae,%s',
    '--',
    absolutePath,
  ])

  if (!stdout) {
    return []
  }

  let logs = stdout.split('\n').map(l => {
    ;[date, hash, hash_short, author, email, message] = l.split(',')
    return {
      date,
      hash,
      hash_short,
      author,
      email,
      message,
    }
  })

  return logs
}

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

// // Change the node internal type from 'allMarkdownRemark' to 'MarkdownRemark'
//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

// // Create fields for post slugs and source
// // This will change with schema customization with work
exports.onCreateNode = async ({ node, actions, getNode, createNodeId }, themeOptions) => {
  const { createNodeField } = actions
  const { postsPath, basePath } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  // console.log(`${node.internal.type}, ${node.parent}, ${source}, ${postsPath}`)
  // console.log(fileNode)

  if (node.internal.type === `Mdx` && (source === 'posts' || source === 'mdx-pages')) {
    let slug

    if (node.frontmatter.slug) {
      if (path.isAbsolute(node.frontmatter.slug)) {
        // absolute paths take precedence
        slug = node.frontmatter.slug
      } else {
        // otherwise a relative slug gets turned into a sub path
        slug = urlResolve(basePath, node.frontmatter.slug)
      }
    } else {
      // otherwise use the filepath function from gatsby-source-filesystem
      const filePath = createFilePath({
        node: fileNode,
        getNode,
        basePath: postsPath,
      })

      slug = urlResolve(basePath, filePath)
    }

    // slug = replaceTrailing(slug)

    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
    }

    let gitModDate = await gitModified(fileNode.absolutePath)
    let git_logs = await gitLogs(fileNode.absolutePath)

    createNodeField({
      node,
      name: 'title',
      value: node.frontmatter.title,
    })

    createNodeField({
      node,
      name: 'date',
      value: node.frontmatter.date,
    })

    createNodeField({
      node,
      name: `date_modified`,
      value: fileNode.modifiedTime,
    })

    createNodeField({
      node,
      name: `git_modified`,
      value: gitModDate,
    })

    createNodeField({
      node,
      name: `git_logs`,
      value: git_logs,
    })

    createNodeField({
      node,
      name: 'tags',
      value: node.frontmatter.tags || [],
    })

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    })

    createNodeField({
      node,
      name: 'source',
      value: source,
    })

    //   const mdxBlogPostId = createNodeId(`${node.id} >>> MdxBlogPost`)
    //   await createNode({
    //     ...fieldData,
    //     // Required fields.
    //     id: mdxBlogPostId,
    //     parent: node.id,
    //     children: [],
    //     internal: {
    //       type: `MdxBlogPost`,
    //       contentDigest: crypto
    //         .createHash(`md5`)
    //         .update(JSON.stringify(fieldData))
    //         .digest(`hex`),
    //       content: JSON.stringify(fieldData),
    //       description: `Mdx implementation of the BlogPost interface`,
    //     },
    //   })
    //   createParentChildLink({ parent: node, child: getNode(mdxBlogPostId) })
  }
}

// // These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve(`./src/templates/post-query`)
const PageTemplate = require.resolve(`./src/templates/page-query`)
// const PostsTemplate = require.resolve(`./src/templates/posts-query`)

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  // const { basePath } = withDefaults(themeOptions)

  const result = await graphql(`
    {
      allMdx(
        sort: { fields: frontmatter___date, order: DESC }
        filter: { fields: { source: { eq: "posts" } } }
      ) {
        edges {
          node {
            id
            fields {
              slug
              source
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  // Create Posts and Post pages.
  const { allMdx } = result.data
  const posts = allMdx.edges

  // Create a page for each Post
  posts.forEach(({ node: post }, index) => {
    // console.log(posts)
    const previous = index === posts.length - 1 ? null : posts[index + 1]
    // const previous = undefined
    const next = index === 0 ? null : posts[index - 1]
    const { slug } = post.fields
    createPage({
      // this should end up as - /posts/stub-stub with no trailing slash
      path: 'posts' + slug.slice(0, -1),
      component: PostTemplate,
      context: {
        id: post.id,
        previousId: previous ? previous.node.id : undefined,
        nextId: next ? next.node.id : undefined,
      },
    })
  })

  const pageResults = await graphql(`
    {
      allMdx(filter: { fields: { source: { eq: "mdx-pages" } } }) {
        edges {
          node {
            id
            fields {
              slug
              source
            }
          }
        }
      }
    }
  `)

  if (pageResults.errors) {
    reporter.panic(pageResults.errors)
  }

  // Create Posts and Post pages.
  const { allMdx: mdx } = pageResults.data
  const pages = mdx.edges

  // Create a page for each Post
  pages.forEach(({ node: page }, index) => {
    const { slug } = page.fields
    createPage({
      path: slug.slice(0, -1),
      component: PageTemplate,
      context: {
        id: page.id,
      },
    })
  })

  // // Create the Posts page
  // createPage({
  //   path: basePath,
  //   component: PostsTemplate,
  //   context: {},
  // })
}
