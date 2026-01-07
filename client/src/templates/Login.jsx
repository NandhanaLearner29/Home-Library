import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userData, setUserData] = useState({
    identifier: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/home_library/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      const token = data.token;

      localStorage.setItem("token", token);
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-page">
      <h1 className="login-page-header">Welcome to Home Library App</h1>

      <p className="sign-in-toggle">
        Are you new user?{" "}
        <span className="sign-up">
          <a href="/register">Click here</a>
        </span>
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="identifier">Email / Username</label>
        <input
          type="text"
          name="identifier"
          value={userData.identifier}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
