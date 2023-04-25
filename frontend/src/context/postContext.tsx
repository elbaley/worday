import  { createContext, useState,  useContext , ReactNode} from "react";

interface Author {
  username:string;
  name:string;
  profileImg?:string
}

export interface PostType {
  post_id: number;
  postContent:string;
  pubDate:string;
  authorId:number;
  author:Author;
  currentlyLiked?: boolean;
  body: string;
  _count: {[key:string]:number}
}

interface PostContextType {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  fetchPosts: () => Promise<void>;
}

interface PostProviderProps {
  children: ReactNode;
}

export const PostContext = createContext<PostContextType>(
{
  posts: [],
  setPosts: () => {},
  fetchPosts: async () => {},
}
);

export const PostProvider = ({children}:PostProviderProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);

  const fetchPosts = async () => {
    try {
      const res = await fetch("http://localhost:4001/posts", {
        credentials: "include",
      });
      const data = await res.json();
      setPosts(data.posts);
    } catch (err:unknown) {
      console.log((err as Error).message);
    }
  };

  return (
    <PostContext.Provider value={{ posts, setPosts, fetchPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = ():PostContextType => {
  return useContext(PostContext);
};
