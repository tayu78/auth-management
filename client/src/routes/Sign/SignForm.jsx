import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../cons/Cons";
import FormInput from "../../common/Form/FormInput";
import { UserContext } from "../../contexts/UserContext";
import ShowMsg from "../../common/ShowMsg";

const SignForm = ({ isLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const signIn = (user) => {
    setUser(user);
    navigate("/home");
  };

  useEffect(() => {
    setUsername("");
    setPassword("");
    setEmail("");
    setError("");
  }, [isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let userResult;
    try {
      if (isLogin) {
        userResult = await axios.post(`${SERVER_DOMAIN}/users/signin`, {
          email,
          password,
        });
      } else {
        userResult = await axios.post(`${SERVER_DOMAIN}/users/signup`, {
          name: username,
          email,
          password,
        });
      }

      if (userResult.data) {
        signIn(userResult.data);
      }
    } catch (e) {
      setShowMsg(true);
      setError(e.response.data.message);
    }
  };

  return (
    <div className="w-96 m-auto border p-16 mt-10 shadow-md bg-white">
      <h2 className="text-center text-xl mb-8">
        {isLogin ? "Sign In" : "Sign Up"}
      </h2>

      {showMsg && (
        <ShowMsg status={"error"} msg={error} setShowMsg={setShowMsg} />
      )}
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center  ">
          {!isLogin && (
            <FormInput
              label="username"
              value={username}
              handleChange={(e) => setUsername(e.target.value)}
            />
          )}

          <FormInput
            label="email"
            type="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <FormInput
            label="password"
            type="password"
            value={password}
            handleChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="border-2 bg-slate-500 text-white w-20 p-2 m-5"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </form>
      {isLogin ? (
        <div className="text-center">
          <p>Not have an account? </p>
          <Link to="/signup">here to Sign Up</Link>
        </div>
      ) : (
        <div className="text-center">
          <p>Already have an account ? </p>
          <Link to="/signin">here to Sign In</Link>
        </div>
      )}
    </div>
  );
};

export default SignForm;
