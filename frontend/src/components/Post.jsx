import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { useAuth } from "../hooks/useAuth";
import dayjs from "../utils/dayjs";
import { getImgUrl } from "../utils/getImgUrl";

const Post = ({ post }) => {
  const date = dayjs(post.pubDate);
  const { user } = useAuth();
  const [imgLoaded, setImageLoaded] = useState(false);
  return (
    <div className="flex gap-3 border-t border-y-zinc-800 px-5 py-3 ">
      <img
        className={`h-20 w-20 select-none object-cover ${
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
          <span className="text-md pr-1 font-bold">{post.author.name}</span>
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
          <button className="h-8 w-8 rounded-full p-1 hover:bg-slate-400 hover:bg-opacity-40">
            <AiOutlineHeart size={24} />
          </button>
          {user.user_id === post.authorId && (
            <button className="h-8 w-8 rounded-full p-1 hover:bg-slate-400 hover:bg-opacity-40">
              <AiFillDelete size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
