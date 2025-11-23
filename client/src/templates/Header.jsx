import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <a href={"/"} className="logo">
        Home Library
      </a>
      <div className="logout">
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
