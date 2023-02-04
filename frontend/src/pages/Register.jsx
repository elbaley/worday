import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
const Register = () => {
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
      <section className='bg-black w-[500px] h-max p-5 rounded-2xl flex flex-col items-center'>
        <img className='' src={wordayLogo} alt='' />
        <h2 className='text-2xl font-bold pb-5'>create an account</h2>
        <form
          onSubmit={handleLoginSubmit}
          className='flex flex-col gap-5 h-full'
        >
          <div class='relative pt-2'>
            <label
              for='username'
              class='absolute font-bold left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
            >
              name
            </label>
            <input
              id='name'
              name='name'
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              class='w-full h-10 bg-black text-white placeholder-transparent border border-gray-500 peer focus:outline-none focus:border-sky-500 rounded-sm px-2'
              placeholder='username'
            />
          </div>
          <div class='relative pt-2'>
            <label
              for='username'
              class='absolute font-bold left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
            >
              username
            </label>
            <input
              id='username'
              name='name'
              type='text'
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              class='w-full h-10 bg-black text-white placeholder-transparent border border-gray-500 peer focus:outline-none focus:border-sky-500 rounded-sm px-2'
              placeholder='username'
            />
          </div>

          <div class='relative pt-2'>
            <label
              for='password'
              class='absolute font-bold left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm'
            >
              password
            </label>
            <input
              id='password'
              name='name'
              type='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              class='w-full h-10 bg-black text-white placeholder-transparent border border-gray-500 peer focus:outline-none focus:border-sky-500 rounded-sm px-2'
              placeholder='username'
            />
          </div>

          <div class='relative pt-2'>
            <label
              for='password'
              class='absolute font-bold left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm '
            >
              date of birth
            </label>
            <input
              id='birthdate'
              name='name'
              type='date'
              //   value={password}
              //   onChange={(e) => {
              //     setPassword(e.target.value);
              //   }}
              class='w-full h-10 bg-black text-white placeholder-transparent border border-gray-500 peer focus:outline-none focus:border-sky-500 rounded-sm px-2'
              placeholder='username'
            />
          </div>

          <button
            type='submit'
            className='border border-slate-800 hover:bg-opacity-80 rounded-full text-xl bg-white text-black '
          >
            sign up
          </button>
          <p className='text-zinc-500 mt-auto text-sm'>
            already have an account?{" "}
            <Link className='text-sky-500' to='/'>
              log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
