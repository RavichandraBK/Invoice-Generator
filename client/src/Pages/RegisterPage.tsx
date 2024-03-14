import React, { useState, ChangeEvent, FormEvent } from "react";
import invoiceLogo from "../assets/invoiceGenLogo.png";
const RegisterPage:React.FC = () => {
    interface RegisterFields {
        name:string;
        email: string;
        password: string;
      }
    const [error, setError] = useState<boolean>(false);
  const [register, setRegister] = useState<RegisterFields>({ name:'', email: '', password: '' });
  const [emailError, setEmailError] = useState<boolean>(false);

  const validateError = () => {
    if (register.email === '' || register.password === '' || register.name === '') {
      setError(true);
    } else {
      setError(false);
    }
  }

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
    setEmailError(!isValidEmail);
    setRegister(prev => ({ ...prev, email: e.target.value }));
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateError();
    // setLogin((prev) => ({ ...prev, email: '', password: '' }))
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
            <p className="text-6xl font-bold tracking-wide">Haribol</p>
            <div>
              <form onSubmit={handleSubmit} className="my-10">
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    hare krishna
                  </label>
                  <input
                    name="name"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Hare Krishna"
                    onChange={(e) => setRegister(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                    value={register.name}
                  />
                  {(error && register.name.length === 0) && <p className="text-lg font-inter text-red-600">Name is required</p>}
                </div>
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    hare krishna
                  </label>
                  <input
                    name="email"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Hare Krishna"
                    onChange={handleEmail}
                    value={register.email}
                  />
                  {(error && register.email.length === 0) && <p className="text-lg font-inter text-red-600">Email is required</p>}
                  {emailError && register.email.length>0 && <p className="text-lg font-inter text-red-600">Email is invalid</p>}
                </div>
                <div className="my-5">
                  <label className="font-extrabold block font-mono">
                    chant krishna
                  </label>
                  <input
                    name="password"
                    type="text"
                    className="w-96 h-14 rounded-xl border-2 border-stone-950 p-3"
                    placeholder="Hare Krishna"
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
          <p className="block">Don't have an account?</p>
          <p className="text-2xl cursor-pointer">
            <u>Register</u>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterPage