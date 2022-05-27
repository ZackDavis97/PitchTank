import {
    ClockIcon,
    CurrencyDollarIcon,
    MailIcon,
    PhoneIcon,
  } from "@heroicons/react/solid";
  
  const LikedCard = ({ likedCandidates, delEvent }) => {
    return (
      <>
        <div className="lgLikeCard:w-[50%] lg:w-[80%] w-[90%] m-auto relative shadow-2xl bg-white rounded-lg dark:bg-darkLight  py-4 px-8 mb-6">
          {" "}
          <div className="w-full flex items-center gap-8 cardLaptopBreakpoint:flex-row flex-col justify-center cardLaptopBreakpoint:justify-start">
            <div className="profilePicShadow w-[150px] h-[150px] m-4 rounded-full overflow-hidden relative z-10 ">
              <>
                <img
                  src={likedCandidates?.profilePicture}
                  alt="profile card"
                  className="block w-full h-full object-cover rounded-full"
                />
              </>
            </div>
            <div className="text-lg">
              <div className=" text-2xl  font-medium text-primary mb-2 ">
                <h2>{likedCandidates?.idea}</h2>
              </div>
              <div className="font-bold text-primary mb-2">
                <h2>{likedCandidates?.fullName}</h2>
              </div>
              <div className="text-lg font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-4">
                <MailIcon className="inline-block h-6 w-6 text-gray-600 dark:text-white" />
                <div>
                  <h2>{likedCandidates?.email}</h2>
                </div>
              </div>
              <div className="text-lg font-medium text-gray-900 mb-2 flex items-center gap-4 dark:text-white">
                <PhoneIcon className="inline-block h-6 w-6 text-gray-600 dark:text-white" />
  
                <h2>{likedCandidates?.phoneNumber}</h2>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <CurrencyDollarIcon className="inline-block h-6 w-6 dark:text-white text-gray-600" />
                  <h2 className="dark:text-white">
                    {likedCandidates?.cost} Million
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="inline-block h-6 w-6 dark:text-white text-gray-600" />
                  <h2 className="dark:text-white">
                    {likedCandidates?.time < 10
                      ? `0${likedCandidates?.time} Months`
                      : `${likedCandidates?.time} Months`}{" "}
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <div className="flex cardLaptopBreakpoint:justify-end justify-center pt-8 cardLaptopBreakpoint:py-0">
            <button
              className="cardButton button-reject px-12 py-2"
              onClick={() => delEvent(likedCandidates?._id)}
            >
              Reject
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default LikedCard;