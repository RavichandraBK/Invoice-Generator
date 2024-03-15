import React, { useState, ChangeEvent, FormEvent } from "react";
import invoiceLogo from "../assets/invoiceGenLogo.png";
import { useNavigate } from "react-router-dom";
import { Login } from "../apis/auth";
import { toast } from "react-toastify";

interface LoginFields {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<boolean>(false);
  const [login, setLogin] = useState<LoginFields>({ email: '', password: '' });
  const [emailError, setEmailError] = useState<boolean>(false);
  const Navigate = useNavigate();
  let invalid = false;
  const validateError = () => {
    if (login.email === '' || login.password === '') {
      setError(true);
      invalid = true;
    } else {
      setError(false);
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    setEmailError(!isValidEmail);
    setLogin(prev => ({ ...prev, email: e.target.value }));
  }
  const handleLogin = async()=>{
    const userLogin = await Login(login);
    if(userLogin && userLogin.data){
      if(userLogin.data.message==='Invalid credentials'){
        toast.warn(userLogin.data.message)
      }
      else{
        toast.success(userLogin.data.message)
        Navigate('/AddProduct')
      }
      
    }
  }
  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   await validateError();
    if(!invalid){
      handleLogin();
      setLogin((prev) => ({ ...prev, email: '', password: '' }))
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-center items-center my-5">
          <img src={invoiceLogo} alt="" className="w-20 h-20" />
          <p className="text-5xl">Invoice Generator</p>
        </div>
        <div className="flex items-center justify-center divide-y-8">
          <div className="my-5 rounded-2xl border-4 border-gray-400 pr-12 pl-12 pb-5 pt-5 ">
            <p className="text-6xl font-bold tracking-wide">Sign in</p>
            <div>
              <form onSubmit={handleSubmit} className="my-10">
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    Email
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Email"
                    onChange={handleEmail}
                    value={login.email}
                  />
                  {(error && login.email.length === 0) && <p className="text-lg font-inter text-red-600">Email is required</p>}
                  {emailError && login.email.length>0 && <p className="text-lg font-inter text-red-600">Email is invalid</p>}
                </div>
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    password
                  </label>
                  <input
                    name="password"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Password"
                    onChange={(e) => setLogin(prev => ({ ...prev, password: e.target.value }))}
                    value={login.password}
                  />
                  {(error && login.password.length === 0) && <p className="text-lg font-inter text-red-600">Password is invalid</p>}
                </div>
                <div>
                  <button className="rounded-xl my-3 justify-center items-center bg-purple-900 text-fuchsia-50 text-3xl w-96 h-14">
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="block">Don't have an account?</p>
          <p className="text-2xl cursor-pointer" onClick={()=>{Navigate('/Register')}}>
            <u>Register</u>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
