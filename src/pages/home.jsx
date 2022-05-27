import {
    MailIcon,
    PhoneIcon,
    CurrencyDollarIcon,
    ClockIcon,
  } from "@heroicons/react/solid";
  import { useCallback, useEffect, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import { toast } from "react-toastify";
  
  import Loader from "../components/common/Loader";
  import useFirebase from "../hooks/useFirebase";
  
  const Home = () => {
    const [randomUser, setRandomUser] = useState({});
    const [randomMonth, setRandomMonth] = useState(0);
    const [randomCost, setRandomCost] = useState(0);
    const [randomIdea, setRandomIdea] = useState("");
    const [loading, setLoading] = useState(true);
  
    const { user } = useFirebase();
  
    const navigate = useNavigate();
    const isMounted = useRef();
  
    const fetchRandomUser = useCallback(async () => {
      setLoading(true);
      fetch("https://randomuser.me/api")
        .then((response) => response.json())
        .then((data) => {
          setRandomUser(data?.results[0]);
        })
        .catch((error) => console.log(error));
      // .finally(() => setLoading(false));
  
      fetch("https://powerful-atoll-01349.herokuapp.com/api/v1.0/thisforthat")
        .then((response) => response.json())
        .then((data) => {
          setRandomIdea(data?.text);
          setLoading(false);
        });
  
      setRandomMonth(Math.round(Math.random() * 30 + 1));
      setRandomCost((Math.random() * 30 + 1).toFixed(2));
    });
  
    useEffect(() => {
      if (isMounted.current) return;
  
      fetchRandomUser();
      isMounted.current = true;
    }, [fetchRandomUser]);
  
    const handleLikeIdea = () => {
      if (!user.email) {
        toast.error("You must be logged in to like an idea");
        navigate("/signin");
        return;
      }
  
      const data = {
        profilePicture: randomUser?.picture?.large,
        fullName: `${randomUser?.name?.title} ${randomUser?.name?.first} ${randomUser?.name?.last}`,
        email: randomUser?.email,
        phoneNumber: randomUser?.phone,
        idea: randomIdea,
        cost: randomCost,
        time: randomMonth,
        likerEmail: user?.email,
      };
  
      fetch("https://powerful-atoll-01349.herokuapp.com/api/v1.0/candidate/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data?.status === "error") {
            toast.error(data?.text);
          }
          if (data?.status === "success") {
            toast.success(data?.text);
          }
        });
  
      fetchRandomUser();
    };
  
    return (
      <section className="h-screen w-full dark:bg-extraDark flex justify-center items-center">
        <div className="md:mt-[18rem] mt-[7rem] profile-card js-profile-card w-[95%] sm:[w-full] min-h-[200px] m-auto shadow-2xl bg-white dark:bg-darkLight rounded-lg max-w-[500px] relative">
          <div className="profilePicShadow w-[150px] h-[150px] mx-auto transform rounded-full -translate-y-1/2 overflow-hidden relative z-10 ">
            {loading ? (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loader />
              </div>
            ) : (
              <>
                <img
                  src={randomUser?.picture?.large}
                  alt="profile card"
                  className="block w-full h-full object-cover rounded-full"
                />
              </>
            )}
          </div>
  
          <div
            className={`profile-card__cnt js-profile-cnt mt-[-35px] text-center px-[2rem] pb-[3.5rem] duration-300 font-montserrat`}
          >
            <div className="font-bold text-2xl text-primary mb-6">
              {loading ? (
                <div className="animate-pulse">
                  <div class="h-3 w-[60%] m-auto bg-slate-200 rounded my-5"></div>
                </div>
              ) : (
                `${randomUser?.name?.title} ${randomUser?.name?.first} ${randomUser?.name?.last}`
              )}
            </div>
            <div className="text-lg font-medium text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-4">
              <MailIcon className="inline-block h-6 w-6 text-gray-600 dark:text-white" />
              <div>
                {loading ? (
                  <div className="animate-pulse">
                    <div class="h-3 w-[10rem] m-auto bg-slate-200 rounded my-2"></div>
                  </div>
                ) : (
                  <h2>{randomUser?.email}</h2>
                )}
              </div>
            </div>
            <div className="text-lg font-medium text-gray-900 mb-6 flex items-center justify-center gap-4 dark:text-white">
              <PhoneIcon className="inline-block h-6 w-6 text-gray-600 dark:text-white" />
              {loading ? (
                <div className="animate-pulse">
                  <div class="h-3 w-[10rem] m-auto bg-slate-200 rounded my-2"></div>
                </div>
              ) : (
                <h2>{randomUser?.phone}</h2>
              )}
            </div>
            <div className="text-lg font-medium text-primary mb-6 ">
              {loading ? (
                <div className="animate-pulse">
                  <div class="h-3 w-[10rem] m-auto bg-slate-200 rounded my-2"></div>
                </div>
              ) : (
                <h2>{randomIdea}</h2>
              )}
            </div>
            <div className="flex justify-between items-center w-[80%] m-auto">
              <div className="flex items-center gap-2">
                <CurrencyDollarIcon className="inline-block h-6 w-6 dark:text-white text-gray-600" />
                <h2 className="dark:text-white">{randomCost} Million</h2>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="inline-block h-6 w-6 dark:text-white text-gray-600" />
                <h2 className="dark:text-white">
                  {randomMonth < 10
                    ? `0${randomMonth} Months`
                    : `${randomMonth} Months`}{" "}
                </h2>
              </div>
            </div>
          </div>
  
          <div className="flex justify-evenly pb-6 items-center">
            <button
              className="cardButton button-like px-12 py-2"
              onClick={handleLikeIdea}
            >
              Like
            </button>
            <button
              className="cardButton button-reject px-12 py-2"
              onClick={fetchRandomUser}
            >
              Reject
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default Home;