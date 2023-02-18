import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import ErrorMessage from "../components/ErrorMessage";
const Register = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [userValues, setUserValues] = useState({
    name: "",
    username: "",
    password: "",
    birthDate: "",
  });
  const [profileImg, setProfileImg] = useState();
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
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profileImg", profileImg);
    formData.append("userValues", JSON.stringify(userValues));
    try {
      const response = await fetch("http://localhost:4001/register", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await response.json();
      if (data?.error?.message) {
        setErrorMessage(data.error.message);
      }
      if (data.user) {
        console.log("Registered successfully !");
        setTimeout(() => {
          login(data.user);
        }, 3000);
      }
    } catch (error) {
      console.log("error!");
      console.log(error);
    }
  };
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-zinc-900 bg-opacity-80 text-lg">
      <section className="flex h-max w-[500px] flex-col items-center rounded-2xl bg-black p-5">
        <img className="" src={wordayLogo} alt="" />
        <h2 className="pb-5 text-2xl font-bold">create an account</h2>
        <form
          // encType='multipart/form-data'
          onSubmit={handleRegisterSubmit}
          className="flex h-full flex-col gap-5"
        >
          <InputField
            name={"name"}
            label
            labelText={"name"}
            onChange={(e) => {
              setUserValues({
                ...userValues,
                name: e.target.value,
              });
            }}
            value={userValues.name}
          />

          <InputField
            name={"username"}
            label
            labelText={"username"}
            onChange={(e) => {
              setUserValues({
                ...userValues,
                username: e.target.value,
              });
            }}
            value={userValues.username}
          />
          <InputField
            name={"password"}
            label
            labelText={"password"}
            onChange={(e) => {
              setUserValues({
                ...userValues,
                password: e.target.value,
              });
            }}
            value={userValues.password}
            type={"password"}
          />
          <InputField
            name={"birthDate"}
            label
            labelText={"date of birth"}
            onChange={(e) => {
              setUserValues({
                ...userValues,
                birthDate: e.target.value,
              });
            }}
            value={userValues.birthDate}
            type={"date"}
          />
          <InputField
            name={"profileImg"}
            label
            labelText={"profile picture"}
            onChange={(e) => {
              setProfileImg(e.target.files[0]);
            }}
            type={"file"}
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <button
            type="submit"
            className="rounded-full border border-slate-800 bg-white text-xl text-black hover:bg-opacity-80 "
          >
            sign up
          </button>
          <p className="mt-auto text-sm text-zinc-500">
            already have an account?{" "}
            <Link className="text-sky-500" to="/">
              log in
            </Link>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;
