import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputRequired from "../components/common/InputRequired";
import useFirebase from "../hooks/useFirebase";

const SignUp = () => {
  const navigate = useNavigate();

  const { registerUser } = useFirebase();

  const [inputtedData, setInputtedData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (name, value) => {
    setInputtedData({
      ...inputtedData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputtedData?.password?.length < 7) {
      return toast.error("Password must be at least 8 characters long");
    }
    registerUser(
      inputtedData.email,
      inputtedData.password,
      inputtedData,
      navigate
    );
  };

  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8 dark:bg-extraDark">
        <div className="sm:mx-auto sm:w-full text-center font-montserrat">
          <h2 className="font-courgette  text-5xl font-bold dark:text-white text-gray-900">
            <span>Pitch</span> <span className="text-primary">Tank</span>
          </h2>
          <div className="w-20 h-[4px] rounded-full m-auto bg-primary my-2"></div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign Up Here to Create an Account
          </h2>
          <p className="mt-4 text-sm text-gray-900 dark:text-white font-medium">
            Already Have An Account ?{" "}
            <Link className="underline text-primary" to={"/signin"}>
              Signin Here{" "}
            </Link>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto w-[90%] sm:max-w-2xl">
          <div className="bg-white dark:bg-darkLight py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit} id="signUpForm">
              <div>
                <InputRequired
                  label={"Full Name"}
                  name={"name"}
                  type={"text"}
                  event={handleChange}
                />
              </div>
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
                  event={handleChange}
                />
              </div>
              <div>
                <button type="submit" className="AuthenticationActionButton">
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;