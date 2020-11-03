var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
  const reducer = (fav, blog) => {
    return Math.max(fav.likes, blog.likes) === fav.likes
      ? {
        title: fav.title,
        author: fav.author,
        likes: fav.likes,
      }
      : {
        title: blog.title,
        author: blog.author,
        likes: blog.likes,
      }
  }

  return blogs.length === 0
    ? {}
    : blogs.reduce(reducer, {
      title: '',
      author: '',
      likes: 0
    })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return {}

  let mostBlogsAuthor = {}
  let maxval = 0
  const authors = _.groupBy(blogs, (val) => val.author)
  _.forEach(authors, (value, key) => {
    value = value.length
    if(Math.max(value, maxval) === value) {
      maxval = value
      mostBlogsAuthor.author = key
      mostBlogsAuthor.blogs = value
    }
  })
  return mostBlogsAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return {}

  let mostLikesAuthor = {}
  let maxval = 0
  const authors = _.groupBy(blogs, (val) => val.author)
  _.forEach(authors, (value, key) => {
    const authorLikes = totalLikes(value)
    if(Math.max(authorLikes, maxval) === authorLikes) {
      maxval = authorLikes
      mostLikesAuthor.author = key
      mostLikesAuthor.likes = authorLikes
    }
  })
  return mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}