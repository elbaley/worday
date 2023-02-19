import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getImgUrl } from "../utils/getImgUrl";
const ProfileMenu = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div
        onClick={() => {
          setShowMenu((oldValue) => {
            return !oldValue;
          });
        }}
        className="relative mb-5 mt-auto flex w-full cursor-pointer select-none items-center gap-5 rounded-full  p-4 outline-2 outline-white hover:bg-sky-300 hover:bg-opacity-10"
      >
        <div
          className={`${
            showMenu ? "visible" : "invisible"
          } fixed bottom-20 z-10 mb-2 w-64 max-w-xs rounded-md border border-zinc-800   bg-black font-bold shadow-xl ease-out`}
        >
          <span
            onClick={() => {
              navigate(`/profile/${user.username}`);
            }}
            className="block cursor-pointer py-2 px-2 text-xl hover:bg-slate-400 hover:bg-opacity-10"
          >
            profile
          </span>
          <span
            onClick={() => {
              logout();
            }}
            className="block cursor-pointer py-2 px-2 text-xl hover:bg-slate-400 hover:bg-opacity-10"
          >
            logout
          </span>
        </div>{" "}
        <img
          className="aspect-square h-12 rounded-full object-cover"
          src={getImgUrl(user.profileImg)}
          alt=""
        />
        <div className="hidden flex-col  lg:flex ">
          <span className="text-xl font-bold">{user.name}</span>
          <span className="text-gray-500 ">@{user.username}</span>
        </div>
        <svg
          className=" right-10 ml-auto hidden xl:block"
          fill="white"
          height="20px"
          width="20px"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 32.055 32.055"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
		C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
		s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
		c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"
            />
          </g>
        </svg>
      </div>
    </>
  );
};

export default ProfileMenu;
