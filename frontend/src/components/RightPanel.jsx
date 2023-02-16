import { useEffect, useState } from "react";

const RightPanel = () => {
  const [popularWords, setPopularWords] = useState();
  useEffect(() => {
    fetch("http://localhost:4001/posts/popular", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setPopularWords(data.popularWords);
      });
  }, []);
  return (
    <aside className="hidden bg-black px-7 pt-5 text-white lg:block ">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2"></span>
      <div className="relative text-gray-600 focus-within:text-gray-400">
        <span className="absolute inset-y-0 left-0 flex items-center pl-2">
          <button
            type="submit"
            className="focus:shadow-outline p-1 focus:outline-none"
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              className="h-6 w-6"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
        </span>
        <input
          type="search"
          name="q"
          className="w-full rounded-md bg-gray-900 py-3 pl-10 text-sm text-white focus:bg-white focus:text-gray-900 focus:outline-none"
          placeholder="search..."
          autoComplete="off"
        />
      </div>

      <section
        id="popular"
        className="radius my-3 rounded-xl bg-zinc-900 bg-opacity-70 py-1 px-2"
      >
        <h1 className="text-2xl font-bold">popular words</h1>

        <div className="my-4 flex flex-col gap-y-2">
          {popularWords &&
            popularWords.map((word) => {
              return (
                <span className="cursor-pointer text-lg hover:bg-sky-100 hover:bg-opacity-10">
                  {word.postContent}
                </span>
              );
            })}
        </div>
      </section>
    </aside>
  );
};

export default RightPanel;
