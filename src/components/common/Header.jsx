import { HeartIcon, UserCircleIcon, LogoutIcon } from "@heroicons/react/solid";
import { Link, useNavigate } from "react-router-dom";
import useFirebase from "../../hooks/useFirebase";

import SwitchDark from "../SwitchDark";

const Header = ({ active, setActive }) => {
  const { user, logoutUser } = useFirebase();

  const navigate = useNavigate();

  const logout = () => {
    logoutUser(navigate);
  };

  return (
    <header className="bg-primary dark:bg-darkLight md:absolute w-full z-[100]">
      <div className="w-[95%] md:w-[80%] lg:w-[75%] m-auto py-8 flex justify-between items-center">
        <div>
          <Link to="/">
            <h2 className="font-courgette text-white text-3xl md:text-5xl font-bold">
              Pitch Tank
            </h2>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to={"/liked"}>
            <button className="flex items-center gap-1">
              <HeartIcon className="inline-block h-8 w-8 text-red-600" />{" "}
              <h2 className="text-red-600 font-montserrat font-bold">Liked</h2>
            </button>
          </Link>
          <SwitchDark setEnabled={setActive} enabled={active} />
          {!user?.email ? (
            <Link to={"/signin"}>
              <button className="flex items-center gap-1">
                <UserCircleIcon className="inline-block h-8 w-8 text-white" />{" "}
              </button>
            </Link>
          ) : (
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={logout}
            >
              <LogoutIcon className="inline-block h-8 w-8 text-white" />{" "}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;