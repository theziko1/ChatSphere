import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import Join from './Join';
// import Chat from './Chat';
// import  io  from 'socket.io-client';

// const socket = io('http://localhost:5000');

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
  { path: "/", element: <App/>},
  { path: "/join", element: <Join/>},
  // { path: "/chat", element: <Chat socket={socket} username={""} room={1}/>},
    
]);
root.render(
    <RouterProvider router={router}/>
);


reportWebVitals();
