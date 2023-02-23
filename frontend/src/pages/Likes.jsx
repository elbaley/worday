import { useEffect, useState } from "react";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import { useAuth } from "../hooks/useAuth";
const Likes = () => {
  const { user } = useAuth();
  const [likedPosts, setLikedPosts] = useState([]);
  console.log(user.username);
  useEffect(() => {
    fetch(`http://localhost:4001/authors/${user.username}/likes`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.posts) {
          setLikedPosts(data.posts);
          console.log(data.posts);
        }
      });
  }, []);
  return (
    <section className="">
      <PageTitle title="likes">
        <span className="text-sm text-zinc-500">{likedPosts.length} likes</span>
      </PageTitle>
      {likedPosts &&
        likedPosts.map((post) => {
          return <Post post={post} key={post.post_id} />;
        })}
    </section>
  );
};

export default Likes;
