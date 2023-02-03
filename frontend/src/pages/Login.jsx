import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
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
    <main className='flex flex-col justify-center items-center h-screen text-lg'>
      <h2 className='text-2xl font-bold pb-5'>LOGIN</h2>
      <form onSubmit={handleLoginSubmit} className='flex flex-col gap-4'>
        <label htmlFor='name'>
          username
          <input
            className='bg-black  text-white border-zinc-800 border border-3 rounded-lg ml-2'
            type='text'
            name='username'
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </label>
        <label htmlFor='password'>
          password
          <input
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            className='bg-black  text-white border-zinc-800 border border-3 rounded-lg ml-2'
            type='password'
            name='password'
          />
        </label>

        <button
          type='submit'
          className='border border-slate-800 rounded-lg text-xl bg-blue-500 '
        >
          login
        </button>
      </form>
      {/* Silinecek */}
      <a href='/feed'>Anasayfaya git</a>
      <Link to={"/feed"}> Anasayfaya hizli git</Link>
    </main>
  );
};

export default Login;
