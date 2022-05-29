import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
  } from "firebase/auth";
  import { useEffect, useState } from "react";
  import { toast } from "react-toastify";
  import initializationFirebase from "../firebase/firebase.init";
  
  const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    initializationFirebase();
  
    const auth = getAuth();
  
    const registerUser = (email, password, inputtedData, navigate) => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(res.user);
          saveToDB(inputtedData, navigate);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(err.message.split(" ").slice(2).join(" "));
          setLoading(false);
        });
    };
  
    const loginUser = (email, password, navigate) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setUser(res.user);
          setLoading(false);
          toast.success("Login Successful");
          navigate("/");
        })
        .catch((err) => {
          toast.error(err.message.split(" ").slice(2).join(" "));
          setLoading(false);
        });
    };
  
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser({});
        }
        setLoading(false);
      });
      return () => {
        unSubscribe();
      };
    }, [auth]);
  
    const logoutUser = (navigate) => {
      signOut(auth)
        .then(() => {
          setUser("");
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const saveToDB = (inputtedData, navigate) => {
      fetch("https://powerful-atoll-01349.herokuapp.com/api/v1.0/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputtedData),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === "error") {
            toast.error(data?.text);
          }
          if (data?.status === "success") {
            toast.success(data?.text);
            navigate("/");
            document.getElementById("signUpForm").reset();
          }
        });
    };
  
    return {
      user,
      loading,
      registerUser,
      loginUser,
      logoutUser,
    };
  };
  
  export default useFirebase;