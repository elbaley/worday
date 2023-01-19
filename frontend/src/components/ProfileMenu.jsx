const ProfileMenu = ({ setShowMenu }) => {
  return (
    <div
      onClick={() => {
        setShowMenu((oldValue) => {
          return !oldValue;
        });
      }}
      className='select-none flex rounded-full gap-5 p-4 items-center cursor-pointer hover:bg-opacity-10 hover:bg-sky-300  w-full  absolute bottom-8'
    >
      <img
        className='h-14 rounded-full'
        src='https://picsum.photos/300/300'
        alt=''
      />
      <div className='hidden lg:flex  flex-col '>
        <span className='font-bold text-xl'>first last</span>
        <span className='text-gray-500 '>@username</span>
      </div>
      <svg
        className='hidden xl:block absolute right-10'
        fill='white'
        height='20px'
        width='20px'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'
        viewBox='0 0 32.055 32.055'
        xml:space='preserve'
      >
        <g>
          <path
            d='M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z'
          />
        </g>
      </svg>
    </div>
  );
};

export default ProfileMenu;
