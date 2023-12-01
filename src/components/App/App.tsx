import "./App.scss";
import "./Antd.scss";
import "../../assets/fonts/fonts.scss";
import 'normalize.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ResultTable from "../ResultTable/ResultTable";
import Main from "../Main/Main";

function App() {
  return (
    <div className="page">
      <Header />
      <Main>
        <ResultTable />
      </Main>
      <Footer />
    </div>
  );
}

export default App;
