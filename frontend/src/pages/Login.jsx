import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [user, errorMessage]);
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
      if (data?.error?.message) {
        setErrorMessage(data.error.message);
      }
      if (data.user) {
        login(data.user);
      }
    } catch (error) {
      console.log("error!");
      console.log(error);
    }
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-zinc-900 bg-opacity-80 text-lg">
      <section className="flex h-[400px] w-[500px] flex-col items-center rounded-2xl bg-black p-5">
        <img className="" src={wordayLogo} alt="" />
        <h2 className="pb-5 text-2xl font-bold">sign in to worday</h2>
        <form
          onSubmit={handleLoginSubmit}
          className="flex w-5/6 flex-col gap-3"
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
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <button
            type="submit"
            className="mt-2 rounded-full border border-slate-800 bg-white text-xl text-black hover:bg-opacity-80 "
          >
            login
          </button>
          <p className="mt-auto text-sm text-zinc-500">
            Don't have an account?{" "}
            <Link className="text-sky-500" to="/register">
              sign up
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;
