import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Home Library</div>
      <div className="logout">
        <button>Logout</button>
      </div>
    </header>
  );
};

export default Header;
