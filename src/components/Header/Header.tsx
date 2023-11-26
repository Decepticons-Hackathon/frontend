import { Link } from "react-router-dom";
import styles from './Header.module.scss';

import logo from "../../assets/images/prosept-logo.svg";

const Header = () => {
  return (
    <header className={styles.header}>
      <img src={logo} className={styles.logo} alt="Логотип компании Prosept" />
      <button className={styles.button}>Инструкция</button>
      <Link className={styles.link_history} to='/comparehistory'>Открыть историю</Link>
    </header>
  )
}

export default Header;
