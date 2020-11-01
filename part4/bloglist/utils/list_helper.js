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
    return max(fav.likes, blog.likes) === fav.likes
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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}