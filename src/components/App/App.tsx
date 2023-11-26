import logo from "../../assets/images/prosept-logo.svg";
import search from '../../assets/images/search.svg';

import "./App.scss";
import '../../assets/fonts/fonts.scss';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Найти на PROSEPT
          <img src={search} alt='Найти' width={20} height={20}></img>
        </a>
      </header>
    </div>
  );
}

export default App;
