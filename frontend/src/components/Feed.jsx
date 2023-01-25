import { useState } from "react";
import { useEffect } from "react";
import Post from "./Post";
import ShareInput from "./ShareInput";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  // Fetch posts
  useEffect(() => {
    console.log("feed componenti icindeki efekt calisti");
    fetch("http://localhost:4001/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.posts))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div className='border-x border-x-zinc-800  col-span-2 text-white '>
      <div className='border-b border-y-zinc-800  sticky top-0 z-10 bg-black bg-opacity-60 py-5 backdrop-blur-md	'>
        <h2 className='font-bold text-4xl pl-5 pt-2'>feed </h2>
      </div>
      <ShareInput />

      <section className='mt-12 flex flex-col'>
        {posts.map((post) => {
          console.log(post);
          return <Post post={post} />;
        })}
      </section>
    </div>
  );
};

export default Feed;
