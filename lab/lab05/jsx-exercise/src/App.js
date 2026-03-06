import logo from "./logo.svg";
import "./App.css";
import Controls from "./Controls";
import Footer from "./Footer";
import RenderUserList from "./UserList";

function App() {
  return (
    <div className="App">
      <div>{element}</div>
      <p>React Components</p>
      <p>{currentYear}</p>
      {Exercise1(isLoggedIn)}
      {Exercise2(isLoggedIn)}
    </div>
  );
}

const element = <h1>ENSF-381: Full Stack Web Development</h1>;

const currentYear = new Date().getFullYear();

var isLoggedIn = true;

function Exercise1(isLoggedIn) {
  return isLoggedIn ? <p>Welcome, user!</p> : <p>Please login.</p>;
}

function Exercise2(isLoggedIn) {
  if(isLoggedIn){
    return (
      <div>
        <Controls />
        <RenderUserList />
        <Footer />
      </div>
    );
  };
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
