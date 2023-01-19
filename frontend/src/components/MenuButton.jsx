const MenuButton = ({ buttonName }) => {
  console.log();
  return (
    <button
      className={`font-bold text-2xl pl-4  pr-7 py-2 hover:bg-sky-100 hover:bg-opacity-10 rounded-full ${
        buttonName === "share"
          ? "self-stretch  bg-sky-500 hover:bg-sky-500 hover:bg-opacity-90"
          : ""
      } `}
    >
      {buttonName}
    </button>
  );
};

export default MenuButton;
