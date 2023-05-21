import Link from "next/link";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reset, logout } from "../redux/auth/authSlice";
import Image from "next/image";

function Header({ currentTab }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, []);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setLogin(false);
  };

  return (
    <div className="w-full border-b-2 border-gray text-gray-600 flex justify-between">
      <Link href="/" className="flex items-center gap-4 text-4xl p-2">
        <Image src="/logo.svg" width="30" height="30"></Image>
        <h1>QuillScribe</h1>
      </Link>

      <div className="flex text-xl gap-4 px-4 items-center justify-center">
        <Link
          href="/categories"
          className={
            currentTab == "categories"
              ? " text-indigo-500 border-indigo-500"
              : ""
          }
        >
          CATEGORIES
        </Link>
        <Link
          href="/bookmarks"
          className={
            currentTab == "bookmarks"
              ? "  text-indigo-500 border-indigo-500"
              : ""
          }
        >
          BOOKMARKS
        </Link>
        <Link
          href="/about"
          className={
            currentTab == "about" ? "  text-indigo-500 border-indigo-500" : ""
          }
        >
          ABOUT
        </Link>
        <Link
          href="/createblog"
          className={
            currentTab == "createblog"
              ? "  text-indigo-500 border-indigo-500"
              : ""
          }
        >
          CREATE BLOG
        </Link>
      </div>

      <div className="text-xl p-2">
        {isLoggedIn ? (
          <div class="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
            <Link
              href="/profile"
              className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none  hover:bg-indigo-600  md:text-base"
            >
              Profile
            </Link>

            <Link
              href="dashboard"
              class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
            >
              Dashboard
            </Link>
            <button
              onClick={() => {
                onLogout();
              }}
              class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none transition duration-100 hover:text-red-500 focus-visible:ring active:text-indigo-600 md:text-base"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <div class="-ml-8 hidden flex-col gap-2.5 sm:flex-row sm:justify-center lg:flex lg:justify-start">
              <Link
                href="/login"
                class="inline-block rounded-lg px-4 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:text-indigo-500 focus-visible:ring active:text-indigo-600 md:text-base"
              >
                Sign in
              </Link>

              <Link
                href="signup"
                class="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base"
              >
                Sign up
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
