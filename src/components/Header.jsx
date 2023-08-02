import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import purna from "../assets/purna.webp";
import purnaTvLogo from "../assets/purnaTv.svg";
import purnaTvLogoMobile from "../assets/purnaTv_mobile.svg";

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { HiOutlineStatusOffline } from "react-icons/hi";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import { DataContext } from "../context/ContextApi";
import Loader from "../shared/Loader";
import UseOnline from "../utils/UseOnline";
import UserDetailsCard from "./UserDetailsCard";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, mobileMenu, setMobileMenu, theme, setTheme } =
    useContext(DataContext);

  const navigate = useNavigate();

  const isOnline = UseOnline();

  const searchQueryHandler = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };
  const searchQueryHandler2 = () => {
    if (searchQuery?.length > 0) {
      navigate(`/searchResult/${searchQuery}`);
    }
  };

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const mobileMenuToggle = () => {
    setMobileMenu(!mobileMenu);
  };

  const { pathname } = useLocation();
  const pageName = pathname?.split("/")?.filter(Boolean)?.[0];

  const [showUserDetails, setShowUserDetails] = useState(false);

  const user = {
    name: "Purna Shrestha",
    email: "purnashrestha0310@gmail.com",
    avatar: purna,
    views: 1181,
    subscriberCount: 203,
    location: "Nepal",
    joinedDate: "Jan 14, 2018",
    website: "www.purnashrestha.com.np",

    closeDetails: () => setShowUserDetails(false),
  };

  return (
    <div className="flex flex-row h-14 px-4 md:px-5 justify-between items-center sticky top-0 z-20 bg-white dark:bg-black shadow-md">
      {loading && <Loader />}

      <div className="flex h-5 items-center">
        {pageName !== "video" && (
          <div
            onClick={mobileMenuToggle}
            className="flex h-10 w-10 justify-center items-center rounded-full  md:hidden md:mr-6 cursor-pointer hover:bg-[#303030]/[0.6]"
          >
            {mobileMenu ? (
              <CgClose className="text-black dark:text-white text-xl" />
            ) : (
              <SlMenu className="text-black dark:text-white text-xl" />
            )}
          </div>
        )}
        <Link to="/" className="flex h-5 items-center select-none">
          <img
            src={purnaTvLogo}
            alt="YouTube"
            className="w-32 hidden md:block"
          />
          <img
            src={purnaTvLogoMobile}
            alt="YouTube Mobile"
            className="h-8 w-8 md:hidden rounded-full ml-1"
          />
        </Link>
      </div>

      <div className="group flex items-center">
        <div className="flex h-8 md:h-10 md:ml-10 md:pl-5 border border-[#404040] rounded-l-3xl group-focus-within:border-blue-500 md:group-focus-within:ml-5 md:group-focus-within:pl-0 ">
          <div className="w-10 justify-center items-center hidden group-focus-within:md:flex">
            <IoIosSearch className="text-black/[0.7] dark:text-white text-xl" />
          </div>
          <input
            type="text"
            value={searchQuery}
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={searchQueryHandler}
            className="w-44 px-5 bg-transparent outline-none text-black dark:text-white md:pl-0 md:group-focus-within:pl-0 md:w-64 lg:w-[500px]"
          />
        </div>
        <button
          onClick={searchQueryHandler2}
          className="w-[40px] md:w-[60px] h-8 md:h-10 flex items-center justify-center border border-l-0 border-[#404040] rounded-r-3xl bg-black/[0.1] dark:bg-white/[0.15]"
        >
          <IoIosSearch className="text-black/[0.9] dark:text-white text-xl" />
        </button>
      </div>

      <div className="flex items-center">
        <div className="hidden md:flex">
          <div
            className={`flex justify-center items-center h-10 w-10 rounded-full ${
              isOnline ? "hover:bg-[#34a0a4]/[0.7]" : "hover:bg-[#f2bad5]/[0.4]"
            }`}
          >
            {isOnline ? (
              <HiOutlineStatusOnline className="text-[#1795a8] dark:text-[#7cf6fd] text-xl" />
            ) : (
              <HiOutlineStatusOffline className="text-[#f74a8a] text-xl" />
            )}
          </div>
          <div
            onClick={handleThemeSwitch}
            className="flex justify-center items-center ml-2 h-10 w-10 rounded-full hover:bg-black/[0.2] dark:hover:bg-[#303030]/[0.6]"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode className="text-white text-xl cursor-pointer" />
            ) : (
              <MdDarkMode className="text-[#3a5171] text-xl cursor-pointer" />
            )}
          </div>
        </div>
        <div className="flex h-8 w-8 overflow-hidden rounded-full md:ml-4 select-none">
          <div
            onClick={() => setShowUserDetails(true)}
            className="cursor-pointer"
          >
            <img src={purna} alt="Purna Shrestha" />
          </div>
        </div>
        {showUserDetails && <UserDetailsCard user={user} />}
      </div>
    </div>
  );
};

export default Header;
