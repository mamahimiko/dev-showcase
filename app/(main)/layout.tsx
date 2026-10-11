import Header from "../components/Header";
import Navigation from "../components/Navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <Navigation />
      {children}
    </>
  );
};

export default MainLayout;
