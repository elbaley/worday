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
    <div className='border-x border-x-zinc-800  col-span-2 text-white '>
      <div className='border-b border-y-zinc-800  sticky top-0 z-10 bg-black bg-opacity-60 py-5 backdrop-blur-md	'>
        <h2 className='font-bold text-4xl pl-5 pt-2'>feed </h2>
      </div>
      <ShareInput />

      <section className='mt-12 flex flex-col'>{mappedPosts}</section>
    </div>
  );
};

export default Feed;
