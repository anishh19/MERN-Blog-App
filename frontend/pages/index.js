import { Inter } from "next/font/google";
import Header from ".@component/components/header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Header currentTab="categories" />
    </>
  );
}
