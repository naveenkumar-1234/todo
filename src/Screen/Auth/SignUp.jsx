import { useState } from "react";
import { Label, TextInput, Checkbox, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const history=useNavigate()
  const [userName, setUserName] = useState("");
  const [emailAddr, setEmailAddr] = useState("");
  const [passWord, setPassWord] = useState("");
  const [userData, setUserData] = useState({});
  const [passVisible, setPassVisible] = useState(false);
  const toggleVisibility = () => {
    setPassVisible(!passVisible);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(emailAddr, userName, passWord);
    try {
      const data = {
        user_name: userName,
        user_email: emailAddr,
        user_password: passWord,
      };
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setUserName("");
      setEmailAddr("");
      setPassWord("");
      if(response.ok){
        history('/todo')
      }
      if(response.status=="400"){
        alert("Invalid user")
        console.log(response.body)
      }
    } catch (e) {
      console.log(e);
    }
    
  };
  return (
    <div className="h-screen ">
      <div className=" h-screen border flex justify-center items-center ">
        <form
          className="flex max-w-md flex-col gap-4 border-2 px-10 py-5 w-2/3 rounded-md shadow-lg "
          onSubmit={handleSubmit}
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="user" value="Enter the username" />
            </div>
            <TextInput
              id="user"
              type="text"
              placeholder="Name" 
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="email" value="Enter the E-Mail address" />
            </div>
            <TextInput
              id="email"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmailAddr(e.target.value);
              }}
            />
          </div>

          <div>
            <div className="mb-2 block ">
              <Label htmlFor="password1" value="Enter your Password" />
            </div>

            <TextInput
              id="password1"
              type={`${passVisible ? `text` : `password`}`}
              placeholder="Password"
              onChange={(e) => {
                setPassWord(e.target.value);
              }}
            />
            <div className="flex  justify-end items-center gap-2 mt-4">
              {passVisible ? (
                <Checkbox
                  onClick={toggleVisibility}
                  id="passwordView"
                  defaultChecked
                />
              ) : (
                <Checkbox onClick={toggleVisibility} id="passwordView" />
              )}
              <Label htmlFor="passwordView" value="Show Password" />
            </div>
          </div>
          <Button type="submit">Submit</Button>
          <h1 className="text-center">
            Already have an Account{" "}
            <Link
              to="/login"
              className="text-blue-700 font-bold hover:underline"
            >
              Log In
            </Link>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
