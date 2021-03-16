import React,{useState} from 'react';
import './App.css';
import Sidebar from "./compontns/sidebar/Sidebar"
import Chat from "./compontns/chats/Chats"
import Login from "./compontns/Login/Login"
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useStateValue } from '../src/context/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  // const [user, setUser] = useState(null)
  return (
    <div className="app">

      {!user ? (
        <Login />
      ):(
        <div className="app_body">
        <Router>
            <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
                <Route path="/">
                  <Chat />
                </Route>
              </Switch>
        </Router>
            {/* <Sidebar />
            <Chats /> */}



      </div>
      )}

    </div>
  );
}

export default App;
