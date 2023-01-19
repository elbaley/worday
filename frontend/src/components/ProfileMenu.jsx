const ProfileMenu = () => {
  return (
    <div className='flex gap-5 items-center cursor-pointer hover:bg-opacity-10 hover:bg-sky-300  w-full  absolute bottom-8'>
      <img
        className='h-20 rounded-full'
        src='https://picsum.photos/300/300'
        alt=''
      />
      <div className='hidden lg:flex  flex-col '>
        <span className='font-bold text-xl'>first last</span>
        <span className='text-gray-500 '>@username</span>
      </div>
      <span className='hidden lg:block absolute right-10'>...</span>
    </div>
  );
};

export default ProfileMenu;
