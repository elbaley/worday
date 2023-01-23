import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className='flex flex-col justify-center items-center h-screen text-lg'>
      <h2 className='text-2xl font-bold pb-5'>LOGIN</h2>
      <form className='flex flex-col gap-4'>
        <label htmlFor='name'>
          username
          <input
            className='bg-black  text-white border-zinc-800 border border-3 rounded-lg ml-2'
            type='text'
            name='username'
          />
        </label>
        <label htmlFor='password'>
          password
          <input
            className='bg-black  text-white border-zinc-800 border border-3 rounded-lg ml-2'
            type='password'
            name='password'
          />
        </label>

        <button className='border border-slate-800 rounded-lg text-xl bg-blue-500 '>
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
