import Link from "next/link";

function Header({ currentTab }) {
  return (
    <div className="w-full border-b-2 border-gray flex justify-between">
      <h1 className="text-4xl p-4">BLOGGIFY</h1>
      <div className="flex text-xl gap-4 px-4 justify-center">
        <Link
          href="/categories"
          className={
            currentTab == "categories" ? "p-5 border-b-2 border-black" : "p-5"
          }
        >
          CATEGORIES
        </Link>
        <Link
          href="/bookmarks"
          className={
            currentTab == "bookmarks" ? "p-5 border-b-2 border-black" : "p-5"
          }
        >
          BOOKMARKS
        </Link>
        <Link
          href="/login"
          className={
            currentTab == "login" ? "p-5 border-b-2 border-black" : "p-5"
          }
        >
          LOGIN
        </Link>
        <Link
          href="/signup"
          className={
            currentTab == "signup" ? "p-5 border-b-2 border-black" : "p-5"
          }
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
}

export default Header;
