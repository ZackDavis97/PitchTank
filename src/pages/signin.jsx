import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {} from "react-toastify";

import InputRequired from "../components/common/InputRequired";
import useFirebase from "../hooks/useFirebase";

const SignIn = () => {
  const { loginUser } = useFirebase();

  const [inputtedData, setInputtedData] = useState({
    email: "",
    password: "",
  });

  const nevigate = useNavigate();

  const handleChange = (name, value) => {
    setInputtedData({
      ...inputtedData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(inputtedData.email, inputtedData.password, nevigate);
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 dark:bg-extraDark">
        <div className="sm:mx-auto sm:w-full text-center font-montserrat dark:text-white text-black">
          <h2 className="font-courgette  text-5xl font-bold">
            <span>Pitch</span> <span className="text-primary">Tank</span>
          </h2>
          <div className="w-20 h-[4px] rounded-full m-auto bg-primary my-2"></div>
          <h2 className="mt-6  text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-4 text-sm text-gray-900 dark:text-white font-medium">
            Don't Have An Account ?{" "}
            <Link className="underline text-primary" to={"/signup"}>
              Signup Here{" "}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-[90%] sm:max-w-2xl">
          <div className="bg-white dark:bg-darkLight py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} id="signInForm">
              <div>
                <InputRequired
                  label={"Email Address"}
                  name={"email"}
                  type={"email"}
                  event={handleChange}
                />
              </div>

              <div>
                <InputRequired
                  label={"Password"}
                  name={"password"}
                  type={"password"}
                  from={"signInForm"}
                  event={handleChange}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900 dark:text-white"
                  >
                    Remember me
                  </label>
                </div>
              </div>

              <div>
                <button type="submit" className="AuthenticationActionButton">
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignIn;