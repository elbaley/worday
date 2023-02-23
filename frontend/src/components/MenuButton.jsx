import { NavLink } from "react-router-dom";

const MenuButton = ({ buttonName, active }) => {
  console.log();
  return (
    <button
      className={` rounded-full py-2 pl-4  pr-7 text-2xl  hover:bg-sky-100 hover:bg-opacity-10
${active && "bg-red-500"}
`}
    >
      <NavLink
        to={`/${buttonName}`}
        className={({ isActive }) => (isActive ? "font-bold" : undefined)}
      >
        {buttonName}
      </NavLink>
    </button>
  );
};

export default MenuButton;
