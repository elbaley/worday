import { useMemo, } from "react";
import { useEffect } from "react";
import { usePosts } from "../context/postContext";
import PageTitle from "./PageTitle";
import Post from "./Post";
import ShareInput from "./ShareInput";
import { useAuth } from "../hooks/useAuth";

const Feed = () => {
  const { posts, fetchPosts } = usePosts();
  const {user}=  useAuth()
  useEffect(() => {
    console.log("feed");
    console.log(user.isPostedToday);
    fetchPosts();
  }, []);
  // const [posts, setPosts] = useState([]);
  // Fetch posts

  const mappedPosts = useMemo(() => {
    return posts.map((post) => {
      return <Post key={post.post_id} post={post} refetchPosts={fetchPosts} />;
    });
  }, [posts]);

  return (
    <div>
      <PageTitle title="feed" />
      {user.isPostedToday ? '' : <ShareInput />
}

      <section className="mt-12 flex flex-col">{mappedPosts}</section>
    </div>
  );
};

export default Feed;
