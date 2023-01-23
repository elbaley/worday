import { useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const Post = () => {
  const [imgLoaded, setImageLoaded] = useState(false);
  return (
    <div className='flex px-5 gap-3 py-3 border-t border-y-zinc-800 '>
      <img
        className={`select-none h-20 w-20 ${
          imgLoaded ? "" : "animate-pulse"
        } bg-gray-700 bg-opacity-20 rounded-full`}
        src='https://picsum.photos/300/300'
        alt=''
        onLoad={() => {
          setImageLoaded(true);
        }}
      />
      <div className='flex flex-col'>
        <div className='info'>
          <span className='font-bold text-md pr-1'>first name</span>
          <span className='text-zinc-500 pr-1'>@username</span>
          <span className='text-zinc-500'>24m</span>
        </div>
        <span className='text-xl'>kelime</span>
        <button className='p-1 hover:bg-slate-400 hover:bg-opacity-40 rounded-full w-8 h-8'>
          <AiOutlineHeart size={24} />
        </button>
      </div>
    </div>
  );
};

export default Post;
