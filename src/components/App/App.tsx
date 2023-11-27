import "./App.scss";
import "./Antd.scss";
import "../../assets/fonts/fonts.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Login/Login";

function App() {
  return (
    <div className="page">
      <Header />
      <Login />
      <Footer />
    </div>
  );
}

export default App;
