import { useMemo, useState } from "react";
import { useEffect } from "react";
import { usePosts } from "../context/postContext";
import PageTitle from "./PageTitle";
import Post from "./Post";
import ShareInput from "./ShareInput";

const Feed = () => {
  const { posts } = usePosts();
  // const [posts, setPosts] = useState([]);
  // Fetch posts

  const mappedPosts = useMemo(() => {
    return posts.map((post) => {
      return <Post key={post.post_id} post={post} />;
    });
  }, [posts]);

  return (
    <div>
      <PageTitle title="feed" />
      <ShareInput />

      <section className="mt-12 flex flex-col">{mappedPosts}</section>
    </div>
  );
};

export default Feed;
