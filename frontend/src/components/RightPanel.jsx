const RightPanel = () => {
  return (
    <aside className='hidden lg:block bg-black text-white px-7 pt-5 '>
      <span class='absolute inset-y-0 left-0 flex items-center pl-2'></span>
      <div class='relative text-gray-600 focus-within:text-gray-400'>
        <span class='absolute inset-y-0 left-0 flex items-center pl-2'>
          <button
            type='submit'
            class='p-1 focus:outline-none focus:shadow-outline'
          >
            <svg
              fill='none'
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              viewBox='0 0 24 24'
              class='w-6 h-6'
            >
              <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </button>
        </span>
        <input
          type='search'
          name='q'
          class='w-full py-3 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900'
          placeholder='search...'
          autocomplete='off'
        />
      </div>

      <section
        id='popular'
        className='my-3 py-1 px-2 rounded-xl bg-zinc-900 bg-opacity-70 radius'
      >
        <h1 className='font-bold text-2xl'>popular words</h1>

        {/* Popular Words */}
        <div className='flex flex-col my-4 gap-y-2'>
          <span class='text-lg hover:bg-sky-100 hover:bg-opacity-10 cursor-pointer'>
            word
          </span>
          <span class='text-lg hover:bg-sky-100 hover:bg-opacity-10 cursor-pointer'>
            ipsum
          </span>
          <span class='text-lg hover:bg-sky-100 hover:bg-opacity-10 cursor-pointer'>
            dolor
          </span>
          <span class='text-lg hover:bg-sky-100 hover:bg-opacity-10 cursor-pointer'>
            sitom
          </span>
          <span class='text-lg hover:bg-sky-100 hover:bg-opacity-10 cursor-pointer'>
            amet
          </span>
        </div>
      </section>
    </aside>
  );
};

export default RightPanel;
