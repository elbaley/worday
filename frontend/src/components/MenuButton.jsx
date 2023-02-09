const MenuButton = ({ buttonName }) => {
  console.log();
  return (
    <button
      className={` rounded-full py-2 pl-4  pr-7 text-2xl font-bold hover:bg-sky-100 hover:bg-opacity-10 ${
        buttonName === "share"
          ? "mx-auto w-3/4  bg-sky-500 hover:bg-sky-500 hover:bg-opacity-90"
          : ""
      } `}
    >
      {buttonName}
    </button>
  );
};

export default MenuButton;
