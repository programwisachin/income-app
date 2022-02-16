import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from 'react-router-dom'

const Login = ({at}) => {

	const [isLogin, setIsLogin] = useState(true)
	const handleLoginBtn = ()=>{
		setIsLogin(true)
	}

	const handleSignupBtn = ()=>{
		setIsLogin(false)
	}

    const [credentials, setCredentials] = useState({ name: "", email: "", password: ""})
    let history = useNavigate()

    //Function to handle signUp action 
    const handleSignUp = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        //POST request 
        const response = await fetch(`http://localhost:5000/api/auth/createUser`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })

        })
        const json = await response.json()
        console.log(json)
        console.log(json.userName);

        if (json.success) {
            localStorage.setItem('token', json.authToken)
			at = true
            history("/") //Serve homepage to the user after signUp
            alert("You have been Signed in")
        }
        else {
            alert("Invalid credentials")
        }
    }

    //Function to handle signUp action
    const handleLogin = async (e) => {
        e.preventDefault()
        const { email, password } = credentials
        //POST request
        const response = await fetch(`http://localhost:5000/api/auth/login`, {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email, password: password })

        })
        const json = await response.json()
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authToken)
			at = true
            history("/") //Serve homepage to the user after login
            alert("You have been Logged in")
        }
        else {
            alert("Invalid credentials")
        }
    }

    //Function to handle input
    const onChange = (e) => {

        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

	return (
		<div className="loginPage">
			<h1 style={{fontSize:"3vw",color:"white"}}>Welcome to Income Tax Official Page</h1>
			<div className="login">
				<i className="fa-solid fa-user fa-8x"></i>
				<div className="">
					<button className="loginBtn btn" onClick={handleLoginBtn}>Log In</button>
					<button className="signupBtn btn" onClick={handleSignupBtn}>Sign Up</button>
				</div>
				<div className="loginForm">
					{!isLogin && <div className="formField">
						<input type="text" className="name" name = "name" onChange={onChange} minLength={5} required/>
						<label htmlFor="name">Name</label>
					</div>}
					<div className="formField">
						<input type="mail" className="email" name="email" onChange={onChange} required/>
						<label htmlFor="email">Email</label>
					</div>
					<div className="formField">
						<input type="password" className="password" name="password" onChange={onChange} minLength={5} required/>
						<label htmlFor="password">Password</label>
					</div>
					<button className="signupSubmit btn" onClick={isLogin?handleLogin:handleSignUp}>Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
