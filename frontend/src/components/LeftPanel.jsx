import MenuButton from "./MenuButton";

const LeftPanel = () => {
  return (
    <aside className='sticky left-0 top-0 h-screen bg-black text-white px-7 pt-5'>
      <svg
        className='cursor-pointer p-2 mb-3 flex justify-center  justify-center   rounded-full  hover:bg-sky-800 hover:bg-opacity-20  ease-in-out duration-300'
        fill='white'
        width='60px'
        height='60px'
        viewBox='0 0 29 40'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M31.25 7.003c0-0 0-0.001 0-0.001 0-0.346-0.14-0.659-0.365-0.886l-5-5c-0.227-0.226-0.539-0.366-0.885-0.366s-0.658 0.14-0.885 0.366v0l-4.109 4.109-2.122-2.109c-0.226-0.226-0.539-0.366-0.884-0.366s-0.658 0.14-0.884 0.366l-7.068 7.068c-0.225 0.226-0.363 0.537-0.363 0.881 0 0.69 0.56 1.25 1.25 1.25 0.344 0 0.655-0.139 0.881-0.363l6.185-6.184 1.236 1.228-15.12 15.12c-0.146 0.146-0.256 0.329-0.316 0.532l-0.002 0.009-2 7c-0.030 0.102-0.048 0.22-0.048 0.342 0 0.691 0.559 1.251 1.25 1.252h0c0.126-0 0.248-0.019 0.363-0.053l-0.009 0.002 6.788-2c0.206-0.063 0.383-0.17 0.527-0.311l-0 0 21.211-21c0.229-0.226 0.37-0.539 0.371-0.886v-0zM8.133 26.891l-4.307 1.268 1.287-4.504 14.897-14.897 3.214 3.192zM25.002 10.19l-3.222-3.202 3.22-3.22 3.229 3.228z'></path>
      </svg>
      <div className='flex flex-col gap-y-3 items-start'>
        <MenuButton buttonName={"feed"} />
        <MenuButton buttonName={"likes"} />
        <MenuButton buttonName={"share"} />
      </div>
    </aside>
  );
};

export default LeftPanel;
