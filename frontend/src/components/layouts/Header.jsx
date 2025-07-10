import { ArrowRightOnRectangleIcon as LogoutIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Logout from "../accounts/Logout";
import ThemeToggler from "./ThemeToggler";

export default function Header() {
  const [modal, setModal] = useState(false);
  const { currentUser } = useAuth();
  
  return (
    <>
      <nav className="px- px-2 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex items-center group">
            <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:via-blue-500 hover:to-cyan-400 transition-all duration-500 drop-shadow-lg">
              Chat App
             </span>
            </Link>
          <div className="flex md:order-2">
            <ThemeToggler />
            {currentUser && (
              <>
                <button
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-lg text-sm p-2.5"
                  onClick={() => setModal(true)}
                >
                  <LogoutIcon className="h-8 w-8" aria-hidden="true" />
                </button>
                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={currentUser.photoURL}
                    alt=""
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      {modal && <Logout modal={modal} setModal={setModal} />}
    </>
  );
}