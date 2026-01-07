import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <header className="header">
      <a href={"/home"} className="logo">
        Home Library
      </a>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
};

export default Header;
