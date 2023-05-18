import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Header from "../components/header";

const Dashboard = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const [isLoggedIn, setLogin] = useState(false);
  useEffect(() => {
    if (!user) {
      console.log(user);
      router.push("/login");
    } else setLogin(true);
  }, []);
  return (
    <>
      <Header />
      <div className="h-96 flex flex-col items-center justify-center text-xl font-bold">
        <div className="text-4xl p-10">Dashboard</div>
        {isLoggedIn ? (
          <div className="text-left">
            <div>NAME : {user.name}</div>
            <div>EMAIL : {user.email}</div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Dashboard;
