import {useState} from "react";

function App() {
  const[username, setUsername] = useState();

  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <a href="/"
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input className="fs-5 fw-semibold"/>
        </a>
      <div className="list-group list-group-flush border bottom scrollarea">
        <div className="list-group-item list-group-item-action py-3 lh-tight">
          
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
