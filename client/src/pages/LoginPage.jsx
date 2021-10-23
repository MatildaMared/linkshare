import React, { useState } from "react";
import LoginForm from '../components/LoginForm';

function LoginPage() {
	const [activeComponent, setActiveComponent] = useState("login");

	return (
		<>
      {activeComponent === "login" ? (
        <LoginForm />
      ) : (
        <h1>Register</h1>
      )}
		</>
	);
}

export default LoginPage;
