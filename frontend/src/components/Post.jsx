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
    <div className='flex px-5 gap-3 py-3 border-t border-y-zinc-800 '>
      <img
        className={`select-none h-20 w-20 ${
          imgLoaded ? "" : "animate-pulse"
        } bg-gray-700 bg-opacity-20 rounded-full`}
        src={getImgUrl(post.author.profileImg)}
        alt=''
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      <div className='flex flex-col w-full'>
        <div className='info'>
          <span className='font-bold text-md pr-1'>{post.author.name}</span>
          <span className='text-zinc-500 pr-1'>@{post.author.username}</span>
          <span className='text-zinc-500'>
            {/* Display date in format "MMM D" if older than a month 
                otherwise display relative time */}
            {date.isBefore(dayjs().subtract(22, "day"))
              ? date.format("MMM D")
              : date.fromNow(true)}
          </span>
        </div>
        <span className='text-xl'>{post.postContent}</span>
        <div className='flex items-center justify-between'>
          <button className='p-1 hover:bg-slate-400 hover:bg-opacity-40 rounded-full w-8 h-8'>
            <AiOutlineHeart size={24} />
          </button>
          {user.user_id === post.authorId && (
            <button className='p-1 hover:bg-slate-400 hover:bg-opacity-40 rounded-full w-8 h-8'>
              <AiFillDelete size={24} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
