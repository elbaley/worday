import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import Post from "../components/Post";
const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [user, setUser] = useState();
  useEffect(() => {
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
  }, []);
  return (
    <section className="">
      <PageTitle backButton title={user?.name}>
        <span className="text-sm text-zinc-500">
          {user?.posts.length} words
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
      {user?.posts.map((post) => {
        return <Post post={post} />;
      })}
    </section>
  );
};

export default Profile;
