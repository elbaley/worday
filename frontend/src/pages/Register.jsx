import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
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
          <InputField
            name={"name"}
            label
            labelText={"name"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />

          <InputField
            name={"username"}
            label
            labelText={"username"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
          />
          <InputField
            name={"password"}
            label
            labelText={"password"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type={"password"}
          />
          <InputField
            name={"birthDate"}
            label
            labelText={"date of birth"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type={"date"}
          />
          <InputField
            name={"profileImg"}
            label
            labelText={"profile picture"}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            value={password}
            type={"file"}
          />

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
