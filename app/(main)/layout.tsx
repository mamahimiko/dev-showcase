import Header from "../components/Header";
import Navigation from "../components/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default MainLayout;
