import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import wordayLogo from "../assets/wordayLogo.svg";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
const Register = () => {
  const navigate = useNavigate();
  const [userValues, setUserValues] = useState({
    name: "furkan l",
    username: "elbaley",
    password: "123",
    birthDate: "2000-12-01",
  });
  const [profileImg, setProfileImg] = useState();
  const [password, setPassword] = useState("");
  const { user, login } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/feed");
    }
  }, [user]);
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
    <main className='flex bg-zinc-900 bg-opacity-80 flex-col justify-center items-center h-screen text-lg'>
      <section className='bg-black w-[500px] h-max p-5 rounded-2xl flex flex-col items-center'>
        <img className='' src={wordayLogo} alt='' />
        <h2 className='text-2xl font-bold pb-5'>create an account</h2>
        <form
          // encType='multipart/form-data'
          onSubmit={handleRegisterSubmit}
          className='flex flex-col gap-5 h-full'
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
