const addCurrentlyLikedToPosts = (posts, userId) => {
  const postsWithCurrentlyLiked = [...posts];
  // add currentlyLiked field
  postsWithCurrentlyLiked.map((post) => {
    const { likedBy } = post;
    post.currentlyLiked = false;
    if (likedBy.filter((like) => like.user_id === userId).length > 0) {
      post.currentlyLiked = true;
    }
    return post;
  });

  return postsWithCurrentlyLiked;
};

export default addCurrentlyLikedToPosts;
