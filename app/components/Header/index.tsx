import Navigation from "../Navigation";

const Header = () => {
  return (
    <div className="p-4 bg-white flex">
      <header className="text-center text-4xl font-bold text-soft-blue font-fredoka">
        Project Hub
      </header>
      <Navigation />
    </div>
  );
};

export default Header;
