import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FidgetSpinner } from "react-loader-spinner";

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    let success = false;
    let errorText = "";
    const payload = JSON.stringify({
      email: email,
      password: pass,
    });
    try {
      fetch(process.env.REACT_APP_API_URL_BASE + "/login/", {
        method: "POST",
        body: payload,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoading(false);
          console.log(res);
          if (!res.ok) {
            errorText = "Error: " + res.status + " - ";
            setError(errorText);
            success = false;
            return res.json();
          } else {
            success = true;
            return res.json();
          }
        })
        .then((data) => {
          if (!success) {
            for (const err in data.errors) {
              for (const msg in data.errors[err])
                errorText += data.errors[err][msg];
            }
            console.log(errorText);
            setError(errorText);
          } else {
            if (data.success) {
              window.sessionStorage.setItem("auth", true);
              window.sessionStorage.setItem("user_id", data.user_id);
              window.sessionStorage.setItem("token", data.token);
              navigate("/userprofile");
            }
          }
        })
        .catch((error) => {
          success = false;
          console.error(error);
          console.log(error.message);
          setError(error.message);
          setLoading(false);
        });
      if (success) {
        setEmail("");
        setPass("");
        setError("Logged In Successfully!");
        setLoading(false);
        //Navigate to User Page
      } else {
        setError(errorText);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      console.log("mike");
      setError("Error Registering - Check your information and try again");
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-label" htmlFor="email">
          Email
        </label>
        <input
          className="login-input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="email@email.com"
          id="email"
          name="email"
        />
        <label className="login-label" htmlFor="password">
          Password
        </label>
        <input
          className="login-input"
          required
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="*********"
          id="password"
          name="password"
        />
        <button className="login-button" type="submit">
          Login
        </button>
        <p color="white">{error}</p>
      </form>
      <button className="link-btn" onClick={() => navigate("/register")}>
        Don't have an account? Register here.
      </button>
      <p>{loading ? <FidgetSpinner /> : ""}</p>
    </div>
  );
};

export default LoginForm;
