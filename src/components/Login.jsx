import React, { useState } from 'react';
import {
  MDBInput,
  MDBBtn
} from 'mdb-react-ui-kit';
import { UserService } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleSubmit = () =>{
    
    const data = {
      username: username,
      password: password
    }


    const userService = new UserService();
    userService.login(data).then(res => {
      if(res.status === 200){
          navigate("/")
          window.location.reload();
      }
      const dataToString = JSON.stringify(res.data.data);
      localStorage.setItem("userData", dataToString)
    }).catch((e) => console.error(e))
  }
  return (
        <form style={{width:"40%", margin:"auto"}}>
        <MDBInput onChange={(e) => setUserName(e.target.value)} className='mb-4' type='test' id='form1Example1' label='Username' />
        <MDBInput onChange={(e) => setPassword(e.target.value)} className='mb-4' type='password' id='form1Example2' label='Password' />
        <MDBBtn type='button' block onClick={handleSubmit}>
          Sign in
        </MDBBtn>
      </form>
  );
}