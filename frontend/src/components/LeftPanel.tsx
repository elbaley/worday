import MenuButton from "./MenuButton";
import ProfileMenu from "./ProfileMenu";
import wordayLogo from "../assets/wordayLogo.svg";
import {  useNavigate } from "react-router-dom";
const LeftPanel = () => {
  const navigate = useNavigate();
  return (
    <aside className="sticky left-0 top-0 mx-6 hidden h-screen flex-col overflow-scroll bg-black pt-5 text-white sm:flex sm:flex-col">
      <img
        onClick={() => {
          navigate("/");
        }}
        className="mb-3 flex aspect-square w-[50px] cursor-pointer  justify-center rounded-full   p-2  duration-300 ease-in-out  hover:bg-sky-800 hover:bg-opacity-20"
        src={wordayLogo}
      />
      <div className="flex flex-col items-start gap-y-3 pb-28">
        <MenuButton buttonName={"feed"} />
        <MenuButton buttonName={"likes"} />
        <button className="mx-auto w-3/4 rounded-full  bg-sky-500 py-2 pl-4 pr-7 text-2xl font-bold hover:bg-sky-500 hover:bg-opacity-90">
          share
        </button>
      </div>
      <ProfileMenu />
    </aside>
  );
};

export default LeftPanel;
