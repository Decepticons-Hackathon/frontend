import styles from './Footer.module.scss';

import logo from "../../assets/images/logom2.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} className={styles.logo} alt="Логотип компании Prosept" />
      <p className={styles.text}>#PROSEPTfamily</p>
      <p className={styles.text}>#PROSEPTlive</p>
    </footer>
  )
}

export default Footer;
