import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user]);
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4001/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      if (data.user) {
        login(data.user);
      }
      console.log("gelen data su", data);
    } catch (error) {
      console.log("error!");
      console.log(error);
    }
  };
  return (
    <main className='flex bg-zinc-900 bg-opacity-80 flex-col justify-center items-center h-screen text-lg'>
      <section className='bg-black w-[500px] h-[400px] p-5 rounded-2xl flex flex-col items-center'>
        <img className='' src={wordayLogo} alt='' />
        <h2 className='text-2xl font-bold pb-5'>sign in to worday</h2>
        <form
          onSubmit={handleLoginSubmit}
          className='flex flex-col gap-3 h-full'
        >
          <InputField
            name={"username"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            name={"password"}
            value={password}
            type={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <button
            type='submit'
            className='border mt-2 border-slate-800 hover:bg-opacity-80 rounded-full text-xl bg-white text-black '
          >
            login
          </button>
          <p className='text-zinc-500 mt-auto text-sm'>
            Don't have an account?{" "}
            <Link className='text-sky-500' to='/register'>
              sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
