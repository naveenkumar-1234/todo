import React, { useState } from 'react'
import { Label, TextInput,Checkbox,Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Login = () => {
  const histroy =useNavigate()
   const[userName,setUserName]=useState("");
   const[passWord,setPassWord]=useState("");
   const[passVisible,setPassVisible]=useState(false)
   const toggleVisibility=()=>{
    setPassVisible(!passVisible)
   }
    
   const handleSubmit=async(e)=>{
    e.preventDefault();
    const data={
      user_name:userName,
      user_password:passWord
    }
   try{
    const response=await fetch('http://localhost:8080/login',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
   })
   const valueOf=await response.json()
   console.log(valueOf)
   console.log(typeof valueOf)
   if(response.ok){
    console.log(response)
    toast.success('✅User matched', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      });
      
    histroy('/todo')
   }
  else if(response.status=="400"){
    toast.error('❌User invalid', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    
      });
  }
  }
   catch(err){
    console.error(err)
   }
   

   }
  
 



  return (
    <div className='h-screen '>
    <div className=' h-screen border flex justify-center items-center '>
    <form className="flex max-w-md flex-col gap-4 border-2 px-10 py-5 w-2/3 rounded-md shadow-lg"  
    onSubmit={handleSubmit}
    >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="user" value="Enter your UserName" />
        </div>
        <TextInput id="user" type="text" placeholder="Username"  onChange={(e)=>setUserName(e.target.value)}/>
      </div>
      <div>
        <div className="mb-2 block ">
          <Label htmlFor="password" value="Enter your Password" />
        </div>
        
        <TextInput id="password" type={`${passVisible? `text` : `password`}`} placeholder='Password' onChange={(e)=>{
          setPassWord(e.target.value)
        }} />
        <div className='flex  justify-end items-center gap-2 mt-4' >

          {passVisible?
        <Checkbox onClick={toggleVisibility} defaultChecked id='passwordView' />:<Checkbox   onClick={toggleVisibility} id='passwordView' />  
        }
      <Label htmlFor='passwordView' value='Show Password'  />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
      </div>
      <Button type="submit">Submit</Button>
      <h1 className='text-center'>Doesn't have an Account <Link to="/signup" className='text-blue-700 font-bold hover:underline pl-1 ' > Sign Up</Link>  </h1>
    </form>



    </div>
    </div>

  )
}

export default Login