import React, { useState } from 'react'
import SignUp from './Auth/SignUp'
import Todo from './Todo'
const Home = () => {
  const [isLoggedIn,setLoggedIn]=useState(false)


  return (
    <>
    {isLoggedIn?
    <Todo/>
    
    :
    <SignUp/>}
    
    </>
  )
}

export default Home