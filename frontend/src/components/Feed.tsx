import { useMemo, } from "react";
import { useEffect } from "react";
import { usePosts } from "../context/postContext";
import PageTitle from "./PageTitle";
import Post from "./Post";
import ShareInput from "./ShareInput";

const Feed = () => {
  const { posts, fetchPosts } = usePosts();
  useEffect(() => {
    console.log("feed");
    fetchPosts();
  }, []);

  const mappedPosts = useMemo(() => {
    return posts.map((post) => {
      return <Post key={post.post_id} post={post} refetchPosts={fetchPosts} />;
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
