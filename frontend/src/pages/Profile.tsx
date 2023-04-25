import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
import { PostType } from "../context/postContext";
export interface Like {
  post_id: number;
  user_id: number;
  createdAt: string;
}
export interface User{
  user_id:number;
  name:string;
  username:string;
  birthDate:string;
  profileImg:string;
  likes:Like[];
  _count: {
    posts:number;
    likes:number;
  };
}
const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState<User>();
  const [userPosts, setUserPosts] = useState<PostType[]>([]);
  async function getUserDetails() {
    // fetch the user details
    fetch(`http://localhost:4001/authors/${username}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //redirect to feed
          navigate("/feed");
        }
        if (!data.error) {
          setUser(data.author);
        }
      });
  }
  async function getUserPosts() {
    // fetch the user details
    fetch(`http://localhost:4001/authors/${username}/posts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          //redirect to feed
          navigate("/feed");
        }
        if (!data.error) {
          setUserPosts(data.posts);
        }
      });
  }
  useEffect(() => {
    getUserDetails();
    getUserPosts();
  }, []);
  return (
    <section className="">
      <PageTitle backButton title={user!.name}>
        <span className="text-sm text-zinc-500">
          {user?._count.posts} words
        </span>
      </PageTitle>
      <section className=" flex flex-col border-b border-zinc-900 p-3">
        <img
          className="h-[100px] self-start rounded-full "
          src={user?.profileImg}
        />
        <span className="text-lg font-bold">{user?.name}</span>
        <span className="text-sm text-zinc-500">@{user?.username}</span>
      </section>
      <h3 className="text-md py-1 pl-2 font-bold">words</h3>
      {userPosts.map((post) => {
        return (
          <Post
            key={post.post_id}
            post={post}
            refetchPosts={() => {
              console.log("refetching posts...");
              getUserPosts();
            }}
          />
        );
      })}
    </section>
  );
};

export default Profile;
