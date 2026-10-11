import Link from "next/link";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default Authlayout;
