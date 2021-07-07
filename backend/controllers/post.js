
const Post = require('../models/post');



exports.inBackend =   (req, res, next)=>{
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  post.save().then(createdPost =>{
    res.status(201).json({
      message: 'Post added v redu',
      postId: createdPost._id
    });

  })
  .catch(error =>{
    res.status(500).json({
      message: 'Creating post failed!'
    });
  });

}


exports.updatePost =  (req, res, next)=>{
  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Post.updateOne({_id: req.params.id, creator: req.userData.userId}, post).then(result =>{
    if (result.nModified >0) {
      res.status(200).json({ message: 'Update succ'})
    } else {
      res.status(401).json({ message: 'Not auth'})
    }

  })
  .catch(error =>{
    res.status(500).json({
      message: "Couldn't update post!"
    });
  });
}


exports.fromBackend = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then(documents => {
      fetchedPosts = documents;
      return Post.count();
    })
    .then(count => {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count
      });
    })
    .catch(error=>{
      res.status(500).json({
        message: "FEtching post failed!"
      });
    });
}

exports.fromBackendId = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
  .catch(error=>{
    res.status(500).json({
      message: "FEtching post failed!"
    });
  });
}

exports.deleteFromBackend = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({ message: 'delete succ'})
    } else {
      res.status(401).json({ message: 'delete not'})
    }

  })
  .catch(error=>{
    res.status(500).json({
      message: "Deleting post failed!"
    });
  });
}
