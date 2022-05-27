import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";
import Select from "../components/common/Select";
import LikedCard from "../components/LikedCard";
import useFirebase from "../hooks/useFirebase";

const Liked = () => {
  const [likedCandidates, setLikedCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(true);
  const [backUpLikedCandidates, setBackUpLikedCandidates] = useState([]);
  const [whenNotFiltered, setWhenNotFiltered] = useState([]);
  const [sortedBy, setSortedBy] = useState("");

  const { user } = useFirebase();

  const sortData = [
    "Sort by:",
    "Longest Time",
    "Shortest Time",
    "Most Expensive",
    "Least Expensive",
  ];

  const minimumTime = [
    "Minimum Time:",
    "Under 5 months",
    "5 months - 10 months",
    "10 months - 20 months",
    "Above 20 months",
  ];

  const minimumCost = [
    "Minimum Cost:",
    "Under $5 million",
    "$5 - $10 million",
    "$10 - $15 million",
    "Above $15 million",
  ];

  const fetchCandidate = useCallback(async () => {
    const response = await fetch(
      `https://powerful-atoll-01349.herokuapp.com/api/v1.0/candidate/get/${user.email}`
    );
    const data = await response.json();
    // Storing the Array in three states to be able to filter it
    setLikedCandidates(data.candidate);
    setBackUpLikedCandidates(data.candidate);
    setWhenNotFiltered(data.candidate);
  }, [user?.email]);

  useEffect(() => {
    fetchCandidate();
    setLoading(false);
  }, [user?.email, fetchCandidate]);

  const handleSort = (e) => {
    setSortedBy(e.target.outerText);
    if (e.target.outerText === "Sort by:") {
      // No sort selected
    }
    if (e.target.outerText === "Longest Time") {
      setLikedCandidates(likedCandidates.sort((a, b) => b.time - a.time));
    }
    if (e.target.outerText === "Shortest Time") {
      setLikedCandidates(likedCandidates.sort((a, b) => a.time - b.time));
    }
    if (e.target.outerText === "Most Expensive") {
      setLikedCandidates(likedCandidates.sort((a, b) => b.cost - a.cost));
    }
    if (e.target.outerText === "Least Expensive") {
      setLikedCandidates(likedCandidates.sort((a, b) => a.cost - b.cost));
    }
  };

  const handleMinimumTime = (e) => {
    if (e.target.outerText === "Minimum Time:") {
      setLikedCandidates(whenNotFiltered);
    }
    if (e.target.outerText === "Under 5 months") {
      setLikedCandidates(
        backUpLikedCandidates.filter(
          (candidate) => Math.ceil(candidate.time) <= 5
        )
      );
    }
    if (e.target.outerText === "5 months - 10 months") {
      setLikedCandidates(
        backUpLikedCandidates.filter(
          (candidate) =>
            Math.ceil(candidate.time) > 5 && Math.ceil(candidate.time) <= 10
        )
      );
    }
    if (e.target.outerText === "10 months - 20 months") {
      setLikedCandidates(
        backUpLikedCandidates.filter(
          (candidate) =>
            Math.ceil(candidate.time) > 10 && Math.ceil(candidate.time) <= 20
        )
      );
    }
    if (e.target.outerText === "Above 20 months") {
      setLikedCandidates(
        backUpLikedCandidates.filter(
          (candidate) => Math.ceil(candidate.time) > 20
        )
      );
    }
  };

  const handleMinimumCost = (e) => {
    if (e.target.outerText === "Minimum Cost:") {
      setLikedCandidates(whenNotFiltered);
    }
    if (e.target.outerText === "Under $5 million") {
      setLikedCandidates(
        backUpLikedCandidates.slice().filter((candidate) => candidate.cost <= 5)
      );
    }
    if (e.target.outerText === "$5 - $10 million") {
      setLikedCandidates(
        backUpLikedCandidates
          .slice()
          .filter(
            (candidate) =>
              Math.ceil(candidate.cost) > 5 && Math.ceil(candidate.cost) <= 10
          )
      );
    }
    if (e.target.outerText === "$10 - $15 million") {
      setLikedCandidates(
        backUpLikedCandidates
          .slice()
          .filter(
            (candidate) =>
              Math.ceil(candidate.cost) > 10 && Math.ceil(candidate.cost) <= 15
          )
      );
    }
    if (e.target.outerText === "Above $15 million") {
      setLikedCandidates(
        backUpLikedCandidates.slice().filter((candidate) => candidate.cost > 15)
      );
    }
  };

  const handleDelete = (id) => {
    fetch(
      `https://powerful-atoll-01349.herokuapp.com/api/v1.0/candidate/delete/${id}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLikedCandidates(
          likedCandidates.filter(
            (candidate) => candidate._id !== data.deletedId
          )
        );
        toast.success("Candidate Rejected");
        // setLikedCandidates(data.candidate);
      });
  };

  const handleDeleteAll = () => {
    fetch(
      `https://powerful-atoll-01349.herokuapp.com/api/v1.0/candidate/deleteAll`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setLikedCandidates([]);
        toast.success("All candidates Rejected");
      });
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex justify-center items-center dark:bg-extraDark">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <section
        className={`dark:bg-extraDark ${
          likedCandidates.length > 2 ? "h-full" : "h-screen"
        }`}
      >
        <div className="md:pt-[15rem] pt-[5rem] pb-[5rem]">
          {!user?.email ? (
            <div className="lgLikeCard:w-[50%] lg:w-[80%] w-[90%] m-auto relative shadow-2xl bg-white rounded-lg dark:bg-darkLight  py-4 px-8 mb-6">
              <div>
                <h2 className="text-primary font-bold text-center text-3xl">
                  Please Login To See You Liked Candidates
                </h2>
                <div className="flex justify-center py-6">
                  <Link to={"/signin"}>
                    <button className="cardButton button-like px-12 py-2">
                      Click Here To Signin
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ) : likedCandidates.length === 0 ? (
            <>
              <div className="lgLikeCard:w-[50%] lg:w-[80%] w-[90%] m-auto relative shadow-2xl bg-white rounded-lg dark:bg-darkLight  py-4 px-8 mb-6">
                <div className="flex items-center flex-wrap cardLaptopBreakpoint:justify-end justify-center gap-6">
                  <div className="w-[13rem]">
                    <Select event={handleMinimumTime} data={minimumTime} />
                  </div>
                  <div className="w-[13rem]">
                    <Select event={handleMinimumCost} data={minimumCost} />
                  </div>
                  <div className="w-[13rem]">
                    <Select event={handleSort} data={sortData} />
                  </div>
                  <button
                    className="cardButton button-reject lg:px-12 px-8 py-2"
                    onClick={handleDeleteAll}
                  >
                    Reject All
                  </button>
                </div>
              </div>
              <div className="lgLikeCard:w-[50%] lg:w-[80%] w-[90%] m-auto relative shadow-2xl bg-white rounded-lg dark:bg-darkLight  py-4 px-8 mb-6">
                <div>
                  <h2 className="text-primary font-bold text-center text-3xl">
                    Sorry No Result Found
                  </h2>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="lgLikeCard:w-[50%] lg:w-[80%] w-[90%] m-auto relative shadow-2xl bg-white rounded-lg dark:bg-darkLight  py-4 px-8 mb-6">
                <div className="flex items-center flex-wrap cardLaptopBreakpoint:justify-end justify-center gap-6">
                  <div className="w-[13rem]">
                    <Select event={handleMinimumTime} data={minimumTime} />
                  </div>
                  <div className="w-[13rem]">
                    <Select event={handleMinimumCost} data={minimumCost} />
                  </div>
                  <div className="w-[13rem]">
                    <Select event={handleSort} data={sortData} />
                  </div>
                  <button
                    className="cardButton button-reject lg:px-12 px-8 py-2"
                    onClick={handleDeleteAll}
                  >
                    Reject All
                  </button>
                </div>
              </div>
              <div>
                {likedCandidates.map((candidate) => (
                  <LikedCard
                    likedCandidates={candidate}
                    loading={loading}
                    delEvent={handleDelete}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Liked;