const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const crypto = require(`crypto`)
const Debug = require(`debug`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const { urlResolve } = require(`gatsby-core-utils`)

const debug = Debug()

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

// // Ensure that content directories exist at site-level
// exports.onPreBootstrap = ({ store }, themeOptions) => {
//   const { program } = store.getState()
//   const { contentPath, assetPath } = withDefaults(themeOptions)

//   console.log(themeOptions)

//   const dirs = [
//     path.join(program.directory, contentPath),
//     path.join(program.directory, assetPath),
//   ]

//   dirs.forEach(dir => {
//     debug(`Initializing ${dir} directory`)
//     if (!fs.existsSync(dir)) {
//       mkdirp.sync(dir)
//     }
//   })
// }

// const mdxResolverPassthrough = fieldName => async (
//   source,
//   args,
//   context,
//   info
// ) => {
//   const type = info.schema.getType(`Mdx`)
//   const mdxNode = context.nodeModel.getNodeById({
//     id: source.parent,
//   })
//   const resolver = type.getFields()[fieldName].resolve
//   const result = await resolver(mdxNode, args, context, {
//     fieldName,
//   })
//   return result
// }

// exports.createSchemaCustomization = ({ actions, schema }) => {
//   const { createTypes } = actions
//   createTypes(`interface BlogPost @nodeInterface {
//       id: ID!
//       title: String!
//       body: String!
//       slug: String!
//       date: Date! @dateformat
//       tags: [String]!
//       keywords: [String]!
//       excerpt: String!
//   }`)

//   createTypes(
//     schema.buildObjectType({
//       name: `MdxBlogPost`,
//       fields: {
//         id: { type: `ID!` },
//         title: {
//           type: `String!`,
//         },
//         slug: {
//           type: `String!`,
//         },
//         date: { type: `Date!`, extensions: { dateformat: {} } },
//         tags: { type: `[String]!` },
//         keywords: { type: `[String]!` },
//         excerpt: {
//           type: `String!`,
//           args: {
//             pruneLength: {
//               type: `Int`,
//               defaultValue: 140,
//             },
//           },
//           resolve: mdxResolverPassthrough(`excerpt`),
//         },
//         body: {
//           type: `String!`,
//           resolve: mdxResolverPassthrough(`body`),
//         },
//       },
//       interfaces: [`Node`, `BlogPost`],
//     })
//   )
// }

// // Create fields for post slugs and source
// // This will change with schema customization with work
exports.onCreateNode = async (
  { node, actions, getNode, createNodeId },
  themeOptions
) => {
  const { createNode, createNodeField } = actions
  const { postsPath, basePath } = withDefaults(themeOptions)

  // Make sure it's an MDX node
  if (node.internal.type !== `Mdx`) {
    return
  }

  // Create source field (according to contentPath)
  const fileNode = getNode(node.parent)
  const source = fileNode.sourceInstanceName

  console.log(`${node.internal.type}, ${node.parent}, ${source}, ${postsPath}`)
  // console.log(fileNode)

  if (node.internal.type === `Mdx` && ((source === "posts" || source === "mdx-pages" ))) {
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

    const fieldData = {
      title: node.frontmatter.title,
      tags: node.frontmatter.tags || [],
      slug,
      date: node.frontmatter.date,
      keywords: node.frontmatter.keywords || [],
    }

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
    allMdx(sort: {fields: frontmatter___date, order: DESC}, filter: {fields: {source: {eq: "posts"}}}) {
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
    const previous = index === posts.length - 1 ? null : posts[index + 1]
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
    allMdx(filter: {fields: {source: {eq: "mdx-pages"}}}) {
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
