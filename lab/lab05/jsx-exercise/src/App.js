import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>{element}</div>
      <p>React Components</p>
      <p>{currentYear}</p>
      {MyComponent(isLoggedIn)}
    </div>
  );
}

const element = <h1>ENSF-381: Full Stack Web Development</h1>;

const currentYear = new Date().getFullYear();

var isLoggedIn = true;

function MyComponent(isLoggedIn) {
  return isLoggedIn ? <p>Welcome, user!</p> : <p>Please login.</p>;
}

export default App;

/*
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
          Learn React
        </a>
      </header>
    </div>
*/
