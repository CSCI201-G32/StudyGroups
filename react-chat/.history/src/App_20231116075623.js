import {useState} from "react";

function App() {
  const[username, setUsername] = useState([]);
  const[messages, setMessages] = useState([])
  return (
    <div className="container">
      <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
        <div
        className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <input className="fs-5 fw-semibold" placeholder="username" value={username} onChange={e => setUsername(e.target.value)}/>
        </div>
      <div className="list-group list-group-flush border bottom scrollarea">
        <div className="list-group-item list-group-item-action py-3 lh-tight">
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">List group item heading</strong>
      
          </div>
          <div className="col-10 mb-1 small">Some placeholder</div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default App;
