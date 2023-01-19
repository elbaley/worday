import { AiOutlineHeart } from "react-icons/ai";

const Post = () => {
  return (
    <div className='flex px-5 gap-3 py-3 border-b border-y-zinc-800 '>
      <img
        className='h-20 rounded-full'
        src='https://picsum.photos/300/300'
        alt=''
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
