import { useNavigate } from "react-router-dom";

import { AiOutlineArrowLeft, AiFillDelete } from "react-icons/ai";
const PageTitle = ({ title, backButton, children }) => {
  const navigate = useNavigate();
  return (
    <section className="sticky top-0 z-10 flex items-center border-b border-y-zinc-800 bg-black bg-opacity-60 backdrop-blur-md ">
      {backButton && (
        <button
          className="ml-2 rounded-full p-2 hover:bg-zinc-500 hover:bg-opacity-60"
          onClick={() => {
            navigate(-1);
          }}
        >
          <AiOutlineArrowLeft size={24} />
        </button>
      )}
      <div className="py-2 pl-5 ">
        <h2 className="pt-2 text-2xl font-bold">{title} </h2>
        {children}
      </div>
    </section>
  );
};
export default PageTitle;
