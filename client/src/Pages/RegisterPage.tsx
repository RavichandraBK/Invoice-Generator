import React, { useState, ChangeEvent, FormEvent } from "react";
import invoiceLogo from "../assets/invoiceGenLogo.png";
import { useNavigate } from "react-router-dom";
import { Register } from "../apis/auth";
import { toast } from "react-toastify";
toast
const RegisterPage:React.FC = () => {
    interface RegisterFields {
        name:string;
        email: string;
        password: string;
      }
    const [error, setError] = useState<boolean>(false);
  const [register, setRegister] = useState<RegisterFields>({ name:'', email: '', password: '' });
  const [emailError, setEmailError] = useState<boolean>(false);
  const Navigate = useNavigate();
 let invalid = false;
  const validateError = () => {
    if (register.email === '' || register.password === '' || register.name === '') {
      setError(true);
      invalid = true;
    } else {
      setError(false);
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    setEmailError(!isValidEmail);
    setRegister(prev => ({ ...prev, email: e.target.value }));
  }

  const handleRegister = async()=>{
    const userRegister = await Register(register);
    if(userRegister && userRegister.data){
      if(userRegister.data.message==='User already exists, kindly login'){
        toast.warn(userRegister.data.message)
      }
      else{
        toast.success(userRegister.data.message)
        Navigate('/')
      }
      
    }
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateError();
    if(!invalid){
        handleRegister()
        setRegister((prev) => ({ ...prev, name:'',email: '', password: '' }))
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
            <p className="text-6xl font-bold tracking-wide">Sign up</p>
            <div>
              <form onSubmit={handleSubmit} className="my-10">
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    Name
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Name"
                    onChange={(e) => setRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    value={register.name}
                  />
                  {(error && register.name.length === 0) && <p className="text-lg font-inter text-red-600">Name is required</p>}
                </div>
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
                    value={register.email}
                  />
                  {(error && register.email.length === 0) && <p className="text-lg font-inter text-red-600">Email is required</p>}
                  {emailError && register.email.length>0 && <p className="text-lg font-inter text-red-600">Email is invalid</p>}
                </div>
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    Password
                  </label>
                  <input
                    name="password"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Password"
                    onChange={(e) => setRegister(prev => ({ ...prev, password: e.target.value }))}
                    value={register.password}
                  />
                  {(error && register.password.length === 0) && <p className="text-lg font-inter text-red-600">Password is invalid</p>}
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
          <p className="block">Already have an account?</p>
          <p className="text-2xl cursor-pointer" onClick={()=>{Navigate('/')}}>
            <u>Login</u>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage