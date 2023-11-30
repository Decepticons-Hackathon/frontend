import "./App.scss";
import "./Antd.scss";
import "../../assets/fonts/fonts.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Matching from "../Matching/Matching";
import ResultTable from "../Table/TestTable";

function App() {
  return (
    <div className="page">
      <Header />
      {/* <Matching /> */}
      <ResultTable />
      <Footer />
    </div>
  );
}

export default App;
