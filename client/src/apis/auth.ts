import axios, { AxiosResponse } from 'axios';
import { promises } from 'dns';
import { toast } from 'react-toastify';
const BackendUrl = import.meta.env.VITE_BACKEND_URL;
const registerUrl = `${BackendUrl}/api/auth/register`;
const loginUrl= `${BackendUrl}/api/auth/login`;

interface RegisterFields {
  name: string;
  email: string;
  password: string;
}

interface LoginFields {
  email: string;
  password: string;
}

const Login = async (loginDetails: LoginFields): Promise<AxiosResponse | void> => {
  try {
    const response = await axios.post(loginUrl, loginDetails);
    return response;
  } catch (err) {
    if(err.response.status===404){
        toast.error(err.response.data.message)
        
    }
    console.log('Couldnt login, something went wrong', err);
  }
};

const Register = async (registerDetails: RegisterFields): Promise<AxiosResponse | void> => {
  try {
    const response = await axios.post(registerUrl, registerDetails);
    return response;
  } catch (err) {
    console.log('Couldnt register user, something went wrong', err);
  }
};

export { Login, Register };
