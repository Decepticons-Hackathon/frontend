import GradientButton from "../GradientButton/GradientButton";
import { Link } from "react-router-dom";

import "./Header.scss";
import logo from "../../assets/images/prosept-logo.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src={logo} className="logo" alt="Логотип компании Prosept" />

      <Link to="/">
        {" "}
        <GradientButton>На главную</GradientButton>{" "}
      </Link>
      <Link to="/matching">
        {" "}
        <GradientButton>Разметка</GradientButton>{" "}
      </Link>
      <Link to="/statistics">
        {" "}
        <GradientButton>Статистика</GradientButton>{" "}
      </Link>
      <Link to="/comparehistory">
        <GradientButton>История разметки</GradientButton>
      </Link>
    </header>
  );
};

export default Header;
