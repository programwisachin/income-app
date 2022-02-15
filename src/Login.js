import React, { useState } from "react";
import "./Login.css";
const Login = () => {

	const [isLogin, setIsLogin] = useState(true)
	const handleLogin = ()=>{
		setIsLogin(true)
	}

	const handleSignup = ()=>{
		setIsLogin(false)
	}
	return (
		<div className="loginPage">
			<div className="login">
				<i className="fa-solid fa-user fa-8x"></i>
				<div className="">
					<button className="loginBtn btn" onClick={handleLogin}>Log In</button>
					<button className="signupBtn btn" onClick={handleSignup}>Sign Up</button>
				</div>
				<div className="loginForm">
					{!isLogin && <div className="formField">
						<input type="text" className="name" required/>
						<label htmlFor="">Name</label>
					</div>}
					<div className="formField">
						<input type="mail" className="email" required/>
						<label htmlFor="">Email</label>
					</div>
					<div className="formField">
						<input type="password" className="password" required/>
						<label htmlFor="">Password</label>
					</div>
					<button className="signupSubmit btn">Submit</button>
				</div>
			</div>
		</div>
	);
};

export default Login;
