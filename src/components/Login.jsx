//FORM VALIDATION  -- login form
import React, { useEffect, useState } from 'react'

function App() {
  const [loginDetails,setLoginDetails] = useState({
    userName: "",
    password: ""
  });

  const [isLoggedIn,setLoggedIn] = useState(false);

  useEffect(()=>{
    const storedData = localStorage.getItem("username");
    if(storedData){
      setLoggedIn(true);
      setLoginDetails({
        ...loginDetails,
        userName : storedData,
      })
    }

  },[])

  const validUser = "priya"
  const validPswd = "Priya@123"

  const [successMsg,setSuccessMsg] = useState("")
  const [errorMsg,setErrorMsg] = useState("");

  const inputHandler = (e) =>{
    const {name,value} = e.target;
    setLoginDetails(prevObj =>({
      ...prevObj,
      [name] :value
    }))
  }
  const loginHandler = (e) =>{
    e.preventDefault();

    //store the vlaues  entered bu user, which were 
    // already being maintained inside the object

    const usrn = loginDetails.userName.trim();
    const pswd = loginDetails.password.trim();

    //initilize error and s ucces s msg to empty string
    setErrorMsg('')
    setSuccessMsg('')

    //empty fields validation
    if(usrn === '' && pswd === '')
    {
      setErrorMsg('All fields ar  required')
      setSuccessMsg('')

    }
    else if(usrn === '')
    {
      setErrorMsg('Enter Username')
    }
    else if(pswd === '')
    {
      setErrorMsg('enter password')
    }
    //business logic  validation
    else if(usrn === validUser && pswd === validPswd){
      setSuccessMsg('Login Success.. check details in ur  dashboard')
      setLoggedIn(true);
      localStorage.setItem("username",usrn);
    }
    else{
      setErrorMsg("invalid  credentials")
    }

  }
  const logoutHandler = ()=>{
    localStorage.removeItem("username");
    setLoggedIn(false);
    setErrorMsg('')
    setSuccessMsg('')
    setLoginDetails({
      ...loginDetails,
      userName: '',
      password:''
    })
  }

  return (
    <section id='login-form'>
      <h2>Login Form</h2>
      {!isLoggedIn ? (
        
      <form onSubmit={loginHandler}>
        <label>
          UserName:
          <input type = "text"
                name = 'userName'
                value = {loginDetails.userName}
                placeholder='Enter username'
                onChange={inputHandler} />
        </label>

        <br /><br />
        <label>
          Password:
          <input type = "password"
                name= 'password'
                value = {loginDetails.password}
                placeholder='Enter password'
                onChange={inputHandler} />
        </label>
        <br /> <br />
        <button>
          Login
        </button>

      </form>
      ):
      (<>
        <h2>Welcome {loginDetails.userName}</h2>
        <button onClick={logoutHandler}>Logout</button>
        </>
      )

      }
      
      

      
    {/* conditional rendering */}
      {errorMsg && <p style={{color:"red"}}> 
         {errorMsg}
         </p>}
      {successMsg && 
            <p style={{color:"green"}}>
              {successMsg}
              </p>}


      
    </section>
  )
}

export default App