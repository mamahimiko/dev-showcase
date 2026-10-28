import Link from "next/link";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import "../globals.css";

const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen ">
      <div>
        <Header />
      </div>
      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
};

export default Authlayout;
