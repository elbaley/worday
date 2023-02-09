import { useMemo, useState } from "react";
import { useEffect } from "react";
import { usePosts } from "../context/postContext";
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
    <div className="col-span-2 border-x  border-x-zinc-800 text-white ">
      <div className="sticky top-0  z-10 border-b border-y-zinc-800 bg-black bg-opacity-60 py-5 backdrop-blur-md	">
        <h2 className="pl-5 pt-2 text-4xl font-bold">feed </h2>
      </div>
      <ShareInput />

      <section className="mt-12 flex flex-col">{mappedPosts}</section>
    </div>
  );
};

export default Feed;
