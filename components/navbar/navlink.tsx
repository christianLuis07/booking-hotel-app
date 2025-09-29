"use client";

import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import clsx from "clsx";
import Link from "next/link";

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { data: session } = useSession();

  return (
    <>
      {session?.user ? (
        <div className="flex items-center justify-end md:order-2 relative">
          <div className="hidden md:block">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-200 rounded-full hover:bg-gray-50 hover:shadow-md transition-all duration-200"
            >
              <Image
                className="size-9 rounded-full ring-2 ring-gray-100"
                src={session.user.image || "/avatar.svg"}
                alt={session.user.name || "User Avatar"}
                width={36}
                height={36}
              />
              <div className="text-left">
                <p className="text-sm font-semibold text-gray-800">
                  {session.user.name || "User"}
                </p>
                <p className="text-xs text-gray-500">
                  {session.user.role === "admin" ? "Admin" : "Guest"}
                </p>
              </div>
              <svg
                className={clsx("w-4 h-4 text-gray-600 transition-transform", {
                  "rotate-180": showDropdown,
                })}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {session.user.email}
                  </p>
                </div>
                <button
                  onClick={() => {
                    signOut();
                    setShowDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}

      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {!open ? <IoMenu className="size-8" /> : <IoClose className="size-8" />}
      </button>

      <div className={clsx("w-full md:block md:w-auto", { hidden: !open })}>
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-10 md:p-0 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link
              href={"/"}
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={"/about"}
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href={"/rooms"}
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href={"/contact"}
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
            >
              Contact
            </Link>
          </li>
          {session && (
            <>
              <li>
                <Link
                  href={"/myreservation"}
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
                >
                  My Reservation
                </Link>
              </li>

              {session.user.role === "admin" && (
                <>
                  <li>
                    <Link
                      href={"/admin/dashboard"}
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"/admin/room"}
                      className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:hover:text-orange-500 md:p-0 transition-colors"
                    >
                      Manage Room
                    </Link>
                  </li>
                </>
              )}
            </>
          )}

          {session ? (
            <li className="pt-2 md:pt-0 md:hidden">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 mb-3">
                <Image
                  className="size-12 rounded-full ring-2 ring-orange-100"
                  src={session.user.image || "/avatar.svg"}
                  alt={session.user.name || "User Avatar"}
                  width={48}
                  height={48}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {session.user.name}
                  </p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
              </div>
              <button
                onClick={() => signOut()}
                className="w-full py-2.5 px-4 bg-red-500 text-white hover:bg-red-600 rounded-lg cursor-pointer font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Out
              </button>
            </li>
          ) : (
            <li className="pt-2 md:pt-0">
              <Link
                href={"/signin"}
                className="inline-block py-2.5 px-6 bg-orange-500 text-white hover:bg-orange-600 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg"
              >
                Sign in
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
