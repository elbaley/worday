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
    <div className="relative my-2 flex items-center gap-3 border-b border-y-zinc-800 px-5  py-3">
      <img
        className="h-20	 w-20 rounded-full object-cover hover:opacity-80 "
        src={getImgUrl(user.profileImg)}
        alt=""
      />
      <input
        value={post.postContent}
        onChange={(e) => {
          setPost({
            ...post,
            postContent: e.target.value,
          });
        }}
        className="w-full flex-1 border-transparent bg-black text-2xl outline-0 "
        type="text"
        placeholder="today's word?"
      />
      <button
        onClick={handlePostSubmit}
        className="absolute -bottom-10 right-3 rounded-md bg-sky-500 px-5 text-center text-lg hover:bg-sky-500 hover:bg-opacity-90"
      >
        share
      </button>
    </div>
  );
};

export default ShareInput;
