import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_DOMAIN } from "../../cons/Cons";
import FormInput from "../../common/Form/FormInput";
import { UserContext } from "../../contexts/UserContext";
import ShowMsg from "../../common/ShowMsg";
import Logo from "../../common/Logo";

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
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
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
    <div className="w-screen h-screen bg-blue-linear  flex items-center justify-around md:flex-col md:justify-center md:gap-12 md:pt-12">
      <Logo />
      <p className="font-blue-linear  w-2/5 md:w-full text-5hxl  lg:text-4hxl md:text-4hxl font-bold text-center  ">
        Welcome {isLogin && "back"} to KENGENKANRI!!
      </p>
      <div
        className="w-96  md:w-88  p-16 md:p-12 mr-40 lg:mr-20  md:mr-0  shadow-md bg-[#A7ADEA]  
      "
      >
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
                optionalClass={["bg-purple"]}
                label="username"
                value={username}
                handleChange={(e) => setUsername(e.target.value)}
              />
            )}

            <FormInput
              optionalClass={["bg-purple"]}
              label="email"
              type="email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              optionalClass={["bg-purple"]}
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
    </div>
  );
};

export default SignForm;
