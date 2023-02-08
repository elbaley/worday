import { useState } from "react";
import { usePosts } from "../context/postContext";
import { useAuth } from "../hooks/useAuth";
import { getImgUrl } from "../utils/getImgUrl";

const ShareInput = () => {
  const { fetchPosts } = usePosts();
  const { user } = useAuth();
  const [post, setPost] = useState({ postContent: "", authorId: user.user_id });
  const handlePostSubmit = () => {
    if (!post.postContent) return;

    const response = fetch("http://localhost:4001/posts", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          setPost({ ...post, postContent: "" });
          fetchPosts();
        }
      });
  };
  return (
    <div className='flex px-5 items-center gap-3 my-2 relative border-b border-y-zinc-800  py-3'>
      <img
        className='rounded-full h-20 hover:opacity-80 '
        src={getImgUrl(user.profileImg)}
        alt=''
      />
      <input
        value={post.postContent}
        onChange={(e) => {
          setPost({
            ...post,
            postContent: e.target.value,
          });
        }}
        className='flex-1 w-full bg-black text-2xl outline-0 border-transparent '
        type='text'
        placeholder="today's word?"
      />
      <button
        onClick={handlePostSubmit}
        className='absolute -bottom-10 bg-sky-500 hover:bg-sky-500 hover:bg-opacity-90 px-5 rounded-md text-lg text-center right-3'
      >
        share
      </button>
    </div>
  );
};

export default ShareInput;
