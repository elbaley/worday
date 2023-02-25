const addCurrentlyLikedToPosts = (posts, userId) => {
  const postsWithCurrentlyLiked = [...posts];
  // add currentlyLiked field
  postsWithCurrentlyLiked.map((post) => {
    const { likes } = post;
    post.currentlyLiked = false;
    if (likes.filter((like) => like.user_id === userId).length > 0) {
      post.currentlyLiked = true;
    }
    return post;
  });

  return postsWithCurrentlyLiked;
};

export default addCurrentlyLikedToPosts;
