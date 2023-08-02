import React from "react";
// import { HiOutlineUserCircle } from "react-icons/hi";
import { AiOutlineCloseCircle } from "react-icons/ai";

const UserDetailsCard = ({ user }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 p-8"
      onClick={user.closeDetails}
    >
      <div className="bg-white dark:bg-gray-600 rounded-lg p-4 max-w-md w-full shadow-lg relative">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
            {/* <HiOutlineUserCircle className="text-gray-600 dark:text-gray-400 text-4xl" /> */}
            <img
              src={user.avatar}
              alt="User Avatar"
              className="rounded-full 1=w-16 h-16 object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-white text-2xl ">
              <a
                href="https://www.youtube.com/@purnashrestha3199"
                className="hover:underline transition-all duration-300 ease-in-out"
              >
                {user.name}
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {user.subscriberCount} subscribers
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {user.views} views
            </p>
          </div>
        </div>
        <hr className="my-4 border-gray-300 dark:border-gray-700" />
        <div>
          <p className="text-gray-800 dark:text-gray-300">
            Location: {user.location}
          </p>
          <p className="text-gray-800 dark:text-gray-300">
            Joined: {user.joinedDate}
          </p>
          {/* Add more user details here */}
          {/* Example: */}
          {/* <p className="text-gray-800 dark:text-gray-300">
            YouTube:{" "}
            <a href="https://www.youtube.com/@purnashrestha3199" target="_blank">
              {user.youtube}
            </a>
          </p> */}
          <p className="text-gray-800 dark:text-gray-300">
            Website:{" "}
            <a href="https://purnashrestha.com.np" target="_blank">
              {user.website}
            </a>
          </p>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={user.closeDetails}
            className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 absolute top-4 right-4"
          >
            <AiOutlineCloseCircle className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
