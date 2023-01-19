const Feed = () => {
  return (
    <div className=' border-x border-x-zinc-800  col-span-2 text-white '>
      <h2 className='text-4xl pl-5 pt-3'>feed </h2>
      <div className='flex px-5 items-center gap-2 my-5 relative border-y border-y-zinc-800  py-3'>
        <img
          className='rounded-full h-20 hover:opacity-80 '
          src='https://picsum.photos/300/300'
          alt=''
        />
        <input
          className='flex-1 w-full bg-black text-2xl outline-0 border-transparent '
          type='text'
          placeholder="today's word?"
        />
        <button className='absolute -bottom-10 bg-sky-500 hover:bg-sky-500 hover:bg-opacity-90 px-5 rounded-md text-lg text-center right-3'>
          share
        </button>
      </div>
    </div>
  );
};

export default Feed;
