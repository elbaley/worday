import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { usePosts } from "../context/postContext";
import { useAuth } from "../hooks/useAuth";
import dayjs from "../utils/dayjs";
import { getImgUrl } from "../utils/getImgUrl";

const Post = ({ post }) => {
  const date = dayjs(post.pubDate);
  const { fetchPosts } = usePosts();

  const { user } = useAuth();
  const [imgLoaded, setImageLoaded] = useState(false);
  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete?")) {
      const response = await fetch(
        `http://localhost:4001/posts/${post.post_id}`,
        {
          method: "PUT",
          // credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      const data = await response.json();
      if (data.posts.count) {
        fetchPosts();
      }
    }
  };
  const handleLikePost = async () => {
    const response = await fetch(
      `http://localhost:4001/posts/like/${post.post_id}`,
      {
        method: "PUT",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like the post");
    }
    // refetch posts
    fetchPosts();
  };
  return (
    <div className="flex gap-3 border-t border-y-zinc-800 px-5 py-3 ">
      <img
        className={`aspect-square h-12 select-none object-cover ${
          imgLoaded ? "" : "animate-pulse"
        } rounded-full bg-gray-700 bg-opacity-20`}
        src={getImgUrl(post.author.profileImg)}
        alt=""
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      <div className="flex w-full flex-col">
        <div className="info">
          <span className="text-md pr-1 font-bold">
            <Link to={`/profile/${post.author.username}`}>
              {post.author.name}
            </Link>
          </span>
          <span className="pr-1 text-zinc-500">@{post.author.username}</span>
          <span className="text-zinc-500">
            {/* Display date in format "MMM D" if older than a month 
                otherwise display relative time */}
            {date.isBefore(dayjs().subtract(22, "day"))
              ? date.format("MMM D")
              : date.fromNow(true)}
          </span>
        </div>
        <span className="text-xl">{post.postContent}</span>
        <div className="flex items-center justify-between">
          <button
            onClick={handleLikePost}
            className="flex items-center justify-center rounded-full  text-center "
          >
            {post.currentlyLiked ? (
              <AiFillHeart
                className="rounded-full fill-pink-600 p-2 hover:bg-slate-400 hover:bg-opacity-40"
                size={32}
              />
            ) : (
              <AiOutlineHeart
                className="rounded-full fill-zinc-500 p-2 hover:bg-slate-400 hover:bg-opacity-40"
                size={32}
              />
            )}
            <span className="ml-0.5 text-sm text-zinc-500">
              {post._count?.likedBy}
            </span>
          </button>
          {user.user_id === post.authorId && (
            <button
              onClick={handleDeletePost}
              className="flex aspect-square h-8 items-center justify-center rounded-full hover:bg-slate-400 hover:bg-opacity-40"
            >
              <AiFillDelete size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
