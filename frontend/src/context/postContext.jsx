import React, { createContext, useState, useEffect, useContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4001/posts", {
        credentials: "include",
      });
      const data = await res.json();
      setPosts(data.posts);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {props.children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostContext);
};
